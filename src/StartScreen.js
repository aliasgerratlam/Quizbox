import React from 'react'

const StartScreen = ({numQuestion, dispatch}) => {
  return (
    <div className='start'>
        <h2>Welcome to The React Quiz!</h2>
        <h3>{numQuestion} question to test your React mastery</h3>
        <button className='btn btn-start' onClick={() => dispatch({type: "start"})}>Let's Start</button>
    </div>
  )
}

export default StartScreen