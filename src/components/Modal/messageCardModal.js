import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';

const MessageCardModal = (props) => {
    const { modalBool, onToggleModal, messageBody, onDeleteMessage } = props
  return (
    <div>
      <Modal isOpen={modalBool} toggle={onToggleModal} className={props.className}>
        <ModalHeader toggle={onToggleModal}>Delete Message</ModalHeader>
        <ModalBody>
        {messageBody.message} posted on {messageBody.date}
        </ModalBody>
        <ModalFooter>
          <Button onClick={onDeleteMessage} color="danger">Delete</Button>{' '}
          <Button color="secondary" onClick={onToggleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

MessageCardModal.propTypes = {
  modalBool: PropTypes.bool,
  onToggleModal: PropTypes.func,
  messageBody: PropTypes.object,
  onDeleteMessage: PropTypes.func,
}
export default MessageCardModal;