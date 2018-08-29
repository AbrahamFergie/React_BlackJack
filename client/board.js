import React, { Component } from 'react'

import Player from './Player'
import Dealer from './Dealer'
import Deck from '../src/deck'
import MatchResult from './MatchResult'

export default class Board extends Component {
   constructor( props ){
    super( props )
    this.state = {
      deck: new Deck(),
      dealer: {},
      player: {},
      cardsRemaining: [],
      cardsUsed: [],
      roundResult: null,
      phase: 0
    }
  }

  componentDidMount() {
    this.setupDeckAndPlayers()
  }

  setupDeckAndPlayers() {
    let { deck, phase } = this.state
    const dealer = {
      name: 'Dealer',
      stay: false,
      hand: [],
      cardTotal: 0
    }
    const player = {
      name: this.props.playerName,
      bank: 1000,
      bet: 0,
      stay: false,
      split: false,
      hand: [],
      cardTotal: 0
    }
    phase = 1
    deck.generateCards()
    this.setState(Object.assign(this.state, { dealer, player, phase, deck }))
  }

  deal() {
    let { deck, dealer, player, phase } = this.state

    if(phase === 1){
      if(player.bet === 0) return

      for(let i = 0;i < 2; i++){
        dealer.hand.push( deck.cardPile.shift() )
        player.hand.push( deck.cardPile.shift() )
      }
      player.cardTotal = player.hand.reduce((acc, curr) => acc + curr.rank.value, 0)
      dealer.cardTotal = dealer.hand.reduce((acc, curr) => acc + curr.rank.value, 0)

      phase = 2
      this.setState(Object.assign(this.state, { player, dealer, deck, phase }))
    }
  }

  bet(chipType) {
    let { player, roundResult, phase } = this.state
    if(phase === 1){
      if(roundResult) roundResult = null
      switch(chipType){
        case "white":
          player.bet = player.bet + 1
          player.bank -= 1
          break
        case "red":
          player.bet = player.bet + 5
          player.bank -= 5
          break
        case "green":
          player.bet = player.bet + 25
          player.bank -= 25
          break
        case "blue":
          player.bet = player.bet + 50
          player.bank -= 50
          break
        case "black":
          player.bet = player.bet + 100
          player.bank -= 100
          break
      }
      player.bet = parseInt(player.bet)
      this.setState(Object.assign(this.state, { player, roundResult, phase }))
    }
  }

  dealerBust(dealer) {
    if(dealer.cardTotal > 21) {
      for(let i = 0; i < dealer.hand.length; i++) {
        if(dealer.hand[i].rank.name === "A") {
          dealer.hand[i].rank.value = 1
          return false
        } else {
          dealer.stay = true
          return true
        }
      }
    }
    return false
  }

  checkForAce(hand) {
    for (var i = 0; i < hand.length; i++) {
      if(hand[i].rank.name === "A" && !hand[i].checked){
        hand[i].rank.value = 1
        hand[i].checked = true
        return true
      }
    }
    return false
  }

  getHandValue(hand) {
    return hand.reduce((acc, curr) => acc + curr.rank.value, 0)
  }

  hit() {
    let { deck, player, dealer, phase } = this.state

    if(phase === 2){
      player.hand.push( deck.cardPile.shift() )
      player.cardTotal = this.getHandValue(player.hand)
      if(player.cardTotal > 21){
        if(!this.checkForAce(player.hand)){
          this.setState(Object.assign(this.state, { player, dealer, deck }))
          setTimeout(this.settle.bind(this),700)
        }
      }
      player.cardTotal = this.getHandValue(player.hand)

      this.setState(Object.assign(this.state, { player, dealer, deck }))
      if(player.hand.length >= 5 && player.cardTotal <= 21) {
        setTimeout(this.settle.bind(this), 1000)
      }
    }
  }
  
  dealerHit() {
    let { dealer, deck } = this.state

    if(this.dealerBust(dealer)){
      this.gameFlow()
    }else{
      dealer.hand.push( deck.cardPile.shift() )
    }
    dealer.cardTotal = this.getHandValue(dealer.hand)

    this.setState(Object.assign(this.state, { dealer, deck }))
    setTimeout(this.gameFlow.bind(this), 1000)
  }
  
  stay() {
    let { player, dealer, phase } = this.state

    if(phase === 2){
      player.stay = true
      phase = 3
      this.setState(Object.assign(this.state, { player, dealer, phase }))
      setTimeout(this.gameFlow.bind(this), 1000)
    }
  }

