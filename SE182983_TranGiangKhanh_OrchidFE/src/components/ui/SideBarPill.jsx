import React from 'react'
import './ui.scss'
import { useLocation, useNavigate } from 'react-router-dom';

export const SideBarPill = ({ iconTag, name, urlNavigate }) => {

    const location = useLocation();
    const navigate = useNavigate();

    const navigateHandler = () => {
        navigate(`/${urlNavigate}`);
    }


    return (
        <div id="sideBarPill"
            className="nav-item nav-pills"
            style={{ margin: '15px 20px' }}
            onClick={navigateHandler}
        >
            <a className={`nav-link ${location.pathname === `/${urlNavigate}` ? 'selected_pill' : ''}`} aria-current="page" data-bs-toggle="pill" href="#" style={{ padding: '8px 10px' }}>
                {iconTag}<span>{name}</span>
            </a>
        </div>
    )
}

export default SideBarPill