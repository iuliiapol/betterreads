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

// popper code starts
let num_revs = value_arr.length;

const freq_map = value_arr.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
console.log(freq_map);
let max_freq;

for (let [key, value] of freq_map) {
    max_freq = (!max_freq || max_freq < value) ? value : max_freq;
}
console.log(max_freq);
const height_max = 100;
let i = 0.5;
let str_i = '';
let calc_height = 0;
let item_freq = 0;
let freq_perc = 0;

for (let y = 0; y < 10; y++) {
    str_i = i.toString();
    console.log(str_i);

    if (!freq_map.has(i)) {
        console.log("Map doesn't have this value " + i);
        i += 0.5;
        continue;
    }

    console.log("Map has value of " + i);

    item_freq = freq_map.get(i); //returns current frequency
    console.log("Item frequency of" + i + " is " + item_freq);
    calc_height = (item_freq * height_max) / max_freq;
    console.log(calc_height);

    //set height of the bar to be
    document.getElementById(`bar_${y}`).style.height = `${calc_height}px`;

    //set frequency value item_freq to be number of reviews
    document.getElementById(`num_${y}`).textContent = `${item_freq}`;

    //calculate percentage of that reviews 
    freq_perc = Math.round(((item_freq * 100) / num_revs));
    document.getElementById(`per_${y}`).textContent = `${freq_perc}%`;
    console.log(document.getElementById(`per_${y}`));
    console.log(freq_perc + "%");

    i += 0.5;
}

for (let y = 0; y <= 9; y++){
    console.log("Current popper bar is " + y);
    const bar = document.querySelector(`#bar_${y}`);
    const tooltip = document.querySelector(`#tooltip_${y}`);
    console.log(tooltip);

    //code for poppers
    const popperInstance = Popper.createPopper(bar, tooltip, {
        modifiers: [
            {
                name: 'offset',
                options: {
                    offset: [0, 8],
                },
            },
        ],
        placement: 'top',
    });

    function show() {
        // Make the tooltip visible
        tooltip.setAttribute('data-show', '');

        // Enable the event listeners
        popperInstance.setOptions((options) => ({
            ...options,
            modifiers: [
                ...options.modifiers,
                { name: 'eventListeners', enabled: true },
            ],
        }));

        // Update its position
        popperInstance.update();
    }

    function hide() {
        // Hide the tooltip
        tooltip.removeAttribute('data-show');

        // Disable the event listeners
        popperInstance.setOptions((options) => ({
            ...options,
            modifiers: [
                ...options.modifiers,
                { name: 'eventListeners', enabled: false },
            ],
        }));
    }

    const showEvents = ['mouseenter', 'focus'];
    const hideEvents = ['mouseleave', 'blur'];

    showEvents.forEach((event) => {
        bar.addEventListener(event, show);
    });

    hideEvents.forEach((event) => {
        bar.addEventListener(event, hide);
    });
}

// popper code ends


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