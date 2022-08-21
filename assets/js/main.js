function consultaApi() {
    fetch('https://restcountries.com/v3.1/all')
        .then(async (res) => {
            const resultado = await res.json();
            console.log(resultado);

            //Guardando Valores na session storage
            sessionStorage.setItem("Paises",JSON.stringify(resultado));

            exibirPaises(resultado);
            
        })
}

function exibirPaises(res) {
    let divResults = document.querySelector('#results');
    divResults.innerHTML = ``;

    let c=0;
    res.forEach(element => {
        
        item = document.createElement('button');
        item.id = c;
        item.className = "itemButton";

        item.innerHTML = `
        <div class="divImg">
            <img src=${element.flags.svg}>
        </div>
        <div class="divInfo">
            
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

    trocaPagina(res);
    
}

//Função para passar a informação do item selecionado para sessionStorage e fazer a troca de página

function trocaPagina(res) {
    const itemsDiv = document.querySelectorAll('.itemButton');

    //Trocando de página e armazenando dados do país temporariamente 
    itemsDiv.forEach(element => {
        element.addEventListener('click', (event) => {

            sessionStorage.setItem("PaisSelecionado",JSON.stringify(res[element.id]))
            window.location.href = "../view/InfoCountry.html"; 

            
        });
    });
}

function filterCountries(){
    const JSONCountries = JSON.parse(sessionStorage.getItem('Paises'));
    const input = document.querySelector('#inputCountry');
    const select = document.querySelector('#select');
    const valueItemSelected = select.options[select.selectedIndex].value.toLowerCase();

    let result = [];
    if(valueItemSelected == "all"){
        result = JSONCountries.filter(element => element.name.common.toLowerCase().includes(input.value.toLowerCase()))

        return result;
    }else{
        result = JSONCountries.filter((element) => element.name.common.toLowerCase().includes(input.value.toLowerCase()) && element.continents[0].toLowerCase().includes(valueItemSelected))
        return result;
    }
    
}