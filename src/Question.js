import React from 'react'
import Options from './Components/Options'

const Question = ({questions, dispatch, answer}) => { 
    return (
        <div className=''>
            <h4>{questions.question}</h4>
            <Options dispatch={dispatch} answer={answer} questions={questions} />
        </div>
    )
}

export default Question