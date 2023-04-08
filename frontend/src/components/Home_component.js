import React, { useState } from 'react';
import './Home_component.css'

const Tab = () => {
  const [activeTab, setActiveTab] = useState('For You');

  const handleClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div class="home-main">
      <div class="home-tabcontainer">
        <div className="home-tab">
          <button
            class="home-tabbutton"
            className={activeTab === 'For You' ? 'active' : ''}
            onClick={() => handleClick('For You')}
          >
            For You
          </button>
          <button
            class="home-tabbutton"
            className={activeTab === 'Following' ? 'active' : ''}
            onClick={() => handleClick('Following')}
          >
            Following
          </button>
        </div>
      </div>
      <div className="home-tabcontainer">
        {activeTab === 'For You' && (
          <div class="home-tabcontent">
            <div class="test-block">
              <div class="home-avataricon">
              Hi
              </div>
              <div class="home-messageblock">
                <input type="text" name="username" id="username" required/>
              </div>
              <div class="home-messagebottomblock">
                <div class="block-div">
                  <div class="home-messagetoolblock">
                    hi
                  </div>
                  <div class="home-messagesendblock">
                    hi
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'Following' && (
          <p>Content for Following tab goes here.</p>
        )}
      </div>
    </div>
  );
};

export default function Home_component() {
  return (
    <div>
      <div class="home-topicbar">
        Welcome to Beitter!
      </div>
      <Tab>
      </Tab>
    </div>
  )
}
