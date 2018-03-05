import React from 'react';

export default class VisualTwo extends React.Component {
    constructor(props) {
        super(props);
        this.createVisualization = this.createVisualization.bind(this);
    }
    componentDidMount(){
        this.createVisualization()
    }

    createVisualization(){
        // Window.AudioContext.close()
        let context = new AudioContext();
        let analyser = context.createAnalyser();
        let canvas = this.refs.analyzerCanvas;
        let ctx = canvas.getContext('2d');
        canvas.width = 600; 
        canvas.height = 300;
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
    play(){
        this.refs.audio.play();
    }
    pause(){
        this.refs.audio.pause();
    }
    VolumeUp(){
        this.refs.audio.volume+=0.1;
    }
    VolumeDown(){
        this.refs.audio.volume-=0.1;
    }

    render() {
        return (
            
            <div id="mp3_player">
             <div className="ui inverted segment">
                <div className="ui inverted secondary four item menu">
                    <a className="item" onClick = {this.play.bind(this)}>
                    Play
                    </a>
                    <a className="item" onClick = {this.pause.bind(this)}>
                    Pause
                    </a>
                    <a className="item" onClick = {this.VolumeUp.bind(this)}>
                    Volume Up
                    </a>
                    <a className="item" onClick = {this.VolumeDown.bind(this)}>
                    Volume Down
                    </a>
                </div>
                </div>
            <div id="audio_box">
                <audio
                    ref="audio"
                    autoPlay={true}
                    controls={true}
                    crossOrigin="anonymous"
                    src={this.props.currentSong}
                    >
                    </audio>
                </div>
                <canvas
                    ref="analyzerCanvas"
                    id="analyzer"
                    >
                    </canvas>
                </div>
        )
    }
}


