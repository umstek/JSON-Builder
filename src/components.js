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
        return {value: this.props.value};
    },
    handleChange: function (e) {
        this.setState({value: e.target.value});
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
    }
});

var CombinedValueComponent = React.createClass({
    render: function () {
        return <div className="combinedValueComponent">
            <h6>Atom types</h6>
            <div>
                <NullValueComponent/>
                <span><button className="btn accent-3 waves-effect waves-teal">Add</button></span>
            </div>
            <div>
                <BooleanValueComponent/>
                <span><button className="btn accent-3 waves-effect waves-teal">Add</button></span>
            </div>
            <div>
                <NumberValueComponent/>
                <span><button className="btn accent-3 waves-effect waves-teal">Add</button></span>
            </div>
            <div>
                <TextValueComponent/>
                <span><button className="btn accent-3 waves-effect waves-teal">Add</button></span>
            </div>
            <h6>Collection types</h6>
            <div>
                <button className="btn waves-effect">Add Array</button>
                <button className="btn waves-effect">Add Object</button>
            </div>
        </div>
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

        return <ul className="collection">{flatten("root", this.state.tree)}</ul>
    },
    getInitialState: function () {
        return {tree: this.props.tree}
    }

});

var FullComponent = React.createClass({
    render: function () {
        return <div>
            <BreadcrumbComponent path={[1, 2, 3]}/>
            <TreeComponent tree={{name: 'x', gate: [1,2,3], core: {'l': 'l'}}}/>
        </div>;
    },
    getInitialState: function () {
        return {
            data: {},
            path: ["root"]
        }
    }
});
