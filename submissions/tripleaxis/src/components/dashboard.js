import React from 'react';
import Store from '../stores/jedi-store';
import JediService from '../core/jedi-service';
import {Notifications} from '../actions/signals';
import {LIST_LENGTH} from '../core/config';
import _ from 'underscore';

import PlanetIndicator from './planet-indicator';
import JediList from './jedi-list';

export default class Dashboard extends React.Component {

    constructor(props) {
        super(props);

        _.bindAll(this, 'onStoreChanged');
        this.state = Store.getState();
    }

    componentWillMount() {
        Notifications.storeChanged.add(this.onStoreChanged);
    }

    componentWillUnmount() {
        Notifications.storeChanged.remove(this.onStoreChanged);
    }

    onStoreChanged() {
        this.setState(Store.getState());
    }

    render() {

        return <div className="css-root">
            <PlanetIndicator name={this.state.planet.name}/>
            <section className="css-scrollable-list">
                <JediList items={this.state.jedis}/>

                <div className="css-scroll-buttons">
                    <button className="css-button-up"></button>
                    <button className="css-button-down"></button>
                </div>
            </section>
        </div>;

    }

    toString() {
        return 'Dashboard';
    }
};
