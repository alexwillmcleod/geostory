import { useState } from 'react';
import { QrScanner } from '@yudiel/react-qr-scanner';
// import HeaderBar from '../components/HeaderBar';
import PopUp from "../components/PopUp";
import { useNavigate } from "react-router";

const LandingPage = () => {
  const [qrCodeData, setQRCodeData] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleQRCodeDecode = (result: string | null) => {
    setQRCodeData(result);
  };

  const handlePopUpClose = (id: any) => {
    setQRCodeData(null);
    navigate("/listen/" + id);
  };

  return (
    <div>
      <div className="flex items-center justify-center h-screen">
        {qrCodeData === null ? (
          <QrScanner
            onDecode={handleQRCodeDecode}
            onError={(error) => console.log(error?.message)}
          />
        ) : (
          <PopUp data={qrCodeData} onClose={() => handlePopUpClose(1)} />
        )}
      </div>
    </div>
  );
};

export default LandingPage;
