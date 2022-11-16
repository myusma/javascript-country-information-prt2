//import axios
import axios from 'axios'

//create reference

const neder = document.getElementById('tot');

async function dataTwo(id) {


    //create list element for
    const nedNaam = document.createElement('div');
    const nedSubArea = document.createElement('div');
    const nedFlag = document.createElement('img');

    try {
        const response= await axios.get(`https://restcountries.com/v2/name/${id}`);


        //log data in console
        console.log(response.data);
        //log Nederland in console
        console.log(response.data[0]);


        neder.replaceChildren()


        nedFlag.setAttribute('class', 'nedFlag');
        nedFlag.setAttribute('src', response.data[0].flag);
        neder.appendChild(nedFlag);


        nedNaam.setAttribute('class', 'nedName');
        nedNaam.textContent = response.data[0].name;
        neder.appendChild(nedNaam);


        nedSubArea.setAttribute('class', 'subAreaNed');
        nedSubArea.textContent = `${response.data[0].name} is situated in ${response.data[0].subregion} .It has a population of ${response.data[0].population} people. `;
        neder.appendChild(nedSubArea);


        const valuta = document.createElement('div');
        valuta.setAttribute('class', 'currency');
        valuta.textContent = `${valutaCountry(response.data[0])}`
        neder.appendChild(valuta);

        const speakLang = document.createElement('div');
        speakLang.setAttribute('class', 'language');
        speakLang.textContent = `${speak(response.data[0])}`
        neder.appendChild(speakLang);

        //catch error
    } catch (err) {
        console.error(err);
        //Reference to error message
        const errorMessage = document.getElementById('error-message')
        if (err.response.status === 404) {
            errorMessage.textContent = "Page Not Found | 404";
        }
        if (err.response.status === 500) {
            errorMessage.textContent = "Internal Server Error | 500";
        }


    }
}


//function to get languages
function speak (lang){
    let language = 'They speak '
    if(lang.languages.length === 2){
        return language + `${lang.languages[0].name} and ${lang.languages[1].name}`
    }
    else if(lang.languages.length === 3){
        return language + `${lang.languages[0].name} and ${lang.languages[1].name} and ${lang.languages[2].name}`
    }
    else{
        return language + `${lang.languages[0].name}`
    }
}

//function to get valuta and capital
function valutaCountry(val) {
    let cur = `The capital is ${val.capital} and you can pay with `
    if (val.currencies.length === 2) {
        return cur + `${val.currencies[0].name} and ${val.currencies[1].name}`

    } else {
        return cur + `${val.currencies[0].name}`
    }

}


function allCountrys() {
    const countInfo = document.getElementById('country-name')
    dataTwo(countInfo.value)



}

const btn = document.getElementById('button');
//Event listener
btn.addEventListener('click', allCountrys)

