import React from 'react';
import './App.css';
import Sound from './components/sound';
import WOW from 'wowjs';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      backColor : ['#FAEBD7', '#F0F8FF', '#7FFFD4', '#F0FFFF', '#0000FF', '#8A2BE2', '#7FFF00', '#A0522D', '#FFFF00',
      '#FF7F50', '#FF8C00', '#FF1493', '#FFD700', '#E6E6FA', '#7CFC00', '#F08080', '#FFB6C1', '#FF4500', '#FA8072', '#87CEEB']
    }

    this.changeBackColor = this.changeBackColor.bind(this);
  }

  componentDidMount() {
    new WOW.WOW({
        live: false
    }).init();
  }

  changeBackColor(){
    var backStyle = document.querySelector('.AppGrid');
    backStyle.style.backgroundColor = this.state.backColor[Math.floor(Math.random() * this.state.backColor.length)];
  }

  render() {
    return (
      <div className="AppGrid">
        <Sound title="Play Drum" changeBackColor={this.changeBackColor} />
      </div>
    );
  }
}
