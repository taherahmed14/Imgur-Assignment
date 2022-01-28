//Promise
let count = 1;
getProductData(count);

function getProductData(count) {
    console.log(+count);
    try {
        fetch(`https://api.giphy.com/v1/gifs/trending?api_key=pj0ZumFzpsJBcBEHZNEyDVZjxo19I5Jy&offset=${count}&limit=20`)
        .then((d) => d.json())
        .then((res) => {
            showImages(res.data);
        })
    }
    catch(e){
        console.log(e.message);
    }
}

function getQueryProductData(query) {
    try {
        fetch(`https://api.giphy.com/v1/gifs/search?q=${query}&api_key=pj0ZumFzpsJBcBEHZNEyDVZjxo19I5Jy&limit=20`)
        .then((d) => d.json())
        .then((res) => {
            searchquery.value = "";
            showImages(res.data);
        })
    }
    catch(e){
        console.log(e.message);
    }
}

let viralContainer = document.getElementById("viralContainer"); 
let displayContainer = document.getElementById("displayContainer");

function showImages(images) {
    window.scrollTo(0, 0);
    displayContainer.innerHTML = null;
    viralContainer.innerHTML = null;
    images.forEach((image) => {
        let imgDiv = document.createElement("div");

        let imgCont = document.createElement("img");
        imgCont.src = image.images.original.url;
        imgDiv.setAttribute("class", "imgDiv");
        imgCont.setAttribute("class", "imgCont");

        let imgTitle = document.createElement("div");
        imgTitle.textContent = image.title;
        imgTitle.setAttribute("class", "imgTitle");

        imgDiv.onclick = () => {
            displayContainer.innerHTML = null;
            showGifDetail(image);
        };
        
        imgDiv.append(imgCont, imgTitle);
        viralContainer.append(imgDiv);
    });
}

function showGifDetail(image) {
    window.scrollTo(0, 0);
    let imgDiv = document.createElement("div");
    imgDiv.setAttribute("class", "imgDescDiv");

    let imgTitle = document.createElement("div");
    imgTitle.textContent = image.title;
    imgTitle.setAttribute("class", "imgDescTitle");

    let imgCont = document.createElement("img");
    imgCont.src = image.images.original.url;
    imgCont.setAttribute("class", "imgDescCont");

    imgDiv.append(imgTitle, imgCont);
    displayContainer.append(imgDiv);
}

let logo = document.getElementById("logo");

logo.onclick = () => {
    getProductData();
};

//Debounce 

let searchquery = document.getElementById("searchquery");
let dropDown = document.getElementById("dropDown");
let time;

searchquery.oninput = () => {
    if(time) {
        clearTimeout(time);
    }
    
    time = setTimeout(() => {
        let query = searchquery.value;
        getQuery(query);
    }, 2000);
};

function getQuery(query) {
    try {
        fetch(`https://api.giphy.com/v1/gifs/search?q=${query}&api_key=pj0ZumFzpsJBcBEHZNEyDVZjxo19I5Jy&limit=4`)
        .then((d) => d.json())
        .then((res) => {
            displayDropDown(res.data);
        })
    }
    catch(e){
        console.log(e.message);
    }
}

function displayDropDown(data) {
    dropDown.innerHTML = null;
    data.forEach((res) => {
        let searchDiv = document.createElement("div");
        searchDiv.setAttribute("class", "searchDiv");

        let searchTitle = document.createElement("div");
        searchTitle.textContent = res.title;

        searchDiv.onclick = () => {
            dropDown.innerHTML = null;
            let query = searchquery.value;
            getQueryProductData(query);
        }
        
        searchDiv.append(searchTitle);
        dropDown.append(searchDiv);
    });
}

let prevBtn = document.getElementById("prevBtn");
let nextBtn = document.getElementById("nextBtn");

prevBtn.onclick = () => {
    if(count === 1) {
        prevBtn.disabled = true;
    }
    else {
        prevBtn.disabled = false;
        count = count - 20;
        getProductData(count);
    }
};

nextBtn.onclick = () => {
    count = count + 20;
    getProductData(count);
};

