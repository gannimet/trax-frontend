import {
  AutoComplete,
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Skeleton,
} from 'antd';
import React, { useContext } from 'react';
import PageTitle from '../../components/PageTitle/page-title';
import { CurrentTeamContext } from '../../context/CurrentTeamContext/current-team.context';
import { useTicketTypes } from '../../hooks/use-ticket-types';

const { TextArea } = Input;

const CreateTicketPage = React.memo(() => {
  const teamContext = useContext(CurrentTeamContext);
  const [form] = Form.useForm();
  const { ticketTypes, ticketTypesLoading } = useTicketTypes();

  const isLoading = ticketTypesLoading;

  const renderContent = () => {
    if (isLoading) {
      return <Skeleton />;
    }

    return renderTicketForm();
  };

  const renderTicketForm = () => {
    if (!ticketTypes) {
      return null;
    }

    const convertibleTypes = ticketTypes.filter((type) => type.convertible);

    const initialValues = {
      type: convertibleTypes[0].id,
    };

    return (
      <>
        <PageTitle>Create ticket</PageTitle>

        <Row>
          <Col xxl={16} span={24}>
            <Form form={form} layout="vertical" initialValues={initialValues}>
              <Form.Item
                name="title"
                label="Title"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>

              <Form.Item name="type" label="Type" rules={[{ required: true }]}>
                <Select>
                  {convertibleTypes.map((type) => {
                    return (
                      <Select.Option key={type.id} value={type.id}>
                        {type.name}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>

              <Form.Item name="team" label="Team" rules={[{ required: true }]}>
                <Select>
                  {teamContext.currentTeam && (
                    <Select.Option value={teamContext.currentTeam.id}>
                      {teamContext.currentTeam.name}
                    </Select.Option>
                  )}
                </Select>
              </Form.Item>

              <Form.Item
                name="sprint"
                label="Sprint"
                rules={[{ required: true }]}
              >
                <Select></Select>
              </Form.Item>

              <Form.Item name="assignee" label="Assignee">
                <AutoComplete />
              </Form.Item>

              <Form.Item name="estimate" label="Estimate">
                <InputNumber />
              </Form.Item>

              <Form.Item name="description" label="Description">
                <TextArea rows={10} />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Create ticket
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </>
    );
  };

  return <div className="create-ticket-container">{renderContent()}</div>;
});

CreateTicketPage.displayName = 'CreateTicketPage';

export default CreateTicketPage;
