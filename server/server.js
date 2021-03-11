const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const quizController = require('./controllers/quizController');
const quizControllerDB = require('./controllers/quizControllerDB');
const userController = require('./controllers/userController');
const cookieController = require('./controllers/cookieController');
const sessionController = require('./controllers/sessionController');
const scoreController = require('./controllers/scoreController');
const questionController = require('./controllers/questionController');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/build', express.static(path.resolve(__dirname, '../build')));

app.get('/', (req, res) => {
  //get request to login/signup page
  return res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
});

app.get('/check-session', sessionController.isLoggedIn, (req, res) => {
  console.log('session cookieSessionMatch', res.locals.cookieSessionMatch);
  return res.status(200).json(res.locals.cookieSessionMatch);
});

app.post(
  '/signup',
  userController.createUser,
  cookieController.setSSIDCookie,
  sessionController.startSession,
  (req, res) => {
    // on failed signup, send boolean false
    if (res.locals.alreadyExists) {
      return res
      .status(200)
      .json({ message: 'Username already taken!', loggedIn: false });
    }
    // on successful signup, send boolean true
    return res.status(200).json({ message: 'New user added!', loggedIn: true });
  }
  );
  
  app.post(
    '/login',
    userController.verifyUser,
    cookieController.setSSIDCookie,
    sessionController.startSession,
    (req, res) => {
      if (!res.locals.loggedIn) {
        // on failed sign in, send boolean false- to update
        return res
        .status(200)
        .json({ message: 'Incorrect username/password', loggedIn: false });
      }
      // on successful sign in, send boolean true - to update
      return res
      .status(200)
      .json({ message: 'Log in successful', loggedIn: true });
    }
    );
    
    app.get(
      '/quiz-overflow',
      sessionController.isLoggedIn,
      quizController.getQuestion,
      (req, res) => {
        console.log('session cookieSessionMatch', res.locals.cookieSessionMatch);
        // after frontend is ready to test, see if we can redirect to '/' in the case a session expires
        // after logging in or if we need to send a res.locals with empty key values for question and choices.
        
        if (!res.locals.cookieSessionMatch) {
          return res.status(200).json('Invalid session');
        }
        return res.status(200).json(res.locals);
      }
      );
      
      app.get(
        '/quiz-overflowDB',
        // sessionController.isLoggedIn,
        quizControllerDB.getQuestion,
        (req, res) => {
          console.log('session cookieSessionMatch', res.locals.cookieSessionMatch);
          // if (!res.locals.cookieSessionMatch) {
          //   return res.status(200).json('Invalid session');
          // }
          return res.status(200).json(res.locals);
        }
        )
        
        app.get(
          '/high-score',
          sessionController.isLoggedIn,
          scoreController.getHighScore,
          (req, res) => {
            if (!res.locals.cookieSessionMatch) {
              return res.status(200).json('Invalid session');
            }
            return res.status(200).json(res.locals);
          }
          );
          
          app.put(
            '/high-score',
            sessionController.isLoggedIn,
            scoreController.getHighScore,
            scoreController.updateHighScore,
            // scoreController.getHighScore,
            (req, res) => {
              if (!res.locals.cookieSessionMatch) {
                return res.status(200).json('Invalid session');
              }
              return res.status(200).json(res.locals);
            }
            );
            
            app.post('/questions', questionController.addQuestion, (req, res) => {
              return res.status(200).send(res.locals.addedMsg);
            })
            
            app.get('/leaderboard', scoreController.getLeaderboard, (req, res) => {
              // error check?
              return res.status(200).json(res.locals.leaderboard);
            }
            )
            
            app.use((req, res, next) => {
              return res.status(404).send('Not Found');
            });
            
            app.use((err, req, res, next) => {
              console.log('error handler', err);
              return res.status(500).send('Internal Server Error');
            });
            
            app.listen(3000, () => {
              console.log('Server listening on port 3000');
            });
            
