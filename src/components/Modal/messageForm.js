import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';
import Moment from 'react-moment'


const MessageFormModal = (props) => {
    const { modalBool, onToggleModal, messageBody, onDeleteMessage } = props
  return (
    <div>
      <Modal isOpen={modalBool} toggle={onToggleModal} className={props.className}>
        <ModalHeader toggle={onToggleModal}>Delete Message</ModalHeader>
        <ModalBody>
        Message:
        <br/>
        {messageBody.message}
        <br/> 
        <br/>
        Posted on: <Moment format="YYYY MMM DD HH:MM:SS">{messageBody.date}</Moment> 
        </ModalBody>
        <ModalFooter>
          <Button onClick={onDeleteMessage} color="danger">Delete</Button>{' '}
          <Button color="secondary" onClick={onToggleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

MessageFormModal.propTypes = {
  modalBool: PropTypes.bool,
  onToggleModal: PropTypes.func,
  messageBody: PropTypes.object,
  onDeleteMessage: PropTypes.func,
}
export default MessageFormModal;