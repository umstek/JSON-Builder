import React from "react";
import BaseComponent from "./BaseComponent.jsx";

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
        </nav>;
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
        this.props.feedback({newPath});
    }
}
BreadcrumbComponent.propTypes = {path: React.PropTypes.array, feedback: React.PropTypes.func};
BreadcrumbComponent.defaultProps = {path: ['[root]'], feedback: (obj) => console.log(obj.value)};

export default BreadcrumbComponent;
