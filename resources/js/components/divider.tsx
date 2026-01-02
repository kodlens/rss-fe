import React from 'react'

const divider = ( {text} : {text:string} ) => {
  return (
    <div className="my-4 p-4 rounded-lg bg-blue-900 text-white font-bold">
        {text}
    </div>
  )
}

export default divider