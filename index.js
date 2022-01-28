// checks if element passed to it is "active" or not. Returns a boolean value
const active = element => element.classList.contains('active-block');
// changes which text is "active" to the left
function changeIndexLeft(texts) {
  let index = 0;
  for (let i = 0; i < texts.length; i++) {
    if (active(texts[i])) index = i;
  }
  for (let i = 0; i < texts.length; i++) {
    if (index === 0 && i === index) {
      texts[i].classList.toggle('active-block');
      texts[texts.length - 1].classList.toggle('active-block');
    } else if (i === index && index !== 0) {
      texts[i].classList.toggle('active-block');
      texts[i - 1].classList.toggle('active-block');
    }
  }
}
// changes which image is "active" to the right
function changeIndexRight(texts) {
  // coffeeShops.forEach((img, i) => img.style.display = obj.num === i ? 'block' : 'none');
  let index = 0;
  for (let i = 0; i < texts.length; i++) {
    if (active(texts[i])) index = i;
  }
  for (let i = 0; i < texts.length; i++) {
    if (index === texts.length - 1 && i === index) {
      texts[i].classList.toggle('active-block');
      texts[0].classList.toggle('active-block');
    } else if (i === index && index !== texts.length - 1) {
      texts[i].classList.toggle('active-block');
      texts[i + 1].classList.toggle('active-block');
    }
  }
}

// waiting until everything has loaded to run the function that places cards where they
// should be
document.addEventListener('readystatechange', event => {
  if (document.readyState === 'complete') {
    // variables we will need
    const intro = document.getElementById('intro-card');
    const sunglassesImg = document.querySelector('#dog-sunglasses img');
    const pugImg = document.querySelector('#pug-jacket img');
    const jacketImg = document.querySelector('#dog-jacket-glasses img');
    const sunglasses = document.querySelector('#dog-sunglasses');
    const pug = document.querySelector('#pug-jacket');
    const jacket = document.querySelector('#dog-jacket-glasses');
    const rightbtns = document.querySelectorAll('.svg-button-right');
    const leftbtns = document.querySelectorAll('.svg-button-left');

    // assigningevent click event listeners
    sunglassesImg.addEventListener('click', () => {
      sunglassesImg.classList.toggle('spin');
    });
    pugImg.addEventListener('click', () => {
      pugImg.classList.toggle('bounce');
    });
    jacketImg.addEventListener('click', () => {
      jacketImg.classList.toggle('shake-x-delay');
    });
    leftbtns.forEach(leftbtn => {
      leftbtn.addEventListener('click', function () {
        changeIndexLeft(this.parentNode.querySelectorAll('h1'));
      });
    });
    rightbtns.forEach(rightbtn => {
      rightbtn.addEventListener('click', function () {
        changeIndexRight(this.parentNode.querySelectorAll('h1'));
      });
    });

    // configurinng the intersection observer
    let options = {
      rootMargin: '0px',
      threshold: 0.5,
    };
    // creating an observer
    const observer = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) {
        intro.classList.remove('slide-fade-in-left');
        intro.classList.add('slide-fade-out-right');
      } else {
        intro.classList.remove('slide-fade-out-right');
        intro.classList.add('slide-fade-in-left');
      }
      console.log('change detected');
    }, options);
    // observering intro card
    observer.observe(document.querySelector('.intro-placeholder'));
  }
});
