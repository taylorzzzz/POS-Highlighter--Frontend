import React from 'react';
import { SketchPicker } from 'react-color';

import './LegendItem.css';

function LegendItem({ 
    pos, 
    item, 
    toggleSelection, 
    editActive, 
    changeColor,
    handleClose }) {

  const unselected = item.selected ? '' : 'unselected';
  const edit = editActive ? 'editActive' : '';
  const classes = `${unselected} ${edit} LegendItem dot`;
  
  const popover = {
    position: 'absolute',
    zIndex: '2',
  };
  const cover = {
    position: 'fixed',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px'
  };
  return (
    <div className={classes}>
      
      <input 
        type="checkbox"  
        checked={ item.selected }
        onChange={ toggleSelection}
        data-pos={ pos }
        id={ pos }/>

      <label htmlFor={ pos }>{ pos }</label>

      {
        item.beingEdited
          ? <div style={ popover }>
              <div style={ cover } onClick={() => handleClose(pos)}></div>
                <SketchPicker color={item.color} onChangeComplete={(color) => changeColor(pos, color)}/> 
            </div>
          : null
      }

    </div>
  )

}

export default LegendItem;