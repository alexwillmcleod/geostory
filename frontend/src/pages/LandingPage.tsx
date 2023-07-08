import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { QrScanner } from '@yudiel/react-qr-scanner';
import HeaderBar from '../components/HeaderBar';
import PopUp from '../components/PopUp';

interface LandingPageProps extends RouteComponentProps {}

const LandingPage: React.FC<LandingPageProps> = () => {
  const [showPopUp, setShowPopUp] = useState(false);
  const [qrCodeData, setQRCodeData] = useState('');

  const handleOpenPopUp = (data: string) => {
    setQRCodeData(data);
    setShowPopUp(true);
  };

  const handleClosePopUp = () => {
    setShowPopUp(false);
  };

  const handleQRCodeDecode = (result: string | null) => {
    if (result) {
      handleOpenPopUp(result);
    }
  };

  return (
    <div>
      <HeaderBar />
      <div className="flex items-center justify-center h-screen">
        {!showPopUp && (
          <QrScanner
            onDecode={handleQRCodeDecode}
            onError={(error) => console.log(error?.message)}
          />
        )}
      </div>

      {showPopUp && <PopUp data={qrCodeData} onClose={handleClosePopUp} />}
    </div>
  );
};

export default LandingPage;
