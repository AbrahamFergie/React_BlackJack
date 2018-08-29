import _ from 'lodash'

import Card from './card.js'

export default class Deck {
  constructor () {
    this.cardPile = []
    this.numberOfDecks = 2
  }
  
  build() {
    const cards = [], SPADES = '♠️', CLUBS = '♣️', HEARTS = '♥️', DIAMONDS = '♦️', SUITS = [SPADES, CLUBS, HEARTS, DIAMONDS]
    const RANKS = [
      {name:"2", value:2},
      {name:"3", value:3},
      {name:"4", value:4},
      {name:"5", value:5},
      {name:"6", value:6},
      {name:"7", value:7},
      {name:"8", value:8},
      {name:"9", value:9},
      {name:"10", value:10},
      {name:"J", value:10},
      {name:"Q", value:10},
      {name:"K", value:10},
      {name:"A", value:11}
    ]
    SUITS.forEach(suit =>{
      RANKS.forEach(rank =>{
        cards.push(new Card( rank, suit ))
      })
    })

    return _.shuffle(cards)
  }
  generateCards() {
    console.log("called")
    //52 deck set of standard playing cards and double it
    for(let i = this.numberOfDecks; i > 0; i--){
      this.cardPile = this.cardPile.concat(this.build())
    }
  }
}
