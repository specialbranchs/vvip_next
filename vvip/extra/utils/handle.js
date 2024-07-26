
import { store } from "../state"


export const handle = () => {

      const { currentUser } = store.getState()
      const { user } = currentUser
      return user
}


