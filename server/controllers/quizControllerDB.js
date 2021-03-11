const db = require('../models/quizModels');

const quizControllerDB = {};

quizControllerDB.getQuestion = (req, res, next) => {
  if (res.locals.cookieSessionMatch || true) {
    console.log('get question fired');
    //grab random record from quiz question table
    const queryQuestion = `SELECT *
    FROM quiz_question
    ORDER BY RANDOM()
    LIMIT 5`;

    const resultArray = [];

    db.query(queryQuestion)
      .then((result) => {
        for (let i = 0; i < 5; i++) {
          const questionObject = {};

          const randQuestionId = result.rows[i]._id;
          const randQuestionText = result.rows[i].text;

          questionObject.question = randQuestionText;
          questionObject.questionID = randQuestionId;

          const queryChoices = `SELECT c._id, c.text, c.is_correct FROM quiz_question_choices c WHERE c.quiz_question_id = ${randQuestionId}`;

          db.query(queryChoices).then((qResult) => {
            const choices = qResult.rows;
            const randomNum = Math.floor(Math.random() * 4);
            for (let i = 0; i < randomNum; i++) {
              choices.unshift(choices.pop());
            }

            //choices key holds array of answer choices
            resultArray.push({ ...questionObject, choices });
            if (resultArray.length === 5) {
              res.locals.questions = resultArray;
              return next();
            }
          });
        }
      })
      .catch((err) => next(err));
  } else {
    return next();
  }
};

module.exports = quizControllerDB;
