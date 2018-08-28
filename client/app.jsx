import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import StartScreen from './StartScreen'

export default class App extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return <div id="board"><StartScreen /></div>
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
