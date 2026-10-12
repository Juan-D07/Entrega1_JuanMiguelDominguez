

const tryParseInt = (value) =>{
    if (value=="") return -1;
    let num =Number(value)
    return Number.isInteger(num) ?  num : -1
}

// clase de Item
class Item {
    constructor(name, description, quantity, maxStack){
        this.name=name;
        this.description=description;
        this._quantity=quantity;
        this.maxStack=maxStack
    }
    set quantity(value){
        this._quantity=value
    }

    get quantity(){
        return this._quantity
    }

    showInfo(){
        console.log("Nombre: " + this.name + "\n Descripcion: " + this.description + "\n Quantity: "+ this.quantity +"\n maxStack: "+ this.maxStack);
    }

    compareTo(item){
        if (this.constructor===item.constructor){
            return this.name === item.name
        }
        return false;
    }
}

//Mostrar inventory
function showFullInventory(){
    let inventaryTemp = "";
    for(let i=0; i<inventory.length;i++){
        // inicializamos la fila de impresion
        let fila = "["
        for(let j=0; j<inventory[i].length;j++) {
            if (inventory[i][j]==null){
                fila=fila+" VACIO ";
            }
            else{
                if (inventory[i][j].quantity<10){
                    fila+=" "+inventory[i][j].name+"/0"+inventory[i][j].quantity+" ";
                }
                else{
                    fila+=" "+inventory[i][j].name+"/"+inventory[i][j].quantity+" ";
                }

            }
            if (j< inventory[i].length-1) fila=fila+"|";
        }
        inventaryTemp+=fila+"] \n";
    }
    //devuelve cadena de impresion
    return inventaryTemp;
}

//Mostrar Hotbar
function showHotbar(){
    let fila = "["
        for(let j=0; j<inventory[0].length;j++) {
            if (inventory[0][j]==null){
                fila=fila+" VACIO ";
            }
            else{
                if (inventory[0][j].quantity<10){
                    fila+=" "+inventory[0][j].name+"/0"+inventory[0][j].quantity+" ";
                }
                else{
                    fila+=" "+inventory[0][j].name+"/"+inventory[0][j].quantity+" ";
                }

            }
            if (j< inventory[0].length-1) fila=fila+"|";
        }
    return fila+"] \n";
}

//Busqueda de objeto
function objectSearch(searchN){
    // Validamos si el nombre es valido
    let availableNames=["espada","pico","piedra","manzana","antorcha"]
    if (!availableNames.includes(searchN.toLowerCase())) return "error en la entrada del nombre, volver a intentar";

    let positions=[];
    let total=0;
    let description;

    for(let i=0; i<inventory.length;i++){
        for(let j=0; j<inventory[i].length;j++) {
            // si encuentra un objecto con el mismo nombre:
            // anade su posicion a la lista, suma la cantidad del objeto al total, y se actualiza la descripcion
            if (inventory[i][j]!= null && inventory[i][j].name==searchN.toLowerCase()){
                positions.push("["+i+", "+j+"]");
                total+=inventory[i][j].quantity;
                description=inventory[i][j].description
            }
        }
    }

    // devuelve resultados
    if (total==0) return "no hay ninguna "+searchN+" en el inventory";

    return "Hay "+ total +" " +searchN+"\n Descripcion: "+description+"\n Posiciones: "+positions;
}

//busca si hay un espacio vacio en el inventory, devuelve un array con la posicion de primera ocurrencia, si no devuelve null
function searchFreeSpace(){
    for(let i=0; i<inventory.length;i++){
        for(let j=0; j<inventory[i].length;j++) {
            if (inventory[i][j]==null) return [i,j];
        }
    }
    return null;
}

//busca por un espacio que te guarde un objeto con el mismo nombre que la cadena en el parametro y que no tenga el maximo stack
//devuelve un array con la posicion de primera ocurrencia, si no devuelve null
function searchFreeSpaceN(nameS){
    for(let i=0; i<inventory.length;i++){
        for(let j=0; j<inventory[i].length;j++) {
            if (inventory[i][j]!= null && inventory[i][j].name==nameS && inventory[i][j].maxStack>inventory[i][j].quantity) return [i,j];
        }
    }
    return null;
}

