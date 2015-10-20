import React from 'react';
import Store from '../stores/jedi-store';
import JediService from '../core/jedi-service';
import * as Signals from '../actions/signals';
import {LIST_LENGTH} from '../core/config';

import PlanetIndicator from './planet-indicator';
import JediList from './jedi-list';

export default class Dashboard extends React.Component {

    constructor(props) {
        super(props);

        this.onStoreChanged = this.onStoreChanged.bind(this);
        this.validateJediList = this.validateJediList.bind(this);
        this.state = Store.getState();
    }

    componentWillMount() {
        Signals.storeChanged.add(this.onStoreChanged);
    }

    componentWillUnmount() {
        Signals.storeChanged.remove(this.onStoreChanged);
    }

    validateJediList() {
        console.log(this.state.jedis);
        var arr = this.state.jedis;
        for(let i=0; i<arr.length; i++) {
            if(!arr[i]) {
                if(!!arr[i-1]) {
                    return JediService.fetch(
                        arr[i-1].apprentice.id,
                        i
                    );
                }
                if(!!arr[i+1]) {
                    return JediService.fetch(
                        arr[i+1].master.id,
                        i
                    );
                }

                console.log('Orphaned item - no idea what to do...');
            }
        }
    }

    onStoreChanged() {
        this.setState(Store.getState(), this.validateJediList);
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
