import { View, KeyboardAvoidingView, Platform } from 'react-native';
import logo from '../../assets/Images/icono-white.png'

import { TitleLogin } from '../components/login/TitleLogin.jsx'
import { FormInput } from '../components/login/FormInput.jsx'
import { InputCamp } from '../components/login/InputCamp.jsx'
import { NavigateLogin } from '../components/login/NavigateLogin.jsx'
import { signup } from '../API/auth.js'
import { useNavigation } from '@react-navigation/native';


function SignUp() {
  const navigation = useNavigation();

  const handleSignUp = async (data, setButtonContent) => {
    try {
      console.log("Datos del registro:", data)
      setButtonContent('Creando cuenta...')

      const result = await signup(data.nombre, data.email, data.password)
      setTimeout(() => navigation.navigate('Login'), 2000)

    } catch (error) {
      console.error("Error en el registro:", error)
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className='principal'
    >
      <View className='principal__container'>
        <TitleLogin
          title='Crear tu cuenta'
          imgLink={logo}
              statement='Únete y empieza a transformar tu cuerpo'
            />
        <FormInput buttonText='Crear cuenta' onSubmit={handleSignUp}>
          <InputCamp
            icon="user"
            type='text'
            placeholder='Nombre completo'
            name='nombre'
          />
          <InputCamp
            icon="envelope"
            type='email'
            placeholder='Correo electrónico'
            name='email'
          />
          <InputCamp
            icon="lock"
            type='password'
            placeholder='Contraseña'
            name='password'
            validate={{
              required: 'La contraseña es obligatoria',
              minLength: { value: 6, message: 'Mínimo 6 caracteres' },
              validate: value => {
                const specialChars = value.match(/[^a-zA-Z0-9]/g) || []
                return (
                  specialChars.length >= 2 || 'La contraseña requiere mínimo 2 caracteres especiales'
                  )
                }
              }}
            />
            <InputCamp
              icon="lock-open"
              type='password'
              placeholder='Confirmar contraseña'
              name='confirmPassword'
              validate={{
                required: "Debes confirmar tu contraseña",
                validate: (value, { password }) =>
                value === password || "Las contraseñas no coinciden",
              }}
            />
        </FormInput>
        <NavigateLogin text={"¿Ya tienes una cuenta?"} 
        linkText={"Inicia sesión"} link={"Exercises"} />
        </View>
    </KeyboardAvoidingView>
  )
}

export { SignUp }
