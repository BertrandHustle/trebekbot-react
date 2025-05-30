import React, { createContext, useEffect, useState } from 'react';

import GameBoard from 'components/tables/GameBoard';
import LoginForm from 'components/forms/LoginForm';
import LogoutButton from 'components/auth/LogoutButton';
import PlayerScorecard from 'components/cards/PlayerScorecard';
import Scoreboard from 'components/tables/Scoreboard';
import Timer from 'components/timer/Timer';
import ToastAlert from 'components/ToastAlert';

import API from 'TrebekbotAPI';
import { trebekbotUrls } from 'TrebekbotAPI';
import DailyDoubleModal from 'components/modals/DailyDoubleModal';
import AnswerModal from 'components/modals/AnswerModal';

//init
const initActiveQuestionTileId = JSON.parse(sessionStorage.getItem('activeQuestionTileId'));
const initAuthValue = JSON.parse(sessionStorage.getItem('isAuthenticated'));
const initBoardId = JSON.parse(sessionStorage.getItem('boardId'));
const initQuestionId = JSON.parse(sessionStorage.getItem('questionId'));
const initTimer = JSON.parse(sessionStorage.getItem('timer'));
const initUsernameValue = sessionStorage.getItem('username');
const initWager = JSON.parse(sessionStorage.getItem('wager'));

//conf
export const questionTotalTime = 60;
export const dailyDoubleTotalTime = 60;

//context
export const ActiveQuestionTileIdContext = createContext(initActiveQuestionTileId);
export const AuthContext = createContext(initAuthValue);
export const BoardIdContext = createContext(initBoardId)
export const QuestionContext = createContext();
export const QuestionAudioLinksContext = createContext();
export const QuestionVisualLinksContext = createContext();
export const ScoreContext = createContext();
export const TimerContext = createContext(initTimer);
export const ToastMessageContext = createContext();
export const TopTenContext = createContext();
export const UsernameContext = createContext(initUsernameValue);
export const WagerContext = createContext(initWager);

export default function App() {

	const [ activeQuestionTileId, setActiveQuestionTileId ] = useState(initActiveQuestionTileId);
	const [ isAuthenticated, setIsAuthenticated ] = useState(initAuthValue);
	const [ username, setUsername ] = useState(initUsernameValue);
	const [ question, setQuestion ] = useState();
	const [ questionAudioLinks, setQuestionAudioLinks ] = useState();
	const [ questionVisualLinks, setQuestionVisualLinks ] = useState();
	const [ score, setScore ] = useState();
	const [ time, setTime ] = useState(initTimer);
	const [ topTen, setTopTen ] = useState();
	const [ toastMessage, setToastMessage ] = useState();
	const [ wager, setWager ] = useState(initWager);
	const [ boardId, setBoardId ] = useState(initBoardId);

	useEffect(() => {
		if (isAuthenticated) {
			API.get(trebekbotUrls.topTen)
				.then((response) => {
					setTopTen(response.data);
				});
			API.get(trebekbotUrls.score)
				.then((response) => {
					setScore(response.data);
				});	
		}
		if (initTimer && initQuestionId) {
			API.post(trebekbotUrls.question, {"questionId": initQuestionId})
				.then((response) => {
					setQuestion(JSON.parse(response.data));
				});
		}
	}, [isAuthenticated]);

	return (
		<ToastMessageContext.Provider value={{ toastMessage, setToastMessage }}>
			{toastMessage ? <ToastAlert /> : null}
			<TimerContext.Provider value={{ time, setTime }}>
				<QuestionContext.Provider value={{ question, setQuestion }}>
					<ActiveQuestionTileIdContext.Provider value={{ activeQuestionTileId, setActiveQuestionTileId }}>
						<QuestionAudioLinksContext.Provider value={{ questionAudioLinks, setQuestionAudioLinks }}>
							<QuestionVisualLinksContext.Provider value={{ questionVisualLinks, setQuestionVisualLinks }}>
								<UsernameContext.Provider value={{ username, setUsername }}>
									<ScoreContext.Provider value={{ score, setScore }}>
										<AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
											<TopTenContext.Provider value={{ topTen, setTopTen }}>
												<WagerContext.Provider value={{ wager, setWager }}>
													<BoardIdContext.Provider value={{ boardId, setBoardId }}>
														{!isAuthenticated ? <LoginForm /> : null}
														{isAuthenticated ? <LogoutButton /> : null}
														{isAuthenticated && question?.daily_double && !wager ? <DailyDoubleModal /> : null}
														{isAuthenticated && question ? <AnswerModal /> : null}
														{isAuthenticated ? <GameBoard /> : null}
														{isAuthenticated && question ? <Timer /> : null}
														{isAuthenticated ? <PlayerScorecard /> : null}
														{isAuthenticated && topTen ? <Scoreboard /> : null}
													</BoardIdContext.Provider>
												</WagerContext.Provider>
											</TopTenContext.Provider>
										</AuthContext.Provider>	
									</ScoreContext.Provider>
								</UsernameContext.Provider>
							</QuestionVisualLinksContext.Provider>
						</QuestionAudioLinksContext.Provider>
					</ActiveQuestionTileIdContext.Provider>
				</QuestionContext.Provider>
			</TimerContext.Provider>
		</ToastMessageContext.Provider>
	)
}
