import React, { Component } from 'react';
import Articles from './components/Articles/Articles';
import Article from './components/Articles/Article';
import {Route} from 'react-router-dom';

class App extends Component {
    
    render () {
        
        return (
            <div className="container">
            <Route path="/" exact component={Articles}/>
            <Route path="/:section/:id" exact component={Article}/>
            </div>
    );
  }  
}

export default App;