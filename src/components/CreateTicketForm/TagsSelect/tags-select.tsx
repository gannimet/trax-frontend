import { Button, Divider, Select, Spin, Tag } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import {
  TagsActions,
  TagsReducerAction,
} from '../../../state/actions/tags.actions';
import { TagsState } from '../../../state/reducers/tags.reducer';
import { StoreStateType } from '../../../state/root.reducer';
import { TagsSelectProps } from './tags-select.types';

type OptionData = {
  key?: string;
  label: React.ReactNode;
  value: string;
};

const TagsSelect = React.memo<TagsSelectProps>(({ onChange }) => {
  const [tagOptions, setTagOptions] = useState<OptionData[]>([]);
  const tagsFetchRef = useRef(0);
  const { tags, tagsLoading } = useSelector<StoreStateType, TagsState>(
    (state) => state.tags,
  );

  const dispatch: ThunkDispatch<StoreStateType, void, TagsReducerAction> =
    useDispatch<Dispatch<TagsReducerAction>>();

  const { fetchTags } = new TagsActions();

  const fetchFilteredTags = (searchValue: string) => {
    tagsFetchRef.current += 1;
    setTagOptions([]);

    dispatch(fetchTags(searchValue));
  };

  useEffect(() => {
    if (!tags) {
      return;
    }

    const fetchId = tagsFetchRef.current;

    if (fetchId === tagsFetchRef.current) {
      setTagOptions(
        tags.map((tag) => {
          return {
            key: tag.id,
            value: tag.id,
            label: <Tag color={`#${tag.color}`}>{tag.name}</Tag>,
          };
        }),
      );
    }
  }, [tags]);

  return (
    <Select
      mode="multiple"
      placeholder="Select tags"
      filterOption={false}
      options={tagOptions}
      onSearch={fetchFilteredTags}
      notFoundContent={tagsLoading ? <Spin size="small" /> : null}
      onChange={onChange}
      dropdownRender={(menu) => {
        return (
          <>
            {menu}
            <Divider style={{ margin: '4px 0' }} />
            <Button>Hallo</Button>
          </>
        );
      }}
    ></Select>
  );
});

TagsSelect.displayName = 'TagsSelect';

export default TagsSelect;
