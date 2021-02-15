import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import formatDate from '../../utils/formatDate'
import { connect } from 'react-redux'
import { deleteComment } from '../../actions/post'

const CommentItem = props => {
    return (
        <div className="post bg-white p-1 my-1">
            <div>
                <Link to={`/profile/${props.comment.user}`}>
                    <img className="round-img" src={props.comment.avatar} alt="" />
                    <h4>{props.comment.name}</h4>
                </Link>
            </div>
            <div>
                <p className="my-1">
                    {props.comment.text}
                </p>
                <p className="post-date">
                    Posted on {formatDate(props.comment.date)}
                </p>
                {!props.auth.loading && props.comment.user===props.auth.user._id &&
                <button onClick={() => props.deleteComment(props.postId, props.comment._id)} type="button" className="btn btn-danger">
                    <i className="fas fa-times"></i>
                </button>}
            </div>
        </div>
    )
}

CommentItem.propTypes = {
    comment: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    deleteComment: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = {
    deleteComment: deleteComment
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentItem)
