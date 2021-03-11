const fetch = require('node-fetch');

const quizController = {};

const questions = [];
let anyMoreQuestions = true;

quizController.getQuestion = (req, res, next) => {
  if (res.locals.cookieSessionMatch) {
    // check if questions is empty, send response "OUT OF QUESTIONS"

    if (!anyMoreQuestions) {
      res.locals.questions = null;
      return next();
    }

    // if empty, call api, fill up questions
    if (!questions.length) {
      fetch('https://opentdb.com/api.php?amount=50&category=18&type=multiple')
        .then((data) => data.json())
        .then((data) => {
          if (data.response_code) {
            res.locals.questions = null;
            return next();
          }
          const { results } = data;

          const output = results.map((el) => {
            // error check el?
            const { question, correct_answer, incorrect_answers } = el;
            const choices = [];
            choices.push({ text: correct_answer, is_correct: true });
            const wrong = incorrect_answers.map((ele) => {
              return { text: ele, is_correct: false };
            });
            choices.push(...wrong);

            const randomNum = Math.floor(Math.random() * 4);
            for (let i = 0; i < randomNum; i++) {
              choices.unshift(choices.pop());
            }

            return { question, choices };
          });

          questions.push(...output);

          res.locals.questions = questions.splice(questions.length - 5);
          // console.log(res.locals.questions);
          return next();
        });
    } else {
      res.locals.questions = questions.splice(questions.length - 5);
      // console.log('rest: ',res.locals.questions[0]['choices'] )
      anyMoreQuestions = !!questions.length;
      return next();
    }
  } else {
    return next();
  }
};

module.exports = quizController;
