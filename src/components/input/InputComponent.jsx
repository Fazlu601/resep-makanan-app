// InputComponent.js
import React, { useState } from 'react';

const InputComponent = ({ labelButton, setState }) => {
  const [inputList, setInputList] = useState(['']);

  const handleChange = (e, index) => {
    const newItem = e.target.value;
    const newList = [...inputList];
    newList[index] = newItem;
    setInputList(newList);
    setState(newList);
  };

  const handleAdd = () => {
    setInputList([...inputList, '']);
  };

  return (
    <div>
      {inputList.map((input, index) => (
        <div key={index} className='mb-2'>
          <input
            type="text"
            className="form-control"
            value={input}
            onChange={(e) => handleChange(e, index)}
          />
        </div>
      ))}
      <a href="#" className="btn" onClick={handleAdd}>
        + {labelButton}
      </a>
    </div>
  );
};

export default InputComponent;
