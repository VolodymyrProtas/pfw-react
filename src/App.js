import React from 'react';
import List from './components/list/List';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import Place from "./components/place/Place";


function App() {
    return (
        <div className="main-container">
            <Switch>
                <Route exact path="/" component={List}></Route>
                <Route path="/:id" component={Place}></Route>
            </Switch>
        </div>

    );
}

export default App;
