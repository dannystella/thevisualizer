import React from 'react';

export default class VisualTwo extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        this.createVisualization()
    }

    createVisualization(){
        // if(audioCtx !== undefined){
        //     audioCtx.close().then(function() {
        //     });
        // }
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


    render() {
        return (
            <div id="mp3_player">
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


