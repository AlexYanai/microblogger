import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import session from './session';
import citations from './citations';
import favorites from './favorites';
import modal from './modal';
import profile from './profile';

const appReducer = combineReducers({
  form,
  session,
  favorites,
  profile,
  modal,
  citations
});

export default function (state, action) {
  if (action.type === 'LOGOUT') {
    return appReducer(undefined, action);
  }
  
  return appReducer(state, action);
}