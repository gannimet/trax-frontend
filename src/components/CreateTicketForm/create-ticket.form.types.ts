import { TicketTypeObj } from '../../models/ticket.models';
import { UserTeamInfo } from '../../models/user.models';

export interface CreateTicketFormProps {
  ticketTypes: TicketTypeObj[];
  allTeamsInfos: UserTeamInfo[];
}
