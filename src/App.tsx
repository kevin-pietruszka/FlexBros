import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonTitle,
  IonFooter,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

// page imports for routing
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';
import Tab1 from './pages/Calendar';
import Routines from './pages/Routines';
import RoutineMaker from './pages/RoutineMaker';
import ExercisesStats from './pages/ExercisesStats';
import EditWorkout from './pages/EditWorkout';
import CreateWorkout from './pages/CreateWorkout';
import CalendarDay from './pages/CalendarDay';
import EditExercise from './pages/EditExercise';
import Settings from './pages/settings';


// icon imports for toolbar
import progress_icon from './icons/bar-chart-outline.svg';
import routine_icon from './icons/barbell-outline.svg';
import calendar_icon from './icons/calendar-outline.svg';
import settings_icon from './icons/settings-outline.svg'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/CreateAccount">
            <CreateAccount />
          </Route>
          <Route exact path="/tab1">
            <Tab1 />
          </Route>
          <Route exact path="/tab2">
            <Routines />
          </Route>
          <Route path="/tab3">
            <ExercisesStats />
          </Route>
          <Route path="/tab4">
            <Settings />
          </Route>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route exact path="/RoutineMaker">
            <RoutineMaker />
          </Route>
          <Route exact path="/EditWorkout">
            <EditWorkout />
          </Route>
          <Route exact path ="/CreateWorkout">
            <CreateWorkout />
          </Route>
          <Route exact path ="/CalendarDay">
            <CalendarDay />
          </Route>
          <Route exact path ="/EditExercise">
            <EditExercise />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/tab1">
            <IonIcon src={calendar_icon}>calendar</IonIcon>
            <IonLabel>Workouts</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/tab2">
            <IonIcon src={routine_icon}>routines</IonIcon>
            <IonLabel>Routines</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/tab3">
            <IonIcon src={progress_icon}>progress</IonIcon>
            <IonLabel>Progress</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab4" href="/tab4">
            <IonIcon src={progress_icon}>progress</IonIcon>
            <IonLabel>Settings</IonLabel>
          </IonTabButton>
        </IonTabBar> 
      </IonTabs>
    </IonReactRouter>
    <IonFooter id="banner_ad" slot="bottom">
    </IonFooter>
  </IonApp>
);

export default App;
