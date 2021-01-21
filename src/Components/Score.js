import React, { Component } from 'react'

export default class Score extends Component {
    render() {
        return (
            <div>
                {this.props.gameStatus === "winner" ?
                    <div className='scoreboard'>
                    <p>Score : {this.props.score}</p>
                    <p>Bonus: {this.props.finalScore - this.props.score }</p>
                    <p>Total : {this.props.finalScore}</p>
                    </div>
                    :
                    <div className='scoreboard'>
                    <p> Score: {this.props.score} </p>
                    <p> Current Streak: {this.props.streak} </p>
                    </div>}
            </div>
        )
    }
}
