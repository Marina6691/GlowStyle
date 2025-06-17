# 🎨 Designer Social Network

Una red social pensada para diseñadores, donde los usuarios pueden registrarse, crear su perfil y compartir sus diseños con la comunidad.

Desarrollada con **Node.js**, **Express** y **MySQL**, este proyecto integra funcionalidades como autenticación segura, subida de imágenes, relaciones entre usuarios y publicaciones, y una interfaz amigable con **EJS**.

---

## 🎥 Demo en Video

[![Ver en YouTube](https://img.youtube.com/vi/PUbPNTncLsE/0.jpg)](https://www.youtube.com/watch?v=PUbPNTncLsE)

> 🔗 *Haz clic en la imagen para ver el video en YouTube*

---

## 🚀 Tecnologías utilizadas

### Backend
- Node.js  
- Express.js  
- EJS  
- MySQL2  
- Multer – Subida de imágenes  
- Bcrypt – Cifrado de contraseñas  
- Morgan, Debug, Cookie-Parser, Http-Errors  

### Frontend
- HTML5  
- CSS3  
- Bootstrap  
- JavaScript  

---

## ✨ Funcionalidades

- Registro e inicio de sesión de diseñadores  
- Cifrado seguro de contraseñas con Bcrypt  
- Subida de imágenes de perfil y diseños (Multer)  
- Publicación de diseños con descripción y metadatos  
- Relación 1:N entre diseñadores y sus diseños  
- Eliminación lógica (`is_deleted`)  
- Vistas dinámicas con EJS  
- 📱 Diseño responsive adaptado a móviles y tablets  

---

## 🧠 Aprendizajes aplicados

- Separación de responsabilidades entre vistas (EJS), estilos (CSS) y lógica (Node.js)  
- Uso de EJS para renderizado dinámico del frontend  
- Arquitectura modular con Express y rutas independientes  
- Integración de base de datos relacional (MySQL)  
- Manejo de sesiones, cookies y cifrado de contraseñas  
- Subida de imágenes y tratamiento de archivos  
- Diseño web responsive con CSS  

---

## 🗃️ Estructura de la base de datos

```sql
create database style;
use style;

CREATE TABLE designer (
designer_id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
designer_name VARCHAR(100) NOT NULL,
designer_lastname VARCHAR (200) NOT NULL,
designer_description VARCHAR (300) NOT NULL,
password VARCHAR(200) NOT NULL,
city VARCHAR(100),
phone_number VARCHAR(20),
email VARCHAR(150) UNIQUE NOT NULL,
designer_img VARCHAR(100),
designer_is_deleted BOOLEAN DEFAULT 0
);

CREATE TABLE design (
design_id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
designer_id INT UNSIGNED NOT NULL,
design_name VARCHAR(100) NOT NULL,
genre VARCHAR (50) NOT NULL,
fabric VARCHAR (100) NOT NULL,
color VARCHAR (100) NOT NULL,
clothing_type VARCHAR (200) NOT NULL,
design_description VARCHAR (300) NOT NULL,
design_img VARCHAR (100),
design_is_deleted BOOLEAN DEFAULT 0,
CONSTRAINT fk_designer_1 FOREIGN KEY (designer_id)
REFERENCES designer(designer_id) ON DELETE CASCADE ON UPDATE CASCADE
);

```

---

## 📥 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/TU_USUARIO/designer_social_network.git
cd designer_social_network

# Instalar dependencias
npm install

# Iniciar el servidor en modo desarrollo
npm run dev
```

---

## ⚙️ Configuración de la base de datos

 Configura la conexión en el archivo `config/db.js`:

```js
const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "designer_social_network"
});
module.exports = connection;
```


---

## ✅ Estado del proyecto

🟡 Proyecto en desarrollo con funcionalidades principales implementadas.

### Próximas mejoras:
- Sistema de comentarios y "me gusta"  
- Validaciones más robustas  
- Roles de usuario (admin, diseñador)  
- Subida segura con validación MIME  

---


## 📝 Licencia

Este proyecto fue creado con fines educativos y puede ser reutilizado y adaptado libremente con fines no comerciales.
