import React from "react";

const CustomModal = React.forwardRef(
    ({ children, nameId = "customModal" }, ref) => {
        
        return (
            <div
                className="modal fade"
                id={nameId}
                // ref={ref}
                aria-hidden="true"
                aria-labelledby="exampleModalToggleLabel2"
                tabIndex="-1"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content rounded-4">
                        <div className="modal-body">
                            <div className="d-flex justify-content-end">
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>

                            {children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
);

export default CustomModal;
