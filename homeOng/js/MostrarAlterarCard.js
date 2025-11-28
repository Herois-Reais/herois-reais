const localStorageKey = 'listaProjetosOng'
const localStorageOngLogadaKey = 'ongLogada'
const cardContainer = document.getElementById('cardCampDoaVolsContainer')
const pontoDeInjecao = document.querySelector('.cardCampDoaVolTitleEPlus');

function criarCardOng(projeto){
    const titulo = projeto.titulo || 'Sem título'
    const data = projeto.data || 'Sem data'
    const descricao = projeto.descricao || 'Sem decrição'
    const qtdItensDoarem = projeto.qtdItensDoarem || '0'
    const qtdVoluntarios = projeto.qtdVoluntarios || '0'
    const imagem = projeto.imagem || ''
    const id = projeto.id
    const nomeOng = projeto.nome

    return `
    <div class="card sessoesCardsCriados">
        <div class="cardCampDoaVol"> <!-- Conteúdo da seção de um projeto da ONG -->
                                
            <div class="card cardProjeto"> <!-- Card do projeto da ong -->

                <div class="card-image"> <!-- Imagem do card do projeto da ong -->
                    <figure class="image is-4by3">
                        <img src="${imagem}" class="imgCapaCard" alt="Imagem de capa do projeto" />
                    </figure>
                </div> <!-- FIM - Imagem do card do projeto da ong -->

                <div class="card-content"> <!-- Informações do card do projeto da ong -->
                    <div class="content">
                        <p>${nomeOng} - ${titulo}</p>
                        <p>${data}</p>
                        <p>${descricao}</p>
                    </div>
                </div> <!-- FIM - Informações do card do projeto da ong -->

            </div> <!-- FIM - Card do projeto da ong -->

            <div class="textCard"> <!-- Dados sobre o projeto da ong -->
                <p>Doações pedidas: <span>${qtdItensDoarem}</span></p>
                <p>Doações recebidas: <span>0</span></p>
                <hr>
                <p>Voluntários estimados: <span>${qtdVoluntarios}</span></p>
                <p>Pessoas que se voluntariaram: <span>0</span></p>
            </div> <!-- FIM - Dados sobre o projeto da ong -->

            <div class="cardBtns"> <!--Botões editar e excluir do projeto da ong-->
                <button class="button is-medium is-responsive btnEditarDadosCard" data-id="${id}">Editar dados</button>
                <button class="button is-medium is-responsive btnExcluirCard" data-id="${id}">Excluir</button>
            </div> <!-- FIM Botões editar e excluir do projeto da ong-->

        </div>
        </div>
    `
}


function mostrarCardsSalvos(){
    const dadosSalvos = localStorage.getItem(localStorageKey)
    const listaProjetos = dadosSalvos ? JSON.parse(dadosSalvos) : []

    const ongLogadaJSON = localStorage.getItem(localStorageOngLogadaKey)
    const ongLogada = ongLogadaJSON ? JSON.parse(ongLogadaJSON) : null

    if(!ongLogada || !ongLogada.ongNome){
        console.log("Nenhuma ong ou nome da Ong encontrado");
        return
    }

    const projetosDaOngLogada = listaProjetos.filter(projeto => projeto.nome === ongLogada.ongNome)
    
    if(!pontoDeInjecao){
        console.log("Não foi achado o .cardCampDoaVolTitleEPlus");
        return
    }

    if (projetosDaOngLogada.length > 0){
        projetosDaOngLogada.forEach(projeto => {
            pontoDeInjecao.insertAdjacentHTML('afterend', criarCardOng(projeto))
        });

        console.log(`Cards adicionados: ${projetosDaOngLogada.length}`);
        botaoExcluir()
    } else {
        console.log('Nenhum projeto foi encontrado');
    }
}


function excluirCard(idCard, elementoCard){
    if(!confirm("Tem certeza que deseja excluir este projeto?")){
        return
    }

    const dadosSalvos = localStorage.getItem(localStorageKey)
    let listaProjetos = dadosSalvos ? JSON.parse(dadosSalvos) : []

    listaProjetos = listaProjetos.filter(projeto => projeto.id !== parseInt(idCard))

    localStorage.setItem(localStorageKey, JSON.stringify(listaProjetos))

    elementoCard.remove()
    alert("Projeto excluído com sucesso!")
}


function botaoExcluir(){
    const botoesExcluir = document.querySelectorAll('.btnExcluirCard')

    botoesExcluir.forEach(botao => {
        botao.addEventListener('click', (event) => {
            const idCard = event.currentTarget.getAttribute('data-id')

            const elementoCard = event.currentTarget.closest('.sessoesCardsCriados')

            if(idCard && elementoCard){
                excluirCard(idCard, elementoCard)
            }
            else {
                console.error("ID ou elemento pai não encontrado")
            }
        })
    })
}

mostrarCardsSalvos()