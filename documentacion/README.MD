# COMANDOS


//////////////////////////////

Para frontend:
ir al la carpeta: donaciones-sin-node-modules\front-end y ejecutar:
        npm install
luego:
        ng serve
//////////////////////////////


Para el backend:
ir al la carpeta: donaciones-sin-node-modules\back-end y ejecutar:
          npm install
luego:
          npm run copyothersfiles
luego:
          npm run build

luego:
          npm run dev

/////////////////////////////
otros comandos: 
          ng test: sirve para correr los test y ver los reportes karma.

/////////////////////////////

ACLARACION: abrir 2 consolas diferentes, y ejecutar los comandos del front en una y los comandos del back en la otra consola.



/////////////////////////////

SCRIPT PARA ABRIR TODO DE UNA: 
localizar el archivo start_cliente_and_server.bat y ejecutarlo, con esto abrimos todas las consolas con un click y se ejecuta el proyecto.


# NOTAS 

en la carpeta backend/src/helpers/signToken.js es donde esta definida la funcion para generar el token, mediante JWT, le pasamos 2 argumentos que vienen del request.

auth-interceptor.service: inyecta en el req.header.autorization el token generado con JWT (si lo hubiera) en cada request / response de tipo http, para no tener que enviarlo manualmente en cada peticion. 

dentro de la carpeta backend/src/validators usamos express-validator que es una extension (libreria) para validar en el lado del backend todo lo que recibimos en el body desde el front-end. por ejemplo, que un apellido tenga como minimo 6 caracteres y no sea nulo, etc.

dentro de la carpeta backend/src/middlwares/auth.js tenemos una funcion que usamos en la las routes para validar que el usuario tenga activo un JWT o token. tambien tenemos otra funcion hasRole que valida el rol del usuario, por ahora tenemos definido que si es admin va a dicha seccion, sino va a talleres. el rol lo trae de la base de datos.

dentro de la carpeta backend/src/middlwares/subirFoto.js usamos la libreria multer que nos facilita subir imagenes al servidor, y tambien la podemos usar como middleware para inyectar datos en la request para la siguiente funcion.

las fotos se suben en la carpeta build/public/temp


tenemos un test generado en la carpeta front-end/services/usuarios.service.spect.ts el cual analiza el servicio (usuarios.service.ts)  que valida cuando queremos registrar un email de usuario que ya existe en la tabla usuarios de la base de datos, entonces el test va a pasar como satisfactorio si recibimos como respuesta del servidor un objeto json con la siguiente estructura:
{ message: 'ese usuario ya existe', error: 1, status: 400 }




/////////////////////////////

# OTROS CUESTIONES
solo ejecutar solo algunos test y no todos, haremos:
renombramos nuestras funciones describe de la siguiente forma consiguiendo el efecto deseado:
     fdescribe: hace que solo las funciones marcadas de esta manera se ejecuten
     xdescribe: hace que todas las funciones excepto las marcadas de esta manera se ejecuten

con npm run copyothersfiles copiamos algunos archivos que no se copian con el comando npm run build (este solo copia *.ts)


/////////////////////////////

# TODO (queda por hacer)

* login por roles ✅
* add organizaciones ✅
* buscar talleres desde base de datos. agregar talleres desde usuario con role admin. 
* generar una tabla con las cosas donadas, que tengan un stock, que hagan referencia a una organizacion, que se puedan asignar a una causa, y decrementar el stock posteriormente a ser donadas.
* registrar direccion de la empresaa en la bd y tambien traerla desde el lado del administrador con su respectivo mapa.

* traer en /org los stocks de cosas. ✅
* tambien poder incrementar dichos valores. tambien poder agregar mas cosas.
* donar a una causa y descontar el stock posteriormente.
* actualizar pagina con las donaciones recibidad, mencionando a la org que dono(solo cuando el admin aprueba la donacion.)
* agregar tabla de causas activas.