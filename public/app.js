let numberOfPurchases = document.querySelector(".numberOfPurchases");
const incrementBtn = document.getElementById("increment");
const decrementBtn = document.getElementById("decrement");
let counterResult = document.getElementById("counterResult");
const addToCartIndex = document.querySelector(".addToCartButton");
const addToCartDetail = document.getElementById("addToCart-button");
const reviewForm = document.querySelector(".review-form");
const addReviewBtn = document.getElementById("add-review-btn");
const submitReviewBtn = document.getElementById("add-review-btn");



if (addToCartIndex) {
    addToCartIndex.addEventListener("click", function() {
        numberOfPurchases.textContent = parseInt(numberOfPurchases.textContent) + 1;
    });
}

if (incrementBtn) {
    incrementBtn.addEventListener("click", function() {
        counterResult.textContent = parseInt(counterResult.textContent) + 1;
    });
}

if (decrementBtn) {
    decrementBtn.addEventListener("click", function() {
        if (counterResult.textContent > 0) {
            counterResult.textContent = parseInt(counterResult.textContent) - 1;
        }
    });
}

if (addToCartDetail) {
    addToCartDetail.addEventListener("click", function() {
        numberOfPurchases.textContent =
            parseInt(numberOfPurchases.textContent) +
            parseInt(counterResult.textContent);
    });
}

if (addReviewBtn) {
    addReviewBtn.addEventListener("click", function() {
        reviewForm.classList.remove("submit-review");
        reviewForm.classList.add("show-review");
    });
}

function checkMaxChar() {
    stringLength = document.getElementById("inputReview").value.length;
    if (stringLength > 500) {
        document.getElementById("warning").innerText = "Maximum characters are 500";
    } else {
        document.getElementById("warning").innerText = "";
    }
}

function checkNoChar() {
    stringLength = document.getElementById("inputReview").value.length;
    if (stringLength == 0) {
        document.getElementById("warning").innerText = "Please type your review";
        return false;
    } else {
        document.getElementById("warning").innerText = "";
        return true;
    }
}

function countChars(obj) {
    document.getElementById("charNum").innerHTML = obj.value.length + "/500";
}


function ShowDes() {
    var des = document.getElementById('des');
    des.style.display = 'block';
    var rev = document.getElementById('Reviews');
    rev.style.display = 'none';

    var desBtn = document.getElementById('desBtn');
    var revBtn = document.getElementById('revBtn');
    revBtn.style = "background: none";
    desBtn.style = "background: block";

}

async function ShowRev(meal_id) {
    var rev = document.getElementById('Reviews');
    rev.style.display = 'block';
    var des = document.getElementById('des');
    des.style.display = 'none';

    var desBtn = document.getElementById('desBtn');
    var revBtn = document.getElementById('revBtn');
    desBtn.style = "background: none";
    revBtn.style = "background: block";
    revBtn.style = "background-color: #ffaa00";

    const response = await fetch(`/${meal_id}/reviews` + text);
    if (response.ok)
        document.querySelector("#searchResult").innerHTML = await response.text()
}

function submitReview() {
    reviewForm.classList.add("submit-review");
}