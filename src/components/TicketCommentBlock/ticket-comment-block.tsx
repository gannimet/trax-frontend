import {
  Button,
  Col,
  Comment,
  Form,
  Input,
  List,
  Row,
  Space,
  Typography,
} from 'antd';
import React from 'react';
import { formatDate } from '../../utils/display.utils';
import UserAvatar from '../UserAvatar/user-avatar';
import { TicketCommentBlockProps } from './ticket-comment-block.types';

const { Title } = Typography;
const { TextArea } = Input;

const TicketCommentBlock = React.memo<TicketCommentBlockProps>(
  ({ comments, onCommentSubmit }) => {
    return (
      <div className="comment-block-container">
        <Title level={5}>{comments.length} Comments</Title>

        <Space direction="vertical" style={{ width: '100%' }}>
          <Row>
            <Col xs={24} sm={24} md={24} lg={16} xl={12}>
              <Form onFinish={onCommentSubmit}>
                <Form.Item
                  name="commentText"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your comment',
                    },
                  ]}
                >
                  <TextArea
                    rows={4}
                    placeholder="Add a comment on this ticket"
                  />
                </Form.Item>
                <Form.Item style={{ textAlign: 'right' }}>
                  <Button type="primary" htmlType="submit">
                    Save comment
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>

          <Row>
            <Col xs={24} sm={24} md={24} lg={16} xl={12}>
              <List
                bordered
                dataSource={comments}
                renderItem={(comment) => {
                  return (
                    <List.Item>
                      <Comment
                        author={`${comment.author.firstName} ${comment.author.lastName}`}
                        avatar={<UserAvatar user={comment.author} />}
                        content={comment.text}
                        datetime={formatDate(comment.createdAt)}
                      />
                    </List.Item>
                  );
                }}
              />
            </Col>
          </Row>
        </Space>
      </div>
    );
  },
);

TicketCommentBlock.displayName = 'TicketCommentBlock';

export default TicketCommentBlock;
