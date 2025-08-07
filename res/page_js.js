const header = document.querySelector('.header');
const square = document.querySelector('.square');
const lineText = document.querySelector('.line-text');
const letter = document.querySelector('.letter');
const magicLine = document.querySelector('.line-magic');

const scrollThreshold = 200; // порог в пикселях

const loader = document.getElementById('loader');

const slidesContainer = document.getElementById('slides');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const dotsContainer = document.getElementById('dotsContainer');

// Тонировочка
var t_line_background = document.querySelector('.carousel');
var tint = document.querySelector('.tint');
var startTint = .25;

tint.style.opacity = startTint;

document.addEventListener('DOMContentLoaded', function() {
	setTimeout(function() {
		loader.style.opacity='0';
		setTimeout(function() {
			loader.style.display='none';

			// Разблокируем прокрутку
			document.body.classList.remove('no-scroll');
		},500);
	},1000);
});

function closeMenu() {
    // Получаем чекбокс по ID
    const checkbox = document.getElementById('burger-checkbox');
    // Устанавливаем его значение в false (unchecked)
    checkbox.checked = false;
}

let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(updateOnScroll);
    ticking = true;
  }
}, { passive: true });

function updateOnScroll() {
    var scrollTop = window.scrollY;
    var windowHeight = window.innerHeight;
    var documentHeight = document.body.scrollHeight;

    // Процент прокрутки
    var scrollPercent = scrollTop / (documentHeight - windowHeight);

  if (window.scrollY >= scrollThreshold) {
    header.classList.add('scrolled');
    square.classList.add('scrolled');
    lineText.classList.add('scrolled');
    letter.classList.add('scrolled');
    magicLine.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
    square.classList.remove('scrolled');
    lineText.classList.remove('scrolled');
    letter.classList.remove('scrolled');
    magicLine.classList.remove('scrolled');
  }

  // Типо ПК
if (window.innerWidth >= 1024) 
  {
    t_line_background.style.transform = `translateY(${scrollPercent * 100}px)`; //Смещение подложки
    tint.style.opacity = startTint + scrollPercent * 1.6; // Меняем прозрачность тонировки в зависимости от прокрутки
  }

  ticking = false;
}

