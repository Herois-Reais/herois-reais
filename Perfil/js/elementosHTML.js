const deleteBtn = document.querySelector(".close-modal");
const confirmOverlay = document.getElementById("confirmOverlay");
const yesBtn = document.getElementById("confirmYes");
const noBtn = document.getElementById("confirmNo");

const form = document.getElementById('formInfoUsu')
const nomeUsuario = document.getElementById('inputNomeUsu')
const emailUsuario = document.getElementById('inputEmailUsu')
const senhaUsuario = document.getElementById('inputSenhaUsu')
const cepUsuario = document.getElementById('inputCepUsu')
const imgPerfilUsuario = document.getElementById('imageUpload')
const imgPreview = document.getElementById('imgSubida')
const textUpload = document.querySelector('.textUpload')
const btnSalvarAlteracoes = document.getElementById('btnSalvarAlteracoesUsu')

export {
    deleteBtn,
    confirmOverlay,
    yesBtn,
    noBtn,
    form,
    nomeUsuario,
    emailUsuario,
    senhaUsuario,
    cepUsuario,
    imgPerfilUsuario,
    imgPreview,
    textUpload,
    btnSalvarAlteracoes
}