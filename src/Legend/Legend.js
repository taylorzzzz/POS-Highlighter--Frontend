import React from 'react';

import LegendItem from './LegendItem/LegendItem';

import './Legend.css';

function Legend({ 
    items, 
    toggleSelection, 
    deselectAll,
    selectAll }) {
  
  const legendItems = Object.keys(items).map((key, i) => {

    const el = items[key];

    return <LegendItem 
      pos={key}
      selected={el.selected} 
      key={i} 
      toggleSelection={toggleSelection}/>
  })

  return (
    <div className="Legend">

      { legendItems }

      <div className="buttons">

        <button onClick={deselectAll}>
          Deselect All
        </button>

        <button onClick={selectAll}>
          Select All
        </button>
      
      </div>

    </div>
  )

}

export default Legend;