import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addComment } from '../../actions/post'

const CommentForm = props => {

    const textRef = useRef('')

    const createComment = (e) => {
        e.preventDefault()

        const formData = {
            text: textRef.current.value
        }

        props.addComment(props.postId, formData)
    }

    return (
        <div className="post-form">
            <div className="bg-primary p">
            <h3>Leave A Comment</h3>
            </div>
            <form onSubmit={createComment} className="form my-1">
            <textarea
                ref={textRef}
                name="text"
                cols="30"
                rows="5"
                placeholder="Comment on this post"
                required
            ></textarea>
            <input type="submit" className="btn btn-dark my-1" value="Submit" />
            </form>
        </div>
    )
}

CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired,
    postId: PropTypes.string.isRequired
}

const mapDispatchToProps = {
    addComment: addComment
}

export default connect(null, mapDispatchToProps)(CommentForm)