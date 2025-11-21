import { imgPerfilOng, imgPreview, textUpload } from "./elementosHTML.js";

const localStorageKey = 'fotoPerfilOng'

function salvarImagem(){
    const imgSalva = localStorage.getItem(localStorageKey)

    if(imgSalva) {
        imgPreview.src = imgSalva;
        imgPreview.style.display = 'block'

        if(textUpload){
            textUpload.style.display = 'none'
        }
    } else {
        if(textUpload){
            textUpload.style.display = 'block'
        }

        imgPreview.style.display = 'none'
    }
}


imgPerfilOng.addEventListener('change', function(event){
    const arquivo = event.target.files[0]

    if(arquivo){
        const reader = new FileReader()

        reader.onload = function(e){
            const base64Image = e.target.result

            imgPreview.src = base64Image
            imgPreview.style.display = 'block'

            if(textUpload){
                textUpload.style.display = 'none'
            }

            localStorage.setItem(localStorageKey, base64Image)
            console.log("Imagem Salva!")
        }

        reader.readAsDataURL(arquivo)
    }
})

document.addEventListener('DOMContentLoaded', salvarImagem)
