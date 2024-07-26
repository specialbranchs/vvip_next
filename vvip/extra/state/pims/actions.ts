
import * as Types from './actionTypes';

const savePimState = (pimState: string): Types.SavePimStateAction => ({
  type: Types.SAVE_PIMSTATE,
  payload: pimState
});

const removePimState = (): Types.RemovePimStateAction => ({
  type: Types.REMOVE_PIMSTATE
});

export default { savePimState, removePimState };
