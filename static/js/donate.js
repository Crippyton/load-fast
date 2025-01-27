document.addEventListener("DOMContentLoaded", () => {
    const donateButtons = document.querySelectorAll(".donate-btn");
    const customDonationSection = document.querySelector(".custom-donation");
    const customAmountInput = document.getElementById("custom-amount");
    const customDonateBtn = document.getElementById("custom-donate-btn");
    const donationResult = document.getElementById("donation-result");
  
    donateButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const amount = button.dataset.amount;
        if (amount) {
          showThankYouMessage(amount);
        } else {
          // Show custom donation input
          customDonationSection.classList.remove("hidden");
        }
      });
    });
  
    customDonateBtn.addEventListener("click", () => {
      const customAmount = customAmountInput.value;
      if (customAmount && customAmount > 0) {
        showThankYouMessage(customAmount);
        customAmountInput.value = ""; // Clear the input field
      } else {
        alert("Please enter a valid amount!");
      }
    });
  
    function showThankYouMessage(amount) {
      donationResult.textContent = `Thank you for your generous donation of $${amount}!`;
      donationResult.classList.remove("hidden");
      customDonationSection.classList.add("hidden");
    }
  });

  //donate
  document.addEventListener("DOMContentLoaded", () => {
    const donateButtons = document.querySelectorAll(".donate-btn");
    const customDonationSection = document.querySelector(".custom-donation");
    const customAmountInput = document.getElementById("custom-amount");
    const customDonateBtn = document.getElementById("custom-donate-btn");
    const pixLinkSection = document.getElementById("pix-link-section");
    const pixKeyInput = document.getElementById("pix-key");
    const copyPixBtn = document.getElementById("copy-pix-btn");
    const thankYouMessage = document.querySelector(".thank-you-message");
  
    // Replace this with your actual PIX key
    const PIX_KEY = "crippyton@gmail.com";
  
    donateButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const amount = button.dataset.amount;
        if (amount) {
          showPixKey(amount);
        } else {
          customDonationSection.classList.remove("hidden");
        }
      });
    });
  
    customDonateBtn.addEventListener("click", () => {
      const customAmount = customAmountInput.value;
      if (customAmount && customAmount > 0) {
        showPixKey(customAmount);
        customAmountInput.value = ""; // Clear the input field
      } else {
        alert("Please enter a valid amount!");
      }
    });
  
    copyPixBtn.addEventListener("click", () => {
      pixKeyInput.select();
      document.execCommand("copy");
      thankYouMessage.classList.remove("hidden");
    });
  
    function showPixKey(amount) {
      pixKeyInput.value = `${PIX_KEY} (Amount: $${amount})`;
      pixLinkSection.classList.remove("hidden");
      thankYouMessage.classList.add("hidden");
      customDonationSection.classList.add("hidden");
    }
  });
  
  document.addEventListener("DOMContentLoaded", () => {
    const donateButtons = document.querySelectorAll(".donate-btn");
    const pixLinkSection = document.getElementById("pix-link-section");
    const pixKeyInput = document.getElementById("pix-key");
    const qrCodeImage = document.getElementById("qr-code-image");
    const copyPixBtn = document.getElementById("copy-pix-btn");
    const thankYouMessage = document.querySelector(".thank-you-message");

    // Dados de exemplo para PIX
    const pixData = {
      "5": {
        key: "00020126410014BR.GOV.BCB.PIX0119crippyton@gmail.com52040000530398654045.005802BR5925WASHINGTON LUIS DA SILVA 6009SAO PAULO622605225QUBGqnbLLX2mxbOZvemYM6304560B",
        qrCode: "/static/qrcode/5.jpg"
      },
      "10": {
        key: "00020126410014BR.GOV.BCB.PIX0119crippyton@gmail.com520400005303986540510.005802BR5925WASHINGTON LUIS DA SILVA 6009SAO PAULO6226052268dkdJgZOvgc1WbR0TCTKf63041C27",
        qrCode: "/static/qrcode/10.jpg"
      },
      "25": {
        key: "00020126410014BR.GOV.BCB.PIX0119crippyton@gmail.com520400005303986540525.005802BR5925WASHINGTON LUIS DA SILVA 6009SAO PAULO622605221ggXOtGR7cvnIYtT17EGOI630493DF",
        qrCode: "/static/qrcode/25.jpg"
      },
      "50": {
        key: "00020126410014BR.GOV.BCB.PIX0119crippyton@gmail.com520400005303986540550.005802BR5925WASHINGTON LUIS DA SILVA 6009SAO PAULO6226052257NmvVKUDDIJUYeX0HqH8163045BB3",
        qrCode: "/static/qrcode/50.jpg"
      },
      "custom": {
        key: "00020126410014BR.GOV.BCB.PIX0119crippyton@gmail.com5204000053039865802BR5925WASHINGTON LUIS DA SILVA 6009SAO PAULO622605224vBBa0XGCma04ggetpoJX76304277F",
        qrCode: "/static/qrcode/custom.jpg"
      }
    };

    donateButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const amount = button.dataset.amount;

        if (pixData[amount]) {
          // Atualiza a chave PIX e QR Code
          pixKeyInput.value = pixData[amount].key;
          qrCodeImage.src = pixData[amount].qrCode;
          qrCodeImage.classList.remove("hidden");
          pixLinkSection.classList.remove("hidden");
          thankYouMessage.classList.add("hidden");
        }
      });
    });

    copyPixBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(pixKeyInput.value).then(() => {
        thankYouMessage.textContent = "PIX Key copied successfully!";
        thankYouMessage.classList.remove("hidden");
      });
    });
  });

