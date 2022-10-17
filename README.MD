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

ACLARACION: abrir 2 consolas diferentes, y ejecutar los comandos del front en una y los comandos del back en la otra consola.



/////////////////////////////

# NOTAS

auth-interceptor.service: inyecta en el req.header.autorization el token (si lo hubiera) en cada request / response de tipo http, para no tener que enviarlo manualmente.

dentro de la carpeta backend/src/validators usamos express-validator que es una extension para validar en el lado del backend todo lo que recibimos en el body desde el front-end.

con npm run copyothersfiles copiamos algunos archivos que no se copian con el comando npm run build (este solo copia *.ts)



/////////////////////////////

# TODO

* login por roles
* add organizaciones
* buscar talleres desde base de datos. agregar talleres desde usuario con role admin.
