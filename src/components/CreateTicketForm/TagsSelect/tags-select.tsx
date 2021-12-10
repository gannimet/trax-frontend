import { Select, Spin, Tag } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { TicketTag } from '../../../models/ticket.models';
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
  const knownTags = useRef<Map<string, TicketTag>>(new Map());
  const [tagOptions, setTagOptions] = useState<OptionData[]>([]);
  const [selectedTags, setSelectedTags] = useState<TicketTag[]>([]);
  const tagsFetchRef = useRef(0);
  const { tags, tagsLoading, newTag, newTagLoading } = useSelector<
    StoreStateType,
    TagsState
  >((state) => state.tags);

  const dispatch: ThunkDispatch<StoreStateType, void, TagsReducerAction> =
    useDispatch<Dispatch<TagsReducerAction>>();

  const { fetchTags, createTag } = new TagsActions();

  useEffect(() => {
    if (!tags) {
      return;
    }

    // Search has loaded tags - remember them
    tags.forEach((tag) => {
      knownTags.current.set(tag.id, tag);
    });

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

  useEffect(() => {
    if (!newTag) {
      return;
    }

    // New tag was added and API call to create it has finished
    knownTags.current.set(newTag.id, newTag);
    setSelectedTags([...selectedTags, newTag]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newTag]);

  useEffect(() => {
    onChange(selectedTags.map((tag) => tag.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTags]);

  const fetchFilteredTags = (searchValue: string) => {
    tagsFetchRef.current += 1;
    setTagOptions([]);

    dispatch(fetchTags(searchValue));
  };

  const onTagSelect = (value: string) => {
    if (knownTags.current.has(value)) {
      console.log('Selected known tag with ID:', value);
      const tag = knownTags.current.get(value);

      if (tag) {
        setSelectedTags([...selectedTags, tag]);
      }
    } else {
      console.log('Selected new tag with text:', value);
      dispatch(createTag(value));
    }
  };

  return (
    <Select
      mode="tags"
      placeholder="Select tags"
      filterOption={false}
      options={tagOptions}
      onSearch={fetchFilteredTags}
      notFoundContent={tagsLoading ? <Spin size="small" /> : null}
      onSelect={onTagSelect}
      disabled={newTagLoading}
    ></Select>
  );
});

TagsSelect.displayName = 'TagsSelect';

export default TagsSelect;
