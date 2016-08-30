import React from "react";
import BaseComponent from "./BaseComponent.jsx";

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

export default NullValueComponent;
