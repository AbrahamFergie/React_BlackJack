import React, { Component } from 'react'
import Hand from './hand'

export default class Player extends Component {
  constructor(props) {
    super(props)
    this.human = false
    this.name = String
    this.bank = 100
  }


  render () {
    const player = this.props.player
    return <div id={player}>
      {player}<br /><br /> {"wallet: " + this.bank}<br /><br />
      "Hand": <Hand /> </div>
  }
}
