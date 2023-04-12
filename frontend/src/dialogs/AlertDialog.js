import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './AlertDialog.css';

import AcceptButton from '../icons/AcceptButton.png';
import DeclineButton from '../icons/DeclineButton.png';

function AlertDialog(props) {
  const [isOpen, setIsOpen] = useState(false);

  function handleYes() {
    setIsOpen(false);
    if (typeof props.onYes === 'function') {
      props.onYes(props.followerUsername, props.beFollowUsername);
    }
  }

  function handleNo() {
    setIsOpen(false);
    if (typeof props.onNo === 'function') {
      props.onNo();
    }
  }

  return (
    <div className="faded-screen-background">
      <div className="alert-dialog">
        <div className="alert-dialog-topic">
          {props.title}
        </div>
        <div className="alert-dialog-description">
          <p>{props.description}</p>
        </div>
        <div className="alert-dialog-actions">
          <div className="alert-dialog-button-container">
            <img src={AcceptButton} className="alert-dialog-accept-button" onClick={handleYes} />
            {props.yesLabel}
          </div>
          <div className="alert-dialog-button-container">
            <img src={DeclineButton} className="alert-dialog-decline-button" onClick={handleNo} />
            {props.noLabel}
          </div>
        </div>
      </div>
    </div>
  );
}

AlertDialog.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onYes: PropTypes.func,
  onNo: PropTypes.func,
  followerUsername: PropTypes.string,
  beFollowUsername: PropTypes.string,
};

export default AlertDialog
