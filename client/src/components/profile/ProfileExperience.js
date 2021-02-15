import React from 'react'
import PropTypes from 'prop-types'
import formatDate from '../../utils/formatDate'

const ProfileExperience = props => {
    return (
        <div>
            <h3 className="text-dark">{props.experience.organization}</h3>
            <p>{formatDate(props.experience.from)} - {props.experience.to ? formatDate(props.experience.to) : 'Now'}</p>
            <p><strong>Position: </strong>{props.experience.title}</p>
            <p>
                <strong>Description: </strong>{props.experience.description}
            </p>
        </div>
    )
}

ProfileExperience.propTypes = {
    experience: PropTypes.object.isRequired
}

export default ProfileExperience
