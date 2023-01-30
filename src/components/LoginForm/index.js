import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'

class LoginForm extends Component {
  state = {username: '', password: ''}

  onUsernameChange = event => {
    this.setState({username: event.target.value})
  }

  onPasswordChange = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = () => {
    const {history} = this.props
    history.replace('/login')
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      console.log('login success')
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure()
    }
  }

  render() {
    return (
      <div className="login-container">
        <div className="login-content">
          <form onSubmit={this.onSubmitForm}>
            <div className="img-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
                alt="website logo"
              />
            </div>
            <label htmlFor="username" className="userpwd-label">
              USERNAME
            </label>
            <br />
            <input
              type="text"
              placeholder="username"
              id="username"
              onChange={this.onUsernameChange}
              className="userpwd-input"
            />
            <br />
            <label htmlFor="password" className="userpwd-label">
              PASSWORD
            </label>
            <br />
            <input
              type="password"
              placeholder="password"
              id="password"
              onChange={this.onPasswordChange}
              className="userpwd-input"
            />
            <br />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
