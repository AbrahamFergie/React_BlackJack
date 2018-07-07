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
              <div id="cardRank">{ card.rank.name }</div>
              <span id="cardSuit">{ card.suit }</span>
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
            <div id="cardRank">{ card.rank.name }</div>
            <span id="cardSuit">{ card.suit }</span>
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
            <div id="cardRank">{ card.rank.name }</div>
            <span id="cardSuit">{ card.suit }</span>
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
        <div id="dealerName">Dealer</div>
        <div id="handValue">
          { dHandTotal }
        </div>
        { this.showDealerCards() }
      </div>:
      <div id="hand">
        <div id="dealerName">Dealer</div>
        { this.showCardUpNDown() }
      </div> :
      <div id="hand">
        <span id="playerName">{playerName}</span>
        <div id="handValue">
          { handTotal }
        </div>
        { this.showCards() }
      </div>
    )
  }
}
