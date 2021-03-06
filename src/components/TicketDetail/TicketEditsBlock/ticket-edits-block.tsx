import { Col, Comment, Row, Timeline, Tooltip, Typography } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { TicketEdit } from '../../../models/ticket.models';
import {
  formatDate,
  formatRelativeDate,
  getTicketEditingDescription,
} from '../../../utils/display.utils';
import UserAvatar from '../../UserAvatar/user-avatar';
import UserLink from '../../UserLink/user-link';
import AssigneeEditContent from './AssigneeEditContent/assignee-edit-content';
import EstimateEditContent from './EstimateEditContent/estimate-edit-content';
import StatusEditContent from './StatusEditContent/status-edit-content';
import TextEditContent from './TextEditContent/text-edit-content';
import './ticket-edits-block.scss';
import { TicketEditsBlockProps } from './ticket-edits-block.types';
import TypeEditContent from './TypeEditContent/type-edit-content';

const { Title } = Typography;

const TicketEditsBlock = React.memo<TicketEditsBlockProps>(({ ticket }) => {
  const { edits, author, createdAt } = ticket;

  const getContentView = (edit: TicketEdit) => {
    const isTextEdit = edit.field === 'TITLE' || edit.field === 'DESCRIPTION';

    return (
      <div className="edit-content">
        {isTextEdit && <TextEditContent edit={edit} />}

        {edit.field === 'ESTIMATE' && <EstimateEditContent edit={edit} />}

        {edit.field === 'ASSIGNEE' && <AssigneeEditContent edit={edit} />}

        {edit.field === 'STATUS' && <StatusEditContent edit={edit} />}

        {edit.field === 'TYPE' && <TypeEditContent edit={edit} />}
      </div>
    );
  };

  return (
    <div className="edits-block-container">
      <Title level={5} style={{ marginBottom: '32px' }}>
        {edits.length} Edits
      </Title>

      <Row>
        <Col xs={24} sm={24} md={24} lg={16} xl={12}>
          <Timeline>
            {edits.map((edit) => {
              return (
                <Timeline.Item className="edit" key={edit.id}>
                  <Comment
                    author={getTicketEditingDescription(edit)}
                    avatar={<UserAvatar user={edit.editor} />}
                    content={getContentView(edit)}
                    datetime={
                      <Tooltip title={formatDate(edit.editedAt)}>
                        {formatRelativeDate(edit.editedAt)}
                      </Tooltip>
                    }
                  />
                </Timeline.Item>
              );
            })}

            <Timeline.Item className="creation" color="green">
              <Comment
                author={
                  <>
                    <UserLink user={author} /> created ticket{' '}
                    <Link to={`/ticket/${ticket.issueNumber}`}>
                      #{ticket.issueNumber}
                    </Link>
                  </>
                }
                avatar={<UserAvatar user={author} />}
                content={null}
                datetime={
                  <Tooltip title={formatDate(createdAt)}>
                    {formatRelativeDate(createdAt)}
                  </Tooltip>
                }
              />
            </Timeline.Item>
          </Timeline>
        </Col>
      </Row>
    </div>
  );
});

TicketEditsBlock.displayName = 'TicketEditsBlock';

export default TicketEditsBlock;
