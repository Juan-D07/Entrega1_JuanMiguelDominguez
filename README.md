# Simulador de Inventario de Minecraft en JavaScript ES6

Este proyecto consiste en una aplicación desarrollada en JavaScript ES6 (Vanilla JS) que simula el sistema clásico de gestión de inventario de un jugador de Minecraft. La práctica forma parte de la asignatura Desarrollo Web en Entorno Cliente (DWEC) y sirve para integrar y consolidar conceptos avanzados de programación en el entorno del navegador de forma puramente nativa.

## Objetivos Didácticos de la Práctica

El desarrollo de este simulador integra los siguientes conceptos de programación:
* Declaración de variables y tipos de datos.
* Operadores y estructuras de control (condicionales if/else, bucles for y do...while).
* Manejo avanzado de Arrays y Matrices bidimensionales.
* Funciones regulares y Arrow Functions de ES6.
* Programación Orientada a Objetos (POO): Clases, objetos, constructores, métodos, encapsulamiento y métodos de acceso (getters y setters).

## Estructura de Datos y Matriz del Inventario

El sistema central del inventario está modelado mediante una matriz bidimensional de objetos de 4 filas por 9 columnas, lo que da un total de 36 ranuras o slots.

Dimensiones: 4 filas x 9 columnas = 36 slots

* Fila 0: Corresponde a la Barra de accesos rápidos (Hotbar).
* Filas 1 a 3: Representan el Inventario principal del jugador.
* Huecos vacíos: Se inicializan y representan como casillas sin instanciar (null o undefined).
* Huecos ocupados: Contienen una instancia individual de la clase Item.

### Datos Iniciales Precargados
Para facilitar el entorno de pruebas y verificar el funcionamiento inmediato de la aplicación, el inventario se inicializa con los siguientes objetos de prueba en la barra de accesos rápidos:

| Posición | Objeto | Descripción | Stack Máximo | Cantidad Inicial |
| :---: | :--- | :--- | :---: | :---: |
| [0,0] | Piedra | Trozo sólido de roca dura | 64 | 64 |
| [1,2] | Manzana | El fruto que Eva se comió cuando no debía | 64 | 16 |
| [2,8] | Antorcha | Un palo con un cacho carbón que arde | 64 | 32 |
| [1,4] | Espada de diamante | Espada hecha del material más duro del planeta | 1 | 1 |
| [2,3] | Pico de hierro | Pico hecho de 3 simples lingotes de hierro | 1 | 1 |
| [3,1] | Prueba | Objeto de testeo unitario | 1 | 1 |

## Clase Item

La base de todos los elementos almacenables es la clase Item. Cada objeto que se guarda en la matriz es una instancia de esta clase, encargada de encapsular las propiedades y comportamientos de cada unidad.

### Propiedades y Métodos
* name / nombre (String): Nombre del objeto (ej. "Pico de hierro").
* description / descripcion (String): Breve descripción contextual del objeto.
* _quantity / cantidad (Number): Propiedad interna que almacena la cantidad actual de unidades en ese slot específico (stack).
* maxStack (Number): Límite superior de unidades permitidas para ese ítem en un solo casillero (ej. 64 para bloques y 1 para herramientas).
* get quantity(): Retorna el valor actual de la cantidad.
* set quantity(value): Valida que el nuevo valor cumpla con la restricción de estar entre 0 y maxStack. Si desborda, trunca el valor al máximo permitido.
* showInfo(): Emite por consola un bloque descriptivo multilínea con todos los atributos del ítem.
* showInfoShorted(): Retorna una representación compacta en formato Nombre(cantidad).

## Menú Principal y Funcionalidades

El flujo de ejecución se gestiona mediante un menú interactivo por consola controlado con un bucle do...while y un selector switch, manteniendo activo el programa hasta que el usuario decida salir introduciendo la opción 0 o cancelando la ventana principal. La interacción se realiza a través de console.log y ventanas modales estándar (prompt, alert, confirm).

Las opciones disponibles son las siguientes:

1. Mostrar inventario completo: Recorre toda la matriz construyendo una representación visual de cada fila. Indica el nombre, cantidad y coordenadas de cada objeto, o la etiqueta "VACÍO" si el slot no contiene ningún ítem.
2. Mostrar barra de accesos rápidos: Aísla y recorre exclusivamente la primera fila de la matriz (inventario[0]) mediante el método funcional Array.prototype.forEach(), empleando la representación concisa de los ítems.
3. Buscar un objeto: Solicita el nombre del ítem mediante prompt(). Realiza una búsqueda que no distingue entre mayúsculas y minúsculas (case-insensitive). Devuelve las coordenadas exactas de los slots donde se encuentra, la cantidad global acumulada y su descripción detallada.
4. Añadir un objeto al inventario: Permite insertar un objeto mediante una lógica inteligente de apilado en fases:
   * Fase 1 (Completar stacks): Busca si existe un stack del mismo tipo que no esté lleno para rellenarlo hasta su maxStack.
   * Fase 2 (Nuevos huecos): Si sobra cantidad, busca las primeras posiciones vacías para crear nuevas instancias.
   * Fase 3 (Control de excedente): Si el inventario se llena, avisa al usuario cuántas unidades se guardaron y cuántas quedaron fuera.
