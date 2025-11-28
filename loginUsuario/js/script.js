
document.addEventListener('DOMContentLoaded', () => {
    const btnCriarConta = document.getElementById('btn-criar-conta');
    const modalSelecao = document.getElementById('modalselecao');
    const btnONG = document.getElementById('btn-ong');
    const btnDoador = document.getElementById('btn-doador');

    if (modalSelecao) {
        const modalClose = modalSelecao.querySelector('.modalclose');
        const modalBackground = modalSelecao.querySelector('.modal-background');

        const abrirModal = () => modalSelecao.classList.add('is-active');
        const fecharModal = () => modalSelecao.classList.remove('is-active');

        if (btnCriarConta) btnCriarConta.addEventListener('click', abrirModal);
        if (modalClose) modalClose.addEventListener('click', fecharModal);
        if (modalBackground) modalBackground.addEventListener('click', fecharModal);
        
        } else {
        if (btnCriarConta) {
            btnCriarConta.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = '../cadastroDoador/cadastro-doador.html';
            });
        }
    }
});









    

