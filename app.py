from flask import Flask, render_template, request, send_file, jsonify
import os
import yt_dlp as youtube_dl
import zipfile

app = Flask(__name__)

BASE_DOWNLOAD_FOLDER = 'downloads'
BASE_ZIP_FOLDER = 'zips'

# Criação das pastas base, caso não existam
os.makedirs(BASE_DOWNLOAD_FOLDER, exist_ok=True)
os.makedirs(BASE_ZIP_FOLDER, exist_ok=True)

@app.route('/download_video', methods=['POST'])
def download_video():
    try:
        data = request.get_json()

        # Validação dos parâmetros recebidos
        if not all(key in data for key in ['url', 'quality', 'format']):
            return jsonify({'error': 'Parâmetros ausentes na requisição'}), 400

        video_url = data['url']
        quality = data['quality']
        format = data['format']

        # Extrai informações e determina o nome da pasta antes de baixar
        temp_ydl_opts = {'quiet': True}  # Sem download, apenas extração de informações
        with youtube_dl.YoutubeDL(temp_ydl_opts) as temp_ydl:
            info_dict = temp_ydl.extract_info(video_url, download=False)
            title = info_dict.get('title', 'unknown')  # Nome do vídeo ou playlist

        # Criação da pasta específica para o vídeo/playlist
        folder_name = os.path.join(BASE_DOWNLOAD_FOLDER, title)
        os.makedirs(folder_name, exist_ok=True)

        # Redefine o caminho para salvar os arquivos dentro da pasta criada
        ydl_opts = {
            'format': quality,
            'outtmpl': os.path.join(folder_name, '%(title)s.%(ext)s'),
            'postprocessors': [{
                'key': 'FFmpegVideoConvertor',
                'preferedformat': format,
            }],
        }

        # Download do vídeo ou playlist
        with youtube_dl.YoutubeDL(ydl_opts) as ydl:
            ydl.download([video_url])

        # Compacta a pasta específica em um único ZIP
        zip_filename = os.path.join(BASE_ZIP_FOLDER, f"{title}.zip")
        with zipfile.ZipFile(zip_filename, 'w', zipfile.ZIP_DEFLATED) as zipf:
            for root, dirs, files in os.walk(folder_name):
                for file in files:
                    zipf.write(os.path.join(root, file),
                               os.path.relpath(os.path.join(root, file), folder_name))

        return send_file(zip_filename, as_attachment=True)

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/donate')
def donate():
    return render_template('donate.html')

@app.route('/download', methods=['POST'])
def download():
    try:
        video_url = request.form['url']

        if not video_url:
            return jsonify({'error': 'URL não fornecida'}), 400

        # Extrai informações e determina o nome da pasta antes de baixar
        temp_ydl_opts = {'quiet': True}  # Sem download, apenas extração de informações
        with youtube_dl.YoutubeDL(temp_ydl_opts) as temp_ydl:
            info_dict = temp_ydl.extract_info(video_url, download=False)
            title = info_dict.get('title', 'unknown')  # Nome do vídeo

        # Criação da pasta específica para o vídeo
        folder_name = os.path.join(BASE_DOWNLOAD_FOLDER, title)
        os.makedirs(folder_name, exist_ok=True)

        # Redefine o caminho para salvar os arquivos dentro da pasta criada
        ydl_opts = {
            'format': 'best',
            'outtmpl': os.path.join(folder_name, '%(title)s.%(ext)s'),
        }

        # Download do vídeo
        with youtube_dl.YoutubeDL(ydl_opts) as ydl:
            ydl.download([video_url])

        # Compacta a pasta específica em um único ZIP
        zip_filename = os.path.join(BASE_ZIP_FOLDER, f"{title}.zip")
        with zipfile.ZipFile(zip_filename, 'w', zipfile.ZIP_DEFLATED) as zipf:
            for root, dirs, files in os.walk(folder_name):
                for file in files:
                    zipf.write(os.path.join(root, file),
                               os.path.relpath(os.path.join(root, file), folder_name))

        return send_file(zip_filename, as_attachment=True)

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
