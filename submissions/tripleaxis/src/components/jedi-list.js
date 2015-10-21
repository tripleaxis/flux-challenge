
import React from 'react';
import ListItem from './list-item';

export default class JediList extends React.Component {

    constructor(props) {
        super(props);
    }

    createListItem(data, idx) {
        return <ListItem key={idx} data={data} />;
    }

    render() {
        return <ul className="css-slots">
            {this.props.items.map(this.createListItem)}
        </ul>
    }

    toString() {
        return 'JediList';
    }

}
