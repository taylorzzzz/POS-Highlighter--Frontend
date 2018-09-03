import React from 'react';

import './LegendItem.css';

function LegendItem({ pos, selected, toggleSelection }) {

  const unselected = selected ? '' : 'unselected';
  const classes = `${unselected} LegendItem`;

  return (
    <div className={classes}>

      <input 
        type="checkbox"  
        checked={ selected }
        onChange={ toggleSelection }
        data-pos={ pos }
        id={ pos }/>

      <label htmlFor={ pos }>{ pos }</label>

    </div>
  )

}

export default LegendItem;