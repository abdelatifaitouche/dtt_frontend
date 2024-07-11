import React, { useEffect } from 'react'
import "./preloader.css"
import { preLoaderAnim } from './animation'
function Preloader() {

    useEffect(()=>{
        preLoaderAnim()
    } , [])

  return (
    <div className='preloader'>
        <div className='texts-container'> 
            <span>We </span>
            <span>Go </span>
            <span>Beyond </span>
        </div>
    </div>
  )
}

export default Preloader
