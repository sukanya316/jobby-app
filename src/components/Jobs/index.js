import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Header from '../Header'
import JobItemDetails from '../JobItemDetails'
// import JobsNotFound from '../JobsNotFound'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]
console.log(employmentTypesList, salaryRangesList)

class Jobs extends Component {
  state = {
    jobs: [],
    profileDetails: [],
    apiStatus: apiStatusConstants.initial,
    isLoading: false,
  }

  componentDidMount = () => {
    this.getJobs()
    this.getProfile()
  }

  onSearchJobs = async () => {
    console.log('yess')
    const jwtToken = Cookies.get('jwt_token')
    // this.setState({apiStatus: apiStatusConstants.inProgress})
    const employmentType = document.querySelectorAll(
      'input[type="checkbox"]:checked',
    )
    const salaryRange =
      document.querySelectorAll('input[type="radio"]:checked')[0] === undefined
        ? '1000000'
        : document.querySelectorAll('input[type="radio"]:checked')[0].id

    const empResult = [...employmentType].map(item => item.id).join(',')
    const searchedValue = document.getElementById('searchEl').value
    console.log(empResult, salaryRange, searchedValue)
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${empResult}&minimum_package=${salaryRange}&search=${searchedValue}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()

    if (response.ok === true) {
      const updatedData = data.jobs.map(job => ({
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        id: job.id,
        jobDescription: job.job_description,
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
        title: job.title,
      }))
      this.setState({jobs: updatedData, apiStatus: apiStatusConstants.success})
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  getProfile = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      console.log(data)
      this.setState({
        profileDetails: data.profile_details,
        apiStatus: apiStatusConstants.success,
        isLoading: false,
      })
    }
  }

  getJobs = async () => {
    const jwtToken = Cookies.get('jwt_token')
    this.setState({isLoading: true})
    const apiUrl = 'https://apis.ccbp.in/jobs'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      const updatedData = data.jobs.map(job => ({
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        id: job.id,
        jobDescription: job.job_description,
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
        title: job.title,
      }))
      this.setState({
        jobs: updatedData,
        apiStatus: apiStatusConstants.success,
        isLoading: false,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure, isLoading: false})
    }
  }

  renderLoaderView = () => (
    <div className="jobs-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  getEmploymentList = () => (
    <ul className="employment-list">
      <li className="">
        <input
          type="checkbox"
          id="FULLTIME"
          value="Full Time"
          onClick={this.onSearchJobs}
        />
        <label htmlFor="FULLTIME">Full Time</label>
      </li>
      <li>
        <input
          type="checkbox"
          id="PARTTIME"
          value="Part Time"
          onClick={this.onSearchJobs}
        />
        <label htmlFor="PARTTIME">Part Time</label>
      </li>
      <li>
        <input
          type="checkbox"
          id="FREELANCE"
          value="Freelance"
          onClick={this.onSearchJobs}
        />
        <label htmlFor="FREELANCE">Freelance</label>
      </li>
      <li>
        <input
          type="checkbox"
          id="INTERNSHIP"
          value="Internship"
          onClick={this.onSearchJobs}
        />
        <label htmlFor="INTERNSHIP">Internship</label>
      </li>
    </ul>
  )

  getSalaryRangesList = () => (
    <ul className="salary-range-list">
      <li>
        <input
          type="radio"
          name="salary-list"
          id="1000000"
          value="10 LPA and above"
          onClick={this.onSearchJobs}
        />
        <label htmlFor="1000000">10 LPA and above</label>
      </li>
      <li>
        <input
          type="radio"
          name="salary-list"
          id="2000000"
          value="20 LPA and above"
          onClick={this.onSearchJobs}
        />
        <label htmlFor="2000000">20 LPA and above</label>
      </li>
      <li>
        <input
          type="radio"
          name="salary-list"
          id="3000000"
          value="30 LPA and above"
          onClick={this.onSearchJobs}
        />
        <label htmlFor="3000000">30 LPA and above</label>
      </li>
      <li>
        <input
          type="radio"
          name="salary-list"
          id="4000000"
          value="40 LPA and above"
          onClick={this.onSearchJobs}
        />
        <label htmlFor="4000000">40 LPA and above</label>
      </li>
    </ul>
  )

  renderJobsListView = () => {
    const {jobs} = this.state
    return (
      <ul>
        {jobs.map(job => (
          <JobItemDetails jobsData={job} key={job.id} />
        ))}
      </ul>
    )
  }

  render() {
    const {apiStatus, jobs, profileDetails, isLoading} = this.state
    console.log(apiStatus, jobs)
    /* switch(apiStatus) {
                                case apiStatusConstants.initial:
                                    return null;
                                case apiStatusConstants.success:
                                    return this.renderJobsListView();
                                case apiStatusConstants.inProgress:
                                    return this.renderLoaderView();
                                case apiStatusConstants.failure:
                                    return <JobsNotFound />
                                default:
                                    return null
                                } */
    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="profile-details-container">
            {isLoading ? (
              this.renderLoaderView()
            ) : (
              <div className="profile-container">
                <img
                  src={profileDetails.profile_image_url}
                  alt="profile-logo"
                  className="profile-logo"
                />
                <h3>{profileDetails.name}</h3>
                <p>{profileDetails.short_bio}</p>
              </div>
            )}
            <hr />
            <div className="type-of-employment">
              <h4>Type of employment</h4>
              {this.getEmploymentList()}
            </div>
            <hr />
            <div className="salary-range">
              <h4>Salary Range</h4>
              {this.getSalaryRangesList()}
            </div>
          </div>
          {isLoading ? (
            this.renderLoaderView()
          ) : (
            <div className="list-of-jobs">
              <div>
                <input
                  type="search"
                  id="searchEl"
                  className="search-el-container"
                  placeholder="Search"
                />
                <BsSearch className="search-icon" onClick={this.onSearchJobs} />
              </div>
              {jobs.length === 0 ? (
                <div className="no-jobs-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
                    alt="no jobs"
                    className="no-jobs-logo"
                  />
                  <h3>No Jobs Found</h3>
                  <p>We could npt find any jobs.Try other filters</p>
                </div>
              ) : (
                <ul>
                  {jobs.map(job => (
                    <JobItemDetails jobsData={job} key={job.id} />
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </>
    )
  }
}

export default Jobs
