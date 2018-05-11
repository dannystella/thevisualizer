import React from 'react';
import range from 'lodash';
export default class VisualTwo extends React.Component {
    constructor(props) {
        super(props);
        this.createVisualizationTwo = this.createVisualizationTwo.bind(this);
    }
    componentDidMount() {
        this.createVisualizationTwo();
    }

    createVisualizationTwo() {
        // Window.AudioContext.close()
        let context = new AudioContext();
        let analyser = context.createAnalyser();
        let canvas = this.refs.analyzerCanvas;
        canvas.width = 600; 
        canvas.height = 300;
        let ctx = canvas.getContext('2d');
        let audio = this.refs.audio;
        audio.crossOrigin = "anonymous";
        let audioSrc = context.createMediaElementSource(audio);
        audioSrc.connect(analyser);
        audioSrc.connect(context.destination);
        analyser.connect(context.destination);

        function loop() {
            var freqDomain = new Uint8Array( analyser.frequencyBinCount );
            analyser.getByteTimeDomainData( freqDomain );
            ctx.fillStyle = "rgba(0,0,0,0.03)";
            var hue = Math.sin( analyser.context.currentTime * 0.05 ) * 360;
            ctx.strokeStyle = "hsla(" + hue + ", 80%, 50%, 0.8)";
            ctx.lineWidth = 2;
            // ctx.clearRect( 0, 0, canvas.width, canvas.height );
            ctx.fillRect( 0, 0, canvas.width, canvas.height );
            ctx.beginPath();
            ctx.moveTo( 0, Math.round( canvas.height / 2 ) );
            var barWidth = Math.round(canvas.width / analyser.frequencyBinCount);
            for (var i = 0; i < ( analyser.frequencyBinCount - 1 ); i++) {
                var percent = freqDomain[i] / 256;
                var barHeight = canvas.height * percent;        
                ctx.lineTo( (i + 1) * barWidth, barHeight );
            };
            ctx.lineTo( canvas.width, Math.round( canvas.height / 2 ) );
            ctx.stroke();
            ctx.closePath();
            requestAnimationFrame(loop);
        }
        loop();
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


