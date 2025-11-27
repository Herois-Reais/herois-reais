import { botaoLogar, emailDigitadoUsu, senhaDigitadaUsu } from "./elementosHTML.js"

const localStorageKey = 'usuariosCadastrados'
const localStorageUsuarioLogadoKey = 'usuarioLogado'

const form = document.getElementById('formCampoUsuario')

function verificaUsuario(event){
    event.preventDefault()

    const usuariosCadastrados = localStorage.getItem(localStorageKey)
    const listaUsuariosCadastrados = usuariosCadastrados ? JSON.parse(usuariosCadastrados) : []
    const usuarioEncontrado = listaUsuariosCadastrados.find(usuario => (usuario.email === emailDigitadoUsu.value && usuario.senha === senhaDigitadaUsu.value))

    if(usuarioEncontrado){
        localStorage.setItem(localStorageUsuarioLogadoKey, JSON.stringify(usuarioEncontrado))

        alert(`Bem-vindo(a): ${usuarioEncontrado.nome}`)
        window.location.href = '../Perfil/INDEX.HTML'
    } 
    else {
        alert("Usuário não encontrado. ente novamnete ou faça o cadastro")
        form.reset()
        return
    }
}

botaoLogar.addEventListener('click', verificaUsuario)