import { confirmOverlay, deleteBtn, noBtn, yesBtn } from "./elementosHTML.js";

const localStorageKey = 'usuariosCadastrados'
const localStorageUsuarioLogadoKey = 'usuarioLogado'

deleteBtn.addEventListener("click", () => {
    confirmOverlay.style.display = "flex";
});

noBtn.addEventListener("click", () => {
    confirmOverlay.style.display = "none";
});

yesBtn.addEventListener("click", () => {
    confirmOverlay.style.display = "none";

    const usuarioLogadoJSON = localStorage.getItem(localStorageUsuarioLogadoKey)
    const dadosUsuarioLogado = usuarioLogadoJSON ? JSON.parse(usuarioLogadoJSON) : null

    if(!dadosUsuarioLogado || !dadosUsuarioLogado.email || !dadosUsuarioLogado.nome){
        alert("ERRO: Dados não encontrados para excluir")
        return
    }

    const usuariosCadastradosJSON = localStorage.getItem(localStorageKey)
    let listaUsuariosCadastrados = usuariosCadastradosJSON ? JSON.parse(usuariosCadastradosJSON) : []
    const novaListaUsuarios = listaUsuariosCadastrados.filter(usu => usu.email !== dadosUsuarioLogado.email)

    localStorage.setItem(localStorageKey, JSON.stringify(novaListaUsuarios))
    localStorage.removeItem(localStorageUsuarioLogadoKey)

    function getLocalStorageKeyImg(usuarioNome) {
        return `imgPerfilUsuario_${usuarioNome}`
    }

    if(dadosUsuarioLogado.nome){
        const chaveImg = getLocalStorageKeyImg(dadosUsuarioLogado.nome)
        localStorage.removeItem(chaveImg)
    }
    alert("Conta deletada com sucesso!");
    window.location.href = "../loginUsuario/index.html"
});

