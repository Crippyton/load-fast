$(document).ready(function() {
    $('#download-btn').on('click', function() {
        var videoUrl = $('#video-url').val();
        if (videoUrl) {
            $.ajax({
                url: '/download',
                type: 'POST',
                data: {url: videoUrl},
                success: function(response) {
                    window.location.href = response;
                },
                error: function() {
                    alert("There was an error downloading the video.");
                }
            });
        } else {
            alert("Please enter a valid video URL.");
        }
    });
});


//escolher qualidade

document.getElementById('download-btn').addEventListener('click', function() {
    const videoUrl = document.getElementById('video-url').value;
    const videoQuality = document.getElementById('video-quality').value;
    const videoFormat = document.getElementById('video-format').value;

    // Exemplo de como você pode usar essas variáveis para a lógica de download
    console.log(`Downloading video from: ${videoUrl}`);
    console.log(`Selected Quality: ${videoQuality}`);
    console.log(`Selected Format: ${videoFormat}`);

    // Aqui você pode implementar o código que envia esses dados para o servidor ou inicia o download do vídeo
});

// historico de vídeos baixados
const previewBtn = document.getElementById('preview-btn');
        const videoLinkInput = document.getElementById('video-link');
        const videoPreview = document.getElementById('video-preview');
        const historyList = document.getElementById('history-list');

        let videoHistory = JSON.parse(localStorage.getItem('videoHistory')) || [];

        function displayVideoPreview(url) {
            // Limpar a pré-visualização anterior
            videoPreview.innerHTML = '';

            const iframe = document.createElement('iframe');
            iframe.src = url;
            videoPreview.appendChild(iframe);
        }

        function updateHistory() {
            // Limpar a lista de histórico atual
            historyList.innerHTML = '';

            videoHistory.forEach((video, index) => {
                const li = document.createElement('li');
                li.textContent = video;
                historyList.appendChild(li);
            });
        }

        function addVideoToHistory(url) {
            // Adicionar o vídeo ao histórico
            if (videoHistory.length >= 5) {
                videoHistory.pop(); // Remover o vídeo mais antigo se o limite for alcançado
            }
            videoHistory.unshift(url); // Adicionar o novo vídeo no início
            localStorage.setItem('videoHistory', JSON.stringify(videoHistory));
            updateHistory();
        }

        previewBtn.addEventListener('click', () => {
            const videoUrl = videoLinkInput.value.trim();
            if (videoUrl) {
                displayVideoPreview(videoUrl);
                addVideoToHistory(videoUrl);
                videoLinkInput.value = ''; // Limpar campo de entrada
            }
        });

        // Carregar o histórico de vídeos ao iniciar
        updateHistory();

// Função de pré-visualização do vídeo
const videoUrlInput = document.getElementById('video-url');
const videoPreviewDiv = document.getElementById('video-preview');
const downloadBtn = document.getElementById('download-btn');


// Função para exibir a pré-visualização do vídeo
function previewVideo(url) {
    // Limpar a pré-visualização anterior
    videoPreviewDiv.innerHTML = '';

    const iframe = document.createElement('iframe');
    iframe.src = url;
    videoPreviewDiv.appendChild(iframe);
}

// Função para armazenar e exibir o histórico


function updateHistory() {
    historyList.innerHTML = '';
    videoHistory.forEach(video => {
        const li = document.createElement('li');
        li.textContent = video;
        historyList.appendChild(li);
    });
}

function addToHistory(url) {
    if (videoHistory.length >= 5) {
        videoHistory.pop(); // Limitar o histórico a 5 vídeos
    }
    videoHistory.unshift(url); // Adicionar o vídeo no início
    localStorage.setItem('videoHistory', JSON.stringify(videoHistory));
    updateHistory();
}

// Ação do botão de download
downloadBtn.addEventListener('click', () => {
    const videoUrl = videoUrlInput.value.trim();
    if (videoUrl) {
        previewVideo(videoUrl);
        addToHistory(videoUrl);
        videoUrlInput.value = ''; // Limpar o campo de URL
    }
});

// Carregar o histórico ao carregar a página
updateHistory();