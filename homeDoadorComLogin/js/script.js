
// Rolagem suave para links de navegação
document.querySelectorAll('.main-nav .nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const href = link.getAttribute('href');
    const target = document.querySelector(href);
    if(target){
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // set active
      document.querySelectorAll('.main-nav .nav-link').forEach(n => n.classList.remove('active'));
      link.classList.add('active');
    }
  });
});

// Submissão do formulário de voluntariado (simulada)
const volForm = document.getElementById('volunteerForm');
if(volForm){
  volForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const checked = Array.from(volForm.querySelectorAll('input[name="roles"]:checked')).map(i => i.value);
    if(checked.length === 0){
      alert('Por favor, selecione ao menos uma função.');
      return;
    }
    // Aqui você faria um fetch POST para sua API.
    // Simulamos resposta:
    alert('Resposta enviada! Funções escolhidas: ' + checked.join(', '));
    volForm.reset();
  });
}

// Submissão do formulário de contato (simulada)
const contactForm = document.getElementById('contactForm');
if(contactForm){
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();

    if(!nome || !email || !mensagem){
      alert('Por favor, preencha todos os campos do formulário de contato.');
      return;
    }

    // Simulação de envio
    alert('Mensagem enviada. Obrigado, ' + nome + '!');
    contactForm.reset();
    // opcional: rolar para o topo do footer
    const footer = document.querySelector('.site-footer');
    if(footer) footer.scrollIntoView({ behavior: 'smooth' });
  });
}


function mostrarImagemPerfil(){
  const imgPerfil = document.getElementById('imgPerfil')
  if(!imgPerfil){
    return
  }

  const localStorageUsuarioLogadoKey = 'usuarioLogado'
  const usuarioLogadoJSON = localStorage.getItem(localStorageUsuarioLogadoKey)
  const dadosUsuario = usuarioLogadoJSON ? JSON.parse(usuarioLogadoJSON) : null

  if(dadosUsuario && dadosUsuario.nome){
    const nomeUsuarioLogado = dadosUsuario.nome
    const chaveImg = `imgPerfilUsuario_${nomeUsuarioLogado}`
    const imgSalva = localStorage.getItem(chaveImg)

    if(imgSalva){
      imgPerfil.src = imgSalva
    }
    else{
      imgPerfil.src = "../imgs/userSemImg.png"
    }
  }
  else {
    imgPerfil.src = "../imgs/userSemImg.png"
  }
}

mostrarImagemPerfil()

document.getElementById("openHistoricoBtn").addEventListener("click", () => {
    window.location.href = "../Perfil/perfil.html";
});