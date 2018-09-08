import React from 'react';

import LegendItem from './LegendItem/LegendItem';

import './Legend.css';

function Legend({ 
    items = {}, 
    toggleSelection, 
    deselectAll,
    selectAll,
    selectDefaults,
    toggleEdit,
    editActive,
    changeColor,
    handleClose }) {
  
  const legendItems = Object.keys(items).map((key, i) => {

    const el = items[key];

    return <LegendItem 
      pos={key}
      item={el}
      key={i} 
      toggleSelection={toggleSelection}
      editActive={editActive} 
      changeColor={ changeColor }
      handleClose={ handleClose }/>
  })


  let editValues = editActive
                    ? ['Close Edit', 'close']
                    : ['Edit', 'edit'];

  return (
    <div className="Legend">

      <div onClick={toggleEdit} className="edit-button button">
        <i className="material-icons">{editValues[1]}</i>
        <span>{editValues[0]}</span>
      </div>

      { legendItems }

      <div className="select-buttons">

        <div className="button select-all-btn" onClick={selectAll}>
          <i className="material-icons">select_all</i>
          <span>Select All</span>
        </div>

        <div className="button deselect-all-btn" onClick={deselectAll}>
          <i className="material-icons">clear_all</i>
          <span>Deselect All</span>
        </div>

        <div className="button select-defaults-btn" onClick={selectDefaults}>
          <i className="material-icons">autorenew</i>
          <span>Select Defaults:  
            <span className="noun"> N</span>
            <span className="verb"> V</span>
          </span>
        </div>
      
      </div>

    </div>
  )

}

export default Legend;