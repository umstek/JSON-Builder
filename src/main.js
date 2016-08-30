import ReactDOM from "react-dom";
import FullComponent from "./components/FullComponent.jsx";

var mjson =
{
    'name': 'lol',
    'age': 10,
    'friends': [
        {
            'name': 'troll',
            'age': 1000
        },
        {
            'name': 'pol',
            'age': 2
        }
    ]
};


ReactDOM.render(
    <FullComponent path={"/".split('/')} data={mjson}/>,
    document.getElementById('container')
);
