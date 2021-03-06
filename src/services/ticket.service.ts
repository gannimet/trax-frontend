import {
  Ticket,
  TicketEditField,
  TicketTypeObj,
} from '../models/ticket.models';
import HttpClientService from './http-client.service';

class TicketService extends HttpClientService {
  getTicketByIssueNumber(issueNumber: string): Promise<Ticket> {
    return TicketService.getClientInstance()
      .get<Ticket>(`/tickets/byissue/${issueNumber}`)
      .then((response) => response.data);
  }

  addTicketComment(ticketId: string, text: string): Promise<Ticket> {
    return TicketService.getClientInstance()
      .post<Ticket>(`/tickets/${ticketId}/comments`, {
        text,
      })
      .then((response) => response.data);
  }

  getAllTicketTypes(): Promise<TicketTypeObj[]> {
    return TicketService.getClientInstance()
      .get<TicketTypeObj[]>('/tickets/types')
      .then((response) => response.data);
  }

  editTicket(
    ticketId: string,
    field: TicketEditField,
    newValue: string | number | undefined | null,
  ): Promise<Ticket> {
    return TicketService.getClientInstance()
      .put<Ticket>(`/tickets/${ticketId}`, {
        field,
        newValue: newValue != null ? newValue : null,
      })
      .then((response) => response.data);
  }
}

export default TicketService;
