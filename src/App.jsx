import { useEffect, useState } from 'react'
import './App.css'
import SingleBlog from './singleBlog';
import { createClient } from '@supabase/supabase-js';

function App() {
  const [currentBlog, setCurrentBlog] = useState(null);
  const [showSingleBlog, setShowSingleBlog] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const SUPABASE_URL = "https://vevcjimdxdaprqrdbptj.supabase.co";
  const SUPABASE_KEY ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZldmNqaW1keGRhcHJxcmRicHRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE4NzMxMTAsImV4cCI6MjAyNzQ0OTExMH0.8p3Ho0QJ0h-3ANpQLa_qX05PCqWu22X2l2YdL4dBss8";
  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

  const fetchBlogs = async () => {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
    if (error) console.log('error', error)
    else setBlogs(data)
  }

  const trimContent = (content) => {
    return content.length > 100 ? content.substring(0, 150) + '...' : content
  }

  useEffect(()=>{
    fetchBlogs()
  },[])

  const renderList =({id, title, body}) => {
    return (
      <>
      {id?(<li 
      key={id} 
      className="blog-list-item"
      onClick={() => {
        setCurrentBlog({id, title, body})
        setShowSingleBlog(true)
      }}
      >
        <h3>{title}</h3>
        <p>{trimContent(body)}</p>
      </li>):null}
      </>
    )
  }


  return (
    <>
        {!showSingleBlog?(<ul className="blog-list">
          {blogs.map(renderList)}
        </ul>):(<SingleBlog 
        currentBlog={currentBlog} 
        setShowSingleBlog={setShowSingleBlog}
        />)}
    </>
  )
}

export default App
