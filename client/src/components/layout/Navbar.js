import React from 'react'

const Navbar = () => {
    return (
        <div className="row">
            <nav className="navbar navbar-light bg-light shadow-sm">
                <div className="container-fluid justify-content-end">
                    <form className="d-flex me-5">
                        <input className="form-control me-2 shadow-sm" type="search" placeholder="Type in something..." aria-label="Search" />
                        <button className="btn btn-outline-success shadow-sm" type="submit">Search</button>
                    </form>
                    <i className="fa fa-fw fa-rocket" style={{ fontSize: '1.75em' }} />
                    <a className="navbar-brand" href="/">MoreTask</a>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
