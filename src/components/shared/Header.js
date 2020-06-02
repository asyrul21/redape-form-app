import React from 'react'

import './header.css'

const Header = () => {
    return (
        // nav container
        <div className="Nav">
            {/* nav links */}
            <a href="/" className="navlink">Home</a>
            <a href="/" className="navlink">About</a>
        </div>
    )
}

export default Header;