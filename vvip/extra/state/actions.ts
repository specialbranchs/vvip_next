import user from './user/actions';
import appState from './appState/actions'
import attendent from './attendent/actions'
import pims from './pims/actions'
export const LOG_OUT = 'LOG_OUT';

export interface LogOutAction {
  type: typeof LOG_OUT;
}

const logOut = (): LogOutAction => ({
  type: LOG_OUT
});

const actions = {
  user,
  appState,
  attendent,
  pims,
  logOut
};

export default actions;
