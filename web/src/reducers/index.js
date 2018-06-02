import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import session from './session';
import posts from './posts';
import favorites from './favorites';
import modal from './modal';
import profile from './profile';

const appReducer = combineReducers({
  form,
  session,
  favorites,
  profile,
  modal,
  posts
});

export default function (state, action) {
  if (action.type === 'LOGOUT') {
    return appReducer(undefined, action);
  }
  
  return appReducer(state, action);
}