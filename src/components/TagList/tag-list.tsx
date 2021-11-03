import { Tag } from 'antd';
import React from 'react';
import './tag-list.scss';
import { TagListProps } from './tag-list.types';

const TagList = React.memo<TagListProps>(({ tags }) => {
  return (
    <div className="tag-list-container">
      {tags.map((tag) => {
        return (
          <Tag key={tag.id} color={`#${tag.color}`}>
            {tag.name}
          </Tag>
        );
      })}
    </div>
  );
});

TagList.displayName = 'TagList';

export default TagList;
