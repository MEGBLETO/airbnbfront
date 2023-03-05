import React from 'react'

const Button = ({name, type}) => {
  return (
    <button className='bg-gray-200 p-3 hover:bg-green-400 cursor-pointer' type={type} >{name}</button>
  )
}

export default Button