5. Mover un objeto: Solicita coordenadas de origen y destino (acepta formatos F.C o F,C). Si el destino está vacío, traslada la referencia. Si contiene el mismo ítem, transfiere el contenido respetando el maxStack y dejando el sobrante en el origen. Si el destino está ocupado por otro ítem, realiza un intercambio de posiciones o bloquea la acción según la configuración de la regla de negocio.
6. Eliminar un objeto: Pide las coordenadas de un slot y, previa confirmación explícita mediante la función nativa confirm(), desasigna la casilla dejando el hueco libre.
7. Mostrar huecos libres: Computa y devuelve la cantidad exacta de slots que están vacíos en todo el inventario, desglosando cuántos de ellos corresponden a la barra de acceso rápido.
8. Mostrar el objeto más abundante: Itera sobre la matriz para calcular el volumen consolidado de cada objeto o identificar el stack individual que almacena la mayor cantidad de unidades acumuladas en una sola casilla.

## Funciones Modulares y Auxiliares

Para garantizar un código limpio, desacoplado y reutilizable, la aplicación implementa funciones de soporte:
* forEachSlot(callback): Recorre toda la matriz ejecutando una función callback por cada ranura. Permite la interrupción temprana del ciclo.
* findItemInInventory(itemToSearch): Busca en el inventario y retorna la primera referencia que coincida con el nombre dado.
* findItemWithCordinates(row, col): Obtiene de forma segura el ítem en una coordenada comprobando límites matriciales.
* getCordinates(input): Parsea y valida cadenas de coordenadas en formato "F.C" o "F,C" usando expresiones regulares.

## Validaciones y Tratamiento de Errores

El proyecto implementa controles defensivos para prevenir estados inconsistentes:
* Validación de Coordenadas: Expresión regular `^([0-3])[.,]([0-8])$` que garantiza que las filas estén acotadas en el rango [0, 3] y las columnas en.
* Integridad de Cantidades: Verificación de números mediante Number.isInteger() impidiendo cadenas vacías, valores negativos o flotantes no válidos.
* Respeto a maxStack: Control matemático en el setter de Item y en las operaciones de adición/fusión para no superar la capacidad asignada.
* Resiliencia en el Menú: Opciones no reconocidas o cancelaciones de los prompts son capturadas sin interrumpir la ejecución del programa.

## Estructura del Proyecto y Entrega

El proyecto sigue una estructura básica de separación de responsabilidades organizada de la siguiente manera:

Entrega1_NombreYApellido/
├── index.html          # Punto de entrada y estructura básica para abrir en el navegador
├── js/
│   └── inventario.js   # Script con la clase Item, funciones de soporte y lógica del menú
└── README.md           # Documentación técnica completa del proyecto

## Herramientas y Tecnologías Utilizadas

* JavaScript (ES6): Lenguaje principal utilizado para toda la lógica de la aplicación.
* HTML5: Entorno base para la ejecución del script en el navegador.
* Visual Studio / VS Code: Entorno de Desarrollo Integrado (IDE) utilizado para escribir y organizar el código.
* W3Schools y Documentación de DeepWiki: Material de consulta técnica y teórica.
* Asistencia por IA (Gemini): Utilizado como apoyo para la resolución de bugs, estructuración inicial de la documentación, lluvia de ideas y optimización de buenas prácticas.

## Criterios de Evaluación (Rúbrica)

| Criterio evaluado | Puntuación | Estado |
| :--- | :---: | :---: |
| Clase Item, constructor, objetos, getter y setter | 1,5 pts | Totalmente implementado |
| Uso correcto de arrays y matriz de objetos | 1,5 pts | Totalmente implementado |
| Estructuras de control y recorridos | 1,0 pts | Totalmente implementado |
| Funciones y organización del código | 1,5 pts | Totalmente implementado |
| Funcionalidades del menú (opciones 1 a 8) | 2,0 pts | Totalmente implementado |
| Validación y tratamiento de errores | 1,0 pts | Totalmente implementado |
| Uso de ES6 / Arrow Functions | 0,5 pts | Totalmente implementado |
| Claridad, nombres, indentación y comentarios | 1,0 pts | Totalmente implementado |
| TOTAL | 10,0 pts | 100% Cubierto |

## Instrucciones de Uso y Ejecución

1. Descargar o clonar los archivos del proyecto dentro de una misma carpeta de trabajo.
2. Comprobar que index.html enlaza correctamente el script dentro de la etiqueta `<head>` o antes del cierre de `<body>` apuntando a la ruta `js/inventario.js`.
3. Abrir el archivo index.html en cualquier navegador web moderno (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari).
4. Abrir la Consola del Desarrollador pulsando F12 o Ctrl + Shift + I (en macOS: Cmd + Option + I) para visualizar la salida de datos detallada.
5. Interactuar con las ventanas emergentes (prompts y alertas) que van guiando el flujo del programa.
