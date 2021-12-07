import { Select, Spin, Tag } from 'antd';
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import {
  TagsActions,
  TagsReducerAction,
} from '../../../state/actions/tags.actions';
import { StoreStateType } from '../../../state/root.reducer';
import { TagsSelectProps } from './tags-select.types';

type OptionData = {
  key?: string;
  label: React.ReactNode;
  value: string;
};

const TagsSelect = React.memo<TagsSelectProps>(({ onChange }) => {
  const [tagOptions, setTagOptions] = useState<OptionData[]>([]);
  const [tagsFetching, setTagsFetching] = useState(false);
  const tagsFetchRef = useRef(0);

  const dispatch: ThunkDispatch<StoreStateType, void, TagsReducerAction> =
    useDispatch<Dispatch<TagsReducerAction>>();

  const { fetchTags } = new TagsActions();

  const fetchFilteredTags = React.useMemo(() => {
    return (searchValue: string) => {
      tagsFetchRef.current += 1;
      const fetchId = tagsFetchRef.current;
      setTagOptions([]);
      setTagsFetching(true);

      dispatch(fetchTags(searchValue)).then((action) => {
        if (action.type === TagsActions.FETCH_TAGS_SUCCESS) {
          if (fetchId === tagsFetchRef.current) {
            setTagOptions(
              action.tags.map((tag) => {
                return {
                  key: tag.id,
                  value: tag.id,
                  label: <Tag color={`#${tag.color}`}>{tag.name}</Tag>,
                };
              }),
            );
            setTagsFetching(false);
          }
        }
      });
    };
  }, [dispatch, fetchTags]);

  return (
    <Select
      mode="multiple"
      placeholder="Select tags"
      filterOption={false}
      options={tagOptions}
      onSearch={fetchFilteredTags}
      notFoundContent={tagsFetching ? <Spin size="small" /> : null}
      onChange={onChange}
    ></Select>
  );
});

TagsSelect.displayName = 'TagsSelect';

export default TagsSelect;
