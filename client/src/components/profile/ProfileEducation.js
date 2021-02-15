import React from 'react'
import PropTypes from 'prop-types'
import formatDate from '../../utils/formatDate'

const ProfileEducation = props => {
    return (
        <div>
            <h3>{props.education.institution}</h3>
            <p>{formatDate(props.education.from)} - {props.education.to ? formatDate(props.education.to) : 'Now'}</p>
            <p><strong>Degree: </strong>{props.education.degree}</p>
            <p><strong>Field Of Study: </strong>{props.education.fieldOfStudy}</p>
            <p>
                <strong>Description: </strong>{props.education.description}
            </p>
        </div>
    )
}

ProfileEducation.propTypes = {
    education: PropTypes.object.isRequired
}

export default ProfileEducation
