import { Badge, Col, List, Row, Space, Tag, Typography } from 'antd';
import React from 'react';
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
            <Text ellipsis={{ tooltip: ticket.title }}>
              {ticket.title} Der YouTuber »Drachenlord« wird seit Jahren von
              einem Mob gequält, bedroht und belästigt. Nun hat er sich gewehrt
              und wurde zu einer Haftstrafe verurteilt. Ein katastrophales
              Versagen von Justiz, Medien und Gesellschaft.
            </Text>
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
                <Badge
                  count={ticket.estimate}
                  style={{
                    border: '1px solid #999',
                    backgroundColor: '#eee',
                    color: '#000',
                    width: '30px',
                  }}
                />
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
