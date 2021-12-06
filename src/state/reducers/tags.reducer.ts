import { Reducer } from 'redux';
import { TicketTag } from '../../models/ticket.models';
import { TagsActions, TagsReducerAction } from '../actions/tags.actions';

export interface TagsState {
  tags?: TicketTag[];
  tagsError?: Error;
  tagsLoading: boolean;
}

export const tagsInitialState: TagsState = {
  tagsLoading: false,
};

export const tagsReducer: Reducer<TagsState, TagsReducerAction> = (
  state = tagsInitialState,
  action,
) => {
  switch (action.type) {
    case TagsActions.FETCH_TAGS_SUCCESS:
      return {
        ...state,
        tags: action.tags,
        tagsError: undefined,
        tagsLoading: false,
      };
    case TagsActions.FETCH_TAGS_ERROR:
      return {
        ...state,
        tags: undefined,
        tagsError: action.error,
        tagsLoading: false,
      };
    case TagsActions.FETCH_TAGS_LOADING:
      return {
        ...state,
        tags: undefined,
        tagsError: undefined,
        tagsLoading: true,
      };
    default:
      return { ...state };
  }
};
