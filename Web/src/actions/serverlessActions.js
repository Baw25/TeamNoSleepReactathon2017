import { types } from './actionConstants';

const serverlessActions = {
  fetchOpenTableListing: () => {
    return {
      type: FETCH_OPENTABLE_LIST
    };
  }
}

export default serverlessActions;