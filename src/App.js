import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import PagePokemons from './components/PagePokemons';
import './App.scss';
import { fetchReason } from './service/fetchReason'
import PokeDetails from './components/PokeDetails';

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
    this.setState({
      namePokemon: e.currentTarget.value
    });
  }

  filterName() {
    const { pokemons, namePokemon } = this.state;

    const filteredPokemons = pokemons.filter(pokemon => {
      return pokemon.name.includes(namePokemon.toLowerCase());
    });
    
    return filteredPokemons;
  }

  getSaveData() {
    const pokemonsData = localStorage.getItem('pokemons');
    if (pokemonsData !== null) {
      return JSON.parse(pokemonsData);
    } else {
      this.componentDidMount()
    }
  }

  saveData(data) {
    localStorage.setItem('pokemons', JSON.stringify(data));
  }

  componentDidMount() {
    fetchReason().then(data => {
      const pokeURIS = data.results.map(pokemon => {
        return fetch(pokemon.url)
          .then(response => response.json())
      });
      Promise.all(pokeURIS)
        .then(pokemonsInfo => {
          this.setState({
            pokemons: pokemonsInfo
          })
          this.saveData(pokemonsInfo)
        })
    })
  }

  render() {
    const pokemonsFiltered = this.filterName();
    const { pokemons } = this.state;
    return (
      <div className="App">
      <Switch>
        <Route 
          exact
          path='/'
          render= {() =>
            <PagePokemons 
              pokemons={pokemonsFiltered} 
              getNameInput={this.getNameInput}
            />
          }
        />
        <Route 
          path='/:id'
          render={props =>
            <PokeDetails 
              match={props.match}
              pokemons={pokemons}/>
          }
        />
      </Switch>
        
      </div>
    );
  }
}

export default App;
