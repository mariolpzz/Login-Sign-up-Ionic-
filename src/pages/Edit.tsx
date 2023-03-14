import { IonButton, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonTitle, IonToolbar, useIonAlert } from '@ionic/react';
import { useEffect, useState } from 'react';
import { supabase } from '../supabase/client';
import './Tab2.css';


const Tab4: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser()
      setEmail(user?.email || '');
      
      const { data, error } = await supabase
      .from('profiles')
      .select('id, username')
      .eq('email', user?.email || '')
      
      if (error || showAlert) {
        console.log(error);
      }
      
      if (data && data.length > 0) {
        const username = data[0].username;
        const id = data[0].id;
        setUsername(username);
        setId(id);
        setIsLoggedIn(true)
      } else {
        console.error(error);
      }
    }

    getUser()
  }, []);
    
  const handleUpdateProfile = async () => {
    const { data, error } = await supabase.auth.updateUser({
      email: email,
      password: password,
      data: { username: username }
    })

    updateProfiles()

    if (error) {
      console.log(error)
    }
  }

  const updateProfiles = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .update({
        username: username,
        email: email,
      })
      .eq('id', id);

    if (error || showAlert || password.length < 6) {
      presentAlert({
        header: 'There has been an error updating your profile',
        buttons: ['OK'],
      })
    } else {
      presentAlert({
        header: 'Profile updated succesfully',
        buttons: ['OK'],
      })
    }
  }

  const validateEmail = (email: string) => {
    email.match(/^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/) !== null ? setShowAlert(false) : setShowAlert(true);
  };

  supabase.auth.onAuthStateChange((event, session) => {
    session !== null ? setIsLoggedIn(true) : setIsLoggedIn(false)
  })

  const [presentAlert] = useIonAlert();

  return isLoggedIn ? (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Edit your profile information</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Edit your profile information</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="flex content-center mt-20">
          <div className="m-auto drop-shadow-md w-72">

            <h1 className="text-3xl font-bold">
              Profile information
            </h1>

            <IonItem>
              <IonLabel position="stacked">Username</IonLabel>
              <IonInput value={username}
                onInput={(e) => setUsername((e.target as unknown as HTMLInputElement).value)}></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Email</IonLabel>
              <IonInput
                type='email'
                value={email}
                onInput={(e) => {
                  setEmail((e.target as unknown as HTMLInputElement).value);
                  validateEmail((e.target as unknown as HTMLInputElement).value);
                }}
              />
              {showAlert && <IonIcon slot='end' className="ml-2" icon='alert' color='danger' />}
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Password</IonLabel>
              <IonInput
                required
                type={showPassword ? 'text' : 'password'}
                onInput={(e) => setPassword((e.target as unknown as HTMLInputElement).value)}
              />
              <IonButton slot='end' onClick={() => setShowPassword(!showPassword)}>
                <IonIcon icon={showPassword ? 'eye-off' : 'eye'}></IonIcon>
              </IonButton>
            </IonItem>

            <IonButton onClick={handleUpdateProfile} expand='block'>Update</IonButton>

          </div>
        </div>

      </IonContent>
    </IonPage >
  ) : (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profile information</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Log in to see your profile information</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="flex content-center mt-20">
          <div className="m-auto drop-shadow-md w-72">
            <h1 className="text-3xl font-bold">
              Profile information
            </h1>
            <p className='text-lg'>Log in to see your profile information</p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab4;
