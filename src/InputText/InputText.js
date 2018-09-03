import React from 'react';

import './InputText.css';

function InputText({text, handleTextChange, submitText}) {
  
  return (
    <div className="InputText">

      <textarea 
        onChange={handleTextChange}
        value={text} autoFocus="true">
      </textarea>

      <button 
        onClick={submitText}>
          Highlight
      </button>

    </div>
    
  )
}

export default InputText;