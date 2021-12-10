import { Reducer } from 'redux';
import { TicketTag } from '../../models/ticket.models';
import { TagsActions, TagsReducerAction } from '../actions/tags.actions';

export interface TagsState {
  tags?: TicketTag[];
  tagsError?: Error;
  tagsLoading: boolean;
  newTag?: TicketTag;
  newTagError?: Error;
  newTagLoading: boolean;
}

export const tagsInitialState: TagsState = {
  tagsLoading: false,
  newTagLoading: false,
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
    case TagsActions.CREATE_TAG_SUCCESS:
      return {
        ...state,
        newTag: action.tag,
        newTagError: undefined,
        newTagLoading: false,
      };
    case TagsActions.CREATE_TAG_ERROR:
      return {
        ...state,
        newTag: undefined,
        newTagError: action.error,
        newTagLoading: false,
      };
    case TagsActions.CREATE_TAG_LOADING:
      return {
        ...state,
        newTag: undefined,
        newTagError: undefined,
        newTagLoading: true,
      };
    default:
      return { ...state };
  }
};
