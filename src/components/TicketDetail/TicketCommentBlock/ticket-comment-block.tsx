import {
  Button,
  Col,
  Comment,
  Empty,
  Form,
  Input,
  List,
  Row,
  Space,
  Tooltip,
  Typography,
} from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { useState } from 'react';
import { formatDate, formatRelativeDate } from '../../../utils/display.utils';
import UserAvatar from '../../UserAvatar/user-avatar';
import UserLink from '../../UserLink/user-link';
import { TicketCommentBlockProps } from './ticket-comment-block.types';

const { Title } = Typography;
const { TextArea } = Input;

type CommentFormValue = { commentText: string };

const TicketCommentBlock = React.memo<TicketCommentBlockProps>(
  ({ comments, onCommentSubmit }) => {
    const [form] = useForm<CommentFormValue>();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleFormSubmit = (value: CommentFormValue) => {
      setIsSubmitting(true);

      onCommentSubmit(value).then(
        () => {
          setIsSubmitting(false);
          form.resetFields();
        },
        () => {
          setIsSubmitting(false);
        },
      );
    };

    return (
      <div className="comment-block-container">
        <Title level={5}>{comments.length} Comments</Title>

        <Space direction="vertical" style={{ width: '100%' }}>
          <Row>
            <Col xs={24} sm={24} md={24} lg={16} xl={12}>
              <Form form={form} onFinish={handleFormSubmit}>
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
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={isSubmitting}
                  >
                    Save comment
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>

          <Row>
            <Col xs={24} sm={24} md={24} lg={16} xl={12}>
              {comments.length > 0 && (
                <List
                  bordered
                  dataSource={comments}
                  rowKey="id"
                  renderItem={(comment) => {
                    return (
                      <List.Item>
                        <Comment
                          author={<UserLink user={comment.author} />}
                          avatar={<UserAvatar user={comment.author} />}
                          content={comment.text}
                          datetime={
                            <Tooltip title={formatDate(comment.createdAt)}>
                              {formatRelativeDate(comment.createdAt)}
                            </Tooltip>
                          }
                        />
                      </List.Item>
                    );
                  }}
                />
              )}

              {comments.length === 0 && (
                <Empty
                  description="No comments on this issue yet."
                  imageStyle={{ height: 60 }}
                />
              )}
            </Col>
          </Row>
        </Space>
      </div>
    );
  },
);

TicketCommentBlock.displayName = 'TicketCommentBlock';

export default TicketCommentBlock;
