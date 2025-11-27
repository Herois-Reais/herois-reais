
const deleteBtn = document.querySelector(".close-modal");
const confirmOverlay = document.getElementById("confirmOverlay");
const yesBtn = document.getElementById("confirmYes");
const noBtn = document.getElementById("confirmNo");

deleteBtn.addEventListener("click", () => {
    confirmOverlay.style.display = "flex";
});

noBtn.addEventListener("click", () => {
    confirmOverlay.style.display = "none";
});

yesBtn.addEventListener("click", () => {
    confirmOverlay.style.display = "none";
    alert("Conta deletada."); // Aqui você coloca sua função real
});


