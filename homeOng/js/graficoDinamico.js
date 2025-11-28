import { totalItensArrecadadosSpan, totalVoluntariosSpan } from "./elementosHTML.js"

Chart.register(ChartDataLabels)

const localStorageProjetosKey = 'listaProjetosOng'
const localStorageOngLogadaKey = 'ongLogada'

function calcularDadosGraficos(){
    const ongLogadaJSON = localStorage.getItem(localStorageOngLogadaKey)
    const ongLogada = ongLogadaJSON ? JSON.parse(ongLogadaJSON) : null

    if(!ongLogada || !ongLogada.ongNome){
        console.error("ONG logada não encontrada")
        return{
            doacoesAtuais: 0,
            metaDoacoes: 0,
            voluntariosAtuais: 0,
            metaVoluntarios: 0
        }
    }

    const dadosSalvosProjetos = localStorage.getItem(localStorageProjetosKey)
    const listaProjetosOng = dadosSalvosProjetos ? JSON.parse(dadosSalvosProjetos) : []

    const projetosOngLogada = listaProjetosOng.filter(projeto => projeto.nome === ongLogada.ongNome)

    const novaMetaDoacoes = projetosOngLogada.reduce((total, projeto) => {
        const qtd = parseInt(projeto.qtdItensDoarem)
        return total + (isNaN(qtd) ? 0 : qtd)
    }, 0)

    const novaMetaVoluntarios = projetosOngLogada.reduce((total, projeto) => {
        const qtd = parseInt(projeto.qtdVoluntarios)
        return total + (isNaN(qtd) ? 0 : qtd)
    }, 0)

    const doacoesAtuais = 0
    const voluntariosAtuais = 0

    return {
        doacoesAtuais,
        metaDoacoes: novaMetaDoacoes > 0 ? novaMetaDoacoes : 0,
        voluntariosAtuais,
        metaVoluntarios: novaMetaVoluntarios > 0 ? novaMetaVoluntarios : 0
    }
}

const dadosCalculados = calcularDadosGraficos()

function atualizarValoresHTML(dados){
    if(totalItensArrecadadosSpan){
        totalItensArrecadadosSpan.textContent = dados.metaDoacoes
    }

    if(totalVoluntariosSpan){
        totalVoluntariosSpan.textContent = dados.metaVoluntarios
    }
}

atualizarValoresHTML(dadosCalculados)

// GRÁFICO DAS DOAÇÕES
const doacoesAtuais = dadosCalculados.doacoesAtuais
const metaDoacoes = dadosCalculados.metaDoacoes
const doacoesFaltandes = metaDoacoes - doacoesAtuais < 0 ? 0 : metaDoacoes - doacoesAtuais

const dadosDoacoes = {
    labels: ['Doações Atuais', 'Faltantes'],
    datasets: [{
        label: 'Progresso de Doações',
        data: [doacoesAtuais, doacoesFaltandes],
        backgroundColor: [
            '#BE5A2A',
            'rgba(209, 116, 73, 0.771)'
        ],
        borderColor: '#000',
        hoverOffset: 4
    }]
}



// GRÁFICO DAS VOLUNTARIADOS
const voluntariosAtuais = dadosCalculados.voluntariosAtuais
const metaVoluntarios = dadosCalculados.metaVoluntarios
const voluntariosFaltantes = metaVoluntarios - voluntariosAtuais < 0 ? 0 : metaVoluntarios - voluntariosAtuais

const dadosVoluntarios = {
    labels: ['Voluntários atuais', 'Faltantes'],
    datasets: [{
        label: 'Progresso de Voluntários',
        data: [voluntariosAtuais, voluntariosFaltantes],
        backgroundColor: [
            '#BE5A2A',
            'rgba(209, 116, 73, 0.771)'
        ],
        borderColor: '#000',
        hoverOffset: 4
    }]
}



// TOOLTIP - para ambos
function getChartOptions(unidade){
    return{
        reponsive: true,
        plugins: {
            legend: {
                display: false
            },
            datalabels: {
                formatter: (value, context) => {
                    const dataset = context.chart.data.datasets[0].data
                    const total = dataset.reduce((a, b) => a + b, 0)
                    const porcentagem = Math.round((value / total) * 100)

                    return porcentagem + '%'
                },
                color: '#fff',
                font: {
                    weight: 'bold',
                    size: 16
                }, 
                align: 'center'
            },
            tooltip: {
                callbacks: {
                    label: function(context){
                        const valor = context.parsed
                        const dataset = context.dataset.data
                        const total = dataset.reduce((a, b) => a + b, 0)
                        const porcentagem = Math.round((valor / total ) * 100)

                        if(context.dataIndex === 0){
                            return `Total atual: ${valor} ${unidade}`
                        }
                        else {
                            return `Faltam: ${valor} ${unidade}`
                        }
                    }
                }
            }
        }
    }
}




// CRIANDO OS GRÁFICOS
const configuracaoDoacoes = {
    type: 'pie',
    data: dadosDoacoes,
    options: getChartOptions('doações')
}



const configuracaoVoluntarios = {
    type: 'pie',
    data: dadosVoluntarios,
    options: getChartOptions('voluntários')
}


const contextoDoacoes = document.getElementById('meuGrafico') ? document.getElementById('meuGrafico').getContext('2d') : null
const contextoVoluntarios = document.getElementById('meuGrafico2') ? document.getElementById('meuGrafico2').getContext('2d') :  null


if(contextoDoacoes){
        const meuGrafico = new Chart(
        contextoDoacoes,
        configuracaoDoacoes
    )
}
else{
    console.error("Elemento canvas do gráfico de doações não encontrado");
}


if(contextoVoluntarios){
        const meuGrafico2 = new Chart(
        contextoVoluntarios,
        configuracaoVoluntarios
    )
}
else{
    console.error("Elemento canvas do gráfico de voluntários não encontrado");
}