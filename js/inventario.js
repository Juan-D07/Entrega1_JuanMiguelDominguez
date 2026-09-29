let inventario = new Array(4).fill().map(x => new Array(9).fill("VACIO"))

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
}


function showFullInventory(){
    for(let i=0; i<inventario.length;i++){
        let fila = "[ "
        for(let j=0; j<inventario[i].length;j++) {
            if (inventario[i][j]=="VACIO"){
                fila=fila+" VACIO ";
            }
            else{
                fila=fila+inventario[i][j].name+" ";
            }
            if (j< inventario[i].length-1) fila=fila+"|";
        }
        console.log(fila+" ] \n");
    }
}

function showHotbar(){
    let fila = "[ "
        for(let j=0; j<inventario[0].length;j++) {
            if (inventario[0][j]=="VACIO"){
                fila=fila+" VACIO ";
            }
            else{
                fila=fila+inventario[0][j].name+" ";
            }
            if (j< inventario[0].length-1) fila=fila+"|";
        }
        console.log(fila+" ] \n");
}

function objectSearch(searchN){
    let availableNames=["espada","pico","piedra","manzana","antorcha"]
    if (!availableNames.includes(searchN.toLowerCase())) return "error en la entrada del nombre, volver a intentar";

    let positions=[];
    let quantity=0;
    let description;

    for(let i=0; i<inventario.length;i++){
        for(let j=0; j<inventario[i].length;j++) {
            if (inventario[i][j].name==searchN.toLowerCase()){
                positions.push(""+i+", "+j);
                quantity+=inventario[i][j].quantity;
                description=inventario[i][j].description
            }

        }
    }

    if (quantity==0) return "no hay ninguna "+searchN+" en el inventario";

    return "Hay "+ quantity +" " +searchN+"\n Descripcion: "+description+"\n Posiciones: "+positions;
}

function searchFreeSpace(){
    for(let i=0; i<inventario.length;i++){
        for(let j=0; j<inventario[i].length;j++) {
            if (inventario[i][j]=="VACIO") return [i,j];
        }
    }
    return "lleno";
}

function searchFreeSpace(nameS){
    for(let i=0; i<inventario.length;i++){
        for(let j=0; j<inventario[i].length;j++) {
            if (inventario[i][j].name==nameS && inventario[i][j].maxStack!=inventario[i][j].quantity) return [i,j];
        }
    }
    return "lleno";
}

function objectAddition(objN, objD, objQ){
    let availableNames=["espada","pico","piedra","manzana","antorcha"]
    if (!availableNames.includes(objN)) return "error en la entrada del nombre, volver a intentar";

    if (objN=="espada" || objN=="pico"){
        if(objQ!=1) return "error en la entrada, cantidad no es uno 1";
        let position=searchFreeSpace();
        if (position=="lleno") return "el inventario esta lleno";
        new Item(objN, objD, objQ,1);
    }
    else{
        if (objQ<0 || objQ>64) "error en la entrada, cantidad no esta entre 1 y 64";
        let position=searchFreeSpace(objN);
        while(position!="lleno"){
            
        }

    }

    return "objeto añadido o no hay espacio";
}

inventario[0][0] = new Item("espada", "espada de diamante", 1,1);

let fin =false;
while (!fin){
    let operacion =prompt("Inventario de Minecraft"+
                        "\n 1. Mostrar Inventario" +
                        "\n 2. Mostrar Hotbar" +
                        "\n 3. Buscar Objeto" +
                        "\n 4. Añadir Objeto" +
                        "\n 0. Salir");
    switch (operacion)  {
        case "1":
            showFullInventory();
            break
        case "2":
            showHotbar();
            break
        case "3":
            console.log(objectSearch(prompt("nombre del item (espada, pico, piedra, manzana, antorcha)")));
            break
        case "4":
            let name = prompt("nombre del item (espada, pico, piedra, manzana, antorcha)").toLowerCase();
            let desc = prompt("descripción del item");
            let quan = Number(prompt("cantidad del item"));
            console.log(objectAddition(name,desc,quan));
            break
        case "0":
            console.log("el Algoritmo a terminado");
            fin=true;
            break;
        default:
            alert("Error en la entrega, vuelve a intenar")
    }
}



