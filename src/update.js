import react, { useState, useEffect } from "react";
import './App.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { database, firebase } from './firebase'


const UpdateTODO = (props) => {
    const {
        buttonLabel,
        className,
        data,
        key
    } = props;

    const [modal, setModal] = useState(false);
    const [nestedModal, setNestedModal] = useState(false);
    const [closeAll, setCloseAll] = useState(false);

    const toggle = () => setModal(!modal);
    const toggleNested = () => {
        setNestedModal(!nestedModal);
        setCloseAll(false);
    };
    const toggleAll = () => {
        setNestedModal(!nestedModal);
        setCloseAll(true);
    };
    return (
        <div>
            <Button className="editButton" onClick={toggle}>{buttonLabel}EDIT</Button>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>Update form</ModalHeader>
                <ModalBody>

                </ModalBody>

            </Modal>

        </div>
    );
};

export default UpdateTODO;