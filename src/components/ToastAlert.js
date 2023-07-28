import Toast from 'react-bootstrap/Toast';

import { ToastMessageContext } from "App";
import { useContext, useEffect, useState } from "react";
import { ToastContainer } from 'react-bootstrap';

export default function ToastAlert() {

    const { toastMessage } = useContext(ToastMessageContext);
    const [ show, setShow ] = useState(false);

    useEffect(() => {
        setShow(true);
    }, [toastMessage])

    return (
        <ToastContainer className="p-3" position='top-center' style={{ zIndex: 1 }}>
            <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
                <Toast.Body>
                    { toastMessage }
                </Toast.Body>
            </Toast>
        </ToastContainer>
    );
}