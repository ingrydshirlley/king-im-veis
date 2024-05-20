function filtrarImoveis(casas, tipoImovel, categoriaImovel, cidade) {
    return casas.filter(casa => {
        return (!tipoImovel || casa.tipo === tipoImovel) &&
               (!categoriaImovel || casa.categoria === categoriaImovel) &&
               (!cidade || casa.cidade.toLowerCase().includes(cidade.toLowerCase()));
    });
}

function exibirResultados(casas, containerId) {
    const resultadosContainer = document.getElementById(containerId);
    resultadosContainer.innerHTML = '';

    if (casas.length === 0) {
        resultadosContainer.innerHTML = '<p>Nenhum imóvel encontrado.</p>';
        return;
    }

    casas.forEach(casa => {
        const casaElement = document.createElement('div');
        casaElement.classList.add('casa');

        casaElement.innerHTML = `
            <img src="${casa.foto}" alt="${casa.descricao}">
            <h2>${casa.descricao}</h2>
            <p>Preço: R$ ${casa.preco.toLocaleString('pt-BR')}</p>
            <p>Tipo: ${casa.tipo}</p>
            <p>Categoria: ${casa.categoria}</p>
            <p>Cidade: ${casa.cidade}</p>
        `;

        resultadosContainer.appendChild(casaElement);
    });
}
