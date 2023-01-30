// import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickedLogout = () => {
    const {history} = props
    console.log('logout')
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="header-container">
      <img
        className="logo"
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        alt="website logo"
      />
      <ul className="ul-container">
        <Link to="/" className="disable-link">
          <li>Home</li>
        </Link>
        <Link to="/jobs" className="disable-link">
          <li>Jobs</li>
        </Link>
      </ul>
      <button type="button" className="logout-btn" onClick={onClickedLogout}>
        Logout
      </button>
    </div>
  )
}

export default withRouter(Header)
