var orders = [
    { amount: 100 },
    { amount: 450 },
    { amount: 230 },
    { amount: 40 }
];


var totalAmount = orders.reduce(function ( sum , order ) {
    console.log(order);
    console.log(sum);
    return sum + order.amount;
}, 0 );

console.log(totalAmount);
      
