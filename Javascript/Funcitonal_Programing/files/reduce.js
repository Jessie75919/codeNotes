var orders = [
    {amount: 10, price: 500},
    {amount: 40, price: 200},
    {amount: 20, price: 450},
    {amount: 40, price: 100}
];


// var totalAmount = orders.reduce (function (sum, order)
// {
//     console.log (order);
//     console.log (sum);
//     return sum + order.amount;
// }, 0);
//
// console.log (totalAmount);

var reduceDemo = orders.reduce (function (total, ord)
{
    console.log(total);
    return total += ord.amount * ord.price;
},0);

console.log(reduceDemo);


