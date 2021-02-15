import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import formatDate from '../../utils/formatDate'
import { deleteEducation } from '../../actions/profile'

const Education = props => {
    const educations = props.educations.map((edu) => (
        <tr key={edu._id}>
            <td>{edu.institution}</td>
            <td className='hide-sm'>{edu.degree}</td>
            <td className='hide-sm'>{edu.fieldOfStudy}</td>
            <td>
                {formatDate(edu.from)} - {edu.to ? formatDate(edu.to) : 'Now'}
            </td>
            <td>
                <button onClick={() => props.deleteEducation(edu._id)} className='btn btn-danger'>Delete</button>
            </td>
        </tr>
    ))
    return (
        <>
            <h2 className='my-2'>Education Credentials</h2>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Institution</th>
                        <th className='hide-sm'>Degree</th>
                        <th className='hide-sm'>Field of Study</th>
                        <th className='hide-sm'>Years</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {educations}
                </tbody>
            </table>
        </>
    )
}

Education.propTypes = {
    educations: PropTypes.array.isRequired,
    deleteEducation: PropTypes.func.isRequired
}

const mapDispatchToProps = {
    deleteEducation: deleteEducation
}

export default connect(null, mapDispatchToProps)(Education)
