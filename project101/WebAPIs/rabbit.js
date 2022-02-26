const searchBtn = document.querySelector('.rabbit-btn');
const rabbit = document.querySelector('.rabbit');

searchBtn.addEventListener('click', (e) => {
  rabbit.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
  });
});