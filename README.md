# Star Wars

## Descripción 📄

Este repositorio contiene los recursos de una aplicación web para explorar información sobre naves espaciales de Star Wars.

## Demo 🚀

Puedes ver la demostración de la aplicación en [Star Wars App](https://yul1b3th.github.io/it7-star-wars/).

## Características ✨

- **Exploración de Starships**: Permite explorar información detallada sobre diversas naves espaciales de Star Wars.
- **Autenticación de Usuarios**: Funcionalidad de inicio de sesión y registro.
- **Navegación Segura**: Uso de Guards para proteger rutas que requieren autenticación.
- **Interacción con la API de Star Wars**: Consumo de datos desde la API de Star Wars.

## Interacción con la API de Star Wars 🌌

Este proyecto utiliza la [API de Star Wars](https://swapi.dev/documentation) para obtener información sobre naves espaciales. Puedes explorar la documentación para conocer los endpoints disponibles y la estructura de los datos.

Además, las imágenes de las naves espaciales se obtienen de [Star Wars Visual Guide](https://starwars-visualguide.com/#/starships?page=1). Puedes acceder a las imágenes utilizando enlaces como este: [Imagen de la Nave 5](https://starwars-visualguide.com/assets/img/starships/5.jpg).



## Tecnologías Utilizadas 💻

- TypeScript
- HTML5
- SCSS (Bootstrap)
- [Angular CLI](https://github.com/angular/angular-cli) version 17.0.5.

## Requisitos 📋

- Node.js y npm instalados en tu sistema. Puedes descargarlos desde [nodejs.org](https://nodejs.org/).
- Angular CLI instalado globalmente. Puedes instalarlo con el siguiente comando:

```bash
npm install -g @angular/cli
```

## Instalación 🛠️
1. Levanta el servidor JSON en el puerto 3000:

```bash
json-server --watch db.json --port 3000
```

2. Clona el repositorio:
```bash
git clone https://github.com/Yul1b3th/it6-budget.git
```

3. Ingresa al directorio del proyecto:
```bash
cd it7-star-wars
```

4. Instala las dependencias:
```bash
npm install
```


## Ejecución ▶️
Ejecuta la aplicación con el siguiente comando:
```bash
ng serve
```

## Despliegue 🌐

Para desplegar la aplicación en producción, sigue estos pasos:

1. Ejecuta el comando de construcción para compilar la aplicación Angular:

    ```bash
    ng build --prod
    ```

2. Los archivos generados se almacenarán en el directorio `dist/`. Puedes desplegar estos archivos en un servidor web o en un servicio de alojamiento que admita aplicaciones web estáticas.


## Pruebas Unitarias con Jest 🧪

Este proyecto cuenta con pruebas unitarias implementadas utilizando Jest, se han realizado pruebas para los siguientes componentes:

1. **StarshipsListComponent**:
   - Debería cargar la página siguiente y actualizar la página actual.
   - Debería cargar la página anterior y actualizar la página actual.
   - Debería cargar una página específica y actualizar la página actual.

2. **StarshipCardComponent**:
   - Asegura que el componente StarshipCard se inicialice correctamente al cargar los detalles de una nave espacial.
   - Se verifica que se invoque la función 'loadStarshipDetails' del servicio 'StarshipsService' con el parámetro correcto. También, se confirma que el identificador de la nave espacial en el componente se actualice correctamente.

3. **PilotCardComponent**:
   - Confirma que el componente muestra correctamente las imágenes de pilotos cuando se proporciona un array de imágenes. También, verifica que la cantidad y las fuentes de las imágenes se correspondan con los datos proporcionados.
   - Asegura que el componente presente un mensaje apropiado cuando no hay imágenes de pilotos. Garantiza que el mensaje se muestre adecuadamente cuando el array de imágenes está vacío.

Para instar Jest sigue estos pasos:
1. Remueve las referencias a Jasmine y Karma:
```bash
npm remove @types/jasmine jasmine-core karma karma-chrome-launcher karma-coverage karma-jasmine karma-jasmine-html-reporter
```

2. Instala Jest y sus dependencias:
```bash
npm i -D jest jest-preset-angular @types/jest
```

Para ejecutar las pruebas, utiliza el comando:

```bash
npm run test
```


## Contribuciones 🤝

Si deseas colaborar en este proyecto o informar sobre problemas, no dudes en crear un "issue" o enviar un "pull request."


