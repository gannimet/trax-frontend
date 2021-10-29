import { Ticket } from '../models/ticket.models';
import HttpClientService from './http-client.service';

class TicketService extends HttpClientService {
  getTicketByIssueNumber(issueNumber: string): Promise<Ticket> {
    return TicketService.getClientInstance()
      .get<Ticket>(`/tickets/byissue/${issueNumber}`)
      .then((response) => response.data);
  }
}

export default TicketService;