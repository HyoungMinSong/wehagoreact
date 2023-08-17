import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { styled } from "styled-components";

const CustomModal = styled(Modal)`
    & .modal-content {
        width: 500px;
        height: 500px;
        background-color: #f5f5f5;
        border-radius: 10px;
    }

    & .modal-header {
        background-color: #007bff;
        color: white;
    }

    & .modal-body {
        padding: 20px;
    }

    & .modal-body .title {
        padding: 0px 5px;
        font-size: 17px;
        font-weight: bold;
    }

    & .modal-body .content {
        padding: 0px 5px;
        font-size: 16px;
    }

    & .modal-footer {
        background-color: #f5f5f5;
        border-top: none;
    }

    & .modal-footer .btn-primary {
        background-color: #007bff;
        border: none;
        font-size: 18px;
        width: 80px;
        height: 45px;
    }

    & .modal-footer .btn-primary:hover {
        background-color: #0056b3;
    }
`;

function NoticeModal(props) {
    const { showModal, setShowModal, notice } = props;

    const handleClose = () => {
        setShowModal(false);
    };

    return (
        <CustomModal show={showModal} onHide={handleClose} animation={false} centered>
            <Modal.Header closeButton>
                <Modal.Title>공지사항</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='title'>
                    {notice.t_notice_title}
                </div>
                <hr/>
                <div className='content'>
                    {notice.t_notice_content}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    확인
                </Button>
            </Modal.Footer>
        </CustomModal>
    );
}

export default NoticeModal;