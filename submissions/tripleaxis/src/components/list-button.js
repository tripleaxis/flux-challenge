
import React from 'react';
import _ from 'underscore';

export default class ListButton extends React.Component {

    constructor(props) {
        super(props);

        _.bindAll(this, 'clickHandler');
    }

    getStyles() {
        var classes = ['css-button-' + this.props.type];
        if(!this.props.enabled) classes.push('css-button-disabled');

        return classes.join(' ');
    }

    clickHandler(evt) {
        if(!this.props.enabled) {
            evt.preventDefault()
            return;
        }
        this.props.click();
    }

    render() {
        return <button onClick={this.clickHandler} className={this.getStyles()}></button>;
    }

    toString() {
        return 'ListButton';
    }
}
