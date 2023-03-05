import React from 'react'

const Input = ({label, placeholder, type , name, register}) => {
  return (
    <div className='flex w-8/12 flex-col'> 
        <label className='p-2'>{label}:</label>
        <input className='p-2 border-2 border-black' type={type} placeholder={placeholder} name={name} {...register(name)} />
    </div>
  )
}

export default Input