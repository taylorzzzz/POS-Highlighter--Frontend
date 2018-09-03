import React from 'react';

import './Footer.css';

function Footer(props) {

    return (
        <footer className="Footer">
            {props.children}
        </footer>
    )
}

export default Footer;