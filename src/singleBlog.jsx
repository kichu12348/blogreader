import React from 'react'
import returnBtn from './assets/returnD.png'
import './App.css'

function SingleBlog({currentBlog,setShowSingleBlog}) {

  return (
    <div 
      className='singleBlog'
    >
      <nav>
        <img 
        src={returnBtn} 
        alt="return" 
        onClick={() => setShowSingleBlog(false)}
        />
      </nav>
      <div className="singleBlogContainer">
        <h1>{currentBlog?currentBlog.title:null}</h1>
        <p>
          {currentBlog?currentBlog.body:null}
        </p>
      </div>
    </div>
  )
}

export default SingleBlog