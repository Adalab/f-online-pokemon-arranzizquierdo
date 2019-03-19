import React, { Component } from 'react';
import './PagePokemons.scss';
import Filter from './Filter';
import PokeList from './PokeList';

class PagePokemons extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const { pokemons, getNameInput }=this.props;
        return ( 
           <div className="main">
           <h1 className="main-title">Search your Pokemons</h1>
           <Filter getNameInput={getNameInput}></Filter>
           <PokeList pokemons={pokemons}></PokeList>
           </div> 
         );
    }
}
 
export default PagePokemons;