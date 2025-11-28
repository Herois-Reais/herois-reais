import { botaoCriarCard, imagemPreview, imagemUpload, inputBeneficiosDoadores, inputData, inputDuracao, inputQtdItensDoarem, inputQtdVoluntarios, inputTempoDescanso, inputTipoDoacao, inputTitulo, selectTipoCard, textDescricao, textUpload } from "./elementosHTML.js"

const localStorageKey = 'listaProjetosOng'

const localStorageOngLogadaKey = 'ongLogada'

// SALVA A IMAGEM NO LOCALSTORAGE
imagemUpload.addEventListener('change', function(event){
    const arquivo = event.target.files[0]

    if(arquivo){
        const reader = new FileReader()

        reader.onload = function(e){
            const base64Image = e.target.result

            imagemPreview.src = base64Image
            imagemPreview.style.display = 'block'

            if(textUpload){
                textUpload.style.display = 'none'
            }

            console.log("Prévia carregada!")
        }

        reader.readAsDataURL(arquivo)
    }
})


// FUNÇÃO PARA COLOCAR AS INFORMAÇÕES DAS INPUTS NO LOCAL STORAGE
function salvarInformacoesCardLocalStorage(event){
    event.preventDefault()

    const form = document.querySelector('.cardForm')
    const imagemCapa = imagemPreview.src

    if(!imagemCapa.startsWith('data:image')){
        alert("Adicione uma imagem para o projeto.")
        return
    }

    if(textDescricao.value.trim() === ''){
        alert("Adicione uma descrição.")
        return
    }

    if(!form.checkValidity()){
        alert("Preencha todos os campos.")
        return
    }

    if(!selectTipoCard || selectTipoCard === '' || selectTipoCard ==='vazio'){
        alert('Escolha uma opção válida para este campo')
        return
    }

    const ongLogadaJSON = localStorage.getItem(localStorageOngLogadaKey)
    const dadosOngLogada = ongLogadaJSON ? JSON.parse(ongLogadaJSON) : null
    
    let nomeOngValue = 'ong não encontrada'

    if(dadosOngLogada && dadosOngLogada.ongNome){
        nomeOngValue = dadosOngLogada.ongNome
    }
    else {
        alert("ERRO: Ong não encontrada, faça o login novamente")
        window.location.href = "../loginOng/index.html"
    }

    const novoCard = {
        id: Date.now(),
        titulo: inputTitulo.value,
        data: inputData.value,
        duracao: inputDuracao.value,
        tempoDescanso: inputTempoDescanso.value,
        qtdVoluntarios: inputQtdVoluntarios.value,
        tipoDoacao: inputTipoDoacao.value,
        qtdItensDoarem: inputQtdItensDoarem.value,
        beneficios: inputBeneficiosDoadores.value,
        descricao: textDescricao.value,
        imagem: imagemCapa,
        nome: nomeOngValue,
        tipoCard: selectTipoCard.value
    }

    const cardsExistentes = JSON.parse(localStorage.getItem(localStorageKey)) || []

    cardsExistentes.push(novoCard)

    // Atualizando a lista:
    localStorage.setItem(localStorageKey, JSON.stringify(cardsExistentes))

    if(imagemPreview){
        imagemPreview.src = ''
        imagemPreview.style.display = 'none'
    }
    if(textUpload){
        textUpload.style.display = 'block'
    }
    
    form.reset()
    textDescricao.value = ''
    alert("Card cadastrado com sucesso!")
    
    window.location.href = "../homeOng/homeOng.html"
}


botaoCriarCard.addEventListener('click', salvarInformacoesCardLocalStorage)
