import React from 'react';
import axios from 'axios';
import DisplayPokemon from './display-pokemon';

export default class GetPokemen extends React.Component {
  state = {
    pokemen: [],
  };

  componentDidMount() {
    const url = 'https://pokeapi.co/api/v2/pokemon/';
    axios.get(url)
      .then(res => {
      const pokemen = res.data.results;
      this.setState({ pokemen });
    })
    .catch(err => {
      console.error('An error occurred in get-pokemon.js: ', err);
    })
  }

  handleClick(url) {


    return (
      <DisplayPokemon 
        
      />
    )
  }

  render() {
    return (
      <ul>
        {this.state.pokemen.map(pokemon => (
          <li key={pokemon.name}>
            <a href={pokemon.url} onClick={() => this.handleClick(pokemon.url)}>{pokemon.name}</a>
          </li>
        ))}
      </ul>
    );
  }
}
