import { Button, Space } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { useCurrentUserId } from '../../../../hooks/use-auth';
import { User } from '../../../../models/user.models';
import {
  UserTeamsActions,
  UserTeamsReducerAction,
} from '../../../../state/actions/user-teams.actions';
import { StoreStateType } from '../../../../state/root.reducer';
import AutoCompleteInlineEdit from '../../../InlineEdit/AutCompleteInlineEdit/autocomplete-inline-edit';
import UserDisplayLine from '../../../UserDisplayLine/user-display-line';
import './ticket-assignee-item.scss';
import { TicketAssigneeItemProps } from './ticket-assignee-item.types';

const TicketAssigneeItem = React.memo<TicketAssigneeItemProps>(
  ({ ticket, onEditSubmit }) => {
    const dispatch: ThunkDispatch<
      StoreStateType,
      void,
      UserTeamsReducerAction
    > = useDispatch<Dispatch<UserTeamsReducerAction>>();
    const currentUserId = useCurrentUserId();
    const [isEditing, setIsEditing] = useState(false);

    const { fetchUsersOfTeam } = new UserTeamsActions();

    const renderAssigneOptionView = (user: User) => {
      return <UserDisplayLine user={user} />;
    };

    const getFilteredAssigneeOptions = (
      searchValue: string,
    ): Promise<User[]> => {
      if (!ticket.sprint?.team?.id) {
        return Promise.resolve([]);
      }

      return dispatch(
        fetchUsersOfTeam(ticket.sprint.team.id, searchValue),
      ).then((successAction) => {
        if (successAction.type === 'FETCH_USERS_OF_TEAM_SUCCESS') {
          return successAction.users;
        }

        return [];
      });
    };

    const getUserDisplayValueFromOption = (user: User) => {
      return `${user.firstName} ${user.lastName}`;
    };

    const onSelectAssignee = (userId: string | null) => {
      setIsEditing(false);

      if (ticket.assignee?.id !== userId) {
        onEditSubmit('ASSIGNEE', userId);
      }
    };

    const onCancel = () => {
      setIsEditing(false);
    };

    const handleRemoveAssigneeClick = () => {
      onEditSubmit('ASSIGNEE', null);
    };

    const handleAssignToMeClick = () => {
      if (currentUserId) {
        onEditSubmit('ASSIGNEE', currentUserId);
      }
    };

    return (
      <Space
        className={isEditing ? 'assignee-is-editing' : ''}
        style={{ width: '100%' }}
      >
        <div style={isEditing ? { width: '100%' } : {}}>
          <AutoCompleteInlineEdit
            value={ticket.assignee ?? null}
            getOptionView={renderAssigneOptionView}
            getFilteredOptions={getFilteredAssigneeOptions}
            getDisplayValue={getUserDisplayValueFromOption}
            onSubmit={onSelectAssignee}
            onCancel={onCancel}
            onStartEditing={() => setIsEditing(true)}
          >
            {ticket.assignee && renderAssigneOptionView(ticket.assignee)}
            {!ticket.assignee && 'Unassigned'}
          </AutoCompleteInlineEdit>
        </div>
        {ticket.assignee && !isEditing && (
          <Button
            size="small"
            type="default"
            htmlType="button"
            onClick={handleRemoveAssigneeClick}
          >
            Remove assignee
          </Button>
        )}
        {ticket.assignee?.id !== currentUserId && !isEditing && (
          <Button
            size="small"
            type="default"
            htmlType="button"
            onClick={handleAssignToMeClick}
          >
            Assign to me
          </Button>
        )}
      </Space>
    );
  },
);

TicketAssigneeItem.displayName = 'TicketAssigneeItem';

export default TicketAssigneeItem;
