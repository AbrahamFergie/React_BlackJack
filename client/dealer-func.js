import React, { PropTypes } from 'react'
import dealer from '../src/dealer'
import Hand from './hand'
import Deck from '../src/deck'

const Dealer = ({ name, handArray }) => {

  return (
      <div id="#">
        <span> {name} </span>
        <Hand handArray={handArray}/>
       {/* {"Dealer"}<br /><br />
     "Hand: "<Hand /> <Deck /> */}
      </div>
  )
}

Dealer.propTypes = {
  name: PropTypes.string,
  handArray: PropTypes.array
}

export default Dealer
