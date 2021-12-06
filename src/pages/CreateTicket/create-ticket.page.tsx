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
  Spin,
  Tag,
} from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import PageTitle from '../../components/PageTitle/page-title';
import { CurrentTeamContext } from '../../context/CurrentTeamContext/current-team.context';
import { useTicketTypes } from '../../hooks/use-ticket-types';
import { useUserTeams } from '../../hooks/use-user-teams';
import {
  TagsActions,
  TagsReducerAction,
} from '../../state/actions/tags.actions';
import { TagsState } from '../../state/reducers/tags.reducer';
import { StoreStateType } from '../../state/root.reducer';

const { TextArea } = Input;

type OptionData = {
  key?: string;
  label: React.ReactNode;
  value: string;
};

const CreateTicketPage = React.memo(() => {
  const teamContext = useContext(CurrentTeamContext);
  const [form] = Form.useForm();
  const { ticketTypes, ticketTypesLoading } = useTicketTypes();
  const { allTeamsInfos, allTeamsInfosLoading } = useUserTeams();
  const [tagOptions, setTagOptions] = useState<OptionData[]>([]);
  const dispatch: ThunkDispatch<StoreStateType, void, TagsReducerAction> =
    useDispatch<Dispatch<TagsReducerAction>>();
  const { tags, tagsLoading } = useSelector<StoreStateType, TagsState>(
    (state) => state.tags,
  );

  useEffect(() => {
    if (!tags) {
      setTagOptions([]);

      return;
    }

    setTagOptions(
      tags.map((tag) => {
        return {
          key: tag.id,
          value: tag.id,
          label: <Tag color={`#${tag.color}`}>{tag.name}</Tag>,
        };
      }),
    );
  }, [tags]);

  const { fetchTags } = new TagsActions();
  const isLoading = ticketTypesLoading || allTeamsInfosLoading;

  const fetchFilteredTags = (searchValue: string) => {
    dispatch(fetchTags(searchValue));
  };

  const renderContent = () => {
    if (isLoading) {
      return <Skeleton />;
    }

    return renderTicketForm();
  };

  const renderTicketForm = () => {
    if (!ticketTypes || !allTeamsInfos) {
      return null;
    }

    const convertibleTypes = ticketTypes.filter((type) => type.convertible);

    const initialValues = {
      type: convertibleTypes[0].id,
      team: teamContext.currentTeam?.id,
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
                  {allTeamsInfos.map((teamInfo) => {
                    return (
                      <Select.Option
                        key={teamInfo.team.id}
                        value={teamInfo.team.id}
                      >
                        {teamInfo.team.name}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>

              <Form.Item
                name="sprint"
                label="Sprint"
                rules={[{ required: true }]}
              >
                <Select></Select>
              </Form.Item>

              <Form.Item name="tags" label="Tags">
                <Select
                  mode="multiple"
                  options={tagOptions}
                  onSearch={fetchFilteredTags}
                  notFoundContent={tagsLoading ? <Spin size="small" /> : null}
                ></Select>
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
