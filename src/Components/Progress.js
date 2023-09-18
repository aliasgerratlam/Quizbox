import React from 'react'

const Progress = ({numQuestion, index, points, maxPossiblePoints, answer}) => {
  return (
    <header className='progress'>
        <progress max={numQuestion} value={index + Number(answer !== null)} />

        <p>Question <strong>{index + 1}</strong> / {numQuestion}</p>

        <p><strong>{points}</strong> / {maxPossiblePoints}</p>
    </header>
  )
}

export default Progress