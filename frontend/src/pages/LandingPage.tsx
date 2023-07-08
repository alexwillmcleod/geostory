import { QrScanner } from '@yudiel/react-qr-scanner';
import HeaderBar from '../components/HeaderBar';

const LandingPage = () => {
  return (
    <div>
    <HeaderBar></HeaderBar>
    <QrScanner
      onDecode={(result) => console.log(result)}
      onError={(error) => console.log(error?.message)}
    />
    </div>
    
  );
}

export default LandingPage;