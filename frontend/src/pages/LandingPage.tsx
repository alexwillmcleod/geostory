import { QrScanner } from '@yudiel/react-qr-scanner';
import HeaderBar from '../components/HeaderBar';

const LandingPage = () => {
  return (
    <div>
      <HeaderBar></HeaderBar>
      <div className='flex items-center justify-center h-screen'>
      <QrScanner
        onDecode={(result) => console.log(result)}
        onError={(error) => console.log(error?.message)}
      />
      </div>
    </div>
    
  );
}

export default LandingPage;