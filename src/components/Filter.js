import React, { Component } from 'react';
import './Filter.scss';

class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() {
        const { getNameInput }=this.props; 
        return ( 
            <input 
                type="text" 
                placeholder="name"
                className="filter" 
                onChange={getNameInput}/>
         );
    }
}
 
export default Filter;