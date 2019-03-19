import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import './PokeDetails.scss';

class PokeDetails extends Component {
    render() {
        const { pokemons, match } = this.props;
        const id = match.params.id -1;

        if (pokemons.length === 0) {
            return <p>cargando</p>
        } else {
            const pokemonSelected = pokemons[id];
            return (
                <Fragment>
                <Link to='/'>
                    <span className="return">⇠</span>
                </Link>
                <div className="container">
                    <div className="main_info">
                        <div className="container_image">
                            <img src={pokemonSelected.sprites.front_default} alt={pokemonSelected.name} />
                        </div>
                        <h2>{pokemonSelected.name}</h2>
                    </div>
                    <div className="scundary_info">
                        <ul>
                            <li>{pokemonSelected.height}</li>
                            <li>
                                Abilidades:
                                <ul>
                                    {pokemonSelected.abilities.map(ability => {
                                        return (
                                            <li>
                                                {ability.name}
                                            </li>
                                        )
                                    })}
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
                </Fragment>
        )
        }

    }
}

export default PokeDetails;