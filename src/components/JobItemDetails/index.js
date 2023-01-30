import {Link} from 'react-router-dom'
import {BsStar, BsBagFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'

import './index.css'

const JobItemDetails = props => {
  const {jobsData} = props

  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobsData

  return (
    <Link to={`/jobs/${id}`} className="jobs-card-link">
      <li className="job-details-card">
        <div className="logo-container">
          <img className="company-logo" src={companyLogoUrl} alt={id} />
          <div>
            <span>{title}</span>
            <br />
            <BsStar className="star" />
            <span>{rating}</span>
          </div>
        </div>
        <div className="location-details">
          <div>
            <MdLocationOn />
            <span>{location}</span>
            <BsBagFill />
            <span>{employmentType}</span>
          </div>
          <div>{packagePerAnnum}</div>
        </div>
        <hr />
        <h4>Description</h4>
        <p>{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobItemDetails
