import React from 'react';
import R from 'ramda';


const renderInput = field => (
  <div>
    <label>{field.label}
      <input {...field.input}
        className={field.className}
        placeholder={field.placeholder}
        type={field.type}
        onFocus={field.onFocus}
      />
    </label>
    { field.displayError &&
      field.meta.touched &&
      field.meta.error &&
      <div>{field.meta.error}</div> }
  </div>
);

const renderSelect = field => (
  <div>
    <label>{field.label}
      <select {...field.input}
        className={field.className}
        onFocus={field.onFocus}    // if future forms use more listeners, add here
      >
        {R.map(
          opt => <option key={opt.id} value={opt.name}>{opt.name}</option>,
          field.options
        )};
      </select>
    </label>
    { field.displayError &&
      field.meta.touched &&
      field.meta.error &&
      <div>{field.meta.error}</div> }
  </div>
);


export {renderInput, renderSelect};
