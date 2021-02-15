import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import formatDate from '../../utils/formatDate'
import { connect } from 'react-redux'
import { deletePost, likePost, unlikePost } from '../../actions/post'

const PostItem = props => {
    return (
        <div className="post bg-white p-1 my-1">
            <div>
                <Link to={`profile/${props.post.user}`}>
                    <img className="round-img" src={props.post.avatar} alt="" />
                    <h4>{props.post.name}</h4>
                </Link>
            </div>
            <div>
                <p className="my-1">
                    {props.post.text}
                </p>
                <p className="post-date">
                    Posted on {formatDate(props.post.date)}
                </p>
                <button onClick={() => props.likePost(props.post._id)} type="button" className="btn btn-light">
                    <i className="fas fa-thumbs-up"></i>{' '}
                    {props.post.likes.length>0 && <span>{props.post.likes.length}</span>}
                </button>
                <button onClick={() => props.unlikePost(props.post._id)} type="button" className="btn btn-light">
                    <i className="fas fa-thumbs-down"></i>
                </button>
                <Link to={`post/${props.post._id}`} className="btn btn-primary">
                    Discussion {props.post.comments.length>0 && <span className='comment-count'>{props.post.comments.length}</span>}
                </Link>
                {!props.auth.loading && props.post.user===props.auth.user._id &&
                <button onClick={() => props.deletePost(props.post._id)} type="button" className="btn btn-danger">
                    <i className="fas fa-times"></i>
                </button>}
            </div>
        </div>
    )
}

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    likePost: PropTypes.func.isRequired,
    unlikePost: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = {
    likePost: likePost,
    unlikePost: unlikePost,
    deletePost: deletePost
}

export default connect(mapStateToProps, mapDispatchToProps)(PostItem)