// @flow
import React from 'react';
import Multiselect from 'react-widgets/lib/Multiselect'
import 'react-widgets/dist/css/react-widgets.css'

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