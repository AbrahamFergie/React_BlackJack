class Card{
  constructor(rank, suit, checked = false) {
    this.suit = suit
    this.rank = rank
    this.checked = checked
  }
}

module.exports = Card
