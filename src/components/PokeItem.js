import React, { Component, Fragment } from 'react';
import './PokeItem.scss';

class PokeItem extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const { pokemon }=this.props
        return (
            <Fragment>
                <div className="container-image">
                <img src={pokemon.sprites.front_default} alt={pokemon.name} /> 
                </div>
                
                <h2 className="title-item">{pokemon.name}</h2>
                <p>ID: {pokemon.id}</p>
                <ul className="list-types">
                    {pokemon.types.map((item, id) => {
                        return (
                            <li 
                                key={id}
                                className="item-types">{item.type.name}</li>
                        )
                    })}
                </ul>
            </Fragment>
        );
    }
}

export default PokeItem;

