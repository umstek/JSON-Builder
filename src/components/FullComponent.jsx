import React from "react";
import BreadcrumbComponent from "./BreadcrumbComponent.jsx";
import TreeComponent from "./TreeComponent.jsx";
import CombinedValueComponent from "./CombinedValueComponent.jsx";
import BaseComponent from "./BaseComponent.jsx";

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

export default FullComponent;
