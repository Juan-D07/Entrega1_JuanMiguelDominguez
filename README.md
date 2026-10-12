# Simulador de Inventario de Minecraft en JavaScript ES6

Este proyecto es una aplicación desarrollada en JavaScript ES6 (Vanilla JS) que simula de manera precisa el sistema de gestión de inventario y barra de accesos rápidos de un jugador de Minecraft. La práctica forma parte de la asignatura Desarrollo Web en Entorno Cliente (DWEC) y está diseñada para interactuar con el usuario mediante la consola del navegador y ventanas modales estándar como prompt, alert y un bucle principal de control.

## Objetivos Didácticos de la Práctica

El desarrollo de este simulador integra los siguientes conceptos prácticos de programación:
* Estructuras de control de flujo: Bucles while, for tradicionales y condicionales anidados con selectores switch.
* Gestión avanzada de Matrices: Manipulación de un array bidimensional dinámico mediante métodos nativos combinados con fill y map.
* Programación Orientada a Objetos (POO): Declaración de clases, constructores, encapsulado de propiedades mediante guion bajo, métodos de instancia y métodos de acceso explícitos (getters y setters).
* Tratamiento de entradas y parseo defensivo: Conversión segura de tipos de datos de texto a enteros mediante validaciones nativas de integridad.

## Estructura de Datos y Matriz del Inventario

El estado del inventario se gestiona globalmente mediante la variable `inventory`, la cual se inicializa como una matriz bidimensional de 4 filas por 9 columnas que totaliza 36 ranuras de almacenamiento.

Dimensiones: 4 filas x 9 columnas = 36 slots

* Fila 0: Representa la Hotbar o barra de accesos rápidos del jugador.
* Filas 1 a 3: Representan las ranuras del inventario principal.
* Ranuras vacías: Se inicializan explícitamente y se representan con el valor primitivo null.
* Ranuras ocupadas: Almacenan una instancia en memoria de la clase Item.

### Datos Iniciales Precargados
Para verificar las operaciones del menú desde el inicio, la matriz de inventario se precarga con los siguientes objetos distribuidos en posiciones específicas:

| Coordenada | Objeto (name) | Descripción (description) | Cantidad (_quantity) | Stack Máximo (maxStack) |
| :---: | :--- | :--- | :---: | :---: |
| [0,0] | espada | espada de diamante | 1 | 1 |
| [0,1] | pico | pico de hierro | 1 | 1 |
| [0,8] | manzana | manzana de casa | 64 | 64 |
| [1,0] | piedra | piedra de mina | 32 | 64 |
| [2,0] | antorcha | antorcha de mina | 33 | 64 |
| [3,0] | piedra | piedra de mina | 32 | 64 |

## Clase Item

Cada elemento almacenable dentro de la matriz corresponde a una instancia de la clase Item, la cual encapsula los atributos individuales y los métodos lógicos del objeto.

### Propiedades y Métodos de la Clase
* name (String): Nombre identificador del objeto, evaluado estrictamente en minúsculas.
* description (String): Texto descriptivo contextualizado de la procedencia del ítem.
* _quantity (Number): Propiedad interna que registra las unidades acumuladas en dicho casillero.
* maxStack (Number): Límite estructural de unidades permitidas para el objeto en un único slot.
* get quantity(): Devuelve de forma segura el valor asignado a la propiedad interna _quantity.
* set quantity(value): Modifica directamente el número de unidades almacenadas en el slot.
* showInfo(): Imprime en la consola un bloque descriptivo que desglosa todas las propiedades actuales del ítem.
* compareTo(item): Método de comparación que valida si el objeto actual comparte el mismo constructor y nombre que otro ítem provisto.

## Flujo del Menú Principal y Funcionalidades

El entorno de ejecución permanece activo mediante un bucle while controlado por la bandera booleana `fin`, interactuando de forma síncrona con el usuario mediante ventanas prompt. Las operaciones se bifurcan a través de las siguientes funciones:

