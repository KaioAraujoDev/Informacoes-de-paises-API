

const input = document.querySelector('#inputCountry');

input.addEventListener('keyup', () => {
    exibirPaises(filterCountries());
})

const select = document.querySelector('#select');
select.addEventListener('click',()=>{
    exibirPaises(filterCountries());
})

