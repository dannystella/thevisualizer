import React, { Component } from 'react';
import axios from 'axios';

import Search from './search.js';
import List from './list.js';
import VisualOne from './visual1.js';
import VisualTwo from './visual2.js';
import VisualThree from './visual3.js';
import { Menu, Segment } from 'semantic-ui-react'
import './App.css';
// import './App2.css';

class App extends Component {
    constructor(props){
        super(props);

        this.state = {
          visualState: 1,  
          currentSong: '',
          currentList: [],
          listTrigger: false  
        }
        let State = 1;
        // this.createVisualization = this.createVisualization.bind(this);
        // this.createVisualizationTwo = this.createVisualizationTwo.bind(this);
        this.syncMusic =this.syncMusic.bind(this);
        this.listMusic =this.listMusic.bind(this);
        this.deleteSong =this.deleteSong.bind(this);
        this.listHide =this.listHide.bind(this);
        this.controlState = this.controlState.bind(this);
        this.play = this.play.bind(this);
    }

    play() {
        this.refs.audio.play();
    }

    componentDidMount() {
        console.log("mounted");
        // this.createVisualizationTwo()
    }
    
    controlState(input) {
        if(input === 1 ){
            this.setState({
                visualState: 1
            })
        } else if(input === 2) {
            this.setState({
                visualState: 2
            })
        } else if(input === 3) {
            this.setState({
                visualState: 3
            })
        }

    }

    syncMusic(input) {
      
      this.setState({
        currentSong: input
      })
      axios.post('/music', {
        url: input
      }).then(() => {
          this.listMusic();
      })
    }
    
    listMusic(){
      axios.get('/music')
      .then((data) => {
        this.setState({
            currentList: data.data
        });
      })    
    }
    
    listHide(){
        var newTrigger = !this.state.listTrigger;
        this.setState({
            listTrigger: newTrigger
        })
    }

    deleteSong(song){
        var newList = this.state.currentList.filter(item => {
            return item !== song;
        })
        this.setState({
            currentList: newList
        })
      axios.post('delete', {
          url: song
      }).then(() => {
        this.listMusic()
      })    
    }

    render() {
        return (
            <div className="App">
               
                {this.state.visualState === 1 && <VisualOne currentSong = {this.state.currentSong} />}
                {this.state.visualState === 2 && <VisualTwo currentSong = {this.state.currentSong} />}
                {/* {this.state.visualState === 3 && <VisualThree currentSong = {this.state.currentSong} />} */}
                <Search syncMusic = {this.syncMusic} />
                        <div>  
                        <button onClick = {(e => {
                            this.controlState(1)
                        })}>Visual One </button>                               
                        <button onClick = {(e => {
                            this.listMusic()
                            this.listHide()
                        })} >Get all Music</button>  
                        <button onClick = {(e => {
                            this.controlState(2)
                        })}>Visual Two </button>                         
                        {/* <button onClick = {(e => {
                            this.controlState(3)
                        })}>Visual Three </button>                          */}
                        { this.state.listTrigger && <List deleteSong = {this.deleteSong} syncMusic = {this.syncMusic} currentList = {this.state.currentList} listMusic = {this.listMusic}/>    }
                        </div>
                    </div>
                );
            }
        }

        export default App;