let matriz = new Array(4).fill().map(x => new Array(9).fill(0))


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
        console.log("Nombre: "+ Item.name + "\n Descripcion: "+ Item.description + "\n Quantity: "+ Item.quantity +"\n maxStack: "+ Item.maxStack);
    }
    
}


let espada = new Item("Espada", "espada de diamante", 1,1);
console.log(espada.showInfo())

let fin =false;
while (!fin){
    let operacion =prompt("selecciona tu operacion por su numero \n 1. Suma \n 0. Salir", "Escribe solo el numero");
    switch (operacion)  {
        case "1":
            alert(suma(num1,num2));
            break
        case "0":
            console.log("el Algoritmo a terminado");
            fin=true;
            break;
        default:
            alert("Error en la entrega, vuelve a intenar")
    }
}



