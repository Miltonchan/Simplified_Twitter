import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './CommentDialog.css';

import AcceptButton from '../icons/AcceptButton.png';
import DeclineButton from '../icons/DeclineButton.png';

function CommentDialog(props) {
  const [isOpen, setIsOpen] = useState(false);

  function handleCancel() {
    setIsOpen(false);
    if (typeof props.onCancel === 'function') {
      props.onCancel();
    }
  }

  return (
    <div className="faded-screen-background">
      <div className="comment-dialog">
        <div className="comment-dialog-topic" onDoubleClick={handleCancel}>
          {props.title}
        </div>
        <div className="comment-dialog-description">
          {props.description}
        </div>
        <div className="comment-dialog-actions">
          <div className="comment-dialog-userbar">
            <div className="comment-dialog-useravatar">
              {props.useravatar}
            </div>
            <div className="comment-dialog-username">
              {props.username}
            </div>
          </div>
          <textarea
            required
            placeholder="Enter twitter here..."
            className="comment-dialog-textarea"
          />
        </div>
      </div>
    </div>
  );
}

CommentDialog.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  useravatar: PropTypes.string,
  username: PropTypes.string,
  onCancel: PropTypes.func,
};

export default CommentDialog
