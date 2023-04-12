import React, { useState, useEffect } from 'react';
import './Home_component.css';

import Tweet from './subcomponents/Tweet_component';
import ForYouTabContent from './subcomponents/Home_ForYou_component';
import FollowingTabContent from './subcomponents/Home_Following_component';

const Tab = () => {
  const [activeTab, setActiveTab] = useState('For You');

  const handleClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="home-tab">
      <div className="home-tab-bar">
        <div className="home-tab-label">
          <div
            className={activeTab === 'For You' ? 'active' : ''}
            onClick={() => handleClick('For You')}
          >
            For You
          </div>
        </div>
        <div className="home-tab-label">
          <div
            className={activeTab === 'Following' ? 'active' : ''}
            onClick={() => handleClick('Following')}
          >
            Following
          </div>
        </div>
      </div>
      <div className="home-section">
        {activeTab === 'For You' && (
          <ForYouTabContent/>
        )}
        {activeTab === 'Following' && (
          <FollowingTabContent/>
        )}
      </div>
    </div>
  );
};

export default function Home_component() {
  return (
    <div className="home-page">
      <div className="home-topicbar">
        <h2>Home</h2>
      </div>
      <div className="home-main">
        <div className="home-section">
          <Tweet/>
        </div>
        <div className="home-section">
          <Tab/>
        </div>
      </div>
    </div>
  )
}
