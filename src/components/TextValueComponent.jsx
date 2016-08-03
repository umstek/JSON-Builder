import React from "react";
import BaseComponent from "./BaseComponent.jsx";

class TextValueComponent extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {value: props.value};
        this._handleChange = this._handleChange.bind(this);
    }

    render() {
        return <span className="textValueComponent">
            <label>
                <input className="input-field" type="text" value={this.state.value} onChange={this._handleChange}/>
            </label>
        </span>;
    }

    _handleChange(e) {
        let value = e.target.value;
        this.setState({value});
        this.props.feedback({value});
    }
}
TextValueComponent.propTypes = {value: React.PropTypes.string, feedback: React.PropTypes.func};
TextValueComponent.defaultProps = {value: 0, feedback: (obj) => console.log(obj.value)};

export default TextValueComponent;
