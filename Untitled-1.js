let table = document.querySelector("table");
let scoreH1 = document.querySelector("#score")
let score = 0
let btn = document.getElementById("rep")
scoreH1.innerText = score
let obj = {x:0,y:0}
let eat = {x: rand () , y: rand ()}
function rand () {return Math.floor(Math.random() * 20)}

for (let i = 0 ; i < 20 ; i++) {
    let tr = document.createElement("tr")
    table.append(tr)
    for (let j = 0; j < 20 ; j++) {
        let td = document.createElement("td")
        tr.append(td)
    }
}
function styleCSS (x , y , color) {document.querySelectorAll("tr")[x].querySelectorAll("td")[y].style.background = `${color}`}
function ListNode (X , Y , next) {
    this.x = X
    this.y = Y 
    this.next = next
}
class LinkedList {
    constructor (head) {
        this.head = head 
    }
    inseart (x , y) {
        this.head = new ListNode (x , y , this.head)
    }
}
let ll = new LinkedList()
ll.inseart(rand () , rand ()) 
document.addEventListener("keydown" , event => {
    if (event.key.startsWith("Arrow")) {
        controle(event)
    }
})
function move (node) {
    let GO = GameOver(node)
    if (GO == false) {
        while (node) {
            styleCSS (node.x , node.y , "white")
            node = node.next
        }
        styleCSS (rand (), rand() , "red")
        styleCSS (rand() , rand() , "blue")
        return 
    }
    let header = new ListNode (node.x , node.y , node)
    header = header.next
    let oldX = header.x , oldY = header.y 
    styleCSS (header.x , header.y , "white")
    header.x += obj.x 
    header.y += obj.y 
    header = header.next
    while (header) {
        styleCSS (header.x , header.y , "white")
        let x1 = header.x , x2 = header.y
        header.x = oldX
        header.y = oldY
        oldX = x1; oldY = x2
        header = header.next
    }
    Snake (node)
    setTimeout (() => {
        toEat (ll.head)
        move (ll.head)
    },500)
}
function controle (event) {
    switch (event.key) {
        case "ArrowUp" : 
            obj.x = -1
            obj.y = 0
            break
        case "ArrowDown":
            obj.x = 1
            obj.y = 0
            break
        case "ArrowLeft": 
            obj.y = -1
            obj.x = 0
            break
        case "ArrowRight":
            obj.y = 1
            obj.x = 0
            break
    }
}
function Snake (node) {
    while (node) {
        styleCSS (node.x , node.y , "red")
        node = node.next
    }
}
function toEat (node) {
    if (eat.x == node.x && eat.y == node.y) {
        eat.x = rand ()
        eat.y = rand ()
        ll.inseart(node.x + obj.x , node.y + obj.y)
        score++
        scoreH1.innerText = score
    }
    styleCSS (eat.x , eat.y , "blue")

}
move (ll.head)
function GameOver (node) {
    let header = new ListNode (0, 0 , node)
    header = header.next
    let data = node
    let boll = false 
    let headX = node.x 
    let headY = node.y
    node = node.next
    while (node) {
        if (node.x == headX && node.y == headY){boll = true ; break}
        node = node.next
    }
    if (data.x == -1 || data.y == -1 || data.x == 20 || data.y == 20 || boll) {
        obj.x = 0; obj.y = 0
        styleCSS (eat.x , eat.y , "white")
        return false
    }
}