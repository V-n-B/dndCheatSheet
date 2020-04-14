import React from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { useAuth } from '../auth/useAuth';

interface ILogoutConfirmProps {
    isOpen: boolean;
    toggle: () => void;
    className?: string;
}

export function LogoutConfirm(props: ILogoutConfirmProps) {
    const { dispatchLogout } = useAuth();

    return (
        <Modal isOpen={props.isOpen} toggle={() => props.toggle()} className={props.className}>
            <ModalHeader toggle={props.toggle}>Hol' up!</ModalHeader>
            <ModalBody>
                Are you sure you want to logout?
        </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={async () => await handleLogout()}>Yes</Button>{' '}
                <Button color="secondary" onClick={props.toggle}>No</Button>
            </ModalFooter>
        </Modal>
    );

    async function handleLogout() {
        await dispatchLogout();
        props.toggle();
    }
}
