function openModal(casa) {
    const modal = document.getElementById('myModal');
    const modalBody = document.getElementById('modalContent');

    let carouselHTML = '';

    if (casa.fotos && casa.fotos.length > 0) {

        carouselHTML += `<div id="imageCarousel" class="carousel">`;
        casa.fotos.forEach((foto, index) => {
            carouselHTML += `<img class="carousel-slide" src="${foto}" style="display: ${index === 0 ? 'block' : 'none'}; width: 100%; height: 700px;"">`;
        });
        carouselHTML += `<div class="carousel-controls">`;
        carouselHTML += `<a class="prev" onclick="mudarImagem(-1, this.parentElement.parentElement)">&#10094;</a>`;
        carouselHTML += `<a class="next" onclick="mudarImagem(1, this.parentElement.parentElement)">&#10095;</a>`;


        carouselHTML += '</div>';
        carouselHTML += '</div>';
    }

    let enderecoHTML = '';
    if (casa.referencia) {
        enderecoHTML = `<p>${casa.referencia}</p>`;
    } else {
        enderecoHTML = `<p>${casa.rua}, ${casa.bairro} - ${casa.cidade} / ${casa.estado} - CEP: ${casa.cep}</p>`;
    }

    let garagemHTML = '';
    if (casa.garagem) {
        garagemHTML = `<i class="fa-solid fa-car"></i>: ${casa.garagem}</span>`;
    } else {
        garagemHTML = "";
    }

    let quartoHTML = '';
    if (casa.dormitorios) {
        quartoHTML = `<span><i class="fa-solid fa-vector-square"></i>: ${casa.dormitorios} dormitórios</span>`;
    } else {
        quartoHTML = "";
    }

    const modalHTML = `
    ${carouselHTML} 
        <div class="textos-modal"> 
       
            <h1 class="descricao-modal">${casa.descricao}</h1>

            <div class="endereco-modal">
                ${enderecoHTML}
                <p class="text_cep"></p>
            </div>

            <div class="preco-modal">
                <p>R$ ${casa.preco.toLocaleString('pt-BR')},00</p>
            </div>

            <div class="geral-modal">
                <span><i class="fa-solid fa-door-open"></i>: ${casa.ambientes} cômodos</span>
                <span>${quartoHTML}</span>
                <span><i class="fa-solid fa-vector-square"></i>: ${casa.metros}m²</span>
                <span>${garagemHTML}</span>
                </div>

            <button id="botaoModal" class="botao-modal-contato" data-id="${casa.id}" data-nome="${casa.descricao}">Mais informações deste imóvel!</button>
        </div>   
    `;

    modalBody.innerHTML = modalHTML;
    document.getElementById('botaoModal').addEventListener('click', function() {
        const casaId = this.getAttribute('data-id');
        const casaNome = this.getAttribute('data-nome');
        const message = `Olá! Gostaria de mais informações sobre este imóvel: ${casaNome}`;
        const whatsappLink = `https://wa.me/5511940762958?text=${encodeURIComponent(message)}`;
        window.open(whatsappLink, '_blank');
    });
    modal.style.opacity = '0'
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.style.opacity = '1'; // Define a opacidade para 1 para suavizar a transição
    }, 100);
}

function mudarImagem(n, carousel) {
    const slides = carousel.getElementsByClassName('carousel-slide');
    let currentIndex = 0;
    for (let i = 0; i < slides.length; i++) {
        if (slides[i].style.display === 'block') {
            currentIndex = i;
            slides[i].style.display = 'none';
            break;
        }
    }
    currentIndex += n;
    if (currentIndex >= slides.length) {
        currentIndex = 0;
    } else if (currentIndex < 0) {
        currentIndex = slides.length - 1;
    }
    slides[currentIndex].style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';
}

document.querySelector('.close').addEventListener('click', () => {
    closeModal();
});

window.addEventListener('click', (event) => {
    const modal = document.getElementById('myModal');
    if (event.target === modal) {
        closeModal();
    }
});


casas.forEach(casa => {
    const casaBox = document.createElement('div');
    casaBox.classList.add('casa-box');

    const boxImage = document.createElement('div');
    boxImage.classList.add('box-image');

    const img = document.createElement('img');
    img.src = casa.foto;
    img.alt = 'Foto do Imóvel';

    boxImage.appendChild(img);

    casaBox.appendChild(boxImage);

    const boxInformations = document.createElement('div');
    boxInformations.classList.add('box-informations');

    const tipoCasa = document.createElement('p');
    tipoCasa.classList.add('tipo-casa');
    tipoCasa.textContent = casa.tipo;
    boxInformations.appendChild(tipoCasa);

    const descricao = document.createElement('h2');
    descricao.textContent = casa.descricao;
    boxInformations.appendChild(descricao);

    const preco = document.createElement('p');
    preco.classList.add('preco');
    preco.textContent = `R$ ${casa.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    boxInformations.appendChild(preco);

    const endereco = document.createElement('p');
    endereco.classList.add('endereco');
    endereco.textContent = `${casa.cidade}, ${casa.estado}`;
    boxInformations.appendChild(endereco);

    const detalhes = document.createElement('div');

    let comodosHTML = '';
    if (casa.ambientes) {
        comodosHTML = `<span><i class="fa-solid fa-door-open"></i>: ${casa.ambientes} cômodos(s)</span>`;
    } else {
        comodosHTML = ``;
    }

    detalhes.innerHTML = `
        <span>${comodosHTML}</span>
        <span><i class="fa-solid fa-vector-square"></i>: ${casa.metros}m²</span>
    `;
    boxInformations.appendChild(detalhes);

    casaBox.appendChild(boxInformations);
    casaBox.addEventListener('click', () => {
        openModal(casa);
    });

    document.getElementById('app').appendChild(casaBox);
});


