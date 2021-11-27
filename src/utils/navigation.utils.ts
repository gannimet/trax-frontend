import { NavigationContextValueItem } from '../context/NavigationContext/navigation.context.types';
import { Team } from '../models/team.models';
import { Ticket } from '../models/ticket.models';

const homeItem = { label: 'Home', href: '/overview' };

const getTeamItem = (team?: Team): NavigationContextValueItem => {
  return {
    label: team?.name ?? '',
    href: `/team/${team?.id}`,
  };
};

const getTicketItem = (ticket?: Ticket): NavigationContextValueItem => {
  return {
    label: `Ticket #${ticket?.issueNumber}`,
    href: `/ticket/${ticket?.issueNumber}`,
  };
};

export const getHomeBreadcrumbItems = (): NavigationContextValueItem[] => {
  return [homeItem];
};

export const getTeamBreadcrumbItems = (
  team?: Team,
): NavigationContextValueItem[] => {
  return [...getHomeBreadcrumbItems(), getTeamItem(team)];
};

export const getTicketBreadcrumbItems = (
  ticket: Ticket,
): NavigationContextValueItem[] => {
  return [
    ...getTeamBreadcrumbItems(ticket.sprint?.team),
    getTicketItem(ticket),
  ];
};
