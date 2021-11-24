import { Col, Descriptions, Row } from 'antd';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import React from 'react';
import { formatDate } from '../../../utils/display.utils';
import EstimateBadge from '../../EstimateBadge/estimate-badge';
import TextInlineEdit from '../../InlineEdit/TextInlineEdit/text-inline-edit';
import UserDisplayLine from '../../UserDisplayLine/user-display-line';
import { TicketMetaBlockProps } from './ticket-meta-block.types';
import TicketAssigneeItem from './TicketAssigneeItem/ticket-assignee-item';
import TicketStatusItem from './TicketStatusItem/ticket-status-item';
import TicketTypeItem from './TicketTypeItem/ticket-type-item';

const TicketMetaBlock = React.memo<TicketMetaBlockProps>(
  ({ ticket, statusInfo, convertibleTypes, onEditSubmit, allowEdits }) => {
    const screens = useBreakpoint();

    return (
      <Row>
        <Col xxl={12} xl={12} lg={24}>
          <Descriptions bordered column={1} labelStyle={{ width: 200 }}>
            <Descriptions.Item label="Created At">
              {formatDate(ticket.createdAt)}
            </Descriptions.Item>

            <Descriptions.Item label="Author">
              <UserDisplayLine user={ticket.author} />
            </Descriptions.Item>

            <Descriptions.Item label="Status">
              <TicketStatusItem
                ticket={ticket}
                onEditSubmit={(value) => onEditSubmit('STATUS', value)}
                statusOptions={statusInfo}
              />
            </Descriptions.Item>
          </Descriptions>
        </Col>

        <Col xxl={12} xl={12} lg={24}>
          <Descriptions
            bordered
            column={1}
            labelStyle={{ width: 200 }}
            style={screens.xl ? { marginLeft: -1 } : { marginTop: -1 }}
          >
            <Descriptions.Item label="Estimate">
              <TextInlineEdit
                value={ticket.estimate}
                isNumeric
                allowEdits={allowEdits}
                onSubmit={(value) => {
                  onEditSubmit('ESTIMATE', value);
                }}
              >
                {ticket.estimate != null && (
                  <EstimateBadge value={ticket.estimate} />
                )}
                {ticket.estimate == null && 'Not estimated yet'}
              </TextInlineEdit>
            </Descriptions.Item>

            <Descriptions.Item label="Assignee">
              <TicketAssigneeItem
                ticket={ticket}
                onEditSubmit={(value) => onEditSubmit('ASSIGNEE', value)}
              />
            </Descriptions.Item>
            <Descriptions.Item label="Ticket type">
              <TicketTypeItem
                ticket={ticket}
                onEditSubmit={(value) => onEditSubmit('TYPE', value)}
                convertibleTypes={convertibleTypes}
              />
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
    );
  },
);

TicketMetaBlock.displayName = 'TicketMetaBlock';

export default TicketMetaBlock;
