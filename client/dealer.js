import React, { Component } from 'react'
import Hand from './hand'
import Deck from '../src/deck'

export default class Dealer extends Component {
  constructor(props) {
    super(props)
  }
  render () {
    const { name, handTotal, dHandArray, gamePhase } = this.props
    return (
      <div>
        <Hand dHandArray={dHandArray} dHandTotal={handTotal} currentPhase={gamePhase}/>
      </div>
    )
  }
}
