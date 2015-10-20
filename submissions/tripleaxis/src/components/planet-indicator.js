
import React from 'react';

export default class PlanetIndicator extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return <h1 className="css-planet-monitor">Obi-Wan currently on {this.props.name}</h1>
    }

    toString() {
        return 'PlanetIndicator';
    }
}
