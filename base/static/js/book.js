let myRating = jSuites.rating(document.getElementById('rating'), {
    value: 0,
    tooltip: [ 'Very bad', 'Bad', 'Average', 'Good', 'Very good' ],
});

let reviews = document.getElementsByClassName('review');
console.log(typeof reviews);
console.log(reviews.length);

// IMPORTANT: Adds ids to divs in like_stats section for easier coding. Ids start from 0
for (let i = 0; i < reviews.length; i++) {
    document.getElementsByClassName('like_stats')[i].setAttribute('id',`${i}`);
    document.getElementsByClassName('like_button')[i].setAttribute('id', `like_${i}`);
    document.getElementsByClassName('num_likes')[i].setAttribute('id', `counter_${i}`);
    document.getElementsByClassName('like_rev')[i].setAttribute('id', `likedrev_${i}`);
    document.getElementById(`like_${i}`).addEventListener('click', testFunction);
}

let ratings = document.getElementsByClassName('rev_rating');
console.log(ratings);
console.log(typeof ratings);
console.log(ratings.length);
let test = Object.values(ratings);
console.log(test[0]);

let value_arr = [];
//turns decimal rating into stars
for (let i = 0; i < test.length; i++) {
    let rating_val = test[i].innerHTML;
    value_arr.push(parseFloat(test[i].innerHTML));
    let str = drawStars(rating_val);
    document.getElementsByClassName('rev_rating')[i].innerHTML = str;
    console.log(value_arr);
}

function testFunction() {
    let click_id = this.id;
    let element = document.getElementById(`${click_id}`);
    element.style.background = `url('https://api.iconify.design/ant-design/heart-filled.svg?color=%232c3c6c') no-repeat center center / contain`;

    let parent_id = element.parentNode.id;
    document.querySelector('#likedrev_' + `${parent_id}`).innerHTML = "Liked review";
    
    let num_rev = parseInt(document.querySelector('#counter_'+ `${parent_id}`).innerHTML);
    console.log("number of likes is " + num_rev);
    num_rev += 1;

    if (num_rev === 1) {
        document.querySelector('#counter_'+ `${parent_id}`).innerHTML = num_rev+ " like";
    } else {
        document.querySelector('#counter_'+ `${parent_id}`).innerHTML = num_rev+ " likes";
    }

    element.removeEventListener('click', testFunction);
    element.addEventListener('click', removeLike);
    console.log(this.id);
    console.log(typeof this.id);
}

function removeLike() {
    console.log("removeLike is called");
    let click_id = this.id;
    let element = document.getElementById(`${click_id}`);
    element.style.background = `url('https://api.iconify.design/ant-design/heart-outlined.svg?color=%232c3c6c') no-repeat center center / contain`;

    let parent_id = element.parentNode.id;
    document.querySelector('#likedrev_' + `${parent_id}`).innerHTML = "Like review";
    
    let num_rev = parseInt(document.querySelector('#counter_'+ `${parent_id}`).innerHTML);
    console.log("number of likes is " + num_rev);
    num_rev -= 1;
    
    if (num_rev === 1) {
        document.querySelector('#counter_'+ `${parent_id}`).innerHTML = num_rev+ " like";
    } else {
        document.querySelector('#counter_'+ `${parent_id}`).innerHTML = num_rev+ " likes";
    }

    element.removeEventListener('click', removeLike);
    element.addEventListener('click', testFunction);
}

//supporting functions
function drawStars(value) {
    let isWhole = false;
    let whole_val = Math.floor(value);
    let str = '';

    if (value == whole_val) {
        isWhole = true;
    }

    for (let i = 0; i < whole_val; i++) {
        str += '★';
    }

    if (isWhole == false) {
        str += '1/2';
    }

    return str;
}