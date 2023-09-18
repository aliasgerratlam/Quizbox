import React from 'react'

const NextButton = ({dispatch, answer, index, numberQuestion}) => {
  if(answer === null) return null

  return ((index < numberQuestion - 1) ?  
  <button className='btn btn-ui' onClick={() => dispatch({type: "nextQuestion"})}>Next</button> :
  <button className='btn btn-ui' onClick={() => dispatch({type: "finished"})}>Finished</button>)
}

export default NextButton