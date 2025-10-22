# ProofLift Mobile

Aplicación móvil de **ProofLift**, desarrollada con **Expo** y **React Native**, que consume las APIs del backend del sistema de software.

---

## Resumen general

El componente móvil permite a los usuarios autenticarse, explorar ejercicios y visualizar recomendaciones generadas por el sistema.  
Se comunica con el backend desplegado en Docker mediante peticiones HTTP, utilizando la variable `API_BASE_URL` definida en el archivo `.env`.

---

## Estructura del proyecto

```
prooflift-mobile-fe/
├── .env                         # Variables de entorno (API_BASE_URL)
├── App.js / index.js             # Punto de entrada de Expo
├── app.json                      # Configuración de Expo
├── src/
│   ├── API/
│   │   ├── API_URL.js            # Construye URLs usando API_BASE_URL
│   │   ├── auth.js               # Llamadas a la API de autenticación
│   │   ├── exercises.js          # Llamadas a la API de ejercicios
│   ├── components/               # Componentes reutilizables (ExerciseCard, SearchBar, etc.)
│   └── Screens/                  # Pantallas (Exercises, Login, SignUp, ...)
├── assets/                       # Imágenes y fuentes
├── babel.config.js
├── tailwind.config.js
└── package.json
```

---

## Configuración del entorno

### 1️. Crear el archivo `.env`

Ubicación:  
`prooflift-mobile-fe/.env`

#### Variable principal:

```dotenv
API_BASE_URL=192.168.2.19
```

- **Debe contener la IP o host** de la máquina donde están corriendo los servicios Docker.  
- **No incluir** `http://`, puerto ni comillas.  
- Ejemplos:
  - Dispositivo físico en la misma red Wi-Fi:  
    `API_BASE_URL=111.111.2.19`
  - Android Emulator (AVD):  
    `API_BASE_URL=10.0.2.2`
  - iOS Simulator:  
    `API_BASE_URL=localhost`


### 2️. Configurar Babel para leer `.env`

Asegurarse de que `babel.config.js` incluya el plugin `react-native-dotenv`.  

```javascript
// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      ['module:react-native-dotenv', {
        moduleName: '@env',
        path: '.env',
        safe: false,
        allowUndefined: true,
      }]
    ]
  };
};
```

---

## Ejecución del proyecto

### Ejecutar localmente con Expo

#### 1. Clonar el repositorio
```bash
git clone https://github.com/Swarch-2025ii-ProofLift/prooflift-mobile-fe
cd prooflift-mobile-fe
```

#### 2. Instalar dependencias
```bash
npm install
```

```bash
npx expo install
```

#### 3. Configurar el archivo `.env` como se indica arriba.

#### 4. Iniciar Expo
```bash
npx expo start -c
```
> El parámetro `-c` limpia la caché de Metro, necesario tras editar `.env`.

#### 5. Ejecutar la app
- En dispositivo físico (Expo Go)  
  > Asegúrate de que el **PC y el teléfono estén en la misma red Wi-Fi** y Expo esté en **modo LAN**.
- En emulador Android o iOS desde el menú de Expo.

---

## Comprobaciones rápidas

- En el log de la app debería aparecer algo como:  
  ```
  API_URL -> http://192.168.2.19:8000
  ```
- Verifica la conexión al backend:
  ```bash
  curl http://localhost:8000/          # Kong Gateway
  curl http://localhost:8082/exercises # Servicio directo
  ```

---

##  Integración con el backend

La app móvil se comunica con los siguientes servicios backend:
- **Kong API Gateway** (puerto 8000)
- **Auth Service** → Login / Signup
- **Exercises Service** → Recomendaciones de ejercicios

Cada servicio puede desplegarse dentro de la misma red Docker, y la app accede a ellos a través del host configurado en `API_BASE_URL`.

---