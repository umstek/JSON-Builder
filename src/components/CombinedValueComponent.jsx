import React from "react";
import BaseComponent from "./BaseComponent.jsx";
import NullValueComponent from "./NullValueComponent.jsx";
import BooleanValueComponent from "./BooleanValueComponent.jsx";
import NumberValueComponent from "./NumberValueComponent.jsx";
import TextValueComponent from "./TextValueComponent.jsx";

class CombinedValueComponent extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {value: props.value, type: props.type};
        this._handleComponentClick = this._handleComponentClick.bind(this);
        this._handleComponentValueChange = this._handleComponentValueChange.bind(this);
    }

    render() {
        return <div className="combinedValueComponent">
            <ul className="collapsible" data-collapsible="accordion">

                <div className="container"><h5>Atom Types</h5></div>

                <li name="null" onClick={this._handleComponentClick}>
                    <div className={"collapsible-header" + (this.state.type == "null" ? " active" : "")}>
                        <i className="material-icons">not_interested</i>Null
                    </div>
                    <div className="collapsible-body">
                        <p>
                            <NullValueComponent />
                        </p>
                    </div>
                </li>

                <li name="boolean" onClick={this._handleComponentClick}>
                    <div className={"collapsible-header"+ (this.state.type == "boolean" ? " active" : "")}>
                        <i className="material-icons">thumbs_up_down</i>Boolean
                    </div>
                    <div className="collapsible-body">
                        <p>
                            <BooleanValueComponent
                                value={this.state.type == "boolean" ? this.state.value : false}
                                feedback={this._handleComponentValueChange}/>
                        </p>
                    </div>
                </li>

                <li name="number" onClick={this._handleComponentClick}>
                    <div className={"collapsible-header" + (this.state.type == "number" ? " active" : "")}>
                        <i className="material-icons">repeat_one</i>Number
                    </div>
                    <div className="collapsible-body">
                        <p>
                            <NumberValueComponent
                                value={this.state.type == "number" ? this.state.value : 0}
                                feedback={this._handleComponentValueChange}/>
                        </p>
                    </div>
                </li>

                <li name="text" onClick={this._handleComponentClick}>
                    <div className={"collapsible-header" + (this.state.type == "text" ? " active" : "")}>
                        <i className="material-icons">spellcheck</i>Text
                    </div>
                    <div className="collapsible-body">
                        <p>
                            <TextValueComponent
                                value={this.state.type == "text" ? this.state.value : ""}
                                feedback={this._handleComponentValueChange}/>
                        </p>
                    </div>
                </li>

                <div className="container"><h5>Collection Types</h5></div>

                <li name="array" onClick={this._handleComponentClick}>
                    <div className={"collapsible-header" + (this.state.type == "array" ? " active" : "")}>
                        <i className="material-icons">reorder</i>Array
                    </div>
                    <div className="collapsible-body">
                        <p>
                            This will add an empty array
                        </p>
                    </div>
                </li>

                <li name="object" onClick={this._handleComponentClick}>
                    <div className={"collapsible-header" + (this.state.type == "object" ? " active" : "")}>
                        <i className="material-icons">toc</i>Object
                    </div>
                    <div className="collapsible-body">
                        <p>
                            This will add an empty object
                        </p>
                    </div>
                </li>

            </ul>

            <a className="btn waves-light waves-effect">Okay</a>
            <a className="btn waves-light waves-effect">Cancel</a>
        </div>;
    }

    _handleComponentClick(evt) { // synthetic event, -undefined, -event
        // evt.preventDefault();
        // evt.persist();
        // console.log(evt);

        let elem = evt.target;

        if (elem.tagName != "I" && !(elem.tagName == "DIV" && elem.classList.contains('collapsible-header'))) {
            evt.stopPropagation();
            evt.preventDefault();
            return;
        } // Accept only header clicks (including icon).

        do { // Find the list item, which has the name attribute containing type.
            elem = elem.parentElement;
        } while (elem.tagName != "LI");

        let name = elem.attributes.getNamedItem('name').value;

        if (name == this.state.type) {
            elem.childNodes[0].classList.add("active");
        } else {
            elem.childNodes[0].classList.toggle("active");
        }

        console.log(this.state.value);
        if (!this.state.value) { // A value that JavaScript accepts as false FIXME add more accurate logic
            console.log('f');
            switch (name) {
                case "null":
                    this.setState({type: "null", value: null});
                    break;
                case "boolean":
                    this.setState({type: "boolean", value: false});
                    break;
                case "number":
                    this.setState({type: "number", value: 0});
                    break;
                case "text":
                    this.setState({type: "text", value: ""});
                    break;
                case "array":
                    this.setState({type: "array", value: []});
                    break;
                case "object":
                    this.setState({type: "object", value: {}});
                    break;
                default:
                    break;
            }
        } else {
            console.log('t');
            switch (name) {
                case "null":
                    this.setState({type: "null", value: null});
                    break;
                case "boolean":
                    this.setState({type: "boolean", value: true});
                    break;
                case "number":
                    this.setState({
                        type: "number",
                        value: Number.isFinite(this.state.value) ? Number(this.state.value) : 0
                    });
                    break;
                case "text":
                    this.setState({type: "text", value: String(this.state.value)});
                    break;
                case "array":
                    this.setState({type: "array", value: []});
                    // TODO Content preserving array to string back and forth conversion.
                    break;
                case "object":
                    // TODO Object (de)serialization.
                    this.setState({type: "object", value: {}});
                    break;
                default:
                    break;
            }
        }

        console.log(this.state);
    }

    _handleComponentValueChange(newObject) {
        this.setState(Object.assign(this.state, {value: newObject.value}));
        console.log(this.state);
    }
}
CombinedValueComponent.propTypes = {
    value: React.PropTypes.oneOfType([
        React.PropTypes.bool,
        React.PropTypes.number,
        React.PropTypes.string,
        React.PropTypes.array,
        React.PropTypes.object // or null
    ]),
    type: React.PropTypes.string
};
CombinedValueComponent.defaultProps = {value: null, type: "null"};

export default CombinedValueComponent;