//Anade un objeto al inventory
function objectAddition(objN, objD, objQ){
    let position;
    // Validamos si en el nombre es valido
    let availableNames=["espada","pico","piedra","manzana","antorcha"]
    if (!availableNames.includes(objN)) return "error en la entrada del nombre, volver a intentar";

    // si el objeto tiene el nombre espada o pico, la cantidad introducida es igual a uno
    // y hay espacio libre, el objeto es anadido.
    if (objN=="espada" || objN=="pico"){
        if(objQ!=1){ return "error en la entrada, cantidad no es uno 1";}
        position=searchFreeSpace();
        if (position==null) return "el inventory esta lleno";
        inventory[position[0]][position[1]]=new Item(objN, objD, objQ,1);
    }
    else{
        // si el objeto tiene el nombre manzana, piedra o antorcha, la cantidad introducida es correcta
        if (objQ<0 || objQ>64) "error en la entrada, cantidad no esta entre 1 y 64";
        //mientras haiga objetos del mismo nombre con espacio y todavia haiga cantidad por anadir 
        position=searchFreeSpaceN(objN);
        while(position!=null && objQ>0){
            //si la cantidad entra a media en un stack
            if(inventory[position[0]][position[1]].quantity+objQ>64){
                objQ= inventory[position[0]][position[1]].quantity+objQ-64
                inventory[position[0]][position[1]].quantity =64;
            }
            //si la cantidad entra por completo a un stack
            else if (inventory[position[0]][position[1]].quantity+objQ<=64){
                inventory[position[0]][position[1]].quantity+=objQ;
                objQ=0;
                return "cantidad de objeto añadido";
            }
            position=searchFreeSpaceN(objN);
        }
        // si todavia queda cantidad y los objetos con el mismo nombre estan llenos
        position=searchFreeSpace();
        if (position==null) return "el inventory esta lleno, se han quedado "+objQ+" items fuera";
        inventory[position[0]][position[1]]=new Item(objN, objD, objQ,64);
    }

    return "objeto añadido en posicion: " + position;
}

// mover objeto
function moveObejct(string1, string2){
    // validacion de posicion
    pos1=string1.split(",");
    pos1[0]=tryParseInt(pos1[0]);
    pos1[1]=tryParseInt(pos1[1]);
    pos2=string2.split(",");
    pos2[0]=tryParseInt(pos2[0]);
    pos2[1]=tryParseInt(pos2[1]);
    // if (pos1[0] ==-1 || pos1[1] ==-1 || pos2[0] ==-1 || pos2[1] ==-1) return "posicion no es un entero";
    if ((pos1[0]<0 || pos1[0]>3) || (pos2[0]<0 || pos2[0]>3)) return "posicion no valida (filas entre 0 y 3)";
    if ((pos1[1]<0 || pos1[1]>8) || (pos2[1]<0 || pos2[1]>8)) return "posicion no valida (columnas entre 0 y 8)";
    if (inventory[pos1[0]][pos1[1]]==null) return "posicion de origen vacia";

    // si el destino es vacio
    if(inventory[pos2[0]][pos2[1]]==null){
        let objectoTemp=inventory[pos1[0]][pos1[1]];
        inventory[pos1[0]][pos1[1]]=null;
        inventory[pos2[0]][pos2[1]]=objectoTemp;
        return "El objeto ha cambiado de posicion";
    }
    // si el destino es un objeto
    else{
        // mas validaciones
        if (inventory[pos1[0]][pos1[1]].name!=inventory[pos2[0]][pos2[1]].name) return "Los objetos indicados no son del mismo tipo";
        if (inventory[pos2[0]][pos2[1]].quantity==inventory[pos2[0]][pos2[1]].maxStack) return "El objeto de destino ya tiene el stack lleno";
        
        // si la suma de la cantida de los objetos es mas de 64 
        // asumimos que el maximo stack es 64 por que la cantidad de espadas o picos no se pueden sumar
        if(inventory[pos1[0]][pos1[1]].quantity + inventory[pos2[0]][pos2[1]].quantity >64){
            inventory[pos1[0]][pos1[1]].quantity+=(inventory[pos2[0]][pos2[1]].quantity-64);
            inventory[pos2[0]][pos2[1]].quantity =64;
            return "La mayor cantidad posible del objeto ha cambiado del posicion";
        }
        // si la suma de la cantida de los objetos es mas de 64 
        else{
            inventory[pos1[0]][pos1[1]]==null;
            inventory[pos2[0]][pos2[1]].quantity =64;
            return "La toda cantidad del objeto ha cambiado del posicion";
        }
    }
}

function removeObejct(string1){
    //validacin de entrada
    pos1=string1.split(",");
    pos1[0]=tryParseInt(pos1[0]);
    pos1[1]=tryParseInt(pos1[1]);
    if (pos1[0]<0 || pos1[0]>3 ) return "posicion no valida (filas entre 0 y 3)";
    if (pos1[1]<0 || pos1[1]>8 ) return "posicion no valida (columnas entre 0 y 8)";
    if (inventory[pos1[0]][pos1[1]]==null) return "posicion de eliminacion vacia";

    //confirmacion de eliminacion
    let confirmation = prompt('Eliminar objeto '+inventory[pos1[0]][pos1[1]].name+' en '+pos1 +'? (si/no)');
    while (confirmation.toLowerCase()!='si' && confirmation.toLowerCase()!='no'){
        confirmation = prompt('Eliminar objeto '+inventory[pos1[0]][pos1[1]].name+' en ['+pos1 +']? (si / no)');
    }
    // elimnacion
    if (confirmation.toLowerCase()=='si'){
        inventory[pos1[0]][pos1[1]]=null;
        return "Objeto elimando";
    }
    return "Objeto no elimando;";
}

