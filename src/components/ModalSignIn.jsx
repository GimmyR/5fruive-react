import { useState } from 'react';
import '../styles/ModalSignIn.css';
import { Modal } from 'react-bootstrap';

function ModalSignIn({ fetchAccount, showST }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const signUp = function() {
        console.log("SIGN UP ?");
    };

    const signIn = function() {
        fetch("http://127.0.0.1:8000/account/sign-in/api", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: username, password: password })
        }).then((res) => res.json())
            .then((data) => {
                if(data.accSession != null) {
                    sessionStorage.setItem("accSession", data.accSession);
                    fetchAccount();
                    showST.setShow(false);
                }
            });
    };

    return (
        <Modal show={showST.show} onHide={() => showST.setShow(false)} variant="success">
            <Modal.Header closeButton>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <form>
                <div className="mb-3">
                    <label className="form-label modal-sign-in-label">Username</label>
                    <input value={username} onChange={(e) => setUsername(e.target.value)} id="modal-sign-in-username" type="text" className="form-control modal-sign-in-input" placeholder="ex: JohnDoe"/>
                </div>
                <div className="mb-3">
                    <label className="form-label modal-sign-in-label">Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} id="modal-sign-in-password" type="password" className="form-control modal-sign-in-input" placeholder="* * * * * * * * *"/>
                </div>
            </form>
            </Modal.Body>
            <Modal.Footer>
                <button onClick={() => signUp()} type="button" className="btn btn-info col col-lg-3 modal-sign-in-btn">Sign Up</button>
                <button onClick={() => signIn()} type="button" className="btn btn-warning col col-lg-3 modal-sign-in-btn">Sign In</button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalSignIn;