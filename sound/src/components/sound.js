import React from 'react';
import './sound.css';
import { Container, Row, Col, Button } from 'reactstrap';

export default class Sound extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            items : [],
            sliderVal : 1
        }
        this.playSound = this.playSound.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.adjustVolume = this.adjustVolume.bind(this);
        this.clearDisplay = this.clearDisplay.bind(this);
    }

    componentDidMount(){
        fetch('/api/sound').then((res) => {
            res.json().then((data) => {
                this.setState({
                    items : data
                })
            }).catch((err) => {
                console.log(err);
            })
        }).catch((err) => {
            console.log(err);
        })

        document.addEventListener('keydown', this.handleKeyPress); // generate input keyboard event & call handleKeyPress
    }

    playSound(e){
        // console.log(e.target.value); // when clicking buttonm, it returns the value of button
        const sound = document.getElementById(e.target.value);
        sound.currentTime = 0;
        sound.play();
        this.props.changeBackColor();
    }

    handleKeyPress(e) {
        // document.querySelector(".type").empty();
        for(let i=0; i<this.state.items.length; i++){
            if(e.keyCode === this.state.items[i].keyCode){
                const sound = document.getElementById(this.state.items[i].keyTrigger);
                sound.currentTime = 0;
                sound.play();
            }
        }
        this.props.changeBackColor();
    }
    
    clearDisplay() {
        this.setState({
            display: String.fromCharCode(160)
        });
    }

    adjustVolume(e) {
        this.setState({
            sliderVal: e.target.value,
            display: "Volume: " + Math.round(e.target.value * 100)
        });
        setTimeout(() => this.clearDisplay(), 1000);
    }

    render(){
        const controlSound = [].slice.call(document.getElementsByClassName('audioSound'));
        controlSound.forEach(sound => {
            sound.volume = this.state.sliderVal
    });
        return(
            <div className="soundGrid">
                <div className="wow tada">
                    <h1>{this.props.title}</h1><br/>
                </div>
                <Container>
                    <Row>
                        {this.state.items.map((el) => {
                            return(
                                <Col xl="4" lg="4" md="4" sm="4" xs="4">
                                    <span className="size" key={el.id}>
                                        <audio className="audioSound" id={el.keyTrigger} src={el.url}></audio>
                                        <Button className="btn" color="danger" onClick={this.playSound} value={el.keyTrigger}>{el.keyTrigger}</Button>
                                    </span>
                                </Col>
                            )
                        })}
                    </Row>
                </Container><br/>
                <div className="volume-slider">
 				    <input type="range" min="0" max="1" step="0.01" value={this.state.sliderVal} onChange={this.adjustVolume} />
 				</div>
            </div>
        )
    }
}