'use strict';

import { displayOnePoke } from './display-pokemon.js';

// Get Pokemen.
(function getPokemon(event) {
  let httpRequest;
  let url = 'https://pokeapi.co/api/v2/pokemon';
  let page = sessionStorage.getItem('page') ? sessionStorage.getItem('page') : 1;
  if (event && event.type === 'click') {
    url = event.path[0].attributes.value.value;
    if (event.target.outerText.includes('Prev')) page--;
    else if (event.target.outerText.includes('Next')) page++;
  } else page = 1;
  sessionStorage.setItem('page', page);

  // Instantiate the html request.
  httpRequest = new XMLHttpRequest();

  if (!httpRequest) {
    alert('Giving up :( Cannot create an XMLHTTP instance');
    return false;
  }
  httpRequest.onreadystatechange = renderContents;
  httpRequest.open('GET', url);
  httpRequest.send();

  function renderContents() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
        const response = JSON.parse(httpRequest.responseText);
        if (document.querySelector('#get-poke-list')) 
          document.querySelector('#get-poke-list').remove(); 

        if (response) {
          const parent = document.querySelector('main');
          const section = document.createElement('section');
          section.setAttribute('id', 'get-poke-list');
          const count = document.createElement('h2');
          count.innerText = `Count: ${(page * 20) - 19} to ${page * 20} / ${response.count}`;
          section.appendChild(count);
          response.results.map(poke => {
            const anchor = document.createElement('a');
            const h3 = document.createElement('h3');
            anchor.setAttribute('href', '#');
            anchor.setAttribute('value', poke.url);
            anchor.addEventListener('click', displayOnePoke);
            h3.innerText = poke.name.toUpperCase();
            anchor.appendChild(h3);
            section.appendChild(anchor);
            parent.appendChild(section);
          });

          // Add prev & next links to view more pokemon.
          if (response.previous) {
            const prev = document.createElement('a');
            prev.innerText = '<<Prev';
            prev.setAttribute('href', '#');
            prev.setAttribute('value', response.previous);
            prev.addEventListener('click', getPokemon);
            section.appendChild(prev);
          }
          if (response.next) {
            const next = document.createElement('a');
            next.innerText = 'Next>>';
            next.setAttribute('href', '#');
            next.setAttribute('value', response.next);
            next.addEventListener('click', getPokemon);
            section.appendChild(next);
          }
        }
      } else {
        alert('There was a problem with the request.');
      }
    }
  }
})();
