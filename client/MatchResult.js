import React, { Component } from 'react'

export default class MatchResult extends Component {
  constructor(props) {
    super(props)
    this.state = {
      resultImage: "result-" + this.props.result
    }
  }

  render() {
    let { resultImage } = this.state
    if(resultImage === "result-winner"){
      return <div className="result-winner"><img className="result-winner-image" src="../images/winner-pic.jpg"/></div>
    }
    if(resultImage === "result-loser"){
      return <div className="result-loser">
               <h1 className="result-loser-text">Lose</h1>
               <img className="result-loser-image" src="../images/loser-pic.jpg"/>
             </div>
    }
    if(resultImage === "result-draw"){
      return <div className="result-draw"><img className="result-draw-image" src="../draw-pic.jpg"/></div>
    }
  }
}
