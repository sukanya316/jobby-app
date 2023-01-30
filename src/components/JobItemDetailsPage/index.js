import {useEffect, useState} from 'react'
import Cookies from 'js-cookie'
import {BsStar, BsBagFill, BsBoxArrowUpRight} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import Header from '../Header'
import './index.css'

const JobItemDetailsPage = props => {
  const {match} = props
  const {params} = match
  const [jobDetailsObj, setJobDetailsObj] = useState({})
  //   let jobDetailsObj = {}

  const getJobItemDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${params.id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = {
        jobDetails: {
          id: data.job_details.id,
          title: data.job_details.title,
          companyLogoUrl: data.job_details.company_logo_url,
          companyWebsiteUrl: data.job_details.company_website_url,
          employmentType: data.job_details.employment_type,
          jobDescription: data.job_details.job_description,
          lifeAtCompany: data.job_details.life_at_company,
          location: data.job_details.location,
          packagePerAnnum: data.job_details.package_per_annum,
          rating: data.job_details.rating,
          skills: data.job_details.skills.map(item => ({
            name: item.name,
            imgUrl: item.image_url,
          })),
        },
        similarJobs: data.similar_jobs.map(job => ({
          companyLogoUrl: job.company_logo_url,
          employmentType: job.employment_type,
          id: job.id,
          title: job.title,
          jobDescription: job.job_description,
          location: job.location,
          rating: job.rating,
        })),
      }
      setJobDetailsObj(JSON.parse(JSON.stringify(updatedData)))
    }
  }

  useEffect(() => {
    getJobItemDetails()
  }, [])

  console.log(jobDetailsObj?.similarJobs)

  return (
    <>
      <Header />
      <div className="job-details-details">
        <div className="job-details-card">
          <div className="logo-container">
            <img
              className="company-logo"
              src={jobDetailsObj?.jobDetails?.companyLogoUrl}
              alt={jobDetailsObj?.jobDetails?.id}
            />
            <div style={{paddingTop: '10px'}}>
              <span>{jobDetailsObj?.jobDetails?.title}</span>
              <br />
              <BsStar className="star" />
              <span>{jobDetailsObj?.jobDetails?.rating}</span>
            </div>
          </div>
          <div className="location-details">
            <div>
              <MdLocationOn />
              <span>{jobDetailsObj?.jobDetails?.location}</span>
              <BsBagFill />
              <span>{jobDetailsObj?.jobDetails?.employmentType}</span>
            </div>
            <div>{jobDetailsObj?.jobDetails?.packagePerAnnum}</div>
          </div>
          <hr />
          <div className="descr-container">
            <h4>Description</h4>
            <a
              href={jobDetailsObj?.jobDetails?.companyWebsiteUrl}
              target="_blank"
              rel="noreferrer"
              className="visit-url"
            >
              Visit <BsBoxArrowUpRight />
            </a>
          </div>
          <p>{jobDetailsObj?.jobDetails?.jobDescription}</p>
          <h4>Skills</h4>

          <div className="skills-container">
            {jobDetailsObj?.jobDetails?.skills.map(skill => (
              <div key={skill.name} className="skill-element">
                <img
                  src={skill.imgUrl}
                  alt={skill.name}
                  className="skill-logo"
                />
                <span>{skill.name}</span>
              </div>
            ))}
          </div>
          <div>
            <h4>Life at Company</h4>
            <div className="life-at-company">
              <p>{jobDetailsObj?.jobDetails?.lifeAtCompany.description}</p>
              <img
                className="life-at-image"
                src={jobDetailsObj?.jobDetails?.lifeAtCompany.image_url}
                alt="lif-at-cmpny"
              />
            </div>
          </div>
        </div>
        <h4>Similar Jobs</h4>
        {jobDetailsObj?.similarJobs !== undefined && (
          <div className="similar-jobs-container">
            {jobDetailsObj?.similarJobs.map(job => (
              <div className="similar-job-card">
                <div className="similar-job-title">
                  <img
                    className="similar-job-logo"
                    src={job.companyLogoUrl}
                    alt={job.location}
                  />
                  <div>
                    <span>{job.title}</span>
                    <br />
                    <BsStar className="star" />
                    <span>{job.rating}</span>
                  </div>
                </div>
                <h5>Job Description</h5>
                <p>{job.jobDescription}</p>
                <div className="loc-emp-container">
                  <div className="location-container">
                    <MdLocationOn />
                    <span>{job.location}</span>
                  </div>
                  <div className="employtype-container">
                    <BsBagFill /> <span>{job.employmentType}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
export default JobItemDetailsPage
