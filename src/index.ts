let NEXTORDERID = 1

type Pizza = {
    name: string,
    price: number,
}

type Order = {
    id: number,
    pizza: Pizza,
    status: string,
}

const menu: Pizza[] = [
    { name: "Margherita", price: 8 },
    { name: "Pepperoni", price: 10 },
    { name: "Hawaiian", price: 10 },
    { name: "Veggie", price: 9 },
];

let cashInRegister = 100;

const orderQueue: Order[] = [];

function addNewPizza(pizzaObj: Pizza) {
    menu.push(pizzaObj);
}

function placeOrder(pizzaName: string) {
    const pizzaItem = menu.find((item) => item.name === pizzaName);

    if (!pizzaItem) {
        console.error(`${pizzaName} does not exist in the menu`)
        return
    }

    cashInRegister += pizzaItem.price;
    const orderObj: Order = { id: NEXTORDERID++, pizza:pizzaItem, status: "ordered" };
    orderQueue.push(orderObj);
    return orderObj;
}

function completeOrder(orderId: number) {
    const orderObj = orderQueue.find((item) => item.id === orderId);
    if (orderObj) orderObj.status = "completed";
    return orderObj;
}

addNewPizza({ name: "Chicken Bacon Ranch", price: 12 })
addNewPizza({ name: "BBQ Chicken", price: 12 })
addNewPizza({ name: "Spicy Sausage", price: 12 })

placeOrder("Chicken Bacon Ranch")

completeOrder(1)

console.log("Menu:", menu);
console.log("Cash in register:", cashInRegister);
console.log("Order queue:", orderQueue);