import React, { Component } from 'react'
import Hand from './Hand'

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
          <div id="bet">{'Your Bet: '}{bet}</div>
          <hr></hr>
          <div id="bank">Bank: {bank}</div>
        </div>
        <Hand playerName={name} handArray={handArray} handTotal={handTotal}/><br /><br />
      </div>
    )
  }
}
