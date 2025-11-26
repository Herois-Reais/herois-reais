import { botaoSalvarAlteracoes, cnpjOng, emailOng, imgPerfilOng, imgPreview, nomeOng, senhaOng, telefoneOng, textUpload } from "./elementosHTML.js";

const localStorageOngLogadaKey = 'ongLogada'

let ongLogadaNome = null

// Gerando a chave para armazenar a imagem
function getLocalStorageKeyFoto(ongNome){
    return `fotoPerfilOng_${ongNome}`
}

function salvarImagem(){
    if (!ongLogadaNome){
        return
    }

    const chaveFoto = getLocalStorageKeyFoto(ongLogadaNome)
    const imgSalva = localStorage.getItem(chaveFoto)

    if(imgSalva) {
        imgPreview.src = imgSalva;
        imgPreview.style.display = 'block'

        if(textUpload){
            textUpload.style.display = 'none'
        }
    } 
    else {
        if(textUpload){
            textUpload.style.display = 'block'
        }

        imgPreview.style.display = 'none'
    }
}

let base64ImageSalva = null

imgPerfilOng.addEventListener('change', function(event){
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
            console.log("Imagem Salva temporariamente!")
        }

        reader.readAsDataURL(arquivo)
    }
})

// document.addEventListener('DOMContentLoaded', salvarImagem)
function salvarFotoOng(nomeOngAtual){
    if(base64ImageSalva && nomeOngAtual){
        const localStorageKey = getLocalStorageKeyFoto(nomeOngAtual)
        localStorage.setItem(localStorageKey, base64ImageSalva)
        console.log(`Imagem salva com a chave: ${localStorageKey}`);
        
        base64ImageSalva = null
    }
}

botaoSalvarAlteracoes.addEventListener('click', function(event){
    event.preventDefault()

    const nomeAtual = nomeOng.value

    const dadosAtualizados = {
        ongNome: nomeAtual,
        ongTelefone: telefoneOng.value,
        ongCnpj: cnpjOng.value,
        ongEmail: emailOng.value,
        ongSenha: senhaOng.value
    }

    localStorage.setItem(localStorageOngLogadaKey, JSON.stringify(dadosAtualizados))

    salvarFotoOng(nomeAtual)

    ongLogadaNome = nomeAtual
    
    salvarImagem()

    alert("Alterações salvas com sucesso!")
})

/* PEGANDO OS DADOS DA ONG PARA MOSTRÁ-LOS NO PERFIL */

function exibirDadosOng(){
    const ongLogadaJSON = localStorage.getItem(localStorageOngLogadaKey)
    const dadosOng = ongLogadaJSON ? JSON.parse(ongLogadaJSON) : null

    if(dadosOng){
        // Pegando o nome da Ong para mostrar a foto do perfil dela
        ongLogadaNome = dadosOng.ongNome

        nomeOng.value = dadosOng.ongNome
        telefoneOng.value = dadosOng.ongTelefone
        cnpjOng.value = dadosOng.ongCnpj
        emailOng.value = dadosOng.ongEmail
        senhaOng.value = dadosOng.ongSenha

        salvarImagem()
    }
}



/* VERIFICANDO O TAMANHO DAS INPUTS CNPJ E TELEFONE*/
cnpjOng.addEventListener('input', function() {
    if(this.value.length > 14){
        this.value = this.value.slice(0, 14)
    }
})

telefoneOng.addEventListener('input', function() {
    if(this.value.length > 11){
        this.value = this.value.slice(0, 11)
    }
})

document.addEventListener('DOMContentLoaded', exibirDadosOng)