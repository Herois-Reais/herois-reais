import { botaoLogar, emailCnpjDigitado, senhaDigitada } from "./elementosHTML.js"

const localStorageKey = 'listaCadastroOngs'
const form = document.getElementById('formLoginOng')

function verificarCadastro(event){
    event.preventDefault()

    const ongsCadastradas = localStorage.getItem(localStorageKey)
    const listaOngsCadastrados = ongsCadastradas ? JSON.parse(ongsCadastradas) : []
    const ongEncontrada = listaOngsCadastrados.find(ong => (ong.ongEmail === emailCnpjDigitado.value || ong.ongCnpj === emailCnpjDigitado.value) && ong.ongSenha === senhaDigitada.value)
    
    if(ongEncontrada){
        alert(`Bem-vinda(o): ${ongEncontrada.ongNome}`)
        window.location.href = "../homeOng/homeOng.html"

    } 
    else{
        alert('Ong não encontrada. Tente novamente ou realize o cadastro.')
        form.reset()
        return
    }
    
    form.reset()
}

botaoLogar.addEventListener('click', verificarCadastro)