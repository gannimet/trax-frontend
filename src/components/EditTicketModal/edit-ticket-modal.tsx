import { Button, Modal } from 'antd';
import React from 'react';
import { EditTicketModalProps } from './edit-ticket-modal.types';

const EditTicketModal = React.memo<EditTicketModalProps>(
  ({ visible, ticket }) => {
    return (
      <Modal
        visible={visible}
        title="Edit tags"
        footer={[
          <Button key="cancel">Cancel</Button>,
          <Button key="submit" type="primary" htmlType="submit">
            Save
          </Button>,
        ]}
      >
        Content
      </Modal>
    );
  },
);

EditTicketModal.displayName = 'EditTicketModal';

export default EditTicketModal;
