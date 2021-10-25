import React from 'react';
import { useParams } from 'react-router';
import PageTitle from '../../components/PageTitle/page-title';

interface TeamPageParams {
  id: string;
}

const TeamPage: React.FC = () => {
  const { id } = useParams<TeamPageParams>();

  return (
    <div className="team-container">
      <PageTitle>Team detail page</PageTitle>

      <p>ID: {id}</p>
    </div>
  );
};

export default TeamPage;
