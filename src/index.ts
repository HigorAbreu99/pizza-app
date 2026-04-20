let NEXTORDERID = 1;
let NEXTPIZZAID = 1;

type Pizza = {
    id: number;
    name: string;
    price: number;
};

type Order = {
    id: number;
    pizza: Pizza;
    status: "ordered" | "completed";
};

const menu: Pizza[] = [
    { id: NEXTPIZZAID++, name: "Margherita", price: 8 },
    { id: NEXTPIZZAID++, name: "Pepperoni", price: 10 },
    { id: NEXTPIZZAID++, name: "Hawaiian", price: 10 },
    { id: NEXTPIZZAID++, name: "Veggie", price: 9 },
];

let cashInRegister = 100;

const orderQueue: Order[] = [];

function addNewPizza(pizzaObj: Omit<Pizza, "id">): Pizza {
    const newPizza = {
        id: NEXTPIZZAID++,
        ...pizzaObj,
    };
    menu.push(newPizza);
    return newPizza;
}

function placeOrder(pizzaName: string): Order | undefined {
    const pizzaItem = menu.find((item) => item.name === pizzaName);

    if (!pizzaItem) {
        console.error(`${pizzaName} does not exist in the menu`);
        return;
    }

    cashInRegister += pizzaItem.price;
    const orderObj: Order = {
        id: NEXTORDERID++,
        pizza: pizzaItem,
        status: "ordered",
    };
    orderQueue.push(orderObj);
    return orderObj;
}

function completeOrder(orderId: number): Order | undefined {
    const orderObj = orderQueue.find((item) => item.id === orderId);
    if (orderObj) orderObj.status = "completed";
    return orderObj;
}

function getPizzaDetail(identifier: string | number): Pizza | undefined {
    if (typeof identifier === "string") {
        return menu.find(
            (item) => item.name.toLowerCase === identifier.toLowerCase,
        );
    } else if (typeof identifier === "number") {
        return menu.find((item) => item.id === identifier);
    } else {
        console.error("Invalid identifier type");
    }
}

addNewPizza({ name: "Chicken Bacon Ranch", price: 12 });
addNewPizza({ name: "BBQ Chicken", price: 12 });
addNewPizza({ name: "Spicy Sausage", price: 12 });

placeOrder("Chicken Bacon Ranch");
placeOrder("Pepperoni");
completeOrder(1);
placeOrder("Anchovy");
placeOrder("Veggie");
completeOrder(2);

console.log("Menu:", menu);
console.log("Cash in register:", cashInRegister);
console.log("Order queue:", orderQueue);
