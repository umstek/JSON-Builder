/**
 * Created by Wickramaranga on 7/4/2016.
 */

// import * as React from "react";

class BaseComponent extends React.Component { // Base Class for ease. :)
    _bind(...methods) {
        methods.forEach((method) => this[method] = this[method].bind(this));
    }
}


class NullValueComponent extends BaseComponent {
    constructor() {
        super();
        this._bind(); // Not needed.
    }

    //noinspection JSMethodCanBeStatic
    render() {
        return <span className="nullValueValueComponent">
            <i>null</i>
        </span>;
    }
}


class BooleanValueComponent extends BaseComponent {
    constructor() {
        super();
        this._bind('_handleChange');
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

    getInitialState() {
        // Initial state is set by properties.
        return {value: this.props.value};
    }

    _handleChange(e) {
        this.setState({value: e.target.value});
        // Feedback function enables propagation of data to upper layers.
        this.props._feedback({value: this.state.value});
    }
}


class NumberValueComponent extends BaseComponent {
    constructor() {
        super();
        this._bind('_handleChange');
    }

    render() {
        return <span className="numberValueComponent">
            <label>
                <input className="input-field" type="number" value={this.state.value}
                       onChange={this._handleChange}/>
            </label>
        </span>
    }

    getInitialState() {
        return {value: this.props.value};
    }

    _handleChange(e) {
        this.setState({value: e.target.value});
        this.props._feedback({value: this.state.value});
    }
}


class TextValueComponent extends BaseComponent {
    constructor() {
        super();
        this._bind('_handleChange')
    }

    render() {
        return <span className="textValueComponent">
            <label>
                <input className="input-field" type="text" value={this.state.value} onChange={this._handleChange}/>
            </label>
        </span>
    }

    getInitialState() {
        return {value: this.props.value};
    }

    _handleChange(e) {
        this.setState({value: e.target.value});
        this.props._feedback({value: this.state.value});
    }
}


class CombinedValueComponent extends BaseComponent {
    constructor() {
        super();
        this._bind('_handleItemClick', '_feedback');
    }

    render() {
        return <div className="combinedValueComponent">
            <ul className="collapsible" data-collapsible="accordion">
                <div className="container"><h5>Atom Types</h5></div>
                <li name="null" onClick={this._handleItemClick}>
                    <div className={"collapsible-header" + (this.state.type == "null" ? " active" : "")}>
                        <i className="material-icons">not_interested</i>Null
                    </div>
                    <div className="collapsible-body"><p><NullValueComponent /></p></div>
                </li>
                <li name="boolean" onClick={this._handleItemClick}>
                    <div className={"collapsible-header"+ (this.state.type == "boolean" ? " active" : "")}>
                        <i className="material-icons">thumbs_up_down</i>Boolean
                    </div>
                    <div className="collapsible-body"><p><BooleanValueComponent feedback={this._feedback}/></p></div>
                </li>
                <li name="number" onClick={this._handleItemClick}>
                    <div className={"collapsible-header"+ (this.state.type == "number" ? " active" : "")}>
                        <i className="material-icons">whatshot</i>Number
                    </div>
                    <div className="collapsible-body"><p><NumberValueComponent feedback={this._feedback}/></p></div>
                </li>
                <li name="text" onClick={this._handleItemClick}>
                    <div className={"collapsible-header"+ (this.state.type == "text" ? " active" : "")}>
                        <i className="material-icons">spellcheck</i>Text
                    </div>
                    <div className="collapsible-body"><p><TextValueComponent feedback={this._feedback}/></p></div>
                </li>
                <div className="container"><h5>Collection Types</h5></div>
                <li name="array" onClick={this._handleItemClick}>
                    <div className={"collapsible-header"+ (this.state.type == "array" ? " active" : "")}>
                        <i className="material-icons">whatshot</i>Array
                    </div>
                    <div className="collapsible-body"><p>This will add an empty array</p></div>
                </li>
                <li name="object" onClick={this._handleItemClick}>
                    <div className={"collapsible-header"+ (this.state.type == "object" ? " active" : "")}>
                        <i className="material-icons">whatshot</i>Object
                    </div>
                    <div className="collapsible-body"><p>This will add an empty object</p></div>
                </li>
            </ul>
            <button className="btn waves-effect">Okay</button>
        </div>
    }

    getInitialState() {
        // Element set externally.
        return this.props.element;
        // return {
        //     type: "null",
        //     value: null
        // };
    }

    _handleItemClick(evt) {
        if (this.state.type == evt) {

        }
        this.state.type = evt;

        if (evt == "array") {
            this.state.value = [];
        } else if (evt == "object") {
            this.state.value = {};
        } else if (evt == "null") {
            this.state.value = null;
        }
    }

    _feedback(newObject) {
        this.state.value = newObject.value;
    }
}


class BreadcrumbComponent extends BaseComponent {
    constructor() {
        super();
        this._bind('_handleItemClick');
    }

    render() {
        var items = [];
        this.state.path.forEach(item => items.push(
            <a href="javascript:0" name={items.length} onClick={this._handleItemClick} className="breadcrumb"
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

    getInitialState() {
        return {path: this.props.path};
    }

    _handleItemClick(e) {
        var newPath = [];
        for (var i = 0; i < this.state.path.length; i++) {
            newPath.push(this.state.path[i]);
            if (i == e.target.name) {
                break;
            }
        }
        this.setState({path: newPath});
        // TODO navigate to path
    }
}


class TreeComponent extends BaseComponent {
    constructor() {
        super();
        this._bind(); // TODO Nothing yet to add here.
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

    getInitialState() {
        return {tree: this.props.tree}
    }

}


class FullComponent extends BaseComponent {
    constructor() {
        super();
        this._bind(); // TODO Nothing yet.
    }

    render() {
        return <div>
            <BreadcrumbComponent path={this.state.path}/>
            <TreeComponent tree={this.state.data}/>
            <CombinedValueComponent />
        </div>;
    }

    //noinspection JSMethodCanBeStatic
    getInitialState() {
        return {
            data: {},
            path: ["[root]"]
        }
    }

    getJSONRepresentation() {
        return JSON.stringify(this.state.data);
    }

    setDataFromJSON(str) {
        this.state.data = JSON.parse(str);
    }
}
