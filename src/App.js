import React, { Component } from 'react';
import axios from 'axios';

import Search from './search.js';
import List from './list.js';
import './App.css';

class App extends Component {
    constructor(props){
        super(props);

        this.state = {
          currentSong: '',
          currentList: []  
        }

        this.createVisualization = this.createVisualization.bind(this);
        this.syncMusic =this.syncMusic.bind(this);
        this.listMusic =this.listMusic.bind(this);
    }

    componentDidMount(){
        this.createVisualization()
    }
    

    syncMusic(input) {
      this.setState({
        currentSong: input
      })
      axios.post('/music', {
           url: input
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

    deleteSong(song){
      axios.post('delete', {
          url: song
      }).then(() => {
        this.listMusic()
      })    
    }


    createVisualization(){
        let context = new AudioContext();
        let analyser = context.createAnalyser();
        let canvas = this.refs.analyzerCanvas;
        let ctx = canvas.getContext('2d');
        let audio = this.refs.audio;
        audio.crossOrigin = "anonymous";
        let audioSrc = context.createMediaElementSource(audio);
        audioSrc.connect(analyser);
        audioSrc.connect(context.destination);
        analyser.connect(context.destination);

        function renderFrame(){
            let freqData = new Uint8Array(analyser.frequencyBinCount)
            requestAnimationFrame(renderFrame)
            analyser.getByteFrequencyData(freqData)
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.fillStyle = '#9933ff';
            let bars = 200;
            for (var i = 0; i < bars; i++) {
                let bar_x = i * 3;
                let bar_width = 2;
                let bar_height = -(freqData[i] / 2);
                ctx.fillRect(bar_x, canvas.height, bar_width, bar_height)
            }
        };
        renderFrame()
    }

    render() {
        return (
            <div className="App">
                <Search syncMusic = {this.syncMusic} />
                <div id="mp3_player">
                    <div id="audio_box">
                        <audio
                            ref="audio"
                            autoPlay={true}
                            controls={true}
                            src={this.state.currentSong}
                            >
                            </audio>
                        </div>
                        <canvas
                            ref="analyzerCanvas"
                            id="analyzer"
                            >
                            </canvas>
                        </div>
                        <div>
                        <button onClick = {this.listMusic}>Get all Music</button>
                        <List deleteSong = {this.deleteSong} syncMusic = {this.syncMusic} currentList = {this.state.currentList} listMusic = {this.listMusic}/>    
                        </div>
                    </div>
                );
            }
        }

        export default App;