import React from 'react';

import './FooterElement.css';

function FooterElement(props) {

    const classes = props.classes
        ? [ ...props.classes, "FooterElement"]
        : [];


    return (
        <div className={classes.join(' ')}>
            {props.children}
        </div>
    )
}

export default FooterElement;