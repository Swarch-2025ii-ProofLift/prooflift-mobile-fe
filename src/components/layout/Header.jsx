import { View, Image } from 'react-native';

import logo from '../../../assets/Images/logo-white-name.png'
import { ButtonLogin } from '../layout/ButtonLogin.jsx';


function Header() {

  return (
      <View
        className="absolute bottom-0 left-0 right-0 bg-background
          h-24 w-full flex-row items-center justify-between 
          pb-8 px-14 border-t border-tertiary z-50"
      >
        <ButtonLogin icon="home" text="Inicio" link="Exercises" />
        <Image 
          source={logo} 
          className="w-24 h-10" 
        />
        <ButtonLogin icon="user" text="Log Out" link="Login" />
      </View>
  )
}

export { Header }
