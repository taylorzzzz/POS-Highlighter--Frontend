import React from 'react';

import './TaggedText.css';

function TaggedText({ markup, underline, toggleUnderline })  {

  console.log('rendering taggedtext');
  console.log(toggleUnderline);
  return (
    <div className="TaggedText">

      { markup }

      <div className="underline-toggle">
        <input 
          type="checkbox"
          checked={ underline }
          onChange={ toggleUnderline }
          id="underline">
        </input>
        <label htmlFor="underline">Underline</label>
      </div>

    </div>
  )

}

export default TaggedText;