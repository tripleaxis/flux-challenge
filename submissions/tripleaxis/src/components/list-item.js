
import React from 'react';

const SPACE = '\u00A0';

export default class ListItem extends React.Component {

    constructor(props) {
        super(props);
    }

    getName() {
        return this.props.data ?
            this.props.data.name : SPACE;
    }
    getHomeworld() {
        return this.props.data ?
            this.props.data.homeworld.name : SPACE;
    }
    getStyles() {
        var classes = ['css-slot'];
        if(this.props.data && this.props.data.alert) {
            classes.push('alert');
        }
        return classes.join(' ');
    }

    render() {
        return <li className={this.getStyles()}>
            <h3>{this.getName()}</h3>
            <h6>Homeworld: {this.getHomeworld()}</h6>
        </li>;
    }

    toString() {
        return 'ListItem';
    }

}
