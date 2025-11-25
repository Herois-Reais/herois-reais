import { botaoCadastrarOng, checkboxTermos, cnpjOng, confimarSenhaOng, emailOng, nomeOng, senhaOng, telefoneOng } from "./elementosHTML.js"

const localStorageKey = 'listaCadastroOngs'

// Salvando as informações no localStorage
function salvarCadastroOngLocalStorage(event){
    event.preventDefault()

    const form = document.getElementById('formCadastroOng')

    if(!form.checkValidity()){
        alert("Preencha todos os campos")
        return
    }

    if(senhaOng.value !== confimarSenhaOng.value){
        alert("As senhas estão diferentes!")
        return
    }

    if(!checkboxTermos.checked){
        alert("Concorde com os termos de uso e política de privacidade para continuar")
        return
    }

    const novoCadastro = {
        id: Date.now(),
        ongNome: nomeOng.value,
        ongCnpj: cnpjOng.value,
        ongEmail: emailOng.value,
        ongTelefone: telefoneOng.value,
        ongSenha: senhaOng.value,
        termosAceitos: checkboxTermos.checked
    }

    const cadastrosExistentes = JSON.parse(localStorage.getItem(localStorageKey)) || []

    cadastrosExistentes.push(novoCadastro)

    localStorage.setItem(localStorageKey, JSON.stringify(cadastrosExistentes))

    form.reset()
    alert("Cadastro realizado com sucesso!")
    window.location.href = "../loginOng/index.html"
}

botaoCadastrarOng.addEventListener('click', salvarCadastroOngLocalStorage)