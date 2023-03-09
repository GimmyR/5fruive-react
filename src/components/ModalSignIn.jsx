import '../styles/ModalSignIn.css';

function ModalSignIn() {
    const signUp = function() {
        console.log("SIGN UP ?");
    };

    const signIn = function() {

    };

    return (
        <div className="modal fade" id="modal-sign-in" tabIndex="-1" aria-labelledby="modal-sign-in-label" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content bg-success text-light">
                    <div className="modal-header">
                        <h1 className="modal-title modal-sign-in-title fw-bold text-warning" id="modal-sign-in-label">Login</h1>
                        <button type="button" className="border-0 bg-success text-light modal-sign-in-close" data-bs-dismiss="modal">
                            <i className="bi bi-x-lg"></i>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label className="form-label modal-sign-in-label">Username</label>
                                <input id="modal-sign-in-username" type="text" className="form-control modal-sign-in-input" placeholder="ex: JohnDoe"/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label modal-sign-in-label">Password</label>
                                <input id="modal-sign-in-password" type="password" className="form-control modal-sign-in-input" placeholder="* * * * * * * * *"/>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button onClick={() => signUp()} type="button" className="btn btn-info col col-lg-3 modal-sign-in-btn">Sign Up</button>
                        <button onClick={() => signIn()} type="button" className="btn btn-warning col col-lg-3 modal-sign-in-btn">Sign In</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalSignIn;