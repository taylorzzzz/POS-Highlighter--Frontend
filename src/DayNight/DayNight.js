import React from 'react';

import './DayNight.css';

function DayNight(props) {

    return  (
        <div className="DayNight">
            <input 
                type="checkbox" 
                checked={props.dayToggled}
                id="toggle-btn" 
                onChange={props.toggleDayNight}></input>
            <label htmlFor="toggle-btn"></label>
        </div>
    )
}

export default DayNight;