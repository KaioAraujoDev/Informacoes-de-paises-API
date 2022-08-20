consultaApi();

const input = document.querySelector('#inputCountry');

input.addEventListener('keyup', (event)=>{
    const JSONCountries =  JSON.parse(sessionStorage.getItem('Paises'));

    exibirPaises(JSONCountries.filter(element => element.name.common.toLowerCase().includes(event.target.value.toLowerCase())))

})

const select = document.querySelector('#select');

select.addEventListener('click', (event)=>{
    console.log(event);
})