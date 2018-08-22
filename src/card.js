import _ from 'lodash'
const SPADES = '♠️'
const CLUBS = '♣️'
const HEARTS = '♥️'
const DIAMONDS = '♦️'
const JACK = 'J'
const QUEEN = 'Q'
const KING = 'K'
const ACE = 'A'

const SUITS = [SPADES, CLUBS, HEARTS, DIAMONDS]
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

class Card{
  constructor(rank, suit, value) {
    this.suit = suit
    this.rank = rank
    this.value = value
  }
}

Card.all = function(){
  const cards = []
  SUITS.forEach(suit =>{
    RANKS.forEach(rank =>{
      cards.push(new Card( rank, suit ))
    })
  })

  return _.shuffle(cards)
}

module.exports = { all: Card.all }
