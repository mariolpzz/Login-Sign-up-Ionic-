import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonMenu, IonMenuButton, IonMenuToggle, IonPage, IonTitle, IonToolbar, useIonAlert } from '@ionic/react';
import { useHistory } from 'react-router';
import { supabase } from '../supabase/client';
import './Tab1.css';

const Tab1: React.FC = () => {
  const [presentAlert] = useIonAlert();
  const history = useHistory();


  async function logOut() {
    const { data: { user } } = await supabase.auth.getUser()
    if (user !== null) {

      let username = user.user_metadata.username;

      let { error } = await supabase.auth.signOut()
      if (error) {
        console.log(error)
      } else {
        console.log("Logged out")
        presentAlert({
          header: 'Logged out',
          subHeader: `See you soon, ${username}!`,
          buttons: ['OK'],
        })
      }

    } else {
      presentAlert({
        header: 'You are already logged out',
        buttons: ['OK'],
      })
    }
  }


  const toLogin = () => {
    history.push('/tab2');
  }

  const toSignUp = () => {
    history.push('/tab3');
  }


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Welcome!</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Welcome!</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className='flex content-center mt-20'>
          <div className='m-auto'>

            <h1 className='text-4xl font-bold'><IonIcon slot='start' icon='bulb'></IonIcon> My first Ionic app!</h1>

            <p className='text-2xl mb-4'>What do you want to do?</p>

            <IonButton expand='block' fill='outline' onClick={toLogin}>
              <IonIcon slot='start' icon='log-in'></IonIcon>
              Log in</IonButton>
            <IonButton expand='block' onClick={toSignUp}>
              <IonIcon slot='start' icon='person-add'></IonIcon>
              Sign up</IonButton>

            <IonButton className='mt-20' expand='block' onClick={logOut}>
              <IonIcon slot='start' icon='log-out'></IonIcon>
              Log out</IonButton>


          </div>
        </div>

      </IonContent>
    </IonPage >
  );
};

export default Tab1;
