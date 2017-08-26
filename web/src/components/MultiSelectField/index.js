// @flow
import React from 'react';
import Multiselect from 'react-widgets/lib/Multiselect'

const MultiSelectField = ({ input, data, valueField, textField }) =>
  <Multiselect {...input}
    onBlur={() => input.onBlur()}
    value={input.value || []}
    placeholder="Tags..." 
    data={data}
    valueField={valueField}
    textField={textField}
  />

export default MultiSelectField;