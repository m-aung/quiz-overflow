import React from 'react';

const Card = (props) => (
  <div className="cardContainer">
    <div className="card">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.persist();

          for (let i = 0; i < 4; i++) {
            if (e.target[i].checked) {
              if (e.target[i].attributes.iscorrect.value === 'true') {
                props.correctChoice();
                console.log('correct');
                if (props.currentScore > props.highScore) {
                  // why two calls here? can they be grouped
                  // highScore being updated here
                  props.newHighScore(props.currentScore);
                  props.updateHighScore(props.currentScore);
                  console.log('New Highscore!!!');
                }
              } else console.log('wrong');
            }
          }
        }}
      >
        <div>
          {/* <label className="questionLabel">{props.card.question}</label><br></br><br></br> */}
          <div className="questionLabel">{props.card.question}</div>
          <span className="questionDivider"></span>
          {/* <div className="multipleChoiceAnswer" iscorrect={`${props.card.choices[0].is_correct}`}> 
          {props.card.choices[0].text}
        </div> */}
          <input
            className="multipleChoiceAnswer"
            type="radio"
            name="quiz"
            value="choice1"
            iscorrect={`${props.card.choices[0].is_correct}`}
          />{' '}
          {props.card.choices[0].text}
          <br></br>
          <br></br>
          <input
            className="multipleChoiceAnswer"
            type="radio"
            name="quiz"
            value="choice2"
            iscorrect={`${props.card.choices[1].is_correct}`}
          />{' '}
          {props.card.choices[1].text}
          <br></br>
          <br></br>
          <input
            className="multipleChoiceAnswer"
            type="radio"
            name="quiz"
            value="choice3"
            iscorrect={`${props.card.choices[2].is_correct}`}
          />{' '}
          {props.card.choices[2].text}
          <br></br>
          <br></br>
          <input
            className="multipleChoiceAnswer"
            type="radio"
            name="quiz"
            value="choice4"
            iscorrect={`${props.card.choices[3].is_correct}`}
          />{' '}
          {props.card.choices[3].text}
          <br></br>
        </div>
        <br></br>

        <div className="questionSubmitBtnContainer">
          <input className="questionSubmitBtn" type="submit" value="Submit" />
          <input
            onClick={(e) => props.getNewCard(props.deck)}
            className="questionSubmitBtn"
            type="submit"
            value="TEMP"
          />
        </div>
      </form>
    </div>
  </div>
);

export default Card;
