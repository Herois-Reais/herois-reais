Chart.register(ChartDataLabels)

// GRÁFICO DAS DOAÇÕES
const doacoesAtuais = 10
const metaDoacoes = 100
const doacoesFaltandes = metaDoacoes - doacoesAtuais

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
const voluntariosAtuais = 15
const metaVoluntarios = 150
const voluntariosFaltantes = metaVoluntarios - voluntariosAtuais

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


const contextoDoacoes = document.getElementById('meuGrafico').getContext('2d')
const contextoVoluntarios = document.getElementById('meuGrafico2').getContext('2d')


const meuGrafico = new Chart(
    contextoDoacoes,
    configuracaoDoacoes
)

const meuGrafico2 = new Chart(
    contextoVoluntarios,
    configuracaoVoluntarios
)
