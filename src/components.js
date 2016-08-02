// import React from 'react';
// import ReactDOM from 'react-dom';

class BaseComponent extends React.Component { // Base Class for ease. :)
    constructor(props) {
        super(props);
    }
}


class NullValueComponent extends BaseComponent {
    constructor(props) {
        super(props);
    }

    //noinspection JSMethodCanBeStatic
    render() {
        return <span className="nullValueComponent">
            <i>null</i>
        </span>;
    }
}


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
        </span>
    }

    _handleChange(e) {
        let value = e.target.value;
        this.setState({value});
        this.props.feedback({value});
    }
}
NumberValueComponent.propTypes = {value: React.PropTypes.number, feedback: React.PropTypes.func};
NumberValueComponent.defaultProps = {value: 0, feedback: (obj) => console.log(obj.value)};


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
        </span>
    }

    _handleChange(e) {
        let value = e.target.value;
        this.setState({value});
        this.props.feedback({value});
    }
}
TextValueComponent.propTypes = {value: React.PropTypes.string, feedback: React.PropTypes.func};
TextValueComponent.defaultProps = {value: 0, feedback: (obj) => console.log(obj.value)};


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
        </div>
    }

    _handleComponentClick(evt) { // synthetic event, -undefined, -event
        // evt.persist();
        // console.log(evt);

        let elem = evt.target;
        do { // Find the list item, which has the name attribute containing type.
            elem = elem.parentElement;
        } while (elem.tagName != "LI");

        let name = elem.attributes.getNamedItem('name').value;

        if (name == this.state.type) {
            elem.childNodes[0].classList.add("active");
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
            console.log(this.state);
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
            console.log(this.state);
        }
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


class BreadcrumbComponent extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {path: props.path};
        this._handleNavigate = this._handleNavigate.bind(this);
    }

    render() {
        var items = [];
        this.state.path.forEach(item => items.push(
            <a href="javascript:(0)" name={items.length} onClick={this._handleNavigate} className="breadcrumb"
               key={items.length}>{item}</a>
        ));
        return <nav>
            <div className="nav-wrapper">
                <div className="col s12">
                    {items}
                </div>
            </div>
        </nav>
    }

    _handleNavigate(e) {
        var newPath = [];
        for (var i = 0; i < this.state.path.length; i++) {
            newPath.push(this.state.path[i]);
            if (i == e.target.name) {
                break;
            }
        }
        this.setState({path: newPath});
        props.feedback({newPath});
    }
}
BreadcrumbComponent.propTypes = {path: React.PropTypes.array, feedback: React.PropTypes.func};
BreadcrumbComponent.defaultProps = {path: ['[root]'], feedback: (obj) => console.log(obj.value)};


class TreeComponent extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {tree: props.tree}
    }

    render() {
        var flatten = function (key, item) {
            if (item == null) {
                return <li className="collection-item" key={key}>null</li>
            } else if (typeof item == 'boolean') {
                return <li className="collection-item" key={key}><a href="javascript:0">{key}</a>: {item}</li>
            } else if (typeof item == 'number') {
                return <li className="collection-item" key={key}><a href="javascript:0">{key}</a>: {item}</li>
            } else if (typeof item == 'string') {
                return <li className="collection-item" key={key}><a href="javascript:0">{key}</a>: {item}</li>
            } else if (item.isArray) {
                var elements = [];
                for (var i = 0; i < item.length; i++) {
                    elements.push(flatten(i, item[i]));
                }
                return <li className="collection-item" key={key}>
                    <a href="javascript:0">{key}</a>:
                    <ol className="collection">{elements}</ol>
                </li>;
            } else {
                var elementsO = [];
                for (var j in item) {
                    if (item.hasOwnProperty(j)) {
                        elementsO.push(flatten(j, item[j]));
                    }
                }
                return <li className="collection-item" key={key}>
                    <a href="javascript:0">{key}</a>:
                    <ul className="collection">{elementsO}</ul>
                </li>;
            }
        };

        return <ul className="collection">{flatten("[root]", this.state.tree)}</ul>
    }

}


class FullComponent extends BaseComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>
            <BreadcrumbComponent path={this.props.path}/>
            <TreeComponent tree={this.props.data}/>
            <CombinedValueComponent type="null" value={null}/>
        </div>;
    }
}
