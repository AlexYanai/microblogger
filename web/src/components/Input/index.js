// @flow
import React from 'react';

type Props = {
  input: Object,
  label?: string,
  type?: string,
  placeholder?: string,
  style?: Object,
  meta: Object,
};

const Input = ({ input, label, type, placeholder, style, meta, className }: Props) =>
  <div style={{ marginBottom: '1rem' }}>
    {label && <label htmlFor={input.name}>{label}</label>}
    {!className && 
      <input
        {...input}
        type={type}
        placeholder={placeholder}
        className="form-control"
        style={style && style}
      />
    }
    {className && 
      <input
        {...input}
        type={type}
        placeholder={placeholder}
        className={className}
        style={style && style}
      />
    }
    {meta.touched && meta.error &&
      <div style={{ fontSize: '85%', color: 'rgb(255,59,48)' }}>{meta.error}</div>
    }
  </div>;

export default Input;