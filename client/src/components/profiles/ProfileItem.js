import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const ProfileItem = props => {
    return (
        <div className="profile bg-light">
          <img className="round-img" src={props.profile.user.avatar} alt="" />
          <div>
            <h2>{props.profile.user.name}</h2>
            <p>{props.profile.position} {props.profile.organization && <span> at {props.profile.organization}</span>}</p>
            <p>{props.profile.location && <span>{props.profile.location}</span>}</p>
            <Link to={`/profile/${props.profile.user._id}`} className="btn btn-primary">View Profile</Link>
          </div>

          <ul>
              {props.profile.skills.slice(0, 4).map((skill, i) => {
                  return (
                    <li key={i} className="text-primary">
                        <i className="fas fa-check"></i> {skill}
                    </li>
                  )
              })}
          </ul>
        </div>
    )
}

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileItem
