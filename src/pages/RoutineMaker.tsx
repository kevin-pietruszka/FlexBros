import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonButton, IonCard, IonInput, IonItem } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';

const RoutineMaker: React.FC = () => {

  //TODO
  // implement posting routine to database
  //    get data (user id, name, array of workouts)
  //    use data to create a routien object
  //    pass that object to createRoutine function from db.ts
  
  const finishRoutine = async () => {
    // on finish save routine and post to database
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle class="ion-text-center">Routine Maker</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Routine Maker</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard>
          <IonItem>
            <IonInput placeholder='Name of routine'></IonInput>
          </IonItem>
          <IonList>
            <IonItem>
              <IonTitle>Workouts</IonTitle>
            </IonItem>
            <IonItem>
              <IonContent>begin list of workouts</IonContent>
              <IonButton id="remove_button">Remove</IonButton>
            </IonItem>
          </IonList>
          <IonButton routerLink="/Edit">Edit</IonButton>
          <IonButton onClick = {() => finishRoutine} routerLink="/Routines">Finish</IonButton>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default RoutineMaker;