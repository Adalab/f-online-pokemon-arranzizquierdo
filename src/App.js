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
      evolutionChain: [],
      pokemonInfoEvolution: [],
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
    fetchReason()
      .then(data => {
        const pokeUri = data.results.map(pokemon => {
          return fetch(pokemon.url)
            .then(response => response.json())
        });

        Promise.all(pokeUri)
          .then(pokemonsInfo => {
            this.setState({
              pokemons: pokemonsInfo
            })
            this.saveData(pokemonsInfo)

            const speciesUri = this.state.pokemons.map(item => {
              return fetch(item.species.url)
                .then(response => response.json())
            });

            Promise.all(speciesUri)
              .then(newInfo => {
                const evolvesFrom = []
                newInfo.map(info => {
                  return evolvesFrom.push(info.evolves_from_species)
                })

                const evolutionChainUri = newInfo.map(item => {
                  return fetch(item.evolution_chain.url)
                    .then(response => response.json())
                });

                Promise.all(evolutionChainUri)
                  .then(chains => {
                    this.setState({
                      evolutionChain: chains
                    })
                  })

                  this.setState({
                    pokemonInfoEvolution: evolvesFrom,
                    loading: false
                  })
              })
          })
      })
  }

  render() {
    const pokemonsFiltered = this.filterName();
    const { pokemons, pokemonInfoEvolution, evolutionChain } = this.state;

    return (
      <div className="App">
        <Switch>
          <Route
            exact
            path='/'
            render={() =>
              <PagePokemons
                pokemons={pokemonsFiltered}
                getNameInput={this.getNameInput}
                evolutions={pokemonInfoEvolution}
              />
            }
          />
          <Route
            path='/:id'
            render={props =>
              <PokeDetails
                match={props.match}
                pokemons={pokemons} />
            }
          />
        </Switch>

      </div>
    );
  }
}

export default App;
