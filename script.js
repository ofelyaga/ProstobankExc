
let input = document.querySelector('.phone');
  input.addEventListener('input', function(e){
      if(e.inputType === 'deleteContentForward' || e.inputType === 'deleteContentBackward') return false
        this.value = this.value.replace(/\D/g,'')
      if(/^[8]/.test(this.value)){
          this.value = this.value.replace(/^[8]/, '+7')
      }else{
          this.value = '+' + this.value
      }
      //+7(939)878-60-29
      let start = 2;
      let max = 14
      let obj = {
          0: '(',
          4: ')',
          8: '-',
          11: '-',
      }
      for (let char in obj){
          if(this.value[start+(+char)]) {
              this.value = this.value.substring(0, start+(+char)) + obj[char] + this.value.substring(start+(+char))
          }
      }
      if(this.value[max+start]){
        this.value = this.value.substring(0, start + max)
      }
  })

  // Создание слайдера
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');

let currentSlide = 0;
const slidesNumber = slides.length;

const slider = document.querySelector('.slider');
slider.style.transform = 'scale(0.4) translateX(1300px)';
slider.style.overflow = 'visible';

const createDots = function () {
  slides.forEach(function (_, index) {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${index}"></button>`
    );
  });
};

createDots();

const activateCurrentDot = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};

activateCurrentDot(0);

const moveToSlide = function (slide) {
  slides.forEach(
    (s, index) => (s.style.transform = `translateX(${(index - slide) * 100}%)`)
  );
};

moveToSlide(0);

const nextSlide = function () {
  if (currentSlide === slidesNumber - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }

  moveToSlide(currentSlide);
  // 1 - -100%, 2 - 0%, 3 - 100%, 4 - 200%)
  activateCurrentDot(currentSlide);
};

const previousSlide = function () {
  if (currentSlide === 0) {
    currentSlide = slidesNumber - 1;
  } else {
    currentSlide--;
  }

  moveToSlide(currentSlide);
  // 1 - -100%, 2 - 0%, 3 - 100%, 4 - 200%)
  activateCurrentDot(currentSlide);
};

btnRight.addEventListener('click', nextSlide);

btnLeft.addEventListener('click', previousSlide);

document.addEventListener('keydown', function (e) {
  console.log(e);
  if (e.key === 'ArrowRight') nextSlide();
  if (e.key === 'ArrowLeft') previousSlide();
});

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const slide = e.target.dataset.slide;
    moveToSlide(slide);
    activateCurrentDot(slide);
  }
});