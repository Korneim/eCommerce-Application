import ReactDOM from 'react-dom';
import { ReactPortal } from 'react';
import { Spin } from 'antd';

const GlobalSpinner = ({ spinning }: { spinning: boolean }): ReactPortal | null => {
  if (!spinning) return null;

  return ReactDOM.createPortal(
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 2000,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Spin size="large" tip="Загрузка..." />
    </div>,
    document.body
  );
};

export default GlobalSpinner;