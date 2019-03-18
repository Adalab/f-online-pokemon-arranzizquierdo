import React, { Component } from 'react';

class PokeItem extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const { pokemon }=this.props
        return (
            <div className="item">
                <img src={pokemon.sprites.back_default} alt={pokemon.name} />
                <h2>{pokemon.name}</h2>
                <h3>ID: {pokemon.id}</h3>
                <ul>
                    {pokemon.types.map((item, id) => {
                        return (
                            <li key={id}>{item.type.name}</li>
                        )
                    })}
                </ul>


            </div>
        );
    }
}

export default PokeItem;