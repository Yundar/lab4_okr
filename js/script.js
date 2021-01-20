import Home from "./home.js";
import Main from "./main.js";
import Cart from "./cart.js";
import Router from "./router.js";
import Action from "./action.js";
import Coffee from "./coffee.js";
import Dessert from "./dessert.js";
import Product from "./product.js";


// menu.onclick = function myFunction() {
// 	var x = document.getElementById('myTopnav');

// 	if (x.className === "topnav"){
// 		x.className += " responsive";
// 	}
// 	else{
// 		x.className = "topnav"
// 	}
// }

const requestURL = "https://my-json-server.typicode.com/Yundar/lab4_okr/db";

export async function getData(){

    let response = await fetch(requestURL)

    if (response.ok) {
        let json = await response.json();
        return json;
    }

    throw new Error(response.status);
};

export function sendRequest(method, url, body=null) {
    return fetch(url, {method: method, body: body}).then(response => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response.json()
    })
    .catch(error => {
        console.log(error);
    });
}

export function ShowPreLoader(){
    return `
        <div class="preloader">
            <svg class="preloader__image" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path fill="currentColor"
                    d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51
                    0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48
                    21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0
                    229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49
                    48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49
                    48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48
                    48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z">
                </path>
            </svg>
        </div>
    `
}

async function init_end_points(){

    let data = await getData();

    let products_end_points = [];
    let actions_end_points = [];
    let cart_end_points = [];

    data.products.forEach(product => {
        products_end_points.push(product.url);
    })
    
    data.actions.forEach(action => {
        actions_end_points.push(action.url)
    })

    cart_end_points = products_end_points.slice();
    cart_end_points.push("clear");

    return {actions_end_points, orders_end_points, cart_end_points}
}

let cart = new Cart();
let home = new Home();
let action = new Action();
let coffePage = new Coffee();
let dessertPage = new Dessert();


let main = new Main([cart, home, action, order, coffePage, dessertPage], home);

(async function() {

    let end_points = await init_end_points();  

    new Router(end_points, main);
    main.loadDefaultPage();

})();