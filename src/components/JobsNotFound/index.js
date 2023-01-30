import {Component} from 'react'
import './index.css'

class JobsNotFound extends Component {
  render() {
    return (
      <div className="jos-not-found-container">
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
          />
          <h1>No Jobs Found</h1>
          <p>We could not find any jobs.Try other filters</p>
        </div>
      </div>
    )
  }
}

export default JobsNotFound
