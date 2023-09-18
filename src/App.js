import React, { useEffect, useReducer } from 'react'
import './App.css';
import Header from "../src/Components/Header"
import Main from "../src/Components/Main"
import Loader from "../src/Components/Loader"
import Error from "../src/Components/Error"
import StartScreen from './StartScreen';
import Question from './Question';
import NextButton from './Components/NextButton';
import Progress from './Components/Progress';
import FinishScreen from './Components/FinishScreen';
import Footer from './Components/Footer';
import Timer from './Components/Timer';

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
}

const Reducer = (state, action) => {
  switch (action.type) {
    case "dataRecieved":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      }

    case "dataFailed": 
    return {
      ...state,
      status: "error"
    }

    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * 30
      }

    case "newAnswer":
      const question = state.questions[state.index];

      return {
        ...state,
        answer: action.payload,
        points: action.payload === question.correctOption ? state.points + question.points : state.points
      }

    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null
      }

    case "finished":
      return {
        ...state,
        status: "finished",
        highscore: state.points > state.highscore ? state.points : state.highscore
      }

    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
      }
    
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status
      } 
  
    default:
      throw new Error("Action Unknown")
  }
}

const App = () => {
  const [{questions, status, index, answer, points, highscore, secondsRemaining}, dispatch] = useReducer(Reducer, initialState);
  const numQuestion = questions.length;
  const maxPossiblePoints = questions.reduce((prev, cur) => prev + cur.points, 0)

  useEffect(() => {
    fetch("http://localhost:8000/questions").then(res => res.json()).then(data => dispatch({type: "dataRecieved", payload: data})).catch(err => console.error("Error"))
  }, [])

  return (
    <div className='app'>
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen numQuestion={numQuestion} dispatch={dispatch} />}
        {status === "active" && 
          <>
            <Progress numQuestion={numQuestion} answer={answer} index={index} points={points} maxPossiblePoints={maxPossiblePoints} />
            <Question questions={questions[index]} dispatch={dispatch} answer={answer} />

            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton dispatch={dispatch} answer={answer} index={index} numberQuestion={numQuestion} />
            </Footer>
          </>
        }
        {status === "finished" && <FinishScreen dispatch={dispatch} points={points} highscore={highscore} maxPossiblePoints={maxPossiblePoints} />}
      </Main>
    </div>
  )
}

export default App