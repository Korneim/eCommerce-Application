import { Button, Flex, Modal } from 'antd';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';

export type ModalType = 'success' | 'error';

interface ModalProps {
    type: ModalType;
    title: string;
    content: string;
    isOpen: boolean;
    onClose: () => void;
    showButton?: boolean;
    keyboard?: boolean;
}

const icon = {
    success: <CheckCircleFilled style={{ color: 'var(--icon-check-color)', fontSize: 24 }} />,
    error: <CloseCircleFilled style={{ color: 'var(--icon-close-color)', fontSize: 24 }} />,
};

export const ModalWindow: React.FC<ModalProps> = ({
    type,
    title,
    content,
    isOpen,
    onClose,
    showButton = true,
    keyboard = false,
}) => {
    return (
        <Modal
            open={isOpen}
            title={
                <Flex>
                    <div style={{ marginRight: 16 }}> {icon[type]}</div>
                    {title}
                </Flex>
            }
            onCancel={onClose}
            footer={
                showButton ? (
                    <Button type="primary" onClick={onClose}>
                        OK
                    </Button>
                ) : null
            }
            centered
            maskClosable={false}
            keyboard={keyboard}
            closable={false}
        >
            <Flex align="center">
                <div style={{ fontSize: '16px' }}>{content}</div>
            </Flex>
        </Modal>
    );
};
