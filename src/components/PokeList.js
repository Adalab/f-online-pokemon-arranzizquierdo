import React, { Component } from 'react';
import PokeItem from './PokeItem';

class PokeList extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const { pokemons }=this.props;
        return (
                <ul className="list">
                    {pokemons.map(pokemon => {
                        return (
                            <li className="item-list" key={pokemon.id}>
                                <PokeItem pokemon={pokemon}></PokeItem>
                            </li>
                        )
                    })}
                </ul>
        );
    }
}

export default PokeList;