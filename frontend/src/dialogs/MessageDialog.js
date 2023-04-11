import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './MessageDialog.css';

import AcceptButton from '../icons/AcceptButton.png';
import DeclineButton from '../icons/DeclineButton.png';

function MessageDialog(props) {
  const [isOpen, setIsOpen] = useState(false);

  function handleCancel() {
    setIsOpen(false);
    if (typeof props.onCancel === 'function') {
      props.onCancel();
    }
  }

  return (
    <div className="faded-screen-background" onDoubleClick={handleCancel}>
      <div className="message-dialog">
        <div className="message-dialog-topic">
          {props.title}
        </div>
        <div className="message-dialog-description">
          {props.description}
        </div>
        <div className="message-dialog-bottom-bar"/>
      </div>
    </div>
  );
}

MessageDialog.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onCancel: PropTypes.func,
};

export default MessageDialog
