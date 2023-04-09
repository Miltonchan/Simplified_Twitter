import React, { useState } from 'react';
import './Home_component.css'

const Tab = () => {
  const [activeTab, setActiveTab] = useState('For You');

  const handleClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div class="home-main">
      <div class="home-tabblock">
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
          <div class="home-tabcontent">
            <div class="home-messagecontainer">
              <div class="home-avataricon">
              Avatar
              </div>
              <div class="home-messageblock">
                <input type="text"/>
              </div>
              <div class="home-messagebottomblock">
                <div class="block-div">
                  <div class="home-messagetoolblock">
                    <div class="home-messageiconblock">
                      Image
                    </div>
                    <div class="home-messageiconblock">
                      Gif
                    </div>
                    <div class="home-messageiconblock">
                      Hi
                    </div>
                    <div class="home-messageiconblock">
                      Hi
                    </div>
                    <div class="home-messageiconblock">
                      Hi
                    </div>
                  </div>
                  <div class="home-messagesendblock">
                    Send
                  </div>
                </div>
              </div>
              <div class="home-foryoucontainer">
                <div class="home-foryoublock">
                  <div class="home-foryoutopic">
                    Welcome to Beitter!
                  </div>
                  <div class="home-foryoudescript">
                    This is the best place for SAO fans to share their daily life.
                  </div>
                  <div class="home-foryoufindfanscontainer">
                    <button class="home-foryoufindfansbutton">
                      Find SAO fans
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'Following' && (
          <div class="home-tabcontent">
            <div class="home-messagecontainer">
              <div class="home-avataricon">
              Avatar
              </div>
              <div class="home-messageblock">
                <input type="text"/>
              </div>
              <div class="home-messagebottomblock">
                <div class="block-div">
                  <div class="home-messagetoolblock">
                    <div class="home-messageiconblock">
                      Image
                    </div>
                    <div class="home-messageiconblock">
                      Gif
                    </div>
                    <div class="home-messageiconblock">
                      Hi
                    </div>
                    <div class="home-messageiconblock">
                      Hi
                    </div>
                    <div class="home-messageiconblock">
                      Hi
                    </div>
                  </div>
                  <div class="home-messagesendblock">
                    Send
                  </div>
                </div>
              </div>
              <div class="home-foryoucontainer">
                <div class="home-foryoublock">
                  <div class="home-foryoutopic">
                    ASSSAA
                  </div>
                  <div class="home-foryoudescript">
                    This is the best place for SAO fans to share their daily life.
                  </div>
                  <div class="home-foryoufindfanscontainer">
                    <button class="home-foryoufindfansbutton">
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
    <div class="home-page">
      <div class="home-topicbar">
        Home
      </div>
      <Tab>
      </Tab>
    </div>
  )
}
