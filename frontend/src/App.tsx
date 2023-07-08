import { IonApp } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route } from 'react-router-dom';
import LandingPage from './pages/landing';

function App() {
  return (
    <IonApp>
      <IonReactRouter>
        <Route exact path="/" component={LandingPage} />
        {/* Other routes */}
      </IonReactRouter>
    </IonApp>
  );
}

export default App;