function scrollToContacts(event) {
  event.preventDefault(); // отменяем стандартное поведение

  const target = document.getElementById('contact-container');
  if (!target) return;

  const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;

  window.scrollTo({
    top: targetPosition - 80,
    behavior: 'smooth'
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const copyText = document.getElementById('copyText');
  const message = document.getElementById('message');

  if (copyText) {
    copyText.addEventListener('click', () => {
      const textToCopy = copyText.innerText;
      navigator.clipboard.writeText(textToCopy).then(() => {
        message.innerText = 'Почтовый адрес скопирован!';
        setTimeout(() => { message.innerText = ''; }, 2000);
      }).catch(() => {
        message.innerText = 'Ошибка копирования.';
      });
    });
  }
});

// Остановка автоматической смены при наведении (по желанию)
// document.querySelector('.carousel').addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
// document.querySelector('.carousel').addEventListener('mouseleave', () => {
	// autoSlideInterval = setInterval(() => {
		// let nextIndex = (currentIndex +1) % imagesCount;
		// goToSlide(nextIndex);
	// },5000);
// });


//Бегущая строка
const texts = ["Фотопечать", 
  "Фото на документы", 
  "Вывески", 
  "Сувенирная продукция", 
  "Дизайн", 
  "Брошюровка", 
  "Ламинация"];

let currentIndexForSlogs = 0;

const scrollTextHeader = document.getElementById('scroll-text');

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

async function animateText() {
	scrollTextHeader.textContent = texts[currentIndexForSlogs];

	scrollTextHeader.style.transition = 'none';
	scrollTextHeader.style.transform = 'translateX(-40%)';
	scrollTextHeader.style.opacity = 0;
	await sleep(10);

	// 1. Вылетает на -5% за 1.5 сек
	scrollTextHeader.style.transition = 'transform 1s ease, opacity 1.5s ease';
	scrollTextHeader.style.transform = 'translateX(-5%)';
	scrollTextHeader.style.opacity = 1;
	await sleep(1000);

	// 2. Движется до +5% за 1 сек
	scrollTextHeader.style.transition = 'transform 15s ease, opacity 1s ease';
	scrollTextHeader.style.transform = 'translateX(5%)';
  scrollTextHeader.style.opacity = 1;
	await sleep(4500);

	// 3. В течение 0.5 сек двигается в 100%
	scrollTextHeader.style.transition = 'transform 1s ease, opacity .35s ease';
	scrollTextHeader.style.transform = 'translateX(100%)';
	scrollTextHeader.style.opacity = 0;
	await sleep(1000);

	scrollTextHeader.style.transition = 'none';
	scrollTextHeader.style.transform = 'translateX(-100%)';
	scrollTextHeader.style.opacity = 0;
	currentIndexForSlogs = (currentIndexForSlogs + 1) % texts.length;
	await sleep(10);

	startAnimation();
}

// Для запуска
function startAnimation() {
	animateText();
}

startAnimation();

//NEW SLIDER

let currentIndex = 0;

let activeImage = null; // текущий "следящий" элемент
let isDraggingImage = false;
let startXImage = 0;
let startYImage = 0;

document.addEventListener('touchend', () => {
    if(isDraggingImage && activeImage){
        isDraggingImage=false;
        activeImage.style.transition='all 0.2s ease';
    }
});

// Создаем точки
for(let i=0; i<slides.length; i++) {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if(i===0) dot.classList.add('active');
    dot.dataset.index = i; // сохраняем индекс
    dotsContainer.appendChild(dot);
}

// Обновление отображения
function updateSlide() {
    const offset = -currentIndex *100 + '%';
    slidesContainer.style.transform = `translateX(${offset})`;
    
    // Обновляем точки
    document.querySelectorAll('.dot').forEach((dot,i) => {
        dot.classList.toggle('active', i===currentIndex);
    });
}

// Перелистывание вперед
nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex +1) % slides.length;
    updateSlide();
});

// Перелистывание назад
prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex -1 + slides.length) % slides.length;
    updateSlide();
});

// Клики по точкам
document.querySelectorAll('.dot').forEach(dot => {
    dot.addEventListener('click', () => {
        currentIndex= parseInt(dot.dataset.index);
        updateSlide();
    });
});

// Свайп (на мобильных и ПК)
let startX = null;

slidesContainer.addEventListener('touchstart', (e) => {
    startX= e.touches[0].clientX;
});

slidesContainer.addEventListener('touchend', (e) => {
    if(startX===null) return;

    const endX= e.changedTouches[0].clientX;

    const deltaX= endX - startX;

    if(Math.abs(deltaX)>50){ // порог свайпа
        if(deltaX>0){
            // свайп вправо - предыдущий слайд
            currentIndex= (currentIndex -1 + slides.length)%slides.length;
        } else{
            // свайп влево - следующий слайд
            currentIndex= (currentIndex +1)%slides.length;
        }
        updateSlide();
    }
    startX=null; 
});

// Также можно добавить поддержку мыши для "свайпа"
let isDragging=false;

slidesContainer.addEventListener('mousedown', (e)=>{
    isDragging=true;
    startX=e.clientX;
});
slidesContainer.addEventListener('mouseup', (e)=>{
    if(!isDragging) return;

    const deltaX= e.clientX - startX;

    if(Math.abs(deltaX)>50){
        if(deltaX>0){
            currentIndex= (currentIndex -1 + slides.length)%slides.length; 
        } else{
            currentIndex= (currentIndex +1)%slides.length; 
        }
        updateSlide();
    }
    isDragging=false; 
});