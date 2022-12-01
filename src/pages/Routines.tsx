import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonButton, IonCard, IonItem } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';

const Routines: React.FC = () => {

  // TODO
  // Read and display routines from user id
  //   call readRoutines from db.ts with user id   
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle class="ion-text-center">Routines</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Routines</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard>
          <IonList>
            <IonItem>
              <IonTitle>Routine list</IonTitle>
            </IonItem>
            <IonItem>
              <IonTitle>Some routine</IonTitle>
              <IonButton id="activate_button">Activate</IonButton>
            </IonItem>
          </IonList>
        </IonCard>
        <IonList>
            <IonButton id="add_route_button" routerLink="\RoutineMaker">Add a routine</IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Routines;