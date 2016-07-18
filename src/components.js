/**
 * Created by Wickramaranga on 7/4/2016.
 */

//import * as React from "react";

var NullValueComponent = React.createClass({
    render: function () {
        return <span className="nullValueValueComponent">
            <i>null</i>
        </span>;
    }
});

var BooleanValueComponent = React.createClass({
    render: function () {
        return <span className="switch booleanValueComponent" onChange={this.handleChange}>
            <label>
                False
                <input type="checkbox" value={this.state.value}/>
                <span className="lever"/>
                True
            </label>
        </span>;
    },
    getInitialState: function () {
        // Initial state is set by properties.
        return {value: this.props.value};
    },
    handleChange: function (e) {
        this.setState({value: e.target.value});
        // Feedback function enables propagation of data to upper layers.
        this.props.feedback({value: this.state.value});
    }
});

var NumberValueComponent = React.createClass({
    render: function () {
        return <span className="numberValueComponent">
            <label>
                <input className="input-field" type="number" value={this.state.value}
                       onChange={this.handleChange}/>
            </label>
        </span>
    },
    getInitialState: function () {
        return {value: this.props.value};
    },
    handleChange: function (e) {
        this.setState({value: e.target.value});
        this.props.feedback({value: this.state.value});
    }
});

var TextValueComponent = React.createClass({
    render: function () {
        return <span className="textValueComponent">
            <label>
                <input className="input-field" type="text" value={this.state.value} onChange={this.handleChange}/>
            </label>
        </span>
    },
    getInitialState: function () {
        return {value: this.props.value};
    },
    handleChange: function (e) {
        this.setState({value: e.target.value});
        this.props.feedback({value: this.state.value});
    }
});

var CombinedValueComponent = React.createClass({
    render: function () {
        return <div className="combinedValueComponent">
            <ul className="collapsible" data-collapsible="accordion">
                <div className="container"><h5>Atom Types</h5></div>
                <li name="null" onClick={this.handleItemClick}>
                    <div className={"collapsible-header" + (this.state.type == "null" ? " active" : "")}>
                        <i className="material-icons">not_interested</i>Null
                    </div>
                    <div className="collapsible-body"><p><NullValueComponent /></p></div>
                </li>
                <li name="boolean" onClick={this.handleItemClick}>
                    <div className={"collapsible-header"+ (this.state.type == "boolean" ? " active" : "")}>
                        <i className="material-icons">thumbs_up_down</i>Boolean
                    </div>
                    <div className="collapsible-body"><p><BooleanValueComponent feedback={this.feedback}/></p></div>
                </li>
                <li name="number" onClick={this.handleItemClick}>
                    <div className={"collapsible-header"+ (this.state.type == "number" ? " active" : "")}>
                        <i className="material-icons">whatshot</i>Number
                    </div>
                    <div className="collapsible-body"><p><NumberValueComponent feedback={this.feedback}/></p></div>
                </li>
                <li name="text" onClick={this.handleItemClick}>
                    <div className={"collapsible-header"+ (this.state.type == "text" ? " active" : "")}>
                        <i className="material-icons">spellcheck</i>Text
                    </div>
                    <div className="collapsible-body"><p><TextValueComponent feedback={this.feedback}/></p></div>
                </li>
                <div className="container"><h5>Collection Types</h5></div>
                <li name="array" onClick={this.handleItemClick}>
                    <div className={"collapsible-header"+ (this.state.type == "array" ? " active" : "")}>
                        <i className="material-icons">whatshot</i>Array
                    </div>
                    <div className="collapsible-body"><p>This will add an empty array</p></div>
                </li>
                <li name="object" onClick={this.handleItemClick}>
                    <div className={"collapsible-header"+ (this.state.type == "object" ? " active" : "")}>
                        <i className="material-icons">whatshot</i>Object
                    </div>
                    <div className="collapsible-body"><p>This will add an empty object</p></div>
                </li>
            </ul>
            <button className="btn waves-effect">Okay</button>
        </div>
    },
    getInitialState: function () {
        // Element set externally.
        return this.props.element;
        // return {
        //     type: "null",
        //     value: null
        // };
    },
    handleItemClick: function (evt) {
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
    },
    feedback: function (newObject) {
        this.state.value = newObject.value;
    }
});

var BreadcrumbComponent = React.createClass({
    render: function () {
        var items = [];
        this.state.path.forEach(item => items.push(
            <a href="javascript:0" name={items.length} onClick={this.handleItemClick} className="breadcrumb"
               key={items.length}>{item}</a>
        ));
        return <nav>
            <div className="nav-wrapper">
                <div className="col s12">
                    {items}
                </div>
            </div>
        </nav>
    },
    handleItemClick: function (e) {
        var newPath = [];
        for (var i = 0; i < this.state.path.length; i++) {
            newPath.push(this.state.path[i]);
            if (i == e.target.name) {
                break;
            }
        }
        this.setState({path: newPath});
        // TODO navigate to path
    },
    getInitialState: function () {
        return {path: this.props.path};
    }
});

var TreeComponent = React.createClass({
    render: function () {
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
    },
    getInitialState: function () {
        return {tree: this.props.tree}
    }

});

var FullComponent = React.createClass({
    render: function () {
        return <div>
            <BreadcrumbComponent path={this.state.path}/>
            <TreeComponent tree={this.state.data}/>
            <CombinedValueComponent />
        </div>;
    },
    getInitialState: function () {
        return {
            data: {},
            path: ["[root]"]
        }
    },
    getJSONRepresentation: function () {
        return JSON.stringify(this.state.data);
    },
    setDataFromJSON: function (str) {
        this.state.data = JSON.parse(str);
    }
});