function showEmptySpaces(){
    let positions=[];
    let total=0;
    let hotbarTotal=0;
    for(let i=0; i<inventory.length;i++){
        for(let j=0; j<inventory[i].length;j++) {
            // si encuentra un vacio con el mismo nombre:
            // anade su posicion a la lista y suma el total
            if (inventory[i][j]==null){
                if(i==0)hotbarTotal++;
                positions.push("["+i+", "+j+"]");
                total++;
            }
        }
    }
    // devuelve resultados
    if (total==0) return "no hay ningun espacio vacio en el inventory";
    return "Hay "+ total +" espacios vacios en el inventory \n Posiciones: "+positions+"\n Numero de espacios vacios en el hotbar: "+ hotbarTotal;
}

function mostAbundantObject(){
    // creacion de objeto (array asosiativo)
    let totalObjects={"espada":0,"pico":0,"piedra":0,"manzana":0,"antorcha":0};
    let maxObject="espada";
    for(let i=0; i<inventory.length;i++){
        for(let j=0; j<inventory[i].length;j++) {
            //suma cantidades de objetos y las almacena en el objeto totalObjects
            for(let key in totalObjects){
                if (inventory[i][j]!=null && inventory[i][j].name==key) totalObjects[key]+=inventory[i][j].quantity;
            }
            
        }
    }
    //comprueba que objeto tiene mas  cantidad
    for(let key in totalObjects){
        if (totalObjects[key]>totalObjects[maxObject]) maxObject=key;
    }
    return "El objecto mas abundate es: "+maxObject+"\n con la cantidad: "+totalObjects[maxObject]
}


// inicializacion del array 'inventory'
let inventory = new Array(4).fill().map(x => new Array(9).fill(null));

inventory[0][0] = new Item("espada", "espada de diamante", 1,1);
inventory[0][8] = new Item("manzana", "manzana de casa", 64,64);
inventory[0][1] = new Item("pico", "pico de hierro", 1,1);
inventory[1][0] = new Item("piedra", "piedra de mina", 32,64);
inventory[2][0] = new Item("antorcha", "antorcha de mina", 33,64);
inventory[3][0] = new Item("piedra", "piedra de mina", 32,64);



let fin =false;
let pos1;
let pos2;
let namep;
let descp;
let quanp;
while (!fin){
    let operation =prompt("Inventario de Minecraft"+
                        "\n 1. Mostrar Inventario" +
                        "\n 2. Mostrar Hotbar" +
                        "\n 3. Buscar Objeto" +
                        "\n 4. Añadir Objeto" +
                        "\n 5. Mover Objeto" +
                        "\n 6. Eliminar Objeto" +
                        "\n 7. Mostrar Espacios Vacios" +
                        "\n 8. Mostrar Objeto mas Abundante" +
                        "\n 0. Salir");
    switch (operation)  {
        case "1":
            console.log(showFullInventory());
            break
        case "2":
            console.log(showHotbar());
            break
        case "3":
            console.log(objectSearch(prompt("nombre del item (espada, pico, piedra, manzana, antorcha)")));
            break
        case "4":
            namep = prompt("nombre del item (espada, pico, piedra, manzana, antorcha)").toLowerCase();
            descp = prompt("descripción del item");
            quanp = tryParseInt(prompt("cantidad del item"));
            console.log(objectAddition(namep,descp,quanp));
            break
        case "5":
            pos1 = prompt('Posicion de origen del item (escribir posicion separada por una coma ejemplo: "fila,columna")');
            pos2 = prompt('Posicion de destino del item (escribir posicion separada por una coma ejemplo: "fila,columna")');
            console.log(moveObejct(pos1,pos2));
            break
        case "6":
            pos1 = prompt('Posicion de eliminacion del item (escribir posicion separada por una coma ejemplo: "fila,columna")');
            console.log(removeObejct(pos1));
            break
        case "7":
            console.log(showEmptySpaces());
            break
        case "8":
            console.log(mostAbundantObject());
            break
        case "0":
            console.log("el Algoritmo a terminado");
            fin=true;
            break;
        default:
            alert("Error en la entrega, vuelve a intenar")
    }
}



