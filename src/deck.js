import _ from 'lodash'
import { all } from './Card'

export default class Deck{
  constructor () {
    this.cards = all()
    this.numberOfDecks = 2
  }

  generateCards () {
    //52 deck set of standard playing cards and double it
    for(let i = this.numberOfDecks; i < 0; i--){
      this.cards = this.cards.concat(Card.all())
      this.numberOfCards = this.cards.length
    }
  }

  createDeck(){
    const deck = shuffleDeck()
    return deck
  }
}
