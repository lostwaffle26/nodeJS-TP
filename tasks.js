let i = 0;
console.log('A')
//setInterval(() => console.log(`i = ${i++}`), 0);
setTimeout(() => console.log('B'), 5000);
setImmediate(() => console.log(`setImmediate i: ${i++}`));
process.nextTick(incAndShowI());
console.log('C');

function incAndShowI(){
    console.log(`process.nextTick i: ${i++}`)
    incAndShowI();
}