const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

//elements
const mainContainer = document.getElementById("main-container");
const trainerCardHTML = `<div class="card" data-id="1"><p id="card-name">name here</p>
                          <button data-trainer-id="1">Add Pokemon</button>
                          <ul id="pokemon-roster-ul">
                          </ul>
                        </div>`

document.addEventListener("DOMContentLoaded", function(e){
  fetch(TRAINERS_URL)
  .then(response => response.json())
  .then(json => handleTrainers(json))

})

function handleTrainers(trainers){
  trainers.forEach(function(individualTrainer){
    const nameElement = document.getElementById("card-name");
    let trainerName = individualTrainer.name;
    let pokemonRoster = individualTrainer.pokemons;
    mainContainer.append(trainerCardHTML)
    generateTrainerCard(trainerName, pokemonRoster)
  })
}




const pokemonList = (trainerId) => {
  let submissionBody = {"trainer_id": trainerId}
  return fetch(POKEMONS_URL, {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(submissionBody)
  });
//.then(response => response.json())
}

const releasePokemon = (pokemonId) => {
  const urlToDelete = POKEMONS_URL + "/" + pokemonId;
  return fetch(urlToDelete, {
    method: "DELETE",
  })
//  .then(response => response.json());
}




function generateTrainerCard (trainerName, pokemonRoster) {

  let rosterUl = document.getElementById("pokemon-roster-ul");
  pokemonRoster.forEach(function(individualPokemon){
    let li = document.createElement("li")
    li.innerText = `${individualPokemon.nickname} (${individualPokemon.species}) <button class="release" data-pokemon-id="140">Release</button>`
    debugger;
    //rosterUl.append(li);
  });
};

//
// <li>Jacey (Kakuna) <button class="release" data-pokemon-id="140">Release</button></li>
// <li>Zachariah (Ditto) <button class="release" data-pokemon-id="141">Release</button></li>
// <li>Mittie (Farfetch'd) <button class="release" data-pokemon-id="149">Release</button></li>
// <li>Rosetta (Eevee) <button class="release" data-pokemon-id="150">Release</button></li>
// <li>Rod (Beedrill) <button class="release" data-pokemon-id="151">Release</button></li>
