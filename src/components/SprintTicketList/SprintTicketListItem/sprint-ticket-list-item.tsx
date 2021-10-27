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
        <Row style={{ width: '100%' }} align="middle">
          <Col span={21}>
            <Space>
              <Link>{ticket.issueNumber}</Link>
              <Text ellipsis={{ tooltip: ticket.title }} className="title-text">
                {ticket.title}
              </Text>
              {ticket.tags?.length > 0 &&
                ticket.tags.map((tag) => {
                  return (
                    <Tag key={tag.id} color={`#${tag.color}`}>
                      {tag.name}
                    </Tag>
                  );
                })}
            </Space>
          </Col>
          <Col span={3} style={{ textAlign: 'right' }}>
            <Space>
              {ticket.assignee && <UserAvatar user={ticket.assignee} />}
              {ticket.estimate != null && (
                <Badge
                  count={ticket.estimate}
                  style={{
                    backgroundColor: '#aaa',
                    color: '#fff',
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
