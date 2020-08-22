import React, { useState } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import './Input.css';

const Input = ({ input_type, fn, rowType }) => {
  const [focus, setFocus] = useState(false);
  // handle input change
  const handleInputChange = (e, idx) => {
    const list = [...input_type];
    list[idx] = e.target.value;
    fn(list);
  };

  //handle remove button
  const handleRemoveClick = (e, idx) => {
    e.preventDefault();
    const list = [...input_type];
    list.splice(idx, 1);
    fn(list);
  };

  // handle add button
  const handleAddClick = (e) => {
    e.preventDefault();
    fn([...input_type, '']);
    setFocus(true);
  };

  return (
    <CSSTransitionGroup
      className="row"
      transitionName="fade"
      transitionEnterTimeout={500}
      transitionLeaveTimeout={300}
    >
      <label htmlFor={rowType}>
        <p>{`${rowType}:`}</p>
      </label>
      {input_type &&
        input_type.map((inp, idx) => (
          <div className="input-row" key={idx}>
            <span>{idx + 1}.</span>
            <input
              className="recipe-input"
              type="text"
              name={`${rowType}-${idx}`}
              id={`${rowType}-${idx}`}
              value={inp}
              autoFocus={focus}
              required
              onChange={(e) => handleInputChange(e, idx)}
            />
            <div className="btns">
              {input_type.length !== 1 && (
                <button onClick={(e) => handleRemoveClick(e, idx)}>
                  <p>&minus;</p>
                </button>
              )}
              {input_type.length - 1 === idx && (
                <button onClick={handleAddClick}>
                  <p>&#43;</p>
                </button>
              )}
            </div>
          </div>
        ))}
    </CSSTransitionGroup>
  );
};

export default Input;
