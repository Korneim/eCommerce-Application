import { Modal } from 'antd';
import '@ant-design/v5-patch-for-react-19';

type ModalType = 'error' | 'warning' | 'info' | 'success' | 'confirm';

export default function showModal(modalType: ModalType, modalTitle: string, modalMessage: string): void {
    const modalFn = Modal[modalType];
    modalFn({
        title: modalTitle,
        content: modalMessage,
        okButtonProps: {
            style: {
                backgroundColor: '#ffce1a',
            },
        },
    });
}