1. Mostrar Inventario (`showFullInventory`): Recorre todas las filas y columnas de la matriz. Construye y retorna una cadena visual estructurada con delimitadores de corchetes y barras verticales, mostrando el nombre y la cantidad con formato de doble dígito (ej. /05) para los huecos ocupados, o la palabra "VACIO" para los elementos null.
2. Mostrar Hotbar (`showHotbar`): Aísla la fila de índice 0 del inventario y procesa sus columnas de forma exclusiva para formatear e imprimir únicamente la barra de accesos rápidos por consola.
3. Buscar Objeto (`objectSearch`): Solicita un nombre y comprueba si forma parte de los elementos válidos. Rastrea la matriz acumulando las coordenadas de coincidencia, sumando la cantidad global y recuperando la descripción del ítem.
4. Añadir Objeto (`objectAddition`): Inserta ítems controlando el apilado según el tipo. Si es una herramienta (espada o pico), restringe su cantidad a 1 y busca espacio vacío. Si es un bloque o consumible (piedra, manzana, antorcha), busca ranuras existentes del mismo tipo que no estén llenas para completar el stack hasta 64 unidades antes de recurrir a un slot vacío. Notifica el excedente si el inventario se llena.
5. Mover Objeto (`moveObejct`): Divide y parsea dos cadenas de coordenadas de origen y destino. Valida los rangos matriciales y la existencia de un ítem en el origen. Si el destino está vacío, transfiere el objeto; si contiene un ítem del mismo nombre, fusiona las cantidades respetando el límite de 64 unidades y actualiza los remanentes correspondientes. Si los nombres no coinciden, cancela el movimiento.
6. Eliminar Objeto (`removeObejct`): Recibe una coordenada, valida que contenga un ítem y solicita una confirmación escrita por prompt (si/no). En caso afirmativo, limpia la celda asignándole el valor null.
7. Mostrar Espacios Vacíos (`showEmptySpaces`): Cuenta exhaustivamente todas las posiciones con valor null en la matriz, guardando sus coordenadas y desglosando el total de huecos libres específicos en la fila de la Hotbar.
8. Mostrar Objeto más Abundante (`mostAbundantObject`): Inicializa un mapa asociativo con los contadores de los objetos permitidos, acumula el volumen total consolidado de cada uno recorriendo el inventario y determina cuál es el ítem con mayor cantidad total en todo el sistema.

## Funciones Auxiliares de Validación

El código utiliza funciones modulares específicas para asegurar que los datos introducidos no desestabilicen la matriz:
* tryParseInt(value): Evalúa si una cadena de texto representa un número entero válido. En caso de cadenas vacías, valores decimales o caracteres no numéricos, retorna un código de error de -1.
* searchFreeSpace(): Recorre secuencialmente el inventario y devuelve las coordenadas [fila, columna] del primer slot vacío (null) detectado, o null si no hay ninguno.
* searchFreeSpaceN(nameS): Busca ranuras ocupadas que coincidan en nombre con el parámetro y cuya cantidad actual sea inferior a su stack máximo, facilitando la lógica de apilado.

## Estructura del Proyecto y Entrega

El desarrollo se encuentra estructurado en archivos locales de la siguiente manera:

```text
Entrega1_NombreYApellido/
├── index.html          # Interfaz y entorno de carga del documento en el navegador
├── js/
│   └── inventario.js   # Script técnico con la clase Item, funciones lógicas y bucle de operaciones
└── README.md           # Documentación técnica adaptada al código fuente
```

## Tecnologías Utilizadas

* JavaScript ES6: Lenguaje de programación nativo, uso de clases y mapeo dinámico de arrays.
* HTML5: Archivo base para enlazar y desplegar los scripts en el motor de ejecución del navegador.
* Entorno de Desarrollo: Editores de código estándar compatibles con la visualización de la Consola del Desarrollador (F12).
