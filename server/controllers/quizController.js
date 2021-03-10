const db = require('../models/quizModels');
const quizController = {};

quizController.getQuestion = (req, res, next) => {
  if (res.locals.cookieSessionMatch) {
    console.log('get question fired');
    //grab random record from quiz question table
    const queryQuestion = `SELECT *
    FROM quiz_question
    ORDER BY RANDOM()
    LIMIT 5`; // make 10 question at a time for each query. (random in server side or client side)
    
// resultArray = [];
// loop i = 0 - 4, index of rows
// db.query
// questionObject = {};
// .then -> use result.rows[i] to make query for id,text,is_correct
// add results to questionObject.questionID, .question
// make query -> attach result to questionObject.choices
// push question object to resultArray
// continue loop through questionIDs
// put on res.locals.questions


    db.query(queryQuestion)
    .then((result) => {
      //create const to hold value of question ID
      const randQuestionId = result.rows[0]._id;
      //create const to hold value of question text
      const randQuestionText = result.rows[0].text;
      res.locals.question = randQuestionText;
      res.locals.questionID = randQuestionId;
      console.log(randQuestionId, `${res.locals.question}`);
      //selected id,text, and is correct from quiz questions table, only grabbing questions which match random question ID
      const queryChoices = `SELECT 
      c._id, 
      c.text, 
      c.is_correct
      FROM
      quiz_question_choices c
      WHERE
      c.quiz_question_id = ${randQuestionId}`;
      
      db.query(queryChoices).then((qResult) => {
        //choices const holds array of questions
        res.locals.choices = qResult.rows;
        console.log(res.locals.choices);
        return next();
      });
    })
    .catch((err) => next(err));
  } else {
    return next();
  }
};
module.exports = quizController;
