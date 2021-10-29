import { Space, Tag } from 'antd';
import React from 'react';
import { TagListProps } from './tag-list.types';

const TagList = React.memo<TagListProps>(({ tags }) => {
  return (
    <Space>
      {tags.map((tag) => {
        return (
          <Tag key={tag.id} color={`#${tag.color}`}>
            {tag.name}
          </Tag>
        );
      })}
    </Space>
  );
});

TagList.displayName = 'TagList';

export default TagList;
