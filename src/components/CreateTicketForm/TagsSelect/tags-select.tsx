import { Select, Spin, Tag } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { useClickOutside } from '../../../hooks/use-click-outside';
import { TicketTag } from '../../../models/ticket.models';
import {
  TagsActions,
  TagsReducerAction,
} from '../../../state/actions/tags.actions';
import { TagsState } from '../../../state/reducers/tags.reducer';
import { StoreStateType } from '../../../state/root.reducer';
import { mergeTagsArrays } from '../../../utils/display.utils';
import { TagsSelectProps } from './tags-select.types';

type OptionData = {
  key?: string;
  label: React.ReactNode;
  value: string;
};

const TagsSelect = React.memo<TagsSelectProps>(({ onChange }) => {
  const knownTags = useRef<Map<string, TicketTag>>(new Map());
  const containerRef = useRef<HTMLDivElement>(null);
  const [tagOptions, setTagOptions] = useState<OptionData[]>([]);
  const [selectedTags, setSelectedTags] = useState<TicketTag[]>([]);
  const [searchValue, setSearchValue] = useState('');
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
      const knownTagArray = Array.from(knownTags.current.values());
      const mergedOptions = mergeTagsArrays(knownTagArray, tags);

      setTagOptions(
        mergedOptions.map((tag) => {
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
    setSearchValue(searchValue);

    tagsFetchRef.current += 1;
    setTagOptions([]);

    dispatch(fetchTags(searchValue));
  };

  useClickOutside(containerRef, () => {
    setSearchValue('');
  });

  const onTagSelect = (value: string) => {
    if (knownTags.current.has(value)) {
      const tag = knownTags.current.get(value);

      if (tag) {
        setSelectedTags([...selectedTags, tag]);
      }
    } else {
      dispatch(createTag(value));
    }
  };

  const onKeyPress = (e: React.KeyboardEvent) => {
    if (e.code === 'Enter' || e.code === 'Escape') {
      setSearchValue('');
    }
  };

  return (
    <div ref={containerRef} className="tags-select-container">
      <Select
        mode="tags"
        placeholder="Select tags"
        filterOption={false}
        options={tagOptions}
        onSearch={fetchFilteredTags}
        notFoundContent={tagsLoading ? <Spin size="small" /> : null}
        onSelect={onTagSelect}
        disabled={newTagLoading}
        searchValue={searchValue}
        onKeyDown={onKeyPress}
      ></Select>
    </div>
  );
});

TagsSelect.displayName = 'TagsSelect';

export default TagsSelect;
