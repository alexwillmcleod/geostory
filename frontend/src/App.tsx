import { IonApp } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import Page from './pages/Page'
import { Route } from 'react-router'

function App() {
  return (
    <IonApp>
      <IonReactRouter>
        <Route path="/" component={Page} />
      </IonReactRouter>
    </IonApp>
  )
}

export default App
