import React, { Component } from 'react'

import Hand from './hand.js'

export default class Dealer extends Component {
  constructor(props) {
    super(props)
  }
  render () {
    const { handTotal, dHandArray, gamePhase } = this.props
    return (
      <div>
        <Hand dHandArray={dHandArray} dHandTotal={handTotal} currentPhase={gamePhase}/>
      </div>
    )
  }
}
