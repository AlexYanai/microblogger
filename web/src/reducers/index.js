import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import session from './session';
import citations from './citations';
import modal from './modal';

const appReducer = combineReducers({
  form,
  session,
  modal,
  citations
});

export default function (state, action) {
  if (action.type === 'LOGOUT') {
    return appReducer(undefined, action);
  }
  
  return appReducer(state, action);
}