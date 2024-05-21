const topoButton = document.getElementById('topo');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) { // Mostra o botão após rolar 300px para baixo
        topoButton.style.display = 'flex';
    } else {
        topoButton.style.display = 'none';
    }
});

topoButton.addEventListener('click', () => {
    window.scrollTo({ 
        top: 0, behavior: 'smooth' 
    });
});




