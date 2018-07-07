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
      return <div className="result-winner"></div>
    }
    if(resultImage === "result-loser"){
      return <div className="result-loser">Loser</div>
    }
    if(resultImage === "result-draw"){
      return <div className="result-draw"></div>
    }
  }
}
