function printLocation(e) {
  const target = e.target;
  console.log(`Client X : ${e.clientX}, Client Y : ${e.clientY}`);
  console.log(`pageX : ${e.pageX}, pageY : ${e.pageY}`);
  console.log(target.getBoundingClientRect());
}

document.addEventListener('click', printLocation)

// window.addEventListener('DOMContentLoaded', () => {
  const btnScrollBy = document.querySelector('.scroll-by');
  const btnScrollTo = document.querySelector('.scroll-to');
  const btnScrollSpecial = document.querySelector('.scroll-special');

  btnScrollBy.addEventListener('click', (e) => {
    window.scrollBy({
      top: 100,
      behavior: 'smooth'
    });
  })

  btnScrollTo.addEventListener('click', (e) => {
    window.scrollTo(0, 100);
  });

  btnScrollSpecial.addEventListener('click', (e) => {
    const specialElem = document.querySelector('.special');
    specialElem.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });

  });

// });

// only Document loaded 
window.addEventListener('DOMContentLoaded', () => {

});

// CSS, IMAGE all loaded
window.addEventListener('load', () => {

});

// resource being unloaded
window.addEventListener('unload', () => {

});

// before unloaded
window.addEventListener('beforeunload', () => {

});