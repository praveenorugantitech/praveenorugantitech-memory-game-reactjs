import React from "react";

export default class Winner extends React.Component {
  state = {
    disable: false,
    username: "",
    highScore: false,
    userId: null,
    playerScore: null,
  };

  handleChange = (e) => {
    console.log(e.target.value);
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { resetGame } = this.props;
    return (
      <div className="winner">
        <h1>You Won!!</h1>
        <img
          alt=""
          src="https://raw.githubusercontent.com/praveenorugantitech/praveenorugantitech-test/master/images/happy.gif"
        />
        <button className="button" onClick={() => resetGame()}>
          Reset
        </button>
      </div>
    );
  }
}
