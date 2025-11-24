document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("toggle");

    if (toggle) {
        toggle.addEventListener("change", () => {
            document.body.classList.toggle("dark", toggle.checked);
            localStorage.setItem("theme", toggle.checked ? "dark" : "light");
        });

        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            document.body.classList.add("dark");
            toggle.checked = true;
        }
    }

    // FAQ
    const faqPerguntas = document.querySelectorAll('.faq-pergunta');

    faqPerguntas.forEach(pergunta => {
        pergunta.addEventListener('click', function() {
            const faqItem = this.closest('.faq-item');
            const resposta = faqItem.querySelector('.faq-resposta');
            const toggleIcon = faqItem.querySelector('.faq-toggle');

            const opened = resposta.style.display === 'block';
            resposta.style.display = opened ? 'none' : 'block';
            toggleIcon.textContent = opened ? '+' : '−';
        });
    });

    // Splide
    if (document.querySelector('.splide')) {
        new Splide('.splide', {
            type: 'slide',
            perPage: 3,
            perMove: 1,
            gap: '30px',
            pagination: false,
            arrows: true,
            breakpoints: {
                1024: { perPage: 2 },
                768: { perPage: 1 }
            }
        }).mount();
    }
});

const searchInput = document.getElementById('searchDoacao');
const cards = document.querySelectorAll('.doacao-card');

if (searchInput) {
    searchInput.addEventListener('input', () => {
        const value = searchInput.value.toLowerCase();

        cards.forEach(card => {
            const title = card.querySelector('.card-content h3').textContent.toLowerCase();
            const column = card.closest('.column');

            column.style.display = title.includes(value) ? '' : 'none';
        });
    });
}

document.getElementById("searchBtn")?.addEventListener("click", () => {
    const term = document.getElementById("searchPage").value.toLowerCase().trim();
    if (!term) return;

    const elements = document.querySelectorAll("h1, h2, h3, p, span, a");
    const found = Array.from(elements).find(el =>
        el.textContent.toLowerCase().includes(term)
    );

    if (found) {
        found.scrollIntoView({ behavior: "smooth", block: "center" });
        found.style.backgroundColor = "yellow";
        setTimeout(() => found.style.backgroundColor = "transparent", 2000);
    } else {
        alert("Nada encontrado na página 😕");
    }
});
