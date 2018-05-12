import React from 'react';

export default class VisualTwo extends React.Component {
    constructor(props) {
        super(props);
        this.createVisualization = this.createVisualization.bind(this);
    }
    
    componentDidMount() {
        this.createVisualization()
    }
    componentWillMount() {
        // console.log("Updating to timestamp: " + this.props.context.currentTime);
        // var currentTime = this.props.context.currentTime;
        console.log("wil")
        // var time = this.props.context.currentTime;
        // let context = this.props.context;
        // context.currentTime = time;
        //    this.props.context.currentTime = currentTime;
        document.body.style.backgroundColor = this.props.visualState === 1 ? 'black' : 'white';

    }
    componentDidUpdate(prevProps, prevState) {
        console.log("updated")
    }
    createVisualization() {
        // Window.AudioContext.close()
        let context = this.props.context;
   
        let analyser = context.createAnalyser();
        let canvas = this.refs.analyzerCanvas;
        let ctx = canvas.getContext('2d');
        canvas.width = 600; 
        canvas.height = 300;
        // let audio = this.refs.audio;
        // audio.crossOrigin = "anonymous";
        // let audioSrc = context.createMediaElementSource(audio);
        let audioSrc = this.props.source;
        audioSrc.connect(analyser);
        audioSrc.connect(context.destination);
        analyser.connect(context.destination);
        function renderFrame() {
            let freqData = new Uint8Array(analyser.frequencyBinCount);
            requestAnimationFrame(renderFrame);
            analyser.getByteFrequencyData(freqData);
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            // ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#9933ff';
            let bars = 200;
            for (var i = 0; i < bars; i++) {
              let bar_x = i * 3;
              let bar_width = 2;
              let bar_height = -(freqData[i] / 2);
              ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);
            }


        };
        // audioSrc.currentTime = time;
        // console.log(audioSrc.currentTime);
        renderFrame();
    }

    render() {
        return (
            <div id="mp3_player" >

                <canvas
                    ref="analyzerCanvas"
                    id="analyzer"
                    >
                </canvas>
        </div>
        )
    }
}


