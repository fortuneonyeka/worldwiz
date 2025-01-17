import React from 'react'
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <p>Home Page</p>

      <Link to="/app"> go to app layout</Link>
    </div>
  )
}

export default HomePage
