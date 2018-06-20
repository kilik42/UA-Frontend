import { createSelector } from 'reselect';

/**
 * Direct selector to the addCommunications state domain
 */
const selectAddCommunicationsDomain = (state) => state.get('addCommunications');

/**
 * Other specific selectors
 */


/**
 * Default selector used by AddCommunications
 */

const makeSelectAddCommunications = () => createSelector(
  selectAddCommunicationsDomain,
  (substate) => substate.toJS()
);

const makeSelectCreateCommunications = () => createSelector(
  selectAddCommunicationsDomain,
  (substate) => substate.get('addCommunications')
);

const listCommunications = () => createSelector(
  selectAddCommunicationsDomain,
(substate) => substate.get('communication_list')
);

export default makeSelectAddCommunications;
export {
  selectAddCommunicationsDomain,
  makeSelectCreateCommunications,
  listCommunications
};
