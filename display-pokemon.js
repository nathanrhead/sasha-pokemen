export function displayOnePoke(event) {
  let httpRequest;
  let url;
  if (event) {
    url = event.path[1].attributes.value.nodeValue;
  
    httpRequest = new XMLHttpRequest();
    if (!httpRequest) {
      alert('Giving up :( Cannot create an XMLHTTP instance');
      return false;
    }

    httpRequest.onreadystatechange = renderContents;
    httpRequest.open('GET', url);
    httpRequest.send();
  }

  function renderContents() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
        const response = JSON.parse(httpRequest.responseText);
        if (response) {
          console.log({response});

          // Remove the list of pokemon.
          const pokeList = document.getElementById('get-poke-list');
          if (pokeList) pokeList.remove();

          const parent = document.querySelector('main');
          const section = document.createElement('section');
          section.setAttribute('id', 'show-pokemon');
          
          const form = document.createElement('form');
          form.setAttribute('method', 'POST');
          form.setAttribute('id', 'add-poke');
          form.onsubmit = savePoke;
          section.appendChild(form);

          const name = document.createElement('h2');
          name.innerText = response.name.toUpperCase();
          form.appendChild(name);
          
          const hp = document.createElement('h3');
          hp.innerText = `HP = ${response.stats[0].base_stat}`;
          form.appendChild(hp);
          
          const sprite = document.createElement('img');
          sprite.setAttribute('src', response.sprites.front_default);
          form.appendChild(sprite);
          
          const button = document.createElement('button');
          button.setAttribute('type', 'submit');
          button.innerText = 'Add this Pokè';
          form.appendChild(button);
          parent.appendChild(section);
        }
      }
    }
  }
};


function savePoke(event) {
  event.preventDefault();
  console.log({event});
}
