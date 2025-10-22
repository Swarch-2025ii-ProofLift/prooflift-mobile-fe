import React, { useState } from 'react';
import { View, KeyboardAvoidingView, Platform } from 'react-native';

import { TitleLogin } from '../components/login/TitleLogin.jsx'
import { FormInput } from '../components/login/FormInput.jsx'
import { InputCamp } from '../components/login/InputCamp.jsx'
import { NavigateLogin } from '../components/login/NavigateLogin.jsx'
import { useNavigation } from '@react-navigation/native';

import { login } from '../API/auth.js'
import logo from '../../assets/Images/icono-white.png'

function Login ( ) {
  const navigation = useNavigation();

const handleLogin = async (data, setButtonContent) => {
  try {
    setButtonContent("Cargando...");

    const result = await login(data.email, data.password);

    setButtonContent("Iniciar sesión");
    navigation.navigate('Exercises');
  } catch (error) {
    console.error("Error en el login:", error);
    setButtonContent("Reintentar");
  }
};


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className='principal'
    >
      <View className='principal'>
        <View className='principal__container'>
          <TitleLogin
            title='Bienvenido de nuevo'
            imgLink={logo}
            statement={
              <>
                Inicia sesión para continuar con {'\n'} tu entrenamiento
              </>
            }
          />
          {/* <FormInput buttonText='Iniciar sesión'> */}
          <FormInput buttonText='Iniciar sesión' onSubmit={handleLogin}>
            <InputCamp
              icon="user"
              type='email'
              placeholder='Correo electrónico'
              name='email'
            />
            <InputCamp
              icon="lock"
              type='password'
              placeholder='Contraseña'
              name='password'
            />
          </FormInput>
          <NavigateLogin text={"¿No tienes una cuenta?"} 
          linkText={"Regístrate"} link={"SignUp"} />
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

export { Login }
