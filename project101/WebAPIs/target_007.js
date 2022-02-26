const span = document.querySelector('span');
const horizontalLine = document.querySelector('.horizontal');
const verticalLine = document.querySelector('.vertical');

const centerOfWidth = window.innerWidth/2;
const centerOfHeight = window.innerHeight/2;

const obj = {
  name: "bush",
  age: 27,
  female: true
}

console.log(obj);
console.table(obj);

document.addEventListener('mousemove', (e) => {
  const pageX = e.pageX;
  const pageY = e.pageY;
  moveSpanToLocation(pageX, pageY);
  printLocation(pageX, pageY)
  drawLine(pageX, pageY);
});

function moveSpanToLocation(x, y) {
  // console.time('move location time : ')
    console.trace();
    span.style.transform = `translate(${x + 20 - centerOfWidth}px, ${y + 20 - centerOfHeight}px)`
  // console.timeEnd('move location time : ')
  // span.style.left = `${x + 20}px`;
  // span.style.top = `${y + 20}px`;
}

function printLocation(x, y) {
  span.innerHTML = `x: ${x}, y: ${y}`;
}

function drawLine(x, y) {
  verticalLine.style.transform = `translate(${x - centerOfWidth}px, 0px)`
  horizontalLine.style.transform = `translate(0px, ${y - centerOfHeight}px)`
  // verticalLine.style.left = `${x}px`;
  // horizontalLine.style.top = `${y}px`;
}
