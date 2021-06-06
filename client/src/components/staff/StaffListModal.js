import React, { useState, useEffect} from 'react'

const StaffListModal = () => {
    const [staff, setStaff] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getStaff();
        // eslint-disable-next-line
    }, []);

    const getStaff = async () => {
        setLoading(true);
        const res = await fetch("/users");
        const data = await res.json();

        setStaff(data);
        setLoading(false);
    }

    if (loading) {
        return <h4>Loading...</h4>
    }

    return (
        <div className="modal fade" id="staff-list-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">Staff List</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal">
                            Close
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            // onClick={onSubmit}
                            >
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StaffListModal