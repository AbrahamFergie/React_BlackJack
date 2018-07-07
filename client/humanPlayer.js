import React, { Component } from 'react'
import Hand from './hand'

export default class Player extends Component {
  constructor(props) {
    super(props)
  }
  // splitBool ?
  // <Hand handArray={handArray[0]} handTotal={handTotal}/><br /><br />
  // <Hand handArray={handArray[1]} handTotal={handTotal}/><br /><br />
  render () {
    const { name, bet, handTotal, handArray, bank, splitBool } = this.props
    console.log("=====splitBool======", splitBool)
    return (
      <div id="player">        
        <div className="bet-bank-display">
          <span id="bet">{'Your Bet: '}{bet}</span>
          <div id="bank">Bank: {bank}</div>
        </div>
        <Hand playerName={name} handArray={handArray} handTotal={handTotal}/><br /><br />
      </div>
    )
  }
}
