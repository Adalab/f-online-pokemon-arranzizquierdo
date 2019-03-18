import React, { Component } from 'react';
import PagePokemons from './components/PagePokemons';

import './App.scss';
import {fetchReason} from './service/fetchReason'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      pokemons: [],
      namePokemon: ""
    }
    this.getNameInput = this.getNameInput.bind(this);
  }

  getNameInput(e) {
    const pokeName = e.currentTarget.value;
    this.setState ({
      namePokemon: pokeName
    });
  }

  filterName(){
    const filteredPokemons = this.state.pokemons.filter(pokemon => {
      if(pokemon.name.includes(this.state.namePokemon)){
        return true;
      } else {
        return false;
      }
    });
    return filteredPokemons;
  }

  // getSaveData() {
  //   const pokemonsData = localStorage.getItem('pokemons');
  //   if ( pokemonsData !== null) {
  //     return JSON.parse(pokemonsData);
  //   } else {
  //     this.componentDidMount()
  //   }
  // }

  // saveData(data) {
  //   localStorage.setItem('pokemons', JSON.stringify(data));
  // }

  componentDidMount() {
    fetchReason().then(data => {
      
      const pokeURIS = data.results.map(pokemon => {
        return fetch(pokemon.url)
          .then(response => response.json())
      });
      Promise.all(pokeURIS)
        .then(pokemonsInfo => {
          this.setState ({
            pokemons: pokemonsInfo
          })
          // this.saveData(pokemonsInfo)
        })
    })
  }

  render() {
    const { pokemonsFiltered } = this.filterName();
    console.log(pokemonsFiltered);
    const { pokemons }=this.state;
    return (
      <div className="App">
        <PagePokemons pokemons={pokemons} getNameInput={this.getNameInput}></PagePokemons>
      </div>
    );
  }
}

export default App;
