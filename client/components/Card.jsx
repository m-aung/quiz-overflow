import React from 'react';
import { decode } from 'html-entities';

const Card = (props) => {
  // console.log('Card:render fired...');
  const choices = props.card.choices;

  const onSubmit = (e) => {
    // console.log('Card:onSubmit fired...');
    e.preventDefault();

    let selected = document.querySelector('input[name="quiz"]:checked');
    if (selected) {
      selected = selected.id.slice(-1);

      if (choices[selected].is_correct) {
        props.correctChoice(props.currentScore, props.highScore);
        // props.getNewCard(props.deck);

        // console.log('AAAAAAAAAAAAAAAAAA', props.currentScore, props.highScore);
        // if (props.currentScore > props.highScore) {
        //   props.newHighScore(props.currentScore);
        //   props.updateHighScore(props.currentScore);
        //   console.log('New Highscore!!!');
        // }
      }
      props.getNewCard(props.deck);
    }
  };

  let questArr = [];
  for (let i = 0; i < 4; i++) {
    questArr.push(
      <div key={`question${i}`}>
        <input
          className="multipleChoice"
          type="radio"
          name="quiz"
          id={`choice${i}`}
        />
        <label htmlFor={`choice${i}`}>{decode(choices[i].text)}</label>
      </div>
    );
  }

  return (
    <div className="card">
      <form
        onSubmit={(e) => {
          onSubmit(e);
        }}
      >
        <div className="questionContainer">
          <div className="questionLabel">{decode(props.card.question)}</div>
          <hr className="questionDivider"></hr>
          {questArr}
        </div>
        <br />

        <div className="questionSubmitBtnContainer">
          <input className="questionSubmitBtn" type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};

export default Card;
