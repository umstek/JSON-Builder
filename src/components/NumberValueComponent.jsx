import React from "react";
import BaseComponent from "./BaseComponent.jsx";

class NumberValueComponent extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {value: props.value};
        this._handleChange = this._handleChange.bind(this);
    }

    render() {
        return <span className="numberValueComponent">
            <label>
                <input className="input-field" type="number" value={this.state.value} onChange={this._handleChange}/>
            </label>
        </span>;
    }

    _handleChange(e) {
        let value = e.target.value;
        this.setState({value});
        this.props.feedback({value});
    }
}
NumberValueComponent.propTypes = {value: React.PropTypes.number, feedback: React.PropTypes.func};
NumberValueComponent.defaultProps = {value: 0, feedback: (obj) => console.log(obj.value)};

export default NumberValueComponent;
