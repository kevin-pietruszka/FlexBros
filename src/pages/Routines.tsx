import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Routines.css';

const Routines: React.FC = () => {
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Routines</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Routines</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
            <IonButton routerLink="\RoutineMaker">Maker</IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Routines;