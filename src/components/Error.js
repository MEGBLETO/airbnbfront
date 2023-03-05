import React from 'react'

const Error = ({message, color}) => {

  return (
    <div className="text-red-600 p-3 border-l-2  border-black">{message}</div>
  )
}

export default Error