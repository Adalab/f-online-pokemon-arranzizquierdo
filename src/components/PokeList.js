import React, { Component } from 'react';
import PokeItem from './PokeItem';
import './PokeList.scss';

import { Link } from 'react-router-dom';

class PokeList extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const { pokemons, evolutions } = this.props;
        console.log('evolutions', evolutions)
        return (
            <ul className="list">
                {pokemons.map(pokemon => {
                    return (
                        <li
                            className="item-list" key={pokemon.id}>
                            <Link to={`/${pokemon.id}`} >
                                <PokeItem 
                                    pokemon={pokemon}
                                    evolution={evolutions[pokemon.id-1]}></PokeItem>
                            </Link>
                        </li>

                    )
                })}
            </ul>
        );
    }
}

export default PokeList;