import React, { Component, Fragment } from 'react';
import './PokeItem.scss';

class PokeItem extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const { pokemon, evolution } = this.props;
        console.log('item', evolution)
        if (evolution === undefined) {
            return <p>Cargando</p>
        } else {
            return (
                <Fragment>
                    <div className="container-image">
                        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                    </div>
                    <small>ID/ {pokemon.id}</small>
                    <h2 className="title-item">{pokemon.name}</h2>

                    <ul className="list-types">
                        {pokemon.types.map((item, id) => {
                            return (
                                <li
                                    key={id}
                                    className="item-types">{item.type.name}</li>
                            )
                        })}
                    </ul>

                    {evolution !== null && (
                        <p>Evoluciona de: {evolution.name}</p>
                    )}
                </Fragment>
            )
        }

    }
}

export default PokeItem;

