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

const InputCheckbox = ({ input, label, type, placeholder, style, meta, className }: Props) =>
  <div style={{ display: 'inline-flex', width: '100%', paddingTop: '10px' }}>
    {label && <label htmlFor={input.name}>{label}</label>}
    <input
      {...input}
      type={type}
      placeholder={placeholder}
      style={style && style}
    />
    {meta.touched && meta.error &&
      <div style={{ fontSize: '85%', color: 'rgb(255,59,48)' }}>{meta.error}</div>
    }
  </div>;

export default InputCheckbox;