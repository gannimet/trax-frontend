import { Col, List, Row, Space, Tag, Typography } from 'antd';
import React from 'react';
import EstimateBadge from '../../EstimateBadge/estimate-badge';
import UserAvatar from '../../UserAvatar/user-avatar';
import './sprint-ticket-list-item.scss';
import { SprintTicketListItemProps } from './sprint-ticket-list-item.types';

const { Text, Link } = Typography;

const SprintTicketListItem = React.memo<SprintTicketListItemProps>(
  ({ ticket }) => {
    return (
      <List.Item
        className={`sprint-ticket-list-item ${ticket.ticketType.name.toLowerCase()}`}
      >
        <Row style={{ width: '100%' }} gutter={8} wrap={false} align="middle">
          <Col flex="none">
            <Link>{ticket.issueNumber}</Link>
          </Col>
          <Col flex="auto">
            <Text ellipsis={{ tooltip: ticket.title }}>{ticket.title}</Text>
          </Col>
          <Col flex="none" style={{ textAlign: 'right' }}>
            <Space>
              {ticket.tags?.length > 0 &&
                ticket.tags.map((tag) => {
                  return (
                    <Tag key={tag.id} color={`#${tag.color}`}>
                      {tag.name}
                    </Tag>
                  );
                })}
              {ticket.assignee && <UserAvatar user={ticket.assignee} />}
              {ticket.estimate != null && (
                <EstimateBadge value={ticket.estimate} />
              )}
            </Space>
          </Col>
        </Row>
      </List.Item>
    );
  },
);

SprintTicketListItem.displayName = 'SprintTicketListItem';

export default SprintTicketListItem;
