import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '../components/Card';
import {
  correctChoice,
  getNewDeck,
  updateHighScore,
  getHighScore,
  newHighScore,
  getNewCard,
} from '../actions/actions';
import PlayerStats from '../components/PlayerStats';

const mapStateToProps = (state) => ({
  card: state.quiz.card,
  cardsThisSession: state.quiz.cardsThisSession,
  correctAnswers: state.quiz.correctAnswers,
  deck: state.quiz.deck,
  // new component?
  // currentScore: state.quiz.currentScore,
  // highScore: state.quiz.highScore,
});

const mapDispatchToProps = {
  getNewDeck,
  correctChoice,
  getHighScore,
  updateHighScore,
  newHighScore,
  getNewCard,
};

class CardContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // console.log('CardContainer componentDidMount fired...');
    this.props.getHighScore();
    this.props.getNewDeck();
  }

  render() {
    // console.log('CardContainer render fired...');
    return (
      <div className="cardAndStatsContainer">
        <PlayerStats className="playerStatsContainer invisible" />

        <div className="cardContainer">
          <Card
            currentScore={this.props.currentScore}
            newHighScore={this.props.newHighScore}
            highScore={this.props.highScore}
            updateHighScore={this.props.updateHighScore}
            correctAnswers={this.props.correctAnswers}
            correctChoice={this.props.correctChoice}
            card={this.props.card}
            getNewCard={this.props.getNewCard}
            deck={this.props.deck}
          />
        </div>

        <PlayerStats className="playerStatsContainer" />
      </div>
    );
  }
}

/*  Once props are mapped connect will be used here  */
export default connect(mapStateToProps, mapDispatchToProps)(CardContainer);
