import { AutoComplete, Button, Form, Input, InputNumber, Select } from 'antd';
import React, { useContext } from 'react';
import { CurrentTeamContext } from '../../context/CurrentTeamContext/current-team.context';
import { CreateTicketFormProps } from './create-ticket.form.types';
import TagsSelect from './TagsSelect/tags-select';

const { TextArea } = Input;

const CreateTicketForm = React.memo<CreateTicketFormProps>(
  ({ allTeamsInfos, ticketTypes }) => {
    const teamContext = useContext(CurrentTeamContext);
    const [form] = Form.useForm();

    const onTagsSelect = (values: string[]) => {
      form.setFieldsValue({
        tags: values,
      });
    };

    const convertibleTypes = ticketTypes.filter((type) => type.convertible);

    const initialValues = {
      type: convertibleTypes[0].id,
      team: teamContext.currentTeam?.id,
    };

    return (
      <Form form={form} layout="vertical" initialValues={initialValues}>
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
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
            {allTeamsInfos.map((teamInfo) => {
              return (
                <Select.Option key={teamInfo.team.id} value={teamInfo.team.id}>
                  {teamInfo.team.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item name="sprint" label="Sprint" rules={[{ required: true }]}>
          <Select></Select>
        </Form.Item>

        <Form.Item name="tags" label="Tags">
          <TagsSelect onChange={onTagsSelect} />
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
    );
  },
);

CreateTicketForm.displayName = 'CreateTicketForm';

export default CreateTicketForm;
