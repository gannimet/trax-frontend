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
import React, { useContext, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
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
  const [tagsFetching, setTagsFetching] = useState(false);
  const tagsFetchRef = useRef(0);
  const dispatch: ThunkDispatch<StoreStateType, void, TagsReducerAction> =
    useDispatch<Dispatch<TagsReducerAction>>();

  const { fetchTags } = new TagsActions();
  const isLoading = ticketTypesLoading || allTeamsInfosLoading;

  const fetchFilteredTags = React.useMemo(() => {
    return (searchValue: string) => {
      tagsFetchRef.current += 1;
      const fetchId = tagsFetchRef.current;
      setTagOptions([]);
      setTagsFetching(true);

      dispatch(fetchTags(searchValue)).then((action) => {
        if (action.type === TagsActions.FETCH_TAGS_SUCCESS) {
          if (fetchId === tagsFetchRef.current) {
            setTagOptions(
              action.tags.map((tag) => {
                return {
                  key: tag.id,
                  value: tag.id,
                  label: <Tag color={`#${tag.color}`}>{tag.name}</Tag>,
                };
              }),
            );
            setTagsFetching(false);
          }
        }
      });
    };
  }, [dispatch, fetchTags]);

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
                  placeholder="Select tags"
                  filterOption={false}
                  options={tagOptions}
                  onSearch={fetchFilteredTags}
                  notFoundContent={tagsFetching ? <Spin size="small" /> : null}
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
