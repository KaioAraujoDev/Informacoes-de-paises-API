const body = document.querySelector('body');

body.onload = exibirPais();

//Buscar dados do país na sessionStorage
//Exibir informações em HTML

function exibirPais() {
    const dadosPais = JSON.parse(sessionStorage.getItem('PaisSelecionado'));
    const main = document.querySelector('main');

    const sectionImg = document.createElement('section')
    const sectionInfo = document.createElement('section');
    const divBorderCountries = document.createElement('div');

    sectionImg.innerHTML = `
        <section>
            <img src=${dadosPais.flags.svg}>
        </section>
    `;

    sectionInfo.innerHTML = `
        <h2>${dadosPais.name.common}</h2>
        <div>
            <ul>
                <li><strong>Native Name:${findLastCommonNativeName(dadosPais)}</li>
                <li><strong>Population:</strong>${dadosPais.population}</li>
                <li><strong>Region:</strong>${dadosPais.region}</li>
                <li><strong>Sub Region:</strong>${dadosPais.subregion}</li>
                <li><strong>Capital:</strong>${dadosPais.capital[0]}</li>
            </ul>
            <ul>
                <li><strong>Top Level Domain:</strong>${dadosPais.tld[0]}</li>
                <li><strong>Currencies:</strong>${findCurrencies(dadosPais.currencies)}</li>
                <li><strong>Languages:</strong>${findLanguages(dadosPais.languages)}</li>
            </ul>

        </div>
        
    `;

    divBorderCountries.innerHTML = `
        Border Countries:
        ${findBorderCountries(JSON.parse(sessionStorage.getItem('Paises')), dadosPais.borders)}
    `;


    sectionInfo.appendChild(divBorderCountries)
    main.appendChild(sectionImg);
    main.appendChild(sectionInfo);
}

// Função para converter JSON de Nome nativo em string capturar apenas a informação necessária

function findLastCommonNativeName(dadosPais) {
    const JSONNomes = JSON.stringify(dadosPais.name.nativeName);
    const Ultimonome = JSONNomes.substring(JSONNomes.lastIndexOf(':') + 2, JSONNomes.length - 3);

    return Ultimonome;
}

// Função para converter JSON de Currencies em string capturar apenas a informação necessária 
function findCurrencies(data) {
    const JSONCurrencies = JSON.stringify(data)
    const Currencie = JSONCurrencies.substring(JSONCurrencies.lastIndexOf('name') + 7, JSONCurrencies.lastIndexOf(',') - 1);

    return Currencie;

}

// Função para converter JSON de linguagens em string capturar apenas a informação necessária
// Retornar apenas os valores necessários

function findLanguages(data) {
    let JSONLanguages = JSON.stringify(data);
    let arrayLanguages = [];

    while (JSONLanguages.indexOf(':') > 0) {
        arrayLanguages.push(JSONLanguages.substring(JSONLanguages.indexOf(':') + 2, JSONLanguages.indexOf(',') - 1 > 0 ? JSONLanguages.indexOf(',') - 1 : JSONLanguages.indexOf('}') - 1))
        JSONLanguages = JSONLanguages.replace(':', '');
        JSONLanguages = JSONLanguages.replace(',', '');
    }

    return arrayLanguages;
}

function findBorderCountries(JSONCountries, borders) {

    if (borders !== undefined) {
        let result = [];
        borders.forEach(border => {
            result.push(JSONCountries.find(element => element.cca3 == border))

        });

        return showBorderCountries(result);
    }else{
        return 'Not declared';
    }


}


function showBorderCountries(result) {
    let listBorders = `<ul>`;

    result.forEach(element => {
        listBorders += `<li>${element.name.common}</li>`;

    });
    listBorders += `</ul>`;

    return listBorders;
}