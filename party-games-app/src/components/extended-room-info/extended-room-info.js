import React, {Component} from 'react';

class ExtendedInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            roomId: `-${this.props.match.params.id}`
        }
    }

    render() {
        return (
            <div>Info</div>
        )
    }
}

export default ExtendedInfo;