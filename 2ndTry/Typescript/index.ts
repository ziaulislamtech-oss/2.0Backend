let name : string = 'Zia Ul Islam' 
let age : number = 25
let isActive : boolean = true

let skills :string[] = ["react","ts"] 
let score : Array<number> = [25,83]

let point : [number,number] = [10,2]
let user : [string,number] = ["zia",25]

let danger : any = 'hello' 
 danger = danger.toUpperCase()
console.log(danger)

let safe : unknown =  2

if(typeof safe === 'string'){
    console.log(`${safe} you are safe`)
}else{
    console.log(`${safe} you are not safe`)
}

function logMessage(msg:string) : void{
    console.log(msg)
}

logMessage('zia this is my message')

function add(num1 : number, num2 : number) : number{

    return num1 + num2
}

console.log(add(8,3))


// optional params

function greet(name : string, greeting?:string) : string{

    return`${greeting ?? 'hello'} ${name} how are you `
}

console.log(greet('zia ul islam','Good Morning'))


function createUser(name:string,role:string = 'viewer'){
    return {name,role}
}

console.log(createUser('ziaulislam','developer'))