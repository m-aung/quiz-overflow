const db = require('../models/quizModels');

// see notes below

const questionController = {};

questionController.addQuestion = (req, res, next) => {
  console.log('hit questionController!');
  
  if (!req.body.add) return next('No questions to add!');
  if (!req.body.add.length) return next('Empty questions array!');
  
  const { add } = req.body;
  const questionArr = (typeof add[0] === 'string') ? [add] : add;
  const successMsg = (questionArr.length === 1) ? ' question added!' : ' questions added!'
  res.locals.addedMsg = questionArr.length + successMsg;
  
  for (let i = 0; i < questionArr.length; i++) {  
    const addOne = questionArr[i];    
    
    const questionText = addOne[0];
    const choices = addOne.slice(1);
    
    const addQuestionQuery = `INSERT INTO quiz_question (text) VALUES ('${questionText}')`;
    
    const questionIdQuery = `SELECT _id FROM quiz_question WHERE text = '${questionText}'`;
    
    db.query(addQuestionQuery)
    .then(data => {
      db.query(questionIdQuery)
      .then(res => {
        const id = res.rows[0]['_id'];
        
        for (let j = 0; j < choices.length; j++) {
          const text = choices[j];
          const tf = !j; 
          const addChoiceQuery = `INSERT INTO quiz_question_choices (quiz_question_id, text, is_correct) VALUES ('${id}','${text}','${tf}')`;
          
          db.query(addChoiceQuery);          
        }
      })
    })
    .catch(err =>{
      console.log("Error adding question");
      return next(err);
    });
    
  }
  return next();
}


module.exports = questionController;


// *************    NOTES    *************

// add question request format:

// first choice is always correct answer (shuffle when serving)

// Add single question (nested array not necessary):
// {"add": ["What is your favorite color?", "blue", "red", "yellow", "music"]}

// Add multiple questions (array of arrays):
// {"add": [["What is your favorite color?", "blue", "red", "yellow", "music"], ["What is your last name?", "X", "No", "Macgyver", "Potatohead"]]}



// psql terminal commands:

// select * from quiz_question;

// select * from quiz_question_choices;

// delete from quiz_question where _id < 1000;

// delete from quiz_question_choices where _id < 1000;



