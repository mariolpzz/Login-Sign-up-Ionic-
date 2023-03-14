import { IonBadge, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonMenuButton, IonMenuToggle, IonNote, IonPage, IonTitle, IonToolbar, useIonAlert } from '@ionic/react';
import './Tab3.css';
import { supabase } from '../supabase/client';
import { useState } from 'react';

const Tab3: React.FC = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputUsername, setInputUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [presentAlert] = useIonAlert();

  const validateEmail = (email: string) => {
    email.match(/^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/) !== null ? setShowAlert(false) : setShowAlert(true);
  };

  async function onSignUp() {
    let { data, error } = await supabase.auth.signUp({
      email: inputEmail,
      password: inputPassword,
      options: {
        data: {
          username: inputUsername
        },
      },
    })
    if (error) {
      console.log(error);
    } else {
      presentAlert({
        header: 'You succesfully signed up!',
        subHeader: `Please confirm your email ${inputUsername}`,
        buttons: ['OK'],
      })
      setInputEmail("")
      setInputUsername("")
      setInputPassword("")
      console.log("submit")
    } 
  }

  async function onSignUpInvalid() {
    presentAlert({
      header: 'Enter a valid email',
      buttons: ['OK'],
    })
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
          <IonTitle>New to this app?</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">New to this app?</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="flex content-center mt-20">
          <div className="m-auto drop-shadow-md w-72">

            <h1 className="text-3xl font-bold content-center">
              Sign up
            </h1>

            <IonItem>
              <IonInput required placeholder="Username"
                onInput={(e) => {
                  setInputUsername((e.target as unknown as HTMLInputElement).value);
                }} 
                value={inputUsername}/>
            </IonItem>

            <IonItem>
              <IonInput
                required
                type="email"
                placeholder="Email"
                onInput={(e) => {
                  setInputEmail((e.target as unknown as HTMLInputElement).value);
                  validateEmail((e.target as unknown as HTMLInputElement).value);
                }} 
                value={inputEmail}/>
              {showAlert && (
                <IonIcon className="ml-2" icon='alert' color='danger' />
              )}
            </IonItem>

            <IonItem>
              <IonInput
                required
                type={showPassword ? 'text' : 'password'}
                placeholder='Password'
                onInput={(e) => setInputPassword((e.target as unknown as HTMLInputElement).value)} 
                value={inputPassword}/>
              <IonButton onClick={() => setShowPassword(!showPassword)}>
                <IonIcon icon={showPassword ? 'eye-off' : 'eye'}></IonIcon>
              </IonButton>
            </IonItem>

            <IonButton
              expand='block'
              onClick={showAlert ? onSignUpInvalid : onSignUp}>Sign up</IonButton>

          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
