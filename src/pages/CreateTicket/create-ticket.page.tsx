import { AutoComplete, Button, Form, Input, InputNumber, Select } from 'antd';
import React, { useContext } from 'react';
import PageTitle from '../../components/PageTitle/page-title';
import { CurrentTeamContext } from '../../context/CurrentTeamContext/current-team.context';

const { TextArea } = Input;

const CreateTicketPage = React.memo(() => {
  const teamContext = useContext(CurrentTeamContext);
  const [form] = Form.useForm();

  return (
    <div className="create-ticket-container">
      <PageTitle>Create ticket</PageTitle>

      <Form form={form} layout="vertical">
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="type" label="Type" rules={[{ required: true }]}>
          <Select></Select>
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

        <Form.Item name="sprint" label="Sprint" rules={[{ required: true }]}>
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
    </div>
  );
});

CreateTicketPage.displayName = 'CreateTicketPage';

export default CreateTicketPage;
