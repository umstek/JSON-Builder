import React from "react";
import BaseComponent from "./BaseComponent.jsx";

class TreeComponent extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {tree: props.tree};
    }

    render() {
        var flatten = function (key, item) {
            if (item == null) {
                return <li className="collection-item" key={key}>null</li>;
            } else if (typeof item == 'boolean') {
                return <li className="collection-item" key={key}><a href="javascript:0">{key}</a>: {item}</li>;
            } else if (typeof item == 'number') {
                return <li className="collection-item" key={key}><a href="javascript:0">{key}</a>: {item}</li>;
            } else if (typeof item == 'string') {
                return <li className="collection-item" key={key}><a href="javascript:0">{key}</a>: {item}</li>;
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

        return <ul className="collection">{flatten("[root]", this.state.tree)}</ul>;
    }

}

export default TreeComponent;