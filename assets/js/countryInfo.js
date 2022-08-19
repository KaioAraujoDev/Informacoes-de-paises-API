const body = document.querySelector('body');

body.onload = exibirPais();

//Buscar dados do país na sessionStorage

function exibirPais() {
    const dadosPais = JSON.parse(sessionStorage.getItem('PaisSelecionado'));
    const main = document.querySelector('main');

    const sectionImg = document.createElement('section')
    const sectionInfo = document.createElement('section');

    sectionImg.innerHTML = `
        <section>
            <img src=${dadosPais.flags.svg}>
        </section>
    `;

    sectionInfo.innerHTML = `
        <h2>${dadosPais.name.common}</h2>
        <div>
            <ul>
                <li><strong>Native Name:${encontrarUltimoNomeNativoComum(dadosPais)
                }    
                
                </li>
                <li><strong>Population:</strong>${dadosPais.population}</li>
                <li><strong>Region:</strong>${dadosPais.region}</li>
                <li><strong>Sub Region:</strong>${dadosPais.subregion}</li>
                <li><strong>Capital:</strong>${dadosPais.capital[0]}</li>
            </ul>
            <ul>
                <li><strong>Top Level Domain:</strong>${dadosPais.tld[0]}</li>
                <li><strong>Currencies:</strong></li>
                <li><strong>Languages:</strong></li>
            </ul>
        </div>
        
    `;
    
    main.appendChild(sectionImg);
    main.appendChild(sectionInfo);
}

function encontrarUltimoNomeNativoComum(dadosPais){
    const JSONNomes = JSON.stringify(dadosPais.name.nativeName);
    const Ultimonome = JSONNomes.substring(JSONNomes.lastIndexOf(':') + 2 ,JSONNomes.length-3);

    console.log(Ultimonome);
}