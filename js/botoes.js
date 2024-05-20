const topoButton = document.getElementById('topo');

topoButton.addEventListener('click', () => {
    window.scrollTo({ 
        top: 0, behavior: 'smooth' 
    });
});

