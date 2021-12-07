import { Col, Row, Skeleton } from 'antd';
import React from 'react';
import CreateTicketForm from '../../components/CreateTicketForm/create-ticket-form';
import PageTitle from '../../components/PageTitle/page-title';
import { useTicketTypes } from '../../hooks/use-ticket-types';
import { useUserTeams } from '../../hooks/use-user-teams';

const CreateTicketPage = React.memo(() => {
  const { ticketTypes, ticketTypesLoading } = useTicketTypes();
  const { allTeamsInfos, allTeamsInfosLoading } = useUserTeams();

  const isLoading = ticketTypesLoading || allTeamsInfosLoading;

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

    return (
      <>
        <PageTitle>Create ticket</PageTitle>

        <Row>
          <Col xxl={16} span={24}>
            <CreateTicketForm
              allTeamsInfos={allTeamsInfos}
              ticketTypes={ticketTypes}
            />
          </Col>
        </Row>
      </>
    );
  };

  return <div className="create-ticket-container">{renderContent()}</div>;
});

CreateTicketPage.displayName = 'CreateTicketPage';

export default CreateTicketPage;
