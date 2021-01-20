import {getData} from "./script.js";
import {ShowPreLoader} from "./script.js";

export default class Tea {
    constructor() {
        this.route = "tea"
        this.content = document.getElementById("content")

        this.products
    }

    loadPage(hash = null) {
        this.loadCatalogPage(hash);
        return true;
    }

    async loadCatalogPage(hash = null) {
        this.content.innerHTML = ShowPreLoader();

        let data = await getData();
        let products = data.products;

        this.content.innerHTML = `
        <div class="product-list-wrapper">  
            <div class="product-list" style="position: relative">
                ${this.loadCatalog(products)}
            </div>
        </div>
        `
    }

    loadCatalog(catalog) {
        let catalog_content = '';

        catalog.forEach(tea => {
            if(tea.type == "tea"){
                catalog_content += `
                <div class="product-block">
                    <div class="product-block__image">
                        <img src="${tea.image}" alt="image">
                    </div>
                    <div class="product-block__description">
                        <div class="product-block__title-row">
                            <a class="product-block__title-text">${tea.title}</a>
                        </div>
                        <div class="product-block__price-row">
                            <div class="product-block__price-block">
                                <div>
                                    <span class="product-block__price">${tea.price}</span>
                                    <span class="product-block__currency">грн</span>
                                </div>
                            </div>
                            <div class="product-block__btn-wrap">
                                <button type="button" class="product-block__cart-button">В корзину</button>
                            </div>
                        </div>
                    </div>
                </div>`;
            }
            
        });

        return catalog_content;
    }
}