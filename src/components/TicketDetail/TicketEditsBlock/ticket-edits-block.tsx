import { Col, Comment, List, Row, Tooltip, Typography } from 'antd';
import React from 'react';
import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer';
import {
  formatDate,
  formatRelativeDate,
  getTicketEditingDescription,
} from '../../../utils/display.utils';
import UserAvatar from '../../UserAvatar/user-avatar';
import { TicketEditsBlockProps } from './ticket-edits-block.types';

const { Title } = Typography;

const TicketEditsBlock = React.memo<TicketEditsBlockProps>(({ edits }) => {
  return (
    <div className="edits-block-container">
      <Title level={5}>{edits.length} Edits</Title>

      <Row>
        <Col xs={24} sm={24} md={24} lg={16} xl={12}>
          <List
            bordered
            dataSource={edits}
            renderItem={(edit) => {
              return (
                <List.Item>
                  {edit.previousValue && edit.newValue && (
                    <Comment
                      author={getTicketEditingDescription(edit)}
                      avatar={<UserAvatar user={edit.editor} />}
                      content={
                        <ReactDiffViewer
                          oldValue={edit.previousValue}
                          newValue={edit.newValue}
                          splitView={true}
                          compareMethod={DiffMethod.WORDS_WITH_SPACE}
                          hideLineNumbers={true}
                          styles={{
                            wordDiff: { display: 'inline', padding: 0 },
                            marker: { display: 'none' },
                            content: {
                              width: '50%',
                              padding: '0 8px',
                            },
                            contentText: { fontFamily: 'Helvetica' },
                          }}
                        />
                      }
                      datetime={
                        <Tooltip title={formatDate(edit.editedAt)}>
                          {formatRelativeDate(edit.editedAt)}
                        </Tooltip>
                      }
                    />
                  )}
                </List.Item>
              );
            }}
          />
        </Col>
      </Row>
    </div>
  );
});

TicketEditsBlock.displayName = 'TicketEditsBlock';

export default TicketEditsBlock;
