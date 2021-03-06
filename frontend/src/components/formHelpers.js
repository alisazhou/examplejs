import React from 'react';
import R from 'ramda';


const renderInput = field => (
  <div>
    <label>{field.label}
      <input {...field.input}
        className={field.className}
        placeholder={field.placeholder}
        type={field.type}
      />
    </label>
    { field.meta.touched && <div>{field.meta.error}</div> }
  </div>
);

const renderSelect = field => (
  <div>
    <label>{field.label}
      <select {...field.input} className={field.className} >
        {R.map(
          opt => <option key={opt.id} value={opt.name}>{opt.name}</option>,
          field.options
        )};
      </select>
    </label>
    { field.meta.touched && <div>{field.meta.error}</div> }
  </div>
);


export {renderInput, renderSelect};
