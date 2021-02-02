import React, { Component } from 'react'

export default class CardBack extends Component {


    render() {
        const {img,flipOneCard} = this.props
        return (
            <div className="card back flip" onClick={() => flipOneCard(img)} >
                <img src="https://raw.githubusercontent.com/praveenorugantitech/praveenorugantitech-memory-js/master/Demo/images/lco.png" alt='logo'/>
           </div>
        )
    }
}
