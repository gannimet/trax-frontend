import { Col, Row, Timeline, Tooltip, Typography } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import {
  formatDate,
  formatRelativeDate,
  getTicketEditingDescription,
} from '../../../utils/display.utils';
import UserAvatar from '../../UserAvatar/user-avatar';
import EstimateEditContent from './EstimateEditContent/estimate-edit-content';
import TextEditContent from './TextEditContent/text-edit-content';
import { TicketEditsBlockProps } from './ticket-edits-block.types';

const { Title } = Typography;

const TicketEditsBlock = React.memo<TicketEditsBlockProps>(({ ticket }) => {
  const { edits, author, createdAt } = ticket;

  return (
    <div className="edits-block-container">
      <Title level={5}>{edits.length} Edits</Title>

      <Row>
        <Col xs={24} sm={24} md={24} lg={16} xl={12}>
          <Timeline>
            {edits.map((edit) => {
              const isTextEdit =
                edit.field === 'TITLE' || edit.field === 'DESCRIPTION';

              return (
                <Timeline.Item className="edit" key={edit.id}>
                  <div className="edit-headline">
                    <UserAvatar user={edit.editor} />{' '}
                    <span className="edit-headline__user-title">
                      {getTicketEditingDescription(edit)}
                    </span>
                    <span className="edit-headline__datetime">
                      <Tooltip title={formatDate(edit.editedAt)}>
                        {formatRelativeDate(edit.editedAt)}
                      </Tooltip>
                    </span>
                  </div>

                  <div className="edit-content">
                    {isTextEdit && <TextEditContent edit={edit} />}

                    {edit.field === 'ESTIMATE' && (
                      <EstimateEditContent edit={edit} />
                    )}
                  </div>
                </Timeline.Item>
              );
            })}

            <Timeline.Item className="edit" color="green">
              <div className="edit-headline">
                <UserAvatar user={author} />{' '}
                <span className="edit-headline__user-title">
                  <Link
                    to={`/user/${author.id}`}
                  >{`${author.firstName} ${author.lastName}`}</Link>{' '}
                  created ticket{' '}
                  <Link to={`/ticket/${ticket.issueNumber}`}>
                    #{ticket.issueNumber}
                  </Link>
                </span>
                <span className="edit-headline__datetime">
                  <Tooltip title={formatDate(createdAt)}>
                    {formatRelativeDate(createdAt)}
                  </Tooltip>
                </span>
              </div>
            </Timeline.Item>
          </Timeline>
        </Col>
      </Row>
    </div>
  );
});

TicketEditsBlock.displayName = 'TicketEditsBlock';

export default TicketEditsBlock;
