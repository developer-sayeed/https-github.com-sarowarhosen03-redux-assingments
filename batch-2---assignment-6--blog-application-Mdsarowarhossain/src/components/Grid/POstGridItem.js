import React from 'react'
import { Link } from 'react-router-dom'
import GetTagList from '../ui/getTagList.';
export default function POstGridItem({post}) {
const {title,image,createdAt,likes,tags,id,isSaved} = post;
  return (
    <div className="lws-card">
   <Link to={`/post/${id}`} >
      <img src={image} className="lws-card-image" alt="" />
    </Link>
    <div className="p-4">
      <div className="lws-card-header">
        <p className="lws-publishedDate">{createdAt}</p>
        <p className="lws-likeCount"><i className="fa-regular fa-thumbs-up"></i>{likes}</p>
      </div>
      <Link to={`/post/${id}`}  className="lws-postTitle"> {title}</Link>
      <div className="lws-tags">
        
        <GetTagList tags={tags}/>
        
        
        </div>
      {/* <!-- Show this element if post is saved --> */}
    {isSaved?  <div className="flex gap-2 mt-4">
        <span className="lws-badge"> Saved </span>
      </div>:''}
      {/* <!-- Show this element if post is saved Ends --> */}
    </div>
  </div>
  )
}
