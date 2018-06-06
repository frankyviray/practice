const assortment = require("./data/assortment1.json");

console.log(assortment);

// RETRIEVES CATEGORIES FROM JSON
let categories = [];

const categoriesArr = assortment.map(function(assortment) {
    return (
        {
            category: assortment.category,
            class: assortment.class
        }
    )
})

// REMOVES DUPLICATE CATEGORIES
function removeDuplicates(myArr, prop) {
    return myArr.filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
}

categories = removeDuplicates(categoriesArr,"category");
// console.log(categories);

// PRINTS EACH CATEGORY TO SIDE BAR
function getCategories() {
    categories.forEach(function(category) {
        
        categoryName = category.category.charAt(0).toUpperCase() + category.category.substr(1);

        $("#category-list").append(`
            <li class="category list-group-item" data=${category.class}>${category.class} - ${categoryName}</li>
        `)
    })
}

var results = [];

// PRINTS EACH ITEM TO RESULTS
function getItemsByCategory(num) {
    $("#category-result").empty();
    for (var i = 0; i < assortment.length; i++) {
        if ( num == assortment[i].class) {
            results.push(assortment[i]);
            var table = `
                <tr class="product" data=${assortment[i].item_no}>
                    <td scope="row">
                        <img src=${assortment[i].image} style="width: 75px; height: 75px;"</img>
                    </td>
                    <td>${assortment[i].item_no}</td>
                    <td>${assortment[i].item}</td>
                </tr>
            `
            $("#category-result").append(table);
        }
    }
}

let selectedProduct;

function getItemByItemNum(itemNum) {
    for (var i = 0; i < assortment.length; i++) {
        if ( itemNum == assortment[i].item_no ) {
            selectedProduct = assortment[i];
        }
    }
    $("#wrapper").empty();
    $("#wrapper").html(`
        <div class="container">
            <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">${selectedProduct.item}</div>
                    <div class="card-body">
                    <div class="row">    
                        <div class="col-6">${selectedProduct.description}</div>
                        <div class="col-6"><img src=${selectedProduct.image}></img></div>
                    </div>
                    <div class="row">
                        <p>Item#: ${selectedProduct.item_no}</p>
                    </div>
                    <div class="row">
                        <p>Description: ${selectedProduct.short_desc}</p>
                    </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    `)
}

// EVENT LISTENERS

// ON LOAD
$(document).ready(function() {
    getCategories();
})

// CATEGORY BUTTON CLICK
$(document).on("click", ".category", function() {
    let selectedCat = $(this).attr("data");
    getItemsByCategory(selectedCat);
})

$(document).on("click", ".product", function() {
    let itemNum = $(this).attr("data");
    getItemByItemNum(itemNum);


})
