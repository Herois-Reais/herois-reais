import { cnpjOng, emailOng, imgPerfilOng, imgPreview, nomeOng, senhaOng, telefoneOng, textUpload } from "./elementosHTML.js";

// const localStorageKey = 'fotoPerfilOng'

// function salvarImagem(){
//     const imgSalva = localStorage.getItem(localStorageKey)

//     if(imgSalva) {
//         imgPreview.src = imgSalva;
//         imgPreview.style.display = 'block'

//         if(textUpload){
//             textUpload.style.display = 'none'
//         }
//     } else {
//         if(textUpload){
//             textUpload.style.display = 'block'
//         }

//         imgPreview.style.display = 'none'
//     }
// }


// imgPerfilOng.addEventListener('change', function(event){
//     const arquivo = event.target.files[0]

//     if(arquivo){
//         const reader = new FileReader()

//         reader.onload = function(e){
//             const base64Image = e.target.result

//             imgPreview.src = base64Image
//             imgPreview.style.display = 'block'

//             if(textUpload){
//                 textUpload.style.display = 'none'
//             }

//             localStorage.setItem(localStorageKey, base64Image)
//             console.log("Imagem Salva!")
//         }

//         reader.readAsDataURL(arquivo)
//     }
// })

// document.addEventListener('DOMContentLoaded', salvarImagem)

/* PEGANDO OS DADOS DA ONG PARA MOSTRÁ-LOS NO PERFIL */
const localStorageOngLogadaKey = 'ongLogada'

function exibirDadosOng(){
    const ongLogada = localStorage.getItem(localStorageOngLogadaKey)
    const dadosOng = ongLogada ? JSON.parse(ongLogada) : null

    if(dadosOng){
        nomeOng.value = dadosOng.ongNome
        telefoneOng.value = dadosOng.ongTelefone
        cnpjOng.value = dadosOng.ongCnpj
        emailOng.value = dadosOng.ongEmail
        senhaOng.value = dadosOng.ongSenha
    }
}

document.addEventListener('DOMContentLoaded', exibirDadosOng())

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
