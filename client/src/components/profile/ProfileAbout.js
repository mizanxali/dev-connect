import React from 'react'
import PropTypes from 'prop-types'

const ProfileAbout = props => {
    return (
        <div className="profile-about bg-light p-2">
            {props.profile.bio && <>
                <h2 className="text-primary">{props.profile.user.name}'s Bio</h2>
                <p>{props.profile.bio}</p>
            </>}
            
            <div className="line"></div>
            <h2 className="text-primary">Skill Set</h2>
            <div className="skills">
                {props.profile.skills.map((skill, i) => {
                    return <div key={i} className="p-1"><i className="fa fa-check"></i> {skill}</div>
                })}
            </div>
        </div>
    )
}

ProfileAbout.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileAbout
