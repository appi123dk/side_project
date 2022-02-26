const clockContainer = document.querySelector(".js-clock"),
      clockTitle = clockContainer.querySelector("h1");

function getTime() {
    const date = new Date(),
          hour = (date.getHours() < 10 ? "0" : "") + date.getHours(),
          min = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
        //   sec = (date.getSeconds() < 10 ? "0" : "") + date.getSeconds();

    clockTitle.innerText = `${hour}:${min}`;
}

(function(){
    // setInterval(getTime, 1000);
    setInterval(() => {
        getTime();
    }, 1000);
    
})();