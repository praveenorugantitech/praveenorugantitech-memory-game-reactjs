import React, { Component } from 'react'
import CardFront from './CardFront'
import CardBack from './CardBack'

export default class Card extends Component {

    state = {
        cardFaceUp: false
    }
   
    // Changes cardFaceup to true and switches CardBack to CardFront.
    // and runs choosenCards for the img.
    flipOneCard = (img) => {
        this.setState({
            cardFaceUp: true
        })
        this.props.choosenCards(img)
    }
    //

    // Checks to see if there is a firstCard, and if not it switches CardFront to CardBack.
    // we want to find a way to stop a third card from being clicked. 
    // for now we are setting a shorter time out.
    reverseCard = () => {
        if (!this.props.firstCard)
            setTimeout(()=> {
                this.setState({
                    cardFaceUp: false
                })
            }, 500)
    }
    //

    render() {
       const {img} = this.props
        return (
            <>
            {this.state.cardFaceUp || img.faceUp ?  
            <CardFront img={img} reverseCard={this.reverseCard}/>
             : 
            <CardBack img={img} flipOneCard={this.flipOneCard}/> }
            </>
        )
    }
}



