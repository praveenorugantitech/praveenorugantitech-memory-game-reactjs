import React, { Component } from 'react'
import CardList from '../Components/CardList';
import Winner from '../Components/Winner'
import Score from '../Components/Score'

// Sets up images before game start.
const imgs =[
  {id:1,url:'https://raw.githubusercontent.com/praveenorugantitech/praveenorugantitech-memory-js/master/Demo/images/dhoni.jpg', faceUp:false},
  {id:2 ,url:'https://raw.githubusercontent.com/praveenorugantitech/praveenorugantitech-memory-js/master/Demo/images/ganguly.jpg', faceUp:false},
  {id:3,url:'https://raw.githubusercontent.com/praveenorugantitech/praveenorugantitech-memory-js/master/Demo/images/kaif.jpg',faceUp:false },
  {id:4 ,url:'https://raw.githubusercontent.com/praveenorugantitech/praveenorugantitech-memory-js/master/Demo/images/mithali.jpg', faceUp:false},
  {id:5,url:'https://raw.githubusercontent.com/praveenorugantitech/praveenorugantitech-memory-js/master/Demo/images/rohit.jpg',faceUp:false},
  {id:6 ,url:'https://raw.githubusercontent.com/praveenorugantitech/praveenorugantitech-memory-js/master/Demo/images/sachin.jpg',faceUp:false},
  {id:7,url:'https://raw.githubusercontent.com/praveenorugantitech/praveenorugantitech-memory-js/master/Demo/images/smriti.jpg',faceUp:false},
  {id:8 ,url:'https://raw.githubusercontent.com/praveenorugantitech/praveenorugantitech-memory-js/master/Demo/images/virat.jpg',faceUp:false},
  {id:9,url:'https://raw.githubusercontent.com/praveenorugantitech/praveenorugantitech-memory-js/master/Demo/images/ashwin.jpg', faceUp:false},
  {id:10 ,url:'https://raw.githubusercontent.com/praveenorugantitech/praveenorugantitech-memory-js/master/Demo/images/siraj.jpg',faceUp:false},
  {id:11,url:'https://raw.githubusercontent.com/praveenorugantitech/praveenorugantitech-memory-js/master/Demo/images/pant.jpg',faceUp:false},
  {id:12 ,url:'https://raw.githubusercontent.com/praveenorugantitech/praveenorugantitech-memory-js/master/Demo/images/natarajan.jpg',faceUp:false}
];

let newObjects = [...imgs,...imgs]
//

class Game extends Component {
 state = {
  gameStatus: "play",
  moves: 0,
  images: [],
  firstCard: null,
  secondCard: null,
  matchedPairs: [],
  timer: 0,
  winTime: null,
  streak:0,
  score: 0,
  finalScore: 0
}

 // Handles the switch between winner and play.
 redirect = (page) => {
  if (this.state.gameStatus === 'winner'){
    // Switches from winner to play.
    this.setState({
        images: [],
        gameStatus: page,
        moves: 0,
        matchedPairs:[],
        timer: 0,
        streak: 0,
        score: 0,
        finalScore: 0
    })
  }
  else {
     // Switches from play to winner.
    this.setState(prevState =>{
      return  {gameStatus: page,
      winTime: prevState.timer,
      finalScore:  prevState.score + Math.round(((24*12)/ (prevState.timer* prevState.moves)) * 1000)
      }
    })
  }
}
//

// Shuffles the images.
shuffleImages = (array)=> {
  let i = array.length - 1;
  for (; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

// Sets the state with shuffled images.
setCards = () => {
  this.setState({
    images: this.shuffleImages(newObjects)
  })
}
//

// Starts the game by setting timer and new cards.
componentDidMount =() => {
  setInterval(
    () => this.setState({ timer:( this.state.timer + 1)}),
      1000
  );
  this.setCards()
}
//

// It selects first and second card and sets the state, and faceUp value to true. And runs the setMoves function.
 choosenCards = (img) => {
  if(this.state.firstCard === null){
     this.setState({
         firstCard: {...img, faceUp:true}
     })
 } else if(this.state.firstCard){
     this.setState({
         secondCard: {...img, faceUp:true}
     },
     () => this.compareCards())
 }
}
//

// Sorts through the images array and replaces an image's faceUp value false with true, and returns a new array.
handleFaceUp = (images, card) => {
   return images.map(image => {
        if (image.id === card.id) {
           return card
        } else {
            return image
        }
    })
}

// Sets the state of firstCard and secondCard to null.
clearCards = () => {
 this.setState({
     firstCard: null,
     secondCard: null
 })
}

// Compares the firstCard and secondCard, if their id's are same,
// runs the handleFaceup function, and sets the state of images with
// the new array that is returned by handleFaceup func.,
// then sets the matchedPairs with the firstCard id.
// If their id's are not same, it returns old matchedPairs.
// At the end runs the clearCards function.
compareCards = () => {
    if(this.state.firstCard.id ===  this.state.secondCard.id){
        const newImages= this.handleFaceUp(this.state.images, this.state.firstCard)
        this.setState(prevState =>{
           return {
             images: newImages,
             matchedPairs:[ ...this.state.matchedPairs, this.state.firstCard.id],
             moves: this.state.moves + 1,
             streak: this.state.streak + 1,
             score: prevState.score + 10 + (this.state.streak * 10)
           }
          })
    } else {
        this.setState({
            matchedPairs: [...this.state.matchedPairs],
            moves: this.state.moves + 1,
            streak: 0
          })
        }
    this.clearCards()
}
//

// we want to eventually show players a breakdown of their scores
// to do that we are going to have to update our math
//that we can see our point bonuses or multipliers for streak time and moves.
      /*
      points: x
      streak bouns: n
      time bonus: y
      move bonus: z
      */

// Checks the length of matchedPairs array, if it equals to 12,
// and runs the redirect function.
winner = () => {
 if (this.state.matchedPairs.length  === 12){
    // setTimeout(() => {this.redirect('winner')}, 20)
    this.redirect('winner')
 }
}
//

// Resets the game by running redirect funtion with play,
// sets the  new cards.
resetGame = () => {
  this.redirect('play') 
  this.setCards(newObjects)
}
//

// Renders the CardList or Winner component based on gameStatus.
renderGame = () => {
   switch (this.state.gameStatus){
    case "play":
      return <CardList images={this.state.images} choosenCards={this.choosenCards} winner={this.winner} firstCard={this.state.firstCard}/>
    case "winner":
      return <Winner resetGame={this.resetGame} finalScore={this.state.finalScore} />
   }
}

 render() {
  return(
   <div className="game">
          <Score gameStatus={this.state.gameStatus} streak={this.state.streak} score={this.state.score} finalScore={this.state.finalScore}/>
         <div className='timer'>
         {this.state.gameStatus === "play"  ?  <p>  Time : {this.state.timer} </p>  : <p> Your time was : {this.state.winTime} </p>}
         <p className="moves">Moves: {this.state.moves}</p>
         </div>
         {this.renderGame()}
   </div>
    )
   }
 }

export default Game