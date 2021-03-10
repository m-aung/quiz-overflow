import { bindActionCreators } from 'redux';
import * as types from './actionTypes';

export const getNewCard = () => (dispatch) => {
	dispatch({ type: types.NEW_CARD_REQUEST });
	fetch('/quiz-overflow')
		.then((res) => res.json())
		.then((res) => {
			let card = {
				question: res.question,
				choices: [
					res.choices[0],
					res.choices[1],
					res.choices[2],
					res.choices[3],
				],
			};
			console.log('Card from db', card);
			return card;
		})
		.then((card) =>
			dispatch({
				type: types.NEW_CARD_RECEIVED,
				payload: card,
			})
		);
};

export const getHighScore = () => (dispatch) => {
	dispatch({ type: types.HIGHSCORE_REQUEST });
	fetch('/high-score')
		.then((res) => res.json())
		.then((res) =>
			dispatch({
				type: types.HIGHSCORE_RECEIVED,
				payload: res.highScore,
			})
		);
};

export const updateHighScore = (score) => (dispatch) => {
	dispatch({ type: types.UPDATING_HIGHSCORE });
	fetch('/high-score', {
		method: 'put',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ score: score }),
	})
		.then((res) => res.json())
		.then((res) =>
			dispatch({
				type: types.HIGHSCORE_UPDATED,
				payload: res,
			})
		);
};

export const newHighScore = (score) => ({
	type: types.NEW_HIGHSCORE,
	payload: score,
});

export const correctChoice = (num) => ({
	type: types.CORRECT_CHOICE,
	payload: num,
});
