# Gestor de Proyectos Freelance (GPF)

## Descripción del Proyecto

Sistema de gestión de clientes potenciales diseñado para freelancers que necesitan organizar y dar seguimiento a sus prospectos de negocio. Permite registrar información de contacto y actualizar el estado del proceso comercial de cada cliente.

## Funcionalidades Principales

- **Registro de Clientes**: Formulario para agregar nuevos clientes potenciales con su información de contacto
- **Visualización de Clientes**: Lista completa de todos los clientes registrados
- **Gestión de Estados**: Sistema de seguimiento con 6 estados posibles:
  - "Primer contacto con el cliente"
  - "Cotización enviada - Seguimiento 1"
  - "Cliente no ha dado respuesta - Seguimiento 2"
  - "Cliente aprueba el Servicio"
  - "Cliente no aprueba el Servicio - Dormido"
- **Persistencia de Datos**: Los clientes se guardan en localStorage para mantener la información entre sesiones

## Tecnologías Utilizadas

- **HTML5**: Estructura del sitio web
- **CSS3**: Estilos y diseño responsivo
- **JavaScript**: Lógica de la aplicación
  - Clases
  - Manipulación del DOM
  - Eventos
  - LocalStorage y JSON
  - Arrays y métodos de arrays (forEach, map, push)

## Estructura del Proyecto

```
GPF/
│
├── index.html      # Estructura HTML principal
├── styles.css      # Estilos de la aplicación
├── main.js         # Lógica JavaScript
└── README.md       # Documentación del proyecto
```

## Cómo Usar

1. Abrir el archivo `index.html` en un navegador web
2. Completar el formulario con los datos del cliente potencial
3. Hacer clic en "Registrar Cliente" para agregar el cliente
4. Ver la lista de clientes registrados en la sección inferior
5. Actualizar el estado de seguimiento usando el selector desplegable en cada tarjeta de cliente

## Características Técnicas

- **Sin dependencias externas**: Proyecto desarrollado con JavaScript puro
- **Gestión de datos**: Implementación de localStorage
- **Interfaz interactiva**: Uso de eventos del DOM sin `alert()` ni `prompt()`
- **Buenas prácticas**: Código comentado, nombres expresivos y estructura ordenada

## Autor

Proyecto desarrollado Por Edwin Sierra como parte del curso de JavaScript en Coderhouse

## Notas

- Los datos se almacenan localmente en el navegador
- Al abrir la aplicación por primera vez, se cargan 2 clientes de ejemplo
- Los datos persisten aunque se cierre el navegador
