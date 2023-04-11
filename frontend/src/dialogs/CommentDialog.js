import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './CommentDialog.css';

import AcceptButton from '../icons/AcceptButton.png';
import DeclineButton from '../icons/DeclineButton.png';

function CommentDialog(props) {
  const [isOpen, setIsOpen] = useState(false);

  function handleCancel() {
    setIsOpen(false);
    if (typeof props.onNo === 'function') {
      props.onNo();
    }
  }

  return (
    <div className="faded-screen-background">
      <div className="comment-dialog">
        <div className="comment-dialog-topic">
          {props.title}
        </div>
        <div className="comment-dialog-description">
          <p>{props.description}</p>
        </div>
        <div className="comment-dialog-actions">
          <div className="comment-dialog-button-container">
            <img src={AcceptButton} className="comment-dialog-decline-button" onClick={handleCancel} />
            {props.noLabel}
          </div>
        </div>
      </div>
    </div>
  );
}


export default CommentDialog
