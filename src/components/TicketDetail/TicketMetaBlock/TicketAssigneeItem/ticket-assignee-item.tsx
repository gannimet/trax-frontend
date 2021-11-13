import React from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { User } from '../../../../models/user.models';
import {
  TicketsActions,
  TicketsReducerAction,
} from '../../../../state/actions/tickets.actions';
import {
  UserTeamsActions,
  UserTeamsReducerAction,
} from '../../../../state/actions/user-teams.actions';
import { StoreStateType } from '../../../../state/root.reducer';
import AutoCompleteInlineEdit from '../../../InlineEdit/AutCompleteInlineEdit/autocomplete-inline-edit';
import UserDisplayLine from '../../../UserDisplayLine/user-display-line';
import { TicketAssigneeItemProps } from './ticket-assignee-item.types';

const TicketAssigneeItem = React.memo<TicketAssigneeItemProps>(({ ticket }) => {
  const dispatch: ThunkDispatch<
    StoreStateType,
    void,
    UserTeamsReducerAction | TicketsReducerAction
  > = useDispatch<Dispatch<UserTeamsReducerAction | TicketsReducerAction>>();

  const { fetchUsersOfTeam } = new UserTeamsActions();
  const { editTicket } = new TicketsActions();

  const renderAssigneOptionView = (user: User) => {
    return <UserDisplayLine user={user} />;
  };

  const getFilteredAssigneeOptions = (searchValue: string): Promise<User[]> => {
    if (!ticket.sprint?.team?.id) {
      return Promise.resolve([]);
    }

    return dispatch(fetchUsersOfTeam(ticket.sprint.team.id, searchValue)).then(
      (successAction) => {
        if (successAction.type === 'FETCH_USERS_OF_TEAM_SUCCESS') {
          return successAction.users;
        }

        return [];
      },
    );
  };

  const getUserDisplayValueFromOption = (user: User) => {
    return `${user.firstName} ${user.lastName}`;
  };

  const onSelectAssignee = (userId: string | null) => {
    if (ticket.assignee?.id === userId) {
      return;
    }

    dispatch(editTicket(ticket.id, 'ASSIGNEE', userId));
  };

  return (
    <AutoCompleteInlineEdit
      value={ticket.assignee ?? null}
      getOptionView={renderAssigneOptionView}
      getFilteredOptions={getFilteredAssigneeOptions}
      getDisplayValue={getUserDisplayValueFromOption}
      onSubmit={onSelectAssignee}
    >
      {ticket.assignee && renderAssigneOptionView(ticket.assignee)}
      {!ticket.assignee && 'Unassigned'}
    </AutoCompleteInlineEdit>
  );
});

TicketAssigneeItem.displayName = 'TicketAssigneeItem';

export default TicketAssigneeItem;
