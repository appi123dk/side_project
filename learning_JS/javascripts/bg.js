const body = document.querySelector("body"),
      numOfImages = 3;

function getRandom(numOfImages) {
    return Math.floor(Math.random() * numOfImages) + 1;
}

function handleImageLoad(img) {
    img.classList.add("bgImage");
    body.prepend(img);
}

function paintImage(randomNum) {
    // const img = new Image();
    // img.src = `./images/${randomNum}.jpg`;
    // img.addEventListener('load', handleImageLoad(img));
    body.style.backgroundImage = `url('https://images.unsplash.com/photo-1500829243541-74b677fecc30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxOTcxMjJ8MHwxfHNlYXJjaHw0fHxuYXR1cmV8ZW58MHwwfHxibGFja3wxNjE4NDY3NzQ2&ixlib=rb-1.2.1&q=80&w=1080')`;
    console.log(body);
}

function init() {
    const randomNum = getRandom(numOfImages);
    paintImage(randomNum);
}

init();
