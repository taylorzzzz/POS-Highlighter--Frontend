import React from 'react';

import './TaggedText.css';

function TaggedText({ markup, underline, toggleUnderline })  {

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