  // splitInitialize() {
  //   let { player, deck } = this.state
  //   //send signal to player to split hand in two
  //   // if(player.hand[0] === player.hand[1]){}
  //   player.split = true
  //   // player.push(player.hand[0])
  //   this.setState(Object.assign(this.state, { player, deck }))
  //   //apply current bet to both hands and subtract that same amount from bank
  //   //deal another card to each hand from deck
  //   //calculate both hand values
  // }

  gameFlow() {
    let { player, dealer } = this.state

    if( player.stay === true && dealer.stay === true ){
      this.setState(Object.assign(this.state, { player, dealer }))
      this.settle()
    }else{
      if( player.stay === true ){
        this.setState(Object.assign(this.state, { player, dealer }))
        this.dealerTurn(dealer)
      }
    }
  }

  dealerTurn(dealer) {
    if(dealer.cardTotal >= 17){
      dealer.stay = true
      this.gameFlow()
    }else{
      this.dealerHit()
    }
  }
  
  settle() {
    let { dealer, player, roundResult, phase } = this.state

    if(player.cardTotal === dealer.cardTotal){
      roundResult = <MatchResult result='draw' bet={player.bet} />
      player.bank += player.bet
    }else if(
      21 - player.cardTotal  < 21 - dealer.cardTotal && 
      player.cardTotal < 22 && 
      player.cardTotal > dealer.cardTotal || dealer.cardTotal > 21
    ){
      roundResult = <MatchResult result='winner' bet={player.bet} />
      player.bank = (player.bet * 2) + player.bank
    }else if(player.hand.length >= 5 && player.cardTotal <= 21){
      roundResult = <MatchResult result='winner' bet={player.bet} />
      player.bank = (player.bet * 2) + player.bank
    }else{
      console.log("lost, player.hand, dealer.hand", player.hand, dealer.hand)
      roundResult = <MatchResult result='loser' bet={player.bet} />
    }
    this.setState(Object.assign(this.state, { player, roundResult, phase }))
    setTimeout(this.reset.bind(this), 2000)
  }
  
  reset() {
    let { player, dealer, deck, roundResult, phase } = this.state

    dealer.hand = []
    dealer.stay = false
    dealer.cardTotal = 0

    player.hand = []
    player.bet = 0
    player.stay = false
    player.cardTotal = 0

    phase = 1
    roundResult = null

    deck = new Deck()
    deck.generateCards()
    this.setState(Object.assign(this.state, {
      player, dealer, deck, roundResult, phase
    }))
  }
  //

  // Note** Split functionality coming soon!

  // <button id="split" onClick={this.splitInitialize.bind(this)}>Split</button>

  //
  render () {
    let { dealer, player, roundResult, phase } = this.state

    let dealerComponent = <Dealer name={dealer.name} handTotal={dealer.cardTotal} dHandArray={dealer.hand} gamePhase={phase} />
    let playerComponent = <Player name={player.name} bet={player.bet} handTotal={player.cardTotal} handArray={player.hand} splitBool={player.split} bank={player.bank} />
    return (
      <div id="foo">
        <div id="dealer-space">
          <div id="dealer"> { dealerComponent } </div>
        </div>
        {
          phase === 1 ? 
          <div id="bet-message-container">
            <img id="bet-message-image" src="https://teamgolfusa.com/wp-content/uploads/2016/03/black-large.png"/>
            <h1 id="player-message">Place Bet!</h1></div> :
          <div className="start-screen-banner2">React BlackJack</div>
        }
        <div id="player-space">
          <div className="hit-stay-buttons">
            <button id="hit" onClick={this.hit.bind(this)}>HIT</button>
            <button id="stay" onClick={this.stay.bind(this)}>STAY</button>
          </div>
          <div className="chips">
            <button onClick={this.bet.bind(this, "white")} id="white-chip">1</button>
            <button onClick={this.bet.bind(this, "red")} id="red-chip">5</button>
            <button onClick={this.bet.bind(this, "green")} id="green-chip">25</button>
            <button onClick={this.bet.bind(this, "blue")} id="blue-chip">50</button>
            <button onClick={this.bet.bind(this, "black")} id="black-chip">100</button>
            <button onClick={this.deal.bind(this)} id="set-button">SET-BET</button>
          </div>
          { playerComponent }
        </div>
        { roundResult }
      </div>
    )
  }
}