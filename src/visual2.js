import React from 'react';

export default class VisualTwo extends React.Component {
    constructor(props) {
        super(props);
        this.createVisualizationTwo = this.createVisualizationTwo.bind(this);
    }

    componentDidMount() {
        this.createVisualizationTwo();
    }

    componentWillMount() {
        document.body.style.backgroundColor = this.props.visualState === 1 ? 'black' : 'white';
    }

    createVisualizationTwo() {
        // Window.AudioContext.close()
        // let context = new AudioContext();
        // console.log(this.props.context.currentTime);
        let context = this.props.context;
        let analyser = context.createAnalyser();
        let canvas = this.refs.analyzerCanvas;
        canvas.width = 600; 
        canvas.height = 300;
        let ctx = canvas.getContext('2d');
        let audioSrc = this.props.source;
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

    render() {
        return (
            <div id="mp3_player">
                <canvas
                    ref="analyzerCanvas"
                    id="analyzer"
                    >
                </canvas>
            </div>
        )
    }
}


