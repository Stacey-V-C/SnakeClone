import React, {component} from 'react';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <Gameboard />
    );
  }
}

function again() {
  window.location.reload(false)
}

class Gameboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      direction: 'r',
      vert: [60, 60, 60],
      side: [100, 95, 90],
      score: 0,
      fruitV: 0,
      fruitH: 0,
      gOver: false
    }
    this.move = this.move.bind(this);
    this.handleKeypress = this.handleKeypress.bind(this)
  }

  handleKeypress(event) {
    console.log(event);
    if (event.key === 'ArrowLeft') {
      this.setState((state) => {
        if (state.direction != 'r') {
          return ({
            direction: 'l'
          })
        } else {
          return ({
            direction: 'r'
          })
        }
      })
    } else if (event.key === 'ArrowUp') {
      this.setState((state) => {
        if (state.direction != 'd') {
          return ({
            direction: 'u'
          })
        } else {
          return ({
            direction: 'd'
          })
        }
      })
    } else if (event.key === 'ArrowRight') {
      this.setState((state) => {
        if (state.direction != 'l') {
          return ({
            direction: 'r'
          })
        } else {
          return ({
            direction: 'l'
          })
        }
      })
    } else if (event.key === 'ArrowDown') {
      this.setState((state) => {
        if (state.direction != 'u') {
          return ({
            direction: 'd'
          })
        } else {
          return ({
            direction: 'u'
          })
        }
      })
    }
  }

  move() {
    if (this.state.direction == 'l' && this.state.side[0] != 0) {
      this.setState((state) => {
        return({
          side: [state.side[0] - 5, ...state.side],
          vert: [state.vert[0], ...state.vert]        })
      })
    } else if (this.state.direction == 'u' && this.state.vert[0] != 0) {
      this.setState((state) => {
        return({
          side: [state.side[0], ...state.side],
          vert: [state.vert[0] - 5, ...state.vert]
        })
      })
    } else if (this.state.direction == 'r' && this.state.side[0] != 500) {
      this.setState((state) => {
        return({
          side: [state.side[0] + 5, ...state.side],
          vert: [state.vert[0], ...state.vert]
        })
      })
    } else if (this.state.direction == 'd' && this.state.vert[0] != 300) {
      this.setState((state) => {
        return({
          side: [state.side[0], ...state.side],
          vert: [state.vert[0] + 5, ...state.vert]        
        })
      })
    } else {
      this.setState({
        gOver: true
      })
    }
    for (let i = 1; i < this.state.vert.length - 1; i++) {
      if (this.state.vert[0] == this.state.vert[i] && this.state.side[0] == this.state.side[i]) {
        this.setState({
          gOver: true
        })
      }
    }
    if ((this.state.vert[0] == this.state.fruitV || this.state.vert[0] == this.state.fruitV - 5) && (this.state.side[0] == this.state.fruitH || this.state.side[0] == this.state.fruitH - 5)) {
      let fh = Math.floor(Math.random() * 96) * 5 + 10
      let fv = Math.floor(Math.random() * 56) * 5 + 10

      this.setState({
          score: this.state.score + 1,
          fruitV: fv,
          fruitH: fh
      }) 
    } else {
      this.setState((state) => {
        return({
          side: [...state.side.slice(0, state.side.length - 1)],
          vert: [...state.vert.slice(0, state.vert.length - 1)]
        }
        )
        
      })
    }
  }

  componentDidMount() {
    let fh = Math.floor(Math.random() * 96) * 5 + 10;
    let fv = Math.floor(Math.random() * 56) * 5 + 10;
    this.setState({
      fruitV: fv,
      fruitH: fh
    })
    this.tick = setInterval(() => this.move(), 75);
  }


  render() {

    const snke = this.state.side.map((piece, index) => {
      return (<div className="piece" style={{top: this.state.vert[index], left: piece}} />)
    })

    
    return( this.state.gOver == false ? (
      <div id="board" onKeyDown={this.handleKeypress}>
        {snke}
        <div className="fruit" style={{top: this.state.fruitV, left: this.state.fruitH}}/>
        <input readOnly="true" className="i" onKeyDown={this.handleKeypress} autoFocus tabIndex={-1} />
        <p className="score">{this.state.score}</p>
      </div>) : (
        <div>
          <p className="gO">Game Over</p>
          <button className="gObtn" onClick={() => again()}>Again</button>
        </div>
      )
    )
  }

}

export default App;