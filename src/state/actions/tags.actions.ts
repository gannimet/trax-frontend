import { Dispatch } from 'redux';
import { TicketTag } from '../../models/ticket.models';
import TagService from '../../services/tag.service';

export class TagsActions {
  static readonly FETCH_TAGS_SUCCESS = 'FETCH_TAGS_SUCCESS';
  static readonly FETCH_TAGS_ERROR = 'FETCH_TAGS_ERROR';
  static readonly FETCH_TAGS_LOADING = 'FETCH_TAGS_LOADING';

  static readonly CREATE_TAG_SUCCESS = 'CREATE_TAG_SUCCESS';
  static readonly CREATE_TAG_ERROR = 'CREATE_TAG_ERROR';
  static readonly CREATE_TAG_LOADING = 'CREATE_TAG_LOADING';

  tagService = new TagService();

  fetchTags = (search: string) => {
    return (dispatch: Dispatch): Promise<FetchTagsAction> => {
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

  createTag = (name: string) => {
    return (dispatch: Dispatch): Promise<CreateTagAction> => {
      dispatch({
        type: TagsActions.CREATE_TAG_LOADING as typeof TagsActions.CREATE_TAG_LOADING,
      });

      return this.tagService.createTag(name).then(
        (tag) => {
          return dispatch({
            type: TagsActions.CREATE_TAG_SUCCESS as typeof TagsActions.CREATE_TAG_SUCCESS,
            tag,
          });
        },
        (error) => {
          return dispatch({
            type: TagsActions.CREATE_TAG_ERROR as typeof TagsActions.CREATE_TAG_ERROR,
            error,
          });
        },
      );
    };
  };
}

export type TagsReducerAction = FetchTagsAction | CreateTagAction;

export type FetchTagsAction =
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

export type CreateTagAction =
  | CreateTagSuccessAction
  | CreateTagErrorAction
  | CreateTagLoadingAction;

export interface CreateTagSuccessAction {
  type: typeof TagsActions.CREATE_TAG_SUCCESS;
  tag: TicketTag;
}

export interface CreateTagErrorAction {
  type: typeof TagsActions.CREATE_TAG_ERROR;
  error: Error;
}

export interface CreateTagLoadingAction {
  type: typeof TagsActions.CREATE_TAG_LOADING;
}
