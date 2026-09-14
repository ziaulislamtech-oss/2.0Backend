"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let name = 'Zia Ul Islam';
let age = 25;
let isActive = true;
let skills = ["react", "ts"];
let score = [25, 83];
let point = [10, 2];
let user = ["zia", 25];
let danger = 'hello';
danger = danger.toUpperCase();
console.log(danger);
let safe = 2;
if (typeof safe === 'string') {
    console.log(`${safe} you are safe`);
}
else {
    console.log(`${safe} you are not safe`);
}
function logMessage(msg) {
    console.log(msg);
}
logMessage('zia this is my message');
function add(num1, num2) {
    return num1 + num2;
}
console.log(add(8, 3));
// optional params
function greet(name, greeting) {
    return `${greeting ?? 'hello'} ${name} how are you `;
}
console.log(greet('zia ul islam', 'Good Morning'));
function createUser(name, role = 'viewer') {
    return { name, role };
}
console.log(createUser('ziaulislam'));
//# sourceMappingURL=index.js.map