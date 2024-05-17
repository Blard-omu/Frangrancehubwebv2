import React from 'react'
import img from '../assets/images/page404.svg';
import { Link } from 'react-router-dom';
import "../css/Pnot.css"

const PageNotFound = () => {
  return (
    <div className='err-pb'>
      <img src={img} alt="" />
      
      
      <div className="pb-bt">
        <Link to='/'>
        <button className='btn btn-outline-info text-light'>Back to Home</button>
        </Link>
      </div>
      
      
    </div>
  )
}

export default PageNotFound