import React from 'react';

const DropDown = ({ title , options, func }) => {
  return (
    <div className="select-wrapper">
      <select defaultValue="0" onChange={func}  name="format" id="format" className="custom-dropdown">
        <option value="0" disabled>
          {title}
        </option>
        {
          options.map((o, i) => (
            <option key={i} value={o}>
              {o.toUpperCase()}
            </option>
          ))
        }
      </select>
    </div>
  );
};

export default DropDown;
