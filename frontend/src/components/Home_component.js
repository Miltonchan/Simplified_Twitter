import React, { useState, useEffect } from 'react';
import './Home_component.css';

const Tab = () => {
  const [activeTab, setActiveTab] = useState('For You');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const postData = await fetch('http://localhost:8000/posts',
        {
          method: 'GET',
          mode: 'cors'
        })
        .then(data => data.json());

      setPosts(postData);
      console.log(postData);
    }
    fetchPosts();
  }, []);

  const handleClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="home-main">
      {posts.map((val, key) => {
          return (
            <li
              key={key}
            >
              {val.content}
            </li>
          )
      })}
      <div className="home-tabblock">
        <div className="home-tab">
          <div
            className={activeTab === 'For You' ? 'active' : ''}
            onClick={() => handleClick('For You')}
          >
            For You
          </div>
        </div>
        <div className="home-tab">
          <div
            className={activeTab === 'Following' ? 'active' : ''}
            onClick={() => handleClick('Following')}
          >
            Following
          </div>
        </div>
      </div>
      <div className="home-tabcontentcontainer">
        {activeTab === 'For You' && (
          <div className="home-tabcontent">
            <div className="home-messagecontainer">
              <div className="home-avataricon">
              Avatar
              </div>
              <div className="home-messageblock">
                <input type="text"/>
              </div>
              <div className="home-messagebottomblock">
                <div className="block-div">
                  <div className="home-messagetoolblock">
                    <div className="home-messageiconblock">
                      Image
                    </div>
                    <div className="home-messageiconblock">
                      Gif
                    </div>
                    <div className="home-messageiconblock">
                      Hi
                    </div>
                    <div className="home-messageiconblock">
                      Hi
                    </div>
                    <div className="home-messageiconblock">
                      Hi
                    </div>
                  </div>
                  <div className="home-messagesendblock">
                    Send
                  </div>
                </div>
              </div>
              <div className="home-foryoucontainer">
                <div className="home-foryoublock">
                  <div className="home-foryoutopic">
                    Welcome to Beitter!
                  </div>
                  <div className="home-foryoudescript">
                    This is the best place for SAO fans to share their daily life.
                  </div>
                  <div className="home-foryoufindfanscontainer">
                    <button className="home-foryoufindfansbutton">
                      Find SAO fans
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'Following' && (
          <div className="home-tabcontent">
            <div className="home-messagecontainer">
              <div className="home-avataricon">
              Avatar
              </div>
              <div className="home-messageblock">
                <input type="text"/>
              </div>
              <div className="home-messagebottomblock">
                <div className="block-div">
                  <div className="home-messagetoolblock">
                    <div className="home-messageiconblock">
                      Image
                    </div>
                    <div className="home-messageiconblock">
                      Gif
                    </div>
                    <div className="home-messageiconblock">
                      Hi
                    </div>
                    <div className="home-messageiconblock">
                      Hi
                    </div>
                    <div className="home-messageiconblock">
                      Hi
                    </div>
                  </div>
                  <div className="home-messagesendblock">
                    Send
                  </div>
                </div>
              </div>
              <div className="home-foryoucontainer">
                <div className="home-foryoublock">
                  <div className="home-foryoutopic">
                    ASSSAA
                  </div>
                  <div className="home-foryoudescript">
                    This is the best place for SAO fans to share their daily life.
                  </div>
                  <div className="home-foryoufindfanscontainer">
                    <button className="home-foryoufindfansbutton">
                      Find SAO fans
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default function Home_component() {
  return (
    <div className="home-page">
      <div className="home-topicbar">
        Home
      </div>
      <Tab>
      </Tab>
    </div>
  )
}
