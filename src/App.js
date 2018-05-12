import React, { Component } from 'react';
import axios from 'axios';
import StartAudioContext from 'startaudiocontext';
import Search from './search.js';
import List from './list.js';
import VisualOne from './visual1.js';
import VisualTwo from './visual2.js';
// import VisualThree from './visual3.js';
// import { Menu, Segment } from 'semantic-ui-react'
import './App.css';
// import './App2.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
          visualState: 0,  
          currentSong: '',
          currentList: [],
          listTrigger: false,
          context: '',
          source: ''
        }
        // this.createVisualization = this.createVisualization.bind(this);
        // this.createVisualizationTwo = this.createVisualizationTwo.bind(this);
        this.syncMusic =this.syncMusic.bind(this);
        this.addSong =this.addSong.bind(this);
        this.listMusic =this.listMusic.bind(this);
        this.deleteSong =this.deleteSong.bind(this);
        this.listHide =this.listHide.bind(this);
        this.controlState = this.controlState.bind(this);
        this.play = this.play.bind(this);
        this.renderBackground = this.renderBackground.bind(this);
    }

    play() {
        this.refs.audio.play();
    }

    componentDidMount() {
        console.log("mounted");
        let audio = this.refs.audio;
        let context = new AudioContext();
        StartAudioContext(context, "#mainButton")
        this.setState({
            context: context
        })
        audio.crossOrigin = "anonymous";
        let audioSrc = context.createMediaElementSource(audio);
        audio.volume = 0.3;
        this.setState({
            source: audioSrc,
            visualState: 1
        })
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
    play() {
        this.refs.audio.play();
    }
    pause() {
        this.refs.audio.pause();
    }
    VolumeUp() {
        if(this.refs.audio.volume !== 1) {
          this.refs.audio.volume+=0.1;
        }
    }
    VolumeDown() {
        if(this.refs.audio.volume > 0.1) {
          this.refs.audio.volume-=0.1;
        }
    }
    syncMusic(input) {
      this.setState({
        currentSong: input
      })
    }
    addSong(input) {
      this.setState({
        currentSong: input
      })
      axios.post('/music', {
        url: input
      }).then(() => {
          this.listMusic();
      })
    }
    
    listMusic() {
      axios.get('/music')
      .then((data) => {
        this.setState({
            currentList: data.data
        });
      })    
    }
    
    listHide() {
        var newTrigger = !this.state.listTrigger;
        this.setState({
            listTrigger: newTrigger
        })
    }

    deleteSong(song) {
        var newList = this.state.currentList.filter(item => {
            return item !== song;
        })
        this.setState({
            currentList: newList
        })
      axios.post('/delete', {
          url: song
      }).then((data) => {
        this.listMusic()
      })    
    }

    renderBackground() {

    }

    render() {
        const backgroundWhite = {
            backgroundColor: "white"
        }
        
        const backgroundBlack = {
            backgroundColor: "black"
        }
        return (
            <div className="App" style = {{backgroundColor: this.state.visualState === 1 ? 'black' : 'white' }} >
              <div className="ui inverted segment">
                <div className="ui inverted secondary four item menu">
                    <a className="item" onClick = {this.play.bind(this)}>
                    Play
                    </a>
                    <a className="item" onClick = {this.pause.bind(this)}>
                    Pause
                    </a>
                    <a className="item" onClick = {this.VolumeUp.bind(this)}>
                    Volume +
                    </a>
                    <a className="item" onClick = {this.VolumeDown.bind(this)}>
                    Volume -
                    </a>
                </div>
                </div>            
            <div id="audio_box">
                <audio
                    ref="audio"
                    autoPlay={true}
                    controls={true}
                    crossOrigin="anonymous"
                    src={this.state.currentSong}
                    >
                    </audio>
            </div>               
                {this.state.visualState === 1 && <VisualOne currentSong = {this.state.currentSong} visualState = {this.state.visualState} context = {this.state.context} source = {this.state.source} />}
                {this.state.visualState === 2 && <VisualTwo currentSong = {this.state.currentSong} visualState = {this.state.visualState} context = {this.state.context} source = {this.state.source} />}
                {/* {this.state.visualState === 3 && <VisualThree currentSong = {this.state.currentSong} />} */}
                <Search addSong = {this.addSong} />
                        <div style = {{backgroundColor: this.state.visualState === 1 ? 'black' : 'white' }}>  
                        <button onClick = {(e => {
                            this.controlState(1);
                        })}>Visual One </button>                               
                        <button id = "mainButton" onClick = {(e => {
                            this.listMusic();
                            this.listHide();
                        })} >Get all Music</button>  
                        <button onClick = {(e => {
                            this.controlState(2)
                        })}>Visual Two </button>                         
                        {/* <button onClick = {(e => {
                            this.controlState(3)
                        })}>Visual Three </button>                          */}
                        { this.state.listTrigger && <List deleteSong = {this.deleteSong} syncMusic = {this.syncMusic} currentList = {this.state.currentList} listMusic = {this.listMusic} visualState = {this.state.visualState}/>    }
                        </div>
                    </div>
                );
            }
        }

        export default App;