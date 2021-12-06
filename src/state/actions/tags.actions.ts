import { Dispatch } from 'redux';
import { TicketTag } from '../../models/ticket.models';
import TagService from '../../services/tag.service';

export class TagsActions {
  static readonly FETCH_TAGS_SUCCESS = 'FETCH_TAGS_SUCCESS';
  static readonly FETCH_TAGS_ERROR = 'FETCH_TAGS_ERROR';
  static readonly FETCH_TAGS_LOADING = 'FETCH_TAGS_LOADING';

  tagService = new TagService();

  fetchTags = (search: string) => {
    return (dispatch: Dispatch): Promise<TagsReducerAction> => {
      dispatch({
        type: TagsActions.FETCH_TAGS_LOADING as typeof TagsActions.FETCH_TAGS_LOADING,
      });

      return this.tagService.getFilteredTags(search).then(
        (tags) => {
          return dispatch({
            type: TagsActions.FETCH_TAGS_SUCCESS as typeof TagsActions.FETCH_TAGS_SUCCESS,
            tags,
          });
        },
        (error) => {
          return dispatch({
            type: TagsActions.FETCH_TAGS_ERROR as typeof TagsActions.FETCH_TAGS_ERROR,
            error,
          });
        },
      );
    };
  };
}

export type TagsReducerAction =
  | FetchTagsSuccessAction
  | FetchTagsErrorAction
  | FetchTagsLoadingAction;

export interface FetchTagsSuccessAction {
  type: typeof TagsActions.FETCH_TAGS_SUCCESS;
  tags: TicketTag[];
}

export interface FetchTagsErrorAction {
  type: typeof TagsActions.FETCH_TAGS_ERROR;
  error: Error;
}

export interface FetchTagsLoadingAction {
  type: typeof TagsActions.FETCH_TAGS_LOADING;
}
