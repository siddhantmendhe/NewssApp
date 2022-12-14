import './App.css';

import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

export default class App extends Component {
  apikey=process.env.REACT_APP_NEWS_API;
  state={
    progress:0
  }
  setProgress=(progress)=>{
    this.setState({progress:progress})
  }

  render() {
  
    
    return (
      <div>
       
        <Router>
       
        <NavBar/>
        <LoadingBar
        color='#937DFA'
        height={2}
        progress={this.state.progress}
        
      />
        <Routes> 
        <Route exact path="/" element={<News setProState={this.setProgress} apikey={this.apikey} key="eneral" pageSize={5} country="in" category="general"/>}/>
        <Route exact path="/business" element={<News setProState={this.setProgress} apikey={this.apikey} key="business" pageSize={5} country="in" category="business"/>}/>
        <Route exact path="/entertainment" element={<News setProState={this.setProgress} apikey={this.apikey} key="entertainment" pageSize={5} country="in" category="entertainment"/>}/>
        <Route exact path="/general" element={<News setProState={this.setProgress} apikey={this.apikey} key="general" pageSize={5} country="in" category="general"/>}/>
        <Route exact path="/health" element={<News setProState={this.setProgress} apikey={this.apikey} key="health" pageSize={5} country="in" category="health"/>}/>
        <Route exact path="/science" element={<News setProState={this.setProgress} apikey={this.apikey} key="science" pageSize={5} country="in" category="science"/>}/>
        <Route exact path="/sports" element={<News setProState={this.setProgress} apikey={this.apikey} key="sports" pageSize={5} country="in" category="sports"/>}/>
        <Route exact path="/technology" element={<News setProState={this.setProgress} apikey={this.apikey} key="technology" pageSize={5} country="in" category="technology"/>}/>
        </Routes>



        
        </Router>
      </div>
    )
  }
}
