function consultaApi() {
    fetch('https://restcountries.com/v3.1/all')
        .then(async (res) => {
            const resultado = await res.json();
            console.log(resultado);
            exibirPaises(resultado);
            trocaPagina(resultado);
        })
}

function exibirPaises(res) {
    const divResults = document.querySelector('#results');

    let c=0;
    res.forEach(element => {

        item = document.createElement('button');
        item.id = c;
        item.className = "item";

        item.innerHTML = `
        <div>
            <img src=${element.flags.svg}>
        </div>
        <div>
            
            <h2>${element.name.common}</h2>
            <ul>
                <li><strong>Population:</strong>${element.population}</li>
                <li><strong>Region:</strong>${element.region}</li>
                <li><strong>Capital:</strong>${element.capital ? element.capital : 'indefinido'}</li>
            </ul>
        </div>
        `;
        
        divResults.appendChild(item);
        c++;
    });

    
    
}

function trocaPagina(res) {
    const itemsDiv = document.querySelectorAll('.item');

    //Trocando de página e armazenando dados do país temporariamente 
    itemsDiv.forEach(element => {
        element.addEventListener('click', (event) => {

            sessionStorage.setItem("PaisSelecionado",JSON.stringify(res[element.id]))
            window.location.href = "/InformacoesPaises/assets/view/InfoCountry.html"; 

            
        });
    });
}