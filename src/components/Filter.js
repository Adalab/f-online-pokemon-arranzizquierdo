import React, { Component } from 'react';

class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() {
        const { getNameInput }=this.props; 
        return ( 
            <input type="text" placeholder="name" onChange={getNameInput}/>
         );
    }
}
 
export default Filter;