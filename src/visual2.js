import React from 'react';

export default class VisualTwo extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        this.createVisualizationTwo()
    }

    createVisualizationTwo(){
        // if(audioCtx !== undefined){
        //     audioCtx.close().then(function() {
        //     });
        // }
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
            // ctx.setLineDash([2, 2]);
            ctx.lineWidth = 2;
        
        
            // ctx.clearRect( 0, 0, canvas.width, canvas.height );
            ctx.fillRect( 0, 0, canvas.width, canvas.height );
        
            ctx.beginPath();
            ctx.moveTo( 0, Math.round( canvas.height / 2 ) );
        
            var barWidth = Math.round(canvas.width / analyser.frequencyBinCount);
        
            for (var i = 0; i < ( analyser.frequencyBinCount - 1 ); i++) {
                // Not sure what 256 is yet, but it doesn't change when we change DETAIL...
                // ... maybe it has to do with Uint8 in the array. Maybe values in Uint8 array only
                // exist between 0-256... hmm...
                var percent = freqDomain[i] / 256;
                var barHeight = canvas.height * percent;
        
                ctx.lineTo( (i + 1) * barWidth, barHeight );
            };
            ctx.lineTo( canvas.width, Math.round( canvas.height / 2 ) );
        
            ctx.stroke();
            ctx.closePath();
        
            requestAnimationFrame(loop);
        }
        loop()
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


