import { btnSalvarAlteracoes, cepUsuario, emailUsuario, imgPerfilUsuario, imgPreview, nomeUsuario, senhaUsuario, textUpload } from "./elementosHTML.js"

const localStorageKey = 'usuariosCadastrados'
const localStorageUsuarioLogadoKey = 'usuarioLogado'

let nomeUsuarioLogado = null

function getLocalStorageKeyImg(usuarioNome){
    return `imgPerfilOng_${usuarioNome}`
}

function salvarImagem(){
    if(!nomeUsuarioLogado){
        return
    }

    const chaveImg = getLocalStorageKeyImg(nomeUsuarioLogado)
    const imgSalva = localStorage.getItem(chaveImg)

    if(imgSalva){
        imgPreview.src = imgSalva
        imgPreview.style.display = 'block'

        if(textUpload){
            textUpload.style.display = 'none'
        }
    }
    else{
        if(textUpload){
            textUpload.style.display = 'block'
        }

        imgPreview.style.display = 'none'
    }
}

let base64ImageSalva = null

imgPerfilUsuario.addEventListener('change', function(event){
    const arquivo = event.target.files[0]

    if(arquivo){
        const reader = new FileReader()

        reader.onload = function(e){
            base64ImageSalva = e.target.result

            imgPreview.src = base64ImageSalva
            imgPreview.style.display = 'block'

            if(textUpload){
                textUpload.style.display = 'none'
            }

            console.log('Foi captada');
        }
        reader.readAsDataURL(arquivo)
    }
})

function salvarImgUsuario(nomeUsuarioAtual){
    if(base64ImageSalva && nomeUsuarioAtual){
        const localStorageKey = getLocalStorageKeyImg(nomeUsuarioAtual)
        localStorage.setItem(localStorageKey, base64ImageSalva)
        console.log("Imagem slava!");
        
        base64ImageSalva = null
    }
}

btnSalvarAlteracoes.addEventListener('click', function(event){
    event.preventDefault()

    const usuarioLogadoJSON = localStorage.getItem(localStorageUsuarioLogadoKey)
    const dadosUsuarioAtual = usuarioLogadoJSON ? JSON.parse(usuarioLogadoJSON) : null

    if(!dadosUsuarioAtual || !dadosUsuarioAtual.email){
        alert("ERRO: dados não encontrados")
        return
    }

    const nomeAtual = nomeUsuario.value

    const novosDados = {
        cep: cepUsuario.value,
        senha: senhaUsuario.value,
        nome: nomeAtual,
        email: emailUsuario.value
    }

    const usuariosCadastradosJSON = localStorage.getItem(localStorageKey)
    let listaUsuariosCadastrados = usuariosCadastradosJSON ? JSON.parse(usuariosCadastradosJSON) : []

    const indexUsuario = listaUsuariosCadastrados.findIndex(usu => usu.email === dadosUsuarioAtual.email)
    if(indexUsuario !== -1){
        listaUsuariosCadastrados[indexUsuario] = novosDados

        localStorage.setItem(localStorageKey, JSON.stringify(listaUsuariosCadastrados))
    }

    localStorage.setItem(localStorageUsuarioLogadoKey, JSON.stringify(novosDados))
    salvarImgUsuario(nomeAtual)
    nomeUsuarioLogado = nomeAtual
    salvarImagem()
    alert('Alterações salvas com sucesso!')
})

function mostrarDados(){
    const usuarioLogadoJSON = localStorage.getItem(localStorageUsuarioLogadoKey)
    const dadosUsuario = usuarioLogadoJSON ? JSON.parse(usuarioLogadoJSON) : null
    if(dadosUsuario){
        nomeUsuarioLogado = dadosUsuario.nome

        nomeUsuario.value = dadosUsuario.nome
        cepUsuario.value = dadosUsuario.cep.replace('-', '')
        emailUsuario.value = dadosUsuario.email
        senhaUsuario.value = dadosUsuario.senha

        salvarImagem()
        
    }
}

cepUsuario.addEventListener('input', function(){
    if(this.value.length > 7){
        this.value = this.value.slice(0, 7)
    }
})

mostrarDados()
