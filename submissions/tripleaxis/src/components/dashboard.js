import React from 'react';

import JediStore from '../stores/jedi-store';
import AppStore from '../stores/app-store';
import JediService from '../services/jedi-service';
import {jediStoreChanged, appStoreChanged} from '../actions/notifications';
import {scrollUp, scrollDown} from '../actions/actions';
import {LIST_LENGTH, ALERT_COLOUR} from '../config';
import _ from 'underscore';

import PlanetIndicator from './planet-indicator';
import JediList from './jedi-list';
import ListButton from './list-button';

export default class Dashboard extends React.Component {

    constructor(props) {
        super(props);

        _.bindAll(this,
            'onJediStoreChanged','onAppStoreChanged',
            'onButtonUpClick', 'onButtonDownClick'
        );

        this.state = {
            planet: JediStore.getPlanet(),
            jedis: JediStore.getJediList(),
            systemActive: AppStore.isActive()
        };
    }

    componentWillMount() {
        jediStoreChanged.add(this.onJediStoreChanged);
        appStoreChanged.add(this.onAppStoreChanged);
    }

    componentWillUnmount() {
        jediStoreChanged.remove(this.onJediStoreChanged);
        appStoreChanged.remove(this.onAppStoreChanged);
    }

    onJediStoreChanged() {
        this.setState({
            planet: JediStore.getPlanet(),
            jedis: JediStore.getJediList()
        });
    }

    onAppStoreChanged() {
        this.setState({
            systemActive: AppStore.isActive() && !AppStore.isLoading()
        });
    }

    onButtonUpClick() {
        scrollUp.dispatch();
    }
    onButtonDownClick() {
        scrollDown.dispatch();
    }

    render() {

        var upEnabled = this.state.systemActive && !!this.state.jedis.first && !!this.state.jedis.first.master.id;
        var downEnabled = this.state.systemActive && !!this.state.jedis.last && !!this.state.jedis.last.apprentice.id;

        return <div className="css-root">
            <PlanetIndicator name={this.state.planet.name}/>
            <style>{` .alert { color: ${ALERT_COLOUR}; } `}</style>
            <section className="css-scrollable-list">
                <JediList items={this.state.jedis}/>

                <div className="css-scroll-buttons">
                    <ListButton type="up" click={this.onButtonUpClick} enabled={upEnabled}></ListButton>
                    <ListButton type="down" click={this.onButtonDownClick} enabled={downEnabled}></ListButton>
                </div>
            </section>
        </div>;
    }

    toString() {
        return 'Dashboard';
    }
};
