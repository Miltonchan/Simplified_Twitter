import React, { useState, useEffect,useRef } from 'react';
import './Tweet_component.css';
import axios from 'axios';

import AcceptButton from '../../icons/AcceptButton.png';
import DeclineButton from '../../icons/DeclineButton.png';

const Tweet = () => {
  const [posts, setPosts] = useState([]);
  const [input, setInput] = useState("");
  const [postid, setPostid] = useState([]);
  const [image, setImage] = useState([]);

  const [isTweet, setIsTweet] = useState(false);
  const [isComment, setIsComment] = useState(false);

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
    
    for (let i=0; i<postData.length; i++) {
      getimage(postData[i].postId);
    }
    
    }

    let postData = await fetch(`http://localhost:8000/posts?username=${user.userinfo.username}`,
    {
      method: 'GET',
      mode: 'cors'
    })
    .then(data => data.json());

    postData = await fetchComments(postData);
    followingPosts = [...followingPosts, ...postData];

    setPosts(followingPosts);
    // console.log(postData);
  }

  const fetchComments = async (postData) => {
    for (let i=0; i<postData.length; i++) {
      postData[i].comment = await fetch('http://localhost:8000/comments')
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
        })
      })
      .then(data => data.json())
      .finally(fetchFollowingPosts);

    setInput("");
//     setselectedImagePreview();
    updatethepostid();
    setIsTweet(false);
  }
  // to be added image to create post function

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
        })
      })
      .then(data => data.json())
      .finally(fetchFollowingPosts);

    setInput("");
    setSelectedImagePreview();
    setIsComment(false);
   }

   //submit the images into db
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('postid', postid);
    formData.append('image', image[0]);
    const url = 'http://localhost:8000/images/image';
    axios.post(url, formData)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  };

   const updatethepostid =  () => {           //rewrite image
    fetch('http://localhost:8000/images/getpostid')
    .then(response => response.json())
    .then(data => setPostid(data+1))
    .catch(err => console.log(err))
  }

  const[data,setData] = useState([]);       //rewrite image

  const getimage =  (postid) =>{              //rewrite image
     axios.get("http://localhost:8000/images/getimage",{params:{postid}})
    .then((res)=>{setData(res.data)})
    .catch((err)=>console.log(err))
  }

  useEffect(() => {
    fetchFollowingPosts();
  }, []);

  // Tweet Image
  const wrapperRef = useRef(null);

    const [selectedImagePreview, setSelectedImagePreview] = useState();
    const [hasImagePreview,setHasImagePreview] = useState("false");

    const onDragEnter = () => wrapperRef.current.classList.add('dragover');
    const onDragLeave = () => wrapperRef.current.classList.remove('dragover');
    const onDrop = () => wrapperRef.current.classList.remove('dragover');

    const imageChange = (e) => {
      if (e.target.files && e.target.files.length > 0) {
        setSelectedImagePreview(e.target.files[0]); // to change the selected image
        setHasImagePreview(true);
      }
    };

    const removeSelectedImagePreview = () => {
      setSelectedImagePreview();
    };

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
            <div key={index} className="tweet-block-container">
              <div className="tweet-block">
                <div className="tweet-block-user-bar">
                  <div className="tweet-block-user-name-block">
                    <h6>{val.username}</h6>
                  </div>
                  <div className="tweet-block-user-bar-block">
                    <h2>{val.username}</h2>
                  </div>
                </div>
                <div className="tweet-block-content-section">
                  <div className="tweet-block-content">
                    {val.content}
                    <div>
      
                      {data.map((obj) => {
                        const base64String = btoa(
                        new Uint8Array(obj.img.data.data).reduce(function (data, byte) {
                        return data + String.fromCharCode(byte);
                        }, ""));
                        return(<img src={`data:image/png;base64,${base64String}`} alt="" width="300"/>);
                      })}
                    </div>
                  </div>
                </div>
                <div className="tweet-block-action-bar">
                  <div className="tweet-block-action-retweet">
                    {val.retweet && <h7>Retweet</h7>}
                  </div>
                  <div className="tweet-block-action-actions">
                    <div onClick={() => likePosts(val.postId)} className="tweet-block-action-block">
                      like {val.like.length}
                    </div>
                    <div onClick={() => dislikePosts(val.postId)} className="tweet-block-action-block">
                      dislike {val.dislike.length}
                    </div>
                    <div onClick={() => retweetPosts(val)}  className="tweet-block-action-block">
                      retweet {val.retweetBy.length}
                    </div>
                    <div onClick={() => setIsComment(true)}className="tweet-block-action-block">
                      comment {val.comment.length}
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
                   <form onSubmit={handleSubmit}>
                      <label htmlFor="postid"><h2>Make the number big !</h2></label>
                        <input
                          type="number"
                          id="postid"
                          value={postid}
                          onChange={(e) => setPostid(e.target.value)}
                         />
                      <label htmlFor="image"></label>
                        {
                       !selectedImagePreview ?
                         (<div
                             ref={wrapperRef}
                             className="drop-file-input"
                             onDragEnter={onDragEnter}
                             onDragLeave={onDragLeave}
                             onDrop={onDrop}>
                             <div
                             className="drop-file-input__label"
                             >
                                 <p>Drag/ Drop your image here</p>
                             </div>
                             <input
                          type="file"
                          id="image"
                          onChange={(e) => {
                            setImage(e.target.files);
                            setSelectedImagePreview(e.target.files);
                          }} // Milton work
                        />
                         </div>)
                         : (
                         <div
                         ref={wrapperRef}
                         className="drop-file-input">
                         <button className="delete-button" onClick={removeSelectedImagePreview}>
                           Remove This Image
                         </button>
                         <img
                          className="image_preview"
                            src={URL.createObjectURL(selectedImagePreview)}
                          />
                       </div>)
                     }
                      <button type="submit">Upload one</button>
                    </form>


                   <div className="post-toolbar">
                    <ul className="functionbar">
                       <li className="post-toolbar-block">
                         Tool
                       </li>
                      <li className="post-toolbar-block">
                        <button className="post-toolbar-btn" onClick={createPost}>Send</button>
                      </li>
                    </ul>
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
              {posts.map((val, index) => {
                return (
                  <div className="comment-block">
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
                <div className="post-toolbar">
                  <ul className='uploadbar'>
                    <li>
                      {selectedImagePreview && (
                      <div>
                        <img
                        className="image_preview"
                          src={URL.createObjectURL(selectedImagePreview)}
                        />
                      </div>
                      )}
                    </li>
                  {
                    !selectedImagePreview ?
                      (<li
                          ref={wrapperRef}
                          className="drop-file-input"
                          onDragEnter={onDragEnter}
                          onDragLeave={onDragLeave}
                          onDrop={onDrop}>
                          <div
                          className="drop-file-input__label"
                          >
                              <p>Drag/ Drop your image here</p>
                          </div>
                          <input type="file" value="" onChange={imageChange}/>
                      </li>)
                      : (<li
                      ref={wrapperRef}
                      className="drop-file-input">
                      <button className="delete-button" onClick={removeSelectedImagePreview}>
                        Remove This Image
                      </button>
                    </li>)
                  }

                  </ul>
                  <ul className="functionbar">
                    <li className="post-toolbar-block">
                      Tool
                    </li>
                    <li className="post-toolbar-block">
                      <button className="post-toolbar-btn" onClick={createComment}>Send</button>
                    </li>
                  </ul>
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
