import React, { useState, useEffect, useRef } from 'react';
import './Tweet_component.css';
import axios from 'axios';

import AcceptButton from '../../icons/AcceptButton.png';
import DeclineButton from '../../icons/DeclineButton.png';

import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ShareIcon from '@mui/icons-material/Share';
import ModeCommentIcon from '@mui/icons-material/ModeComment';

const Tweet = () => {
  const [posts, setPosts] = useState([]);
  const [input, setInput] = useState("");
  const [postid, setPostid] = useState([]);
  const [postId, setPostId] = useState(1);

  const [isTweet, setIsTweet] = useState(false);
  const [isComment, setIsComment] = useState(false);

  const [selectedImagePreview, setSelectedImagePreview] = useState();
  const [comments, setComments] = useState([]);

  const user = JSON.parse(localStorage.getItem('user'));


  const fetchFollowingPosts = async () => {
    let followingPosts = [];
    for (let i=0; i<user.userinfo.following.length; i++) {
      let postData = await fetch(`http://localhost:8000/posts?username=${user.userinfo.following[i]}`,
      {
        method: 'GET',
        mode: 'cors'
      })
      .then(data => data.json());

    

      postData = await fetchComments(postData);
      followingPosts = [...followingPosts, ...postData];
    
    }

    let postData = await fetch(`http://localhost:8000/posts?username=${user.userinfo.username}`,
    {
      method: 'GET',
      mode: 'cors'
    })
    .then(data => data.json());

    postData = await fetchComments(postData);
    followingPosts = [...followingPosts, ...postData];

    for (let i=0; i<followingPosts.length; i++) {
      let user = await fetch(`http://localhost:8000/userinfos?username=${followingPosts[i].username}`,
      {
        method: 'GET',
        mode: 'cors'
      })
      .then(data => data.json());

      followingPosts[i].icon = user.icon;
    }

    setPosts(followingPosts);
    // console.log(postData);
  }

  const fetchComments = async (postData) => {
    for (let i=0; i<postData.length; i++) {
      postData[i].comment = await fetch(`http://localhost:8000/comments?postId=${postData[i].postId}`)
        .then(data => data.json());
    }
    return postData;
  }

  const likePosts = async (postId) => {
    const res = await fetch('http://localhost:8000/posts/like',
      {
        method: 'POST',
        mode: 'cors',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          "postId": postId,
          "username": user.userinfo.username
        })
      })
      .then(data => data.json())
      .finally(fetchFollowingPosts)

      // tweet(res);
  }

  const dislikePosts = async (postId) => {
    const res = await fetch('http://localhost:8000/posts/dislike',
      {
        method: 'POST',
        mode: 'cors',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          "postId": postId,
          "username": user.useraccount.username
        })
      })
      .then(data => data.json())
      .finally(fetchFollowingPosts)

      // tweet(res);
  }

  const retweetPosts = async (post) => {
    const res = await fetch('http://localhost:8000/posts/retweet',
      {
        method: 'POST',
        mode: 'cors',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          "postId": post.postId,
          "username": user.userinfo.username,
          "content": post.content,
          "image": post.image,
          "retweeter": user.userinfo.username,
        })
      })
      .then(data => data.json())
      .finally(fetchFollowingPosts)

      // tweet(res);
  }

  const createPost = async () => {
    if (!input) {
      return;
    }
    await fetch('http://localhost:8000/posts',
      {
        method: 'POST',
        mode: 'cors',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          "username": user.userinfo.username,
          "content": input,
          "image": selectedImagePreview,
        })
      })
      .then(data => data.json())
      .finally(fetchFollowingPosts);

    setInput("");
    setIsTweet(false);
  }

  const createComment = async () => {
    if (!input) {
      return;
    }
    await fetch('http://localhost:8000/comments',
      {
        method: 'POST',
        mode: 'cors',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          "username": user.userinfo.username,
          "content": input,
          "postId": postId,
        })
      })
      .then(data => data.json())
      .finally(fetchFollowingPosts);

    setInput("");
    setSelectedImagePreview();
    setIsComment(false);
   }

  useEffect(() => {
    fetchFollowingPosts();
  }, []);

  // Tweet Image
  const wrapperRef = useRef(null);


  const onDragEnter = () => wrapperRef.current.classList.add('dragover');
  const onDragLeave = () => wrapperRef.current.classList.remove('dragover');
  const onDrop = () => wrapperRef.current.classList.remove('dragover');

  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileReader = new FileReader();
      fileReader.onload = (fileLoadedEvent) => {
        const src = fileLoadedEvent.target.result;
        setSelectedImagePreview(src); // to change the selected image
        //console.log(src);
      }
      fileReader.readAsDataURL(e.target.files[0]);
    }
  };

  const removeSelectedImagePreview = () => {
    setSelectedImagePreview();
  };

  const handleComment = (post, index) => {
    setIsComment(true);
    setPostId(post.postId);
    setComments(posts[index].comment);
    console.log(comments);
  }

  //End of Tweet image

  return (
    <div className="tweetandpost-page">
      <div className="tweet-topicbar">
        <div className="tweet-description-container">
          <h6>Tweet</h6>
          <div className="description-text">
            Take a look in today's SAO tweet.
          </div>
        </div>
        <div className="tweet-button-container">
          <button className="tweet-button" onClick={() => setIsTweet(true)}>Tweet</button>
        </div>
      </div>
      <div className="tweet-section">
        {posts.map((val, index) => {
          return (
            <div key={index} className={"tweet-block-container " + (val.retweet ? 'retweet' : '')}>
              <div className={"tweet-block " + (val.retweet ? 'retweet' : '')}>
                <div className="tweet-block-user-bar">
                  <div className="tweet-block-user-name-block">
                    <img
                      className="icon"
                      src={val.icon}
                      alt="icon"
                    />
                  </div>
                  <div className="tweet-block-user-bar-block">
                    <h2>{val.username}</h2>
                  </div>
                  <div className='tweet-time'>
                    <h6>{new Date(val.createdAt).toDateString()}</h6>
                  </div>
                </div>
                <div className="tweet-block-content-section">
                  <div className="tweet-block-content">
                    {val.content}
                    {val.image && <div>
                      <img className='image' src={val.image}></img>
                    </div>}
                  </div>
                </div>
                <div className="tweet-block-action-bar">
                  <div className="tweet-block-action-retweet">
                    {val.retweet && <h7>Retweet</h7>}
                  </div>
                  <div className="tweet-block-action-actions">
                    <div onClick={() => likePosts(val.postId)} className="tweet-block-action-block">
                      <ThumbUpAltIcon className={val.like.includes(user.useraccount.username) ? 'active' : '' } />  {val.like.length}
                    </div>
                    <div onClick={() => dislikePosts(val.postId)} className="tweet-block-action-block">
                      <ThumbDownAltIcon className={val.dislike.includes(user.useraccount.username) ? 'active' : '' } />  {val.dislike.length}
                    </div>
                    <div onClick={() => retweetPosts(val)}  className="tweet-block-action-block">
                      <ShareIcon className={val.retweetBy.includes(user.useraccount.username) ? 'active' : '' } />  {val.retweetBy.length}
                    </div>
                    <div onClick={() => handleComment(val, index)}className="tweet-block-action-block">
                      <ModeCommentIcon />  {val.comment.length}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {isTweet && (
        <div className="faded-screen-background">
          <div className="tweet-dialog">
            <div className="tweet-dialog-topic">
              Tweet
            </div>
            <div className="tweet-dialog-description">
              <div className="post-section">
                <div className="post-block">
                  <div className="post-textarea-container">
                    <textarea
                      required
                      placeholder="Enter twitter here..."
                      className="post-textarea"
                      value={input}
                      onChange={(event) => setInput(event.target.value)}
                    />
                   </div>
                   <div>
                      <label htmlFor="image"></label>
                      {
                       !selectedImagePreview ?
                        (
                          <div
                            ref={wrapperRef}
                            className="drop-file-input"
                            onDragEnter={onDragEnter}
                            onDragLeave={onDragLeave}
                            onDrop={onDrop}>
                            <div className="drop-file-input__label">
                              <p>Click/ Drop your image here</p>
                            </div>
                            <input
                              type="file"
                              id="image"
                              onChange={(e) => {
                              imageChange(e);
                              }}
                            />
                          </div>
                        )
                        : 
                        (
                          <div >
                            <img
                              className="image_preview"
                              src={selectedImagePreview}
                            />
                            <p className="delete-file-input">
                              <button className="delete-button" onClick={removeSelectedImagePreview}>
                              Remove this Image
                              </button>
                            </p>
                          </div>
                        )
                      }
                    </div>
                </div>
              </div>
             </div>
            <div className="tweet-dialog-actions">
              <div className="tweet-dialog-button-container">
                <img src={AcceptButton} className="tweet-dialog-accept-button" onClick={createPost} />
              </div>
              <div className="tweet-dialog-button-container">
                <img src={DeclineButton} className="tweet-dialog-decline-button" onClick={() => setIsTweet(false)} />
              </div>
            </div>
          </div>
        </div>
    )}

    {isComment && (
      <div className="faded-screen-background">
        <div className="comment-dialog">
          <div className="comment-dialog-topic">
            Comment
          </div>
          <div className="comment-dialog-description">
            <div className="comment-section">
              {comments.length === 0 ? <h6>No comments now</h6> : <h6></h6> }
              {comments.map((val, index) => {
                return (
                  <div className="comment-block" key={index}>
                    <div className="comment-block-user-bar">
                      <div className="comment-block-user-name-block">
                        <h6>{val.username}</h6>
                      </div>
                      <div className="comment-block-user-bar-block">
                        <h2>{val.username}</h2>
                      </div>
                    </div>
                    <div className="comment-block-content-section">
                      <div className="comment-block-content">
                        {val.content}
                      </div>
                    </div>
                  </div>
              )})}
            </div>
            <div className="post-section">
              <div className="post-block">
                <div className="post-textarea-container">
                  <textarea
                    required
                    placeholder="Leave a comment here..."
                    className="post-textarea"
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="comment-dialog-actions">
            <div className="comment-dialog-button-container">
              <img src={AcceptButton} className="tweet-dialog-accept-button" onClick={createComment} />
            </div>
            <div className="comment-dialog-button-container">
              <img src={DeclineButton} className="tweet-dialog-decline-button" onClick={() => setIsComment(false)} />
            </div>
          </div>
        </div>
      </div>
  )}

    </div>
  );
};

export default Tweet;
