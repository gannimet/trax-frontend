import { Col, List, Row, Space, Typography } from 'antd';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import EstimateBadge from '../../EstimateBadge/estimate-badge';
import TagList from '../../TagList/tag-list';
import UserAvatar from '../../UserAvatar/user-avatar';
import './sprint-ticket-list-item.scss';
import { SprintTicketListItemProps } from './sprint-ticket-list-item.types';

const { Text } = Typography;

const SprintTicketListItem = React.memo<SprintTicketListItemProps>(
  ({ ticket }) => {
    const history = useHistory();

    const onTicketClick = () => {
      history.push(`/ticket/${ticket.issueNumber}`);
    };

    return (
      <List.Item
        className={`sprint-ticket-list-item ${ticket.type.name.toLowerCase()}`}
        onClick={onTicketClick}
      >
        <Row style={{ width: '100%' }} gutter={8} wrap={false} align="middle">
          <Col flex="none">
            <Link to={`/ticket/${ticket.issueNumber}`}>
              #{ticket.issueNumber}
            </Link>
          </Col>
          <Col flex="auto">
            <Text ellipsis={{ tooltip: ticket.title }}>{ticket.title}</Text>
          </Col>
          <Col flex="none" style={{ textAlign: 'right' }}>
            <Space>
              {ticket.tags?.length > 0 && <TagList tags={ticket.tags} />}
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
