import React, { Component } from 'react'

export default class Hand extends Component{
  constructor(props) {
    super(props)
  }

  showCardUpNDown() {
    const { dHandArray } = this.props
    let cards
    dHandArray == undefined || dHandArray.length < 1 ?
      cards = [] :
      cards = dHandArray.map((card, key) => {
        return ( key !== 1 ?
          <div>
            <div className="card" key={key}>
              <div id="card-rank">{ card.rank.name }</div>
              <div id="card-suit">{ card.suit }</div>
            </div>
          </div> : null
        )
      })
    return cards
  }

  showDealerCards() {
    const { dHandArray } = this.props
    let cards
    if ( dHandArray == undefined || dHandArray.length < 1 ) {
      cards = []
    } else {
      cards = dHandArray.map( (card, key) => {
        return (
          <div className="card" key={key}>
            <div id="card-rank">{ card.rank.name }</div>
            <div id="card-suit">{ card.suit }</div>
          </div>
        )
      })
    }
    return cards
  }

  showCards() {
    const { handArray } = this.props
    let cards
    if ( handArray == undefined || handArray.length < 1 ) {
      cards = []
    } else {
      cards = handArray.map( (card, key) => {
        return (
          <div className="card" key={key}>
            <div id="card-rank">{ card.rank.name }</div>
            <div id="card-suit">{ card.suit }</div>
          </div>
        )
      })
    }
    return cards
  }

  render () {
    let { dHandArray, dHandTotal, handTotal, playerName, currentPhase } = this.props

    return ( dHandArray ?
      currentPhase === 3 ?
      <div id="hand">
        <div id="dealer-name">Dealer</div>
        <div id="hand-value">
          { dHandTotal }
        </div>
        { this.showDealerCards() }
      </div>:
      <div id="hand">
        <div id="dealer-name">Dealer</div>
        { this.showCardUpNDown() }
      </div> :
      <div id="hand">
        <div id="player-name">{playerName}</div>
        <div id="hand-value">
          { handTotal }
        </div>
        { this.showCards() }
      </div>
    )
  }
}
