const body = document.querySelector('body');

body.onload = exibirPais();

//Buscar dados do país na sessionStorage

function exibirPais() {
    const dadosPais = JSON.parse(sessionStorage.getItem('PaisSelecionado'));
    const main = document.querySelector('main');

    const divImg = document.createElement('section')

    divImg.innerHTML = `
        <section>
            <img src=${dadosPais.flags.svg}>
        </section>
    `
    main.appendChild(divImg);
}