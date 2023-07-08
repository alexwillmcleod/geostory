import { IonApp } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { Route } from 'react-router'
import CreatePage from './pages/CreatePage'

function App() {
  return (
    <IonApp>
      <IonReactRouter>
        <Route path="/create" component={CreatePage} />
      </IonReactRouter>
    </IonApp>
  )
}

export default App
