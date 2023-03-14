import { IonAlert, IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonMenuButton, IonMenuToggle, IonPage, IonTitle, IonToolbar, useIonAlert } from '@ionic/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabase/client';
import './Tab2.css';


const Tab2: React.FC = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [presentAlert] = useIonAlert();

  const [showAlert, setShowAlert] = useState(false);

  async function onLogIn() {

    let { data, error } = await supabase.auth.signInWithPassword({
      email: inputEmail,
      password: inputPassword
    })

    if (error) {
      console.log(error)
      setShowAlert(true);
      setInputEmail("");
      setInputPassword("");
    } else {
      const { data: { user } } = await supabase.auth.getUser()
      setInputEmail("");
      setInputPassword("");

      let metadata = user?.user_metadata.username
        presentAlert({
          header: 'Logged in',
          subHeader: `Welcome back, ${metadata}`,
          buttons: ['OK'],
        })
      }
    }
  

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuToggle>
              <IonMenuButton />
            </IonMenuToggle>
          </IonButtons>
          <IonTitle>Welcome back!</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Welcome back!</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="flex content-center mt-20">
          <div className="m-auto drop-shadow-md w-72">

            <h1 className="text-3xl font-bold">
              Log in
            </h1>

            <IonItem>
              <IonInput
                placeholder='Email'
                type='email'
                onInput={(e) => setInputEmail((e.target as unknown as HTMLInputElement).value)}
                value={inputEmail}></IonInput>
            </IonItem>

            <IonItem>
              <IonInput
                type='password'
                placeholder='Password'
                onInput={(e) => setInputPassword((e.target as unknown as HTMLInputElement).value)}
                value={inputPassword}></IonInput>
            </IonItem>

            <IonButton
              expand='block'
              onClick={onLogIn}
            >Log in</IonButton>

            <IonAlert
              isOpen={showAlert}
              onDidDismiss={() => setShowAlert(false)}
              header={'Error'}
              message={'That is not a valid log in'}
              buttons={['OK']}
            />


            <div className='mt-10'>
              <Link to="/tab3" >
                New to this app? Sign up
              </Link>
            </div>

          </div>
        </div>

      </IonContent>
    </IonPage>
  );
};

export default Tab2;
