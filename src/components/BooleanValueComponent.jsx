import React from "react";
import BaseComponent from "./BaseComponent.jsx";

class BooleanValueComponent extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {value: props.value};
        this._handleChange = this._handleChange.bind(this);
    }

    render() {
        return <span className="switch booleanValueComponent" onChange={this._handleChange}>
            <label>
                False
                <input type="checkbox" value={this.state.value}/>
                <span className="lever"/>
                True
            </label>
        </span>;
    }

    _handleChange(evt) {
        let value = evt.target.value == "on"; // Convert 'on' and 'off' to true and false.
        this.setState({value});
        // Feedback function enables propagation of data to parent components.
        this.props.feedback({value});
    }
}
BooleanValueComponent.propTypes = {value: React.PropTypes.bool, feedback: React.PropTypes.func};
BooleanValueComponent.defaultProps = {value: false, feedback: (obj) => console.log(obj.value)};

export default BooleanValueComponent;
