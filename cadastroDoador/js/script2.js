document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('cadastroForm');
    if (!form) {
        console.warn('Formulário com id "cadastroForm" não encontrado. Abortando script.');
        return;
    }

    function limparErros() {
        const inputs = document.querySelectorAll('.campo-entrada-personalizado');
        const erros = document.querySelectorAll('.help.is-danger');

        inputs.forEach(input => input.classList.remove('is-danger'));
        erros.forEach(erro => erro.innerHTML = '');
    }

    function mostrarErro(inputId, mensagem) {
        const input = document.getElementById(inputId);
        const erroSpan = document.getElementById('erro' + inputId.replace('input', ''));
        
        if (input) input.classList.add('is-danger');
        if (erroSpan) erroSpan.innerHTML = mensagem;
    }

    function emailJaExiste(email) {
        const usuariosJSON = localStorage.getItem('usuariosCadastrados');
        const usuarios = usuariosJSON ? JSON.parse(usuariosJSON) : [];
        return usuarios.some(usuario => usuario.email === email);
    }
    
    // --------------------------------------------------------------------------
    // NOVA FUNÇÃO: Busca e Validação ASSÍNCRONA do CEP (ViaCEP)
    // --------------------------------------------------------------------------
    async function validarCepComAPI(cep) {
        const cepLimpo = cep.replace(/\D/g, '');

        if (cepLimpo.length !== 8) {
            return false; 
        }

        const url = `https://viacep.com.br/ws/${cepLimpo}/json/`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            return !data.erro; 
        } catch (error) {
            console.error("Erro ao buscar CEP na API:", error);
            return false;
        }
    }

    function validarCampos(nome, email, senha, cep, termos) {
        let isValid = true;
        
        
        if (nome.trim() === '') {
            mostrarErro('inputNome', 'O nome é obrigatório.');
            isValid = false;
        }
        
        if (email.trim() === '') {
            mostrarErro('inputEmail', 'O e-mail é obrigatório.');
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            mostrarErro('inputEmail', 'E-mail inválido.');
            isValid = false;
        } else if (emailJaExiste(email)) {
            mostrarErro('inputEmail', 'Este e-mail já está cadastrado.');
            isValid = false;
        }

        if (senha.trim() === '') {
            mostrarErro('inputSenha', 'A senha é obrigatória.');
            isValid = false;
        }
        
        if (!termos) {
            mostrarErro('inputTermos', 'É necessário concordar com os termos.');
            isValid = false;
        }

        const cepLimpo = cep.replace(/\D/g, '');
        if (cep.trim() === '') {
            mostrarErro('inputCep', 'O CEP é obrigatório.');
            isValid = false;
        } else if (!/^\d{8}$/.test(cepLimpo)) {
            mostrarErro('inputCep', 'O CEP deve conter exatamente 8 dígitos numéricos.');
            isValid = false;
        }

        return isValid;
    }

    
    form.addEventListener('submit', async function(event) { 
        event.preventDefault(); 
        
        limparErros(); 
        
        const nome = document.getElementById('inputNome').value;
        const email = document.getElementById('inputEmail').value;
        const senha = document.getElementById('inputSenha').value;
        const cep = document.getElementById('inputCep').value;
        const termosAceitos = document.getElementById('inputTermos').checked;

        if (!validarCampos(nome, email, senha, cep, termosAceitos)) {
            return; 
        }

        const cepValidoAPI = await validarCepComAPI(cep);
        
        if (!cepValidoAPI) {
            mostrarErro('inputCep', 'CEP inválido ou não encontrado.');
            return; 
        }

        
        const novoUsuario = {
            nome: nome,
            email: email,
            cep: cep,
            senha: senha, 
            dataCadastro: new Date().toISOString()
        };

        const usuariosJSON = localStorage.getItem('usuariosCadastrados');
        const usuarios = usuariosJSON ? JSON.parse(usuariosJSON) : [];
        
        usuarios.push(novoUsuario);

        localStorage.setItem('usuariosCadastrados', JSON.stringify(usuarios));

        alert(`🎉 Cadastro realizado com sucesso! Bem-vindo(a) ${nome}`);
        
        form.reset();
        window.location.href = 'index.html'; 
    });
});