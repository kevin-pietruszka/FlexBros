import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './RoutineMaker.css';

const RoutineMaker: React.FC = () => {

  //TODO
  // implement posting routine to database
  //    get data (user id, name, array of workouts)
  
  const finishRoutine = async () => {
    // on finish save routine and post to database
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Routine Maker</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
            <IonButton routerLink="\Edit">Edit</IonButton>
            <IonButton onClick = {() => finishRoutine} routerLink="\Routines">Finish</IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default RoutineMaker;