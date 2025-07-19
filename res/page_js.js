const header = document.querySelector('.header');
const square = document.querySelector('.square');
const letter = document.querySelector('.letter');
const line = document.querySelector('.line-line');
const lineText = document.querySelector('.line-text');
const marquee = document.querySelector('.marquee');
const loader = document.getElementById('loader');

// Тонировочка
var t_line_background = document.querySelector('.carousel');
var tint = document.querySelector('.tint');
var startTint = .25;

tint.style.opacity = startTint;

//Момент, когда страница полностью загружена
window.addEventListener('load', function() {
	setTimeout(function() {
		loader.style.opacity='0';
		setTimeout(function() {
			loader.style.display='none';

			// Разблокируем прокрутку
			document.body.classList.remove('no-scroll');
		},500);
	},1000);
});


window.addEventListener('scroll', function() 
{
    var scrollTop = window.scrollY;
    var windowHeight = window.innerHeight;
    var documentHeight = document.body.scrollHeight;

    // Процент прокрутки
    var scrollPercent = scrollTop / (documentHeight - windowHeight);

    // Смещение подложки
    t_line_background.style.transform = `translateY(${scrollPercent * 100}px)`; // Смещение на X px
	// Пример анимации: изменение прозрачности подложки
    //t_line_background.style.opacity = 1 - scrollPercent * .75; // Меняем прозрачность в зависимости от прокрутки

    // Пример анимации: изменение прозрачности тонировки
    tint.style.opacity = startTint + scrollPercent * 1.6; // Меняем прозрачность в зависимости от прокрутки
  
	//line.style.opacity = startTint + scrollPercent * 1.6;
  
    // Ограничитель значения скролла для logo
	const targetScrollAmount = 450;
	const startScrollAmount = 125;
  
	const startLineGrowAmount = 480;
	const endLineGrowAmount = 250;
	
	var headerScrollAmount = (scrollTop - 75) / 450;
  	var logoScrollAmount =(scrollTop - startScrollAmount) / targetScrollAmount;
  
	var lineGrowAmount = (scrollTop - startLineGrowAmount) / endLineGrowAmount;
  
	logoScrollAmount = Math.min(Math.max(logoScrollAmount, 0), 1);
	
	headerScrollAmount = Math.min(Math.max(headerScrollAmount, 0), 1);
		
	lineGrowAmount = Math.min(Math.max(lineGrowAmount, 0), 1);

	//console.log(logoScrollAmount);

	const maxHeight = 120; // Максимальный размер header.height в пикселях
	const minHeight = 80; // Минимальный размер header.height в пикселях

	// Расчет угла: от 0 до 45 в пределах logoScrollAmount
	const rotateDeg = logoScrollAmount * 45; // пропорционально

	// Расчет смещения квадрата относительно высоты header
	const squareYTranslate = header.offsetHeight - minHeight / 2 - 2;
  
	let translateY = logoScrollAmount * squareYTranslate;
	let newHeight = maxHeight + (minHeight - maxHeight) * headerScrollAmount;

	console.log(translateY);

	// Расчет изменения цвета тени
	const startColor = {r: 255, g: 154, b: 0}; //r: 255, g: 89, b: 0
	const endColor = {r: 255, g: 255, b: 255}; //rgb(255, 240, 196) 

	const r = Math.round(startColor.r + (endColor.r - startColor.r) * lineGrowAmount);
	const g = Math.round(startColor.g + (endColor.g - startColor.g) * lineGrowAmount);
	const b = Math.round(startColor.b + (endColor.b - startColor.b) * lineGrowAmount);

	// Формируем строку цвета с прозрачностью
	const colorStr = `rgba(${r}, ${g}, ${b}, 0.7)`;

	// Обновляем трансформацию (Квадрат, Буква Т, Шапка)
	header.style.height = `${newHeight}px`;
	square.style.transform = `translateY(${translateY}px) rotate(${rotateDeg}deg)`;
  
	lineText.style.transform = `translateY(${translateY}px) scale(${1}, ${1-headerScrollAmount})`;
  
	header.style.boxShadow = `0px 3px 20px ${colorStr}`;
	line.style.left = `${20 - 20*lineGrowAmount}%`;
	line.style.width = `${100*lineGrowAmount}%`;
	line.style.opacity = lineGrowAmount * 1.6;
	marquee.style.left = `${-7 * headerScrollAmount}%`;
  
	letter.style.transform = `rotate(${-rotateDeg}deg)`;
});

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

const slides = document.getElementById('slides');
const dotsContainer = document.getElementById('dotsContainer');

//const dotsContainer = carousel.querySelector('.nav-dots');

const imagesCount = slides.children.length; // количество изображений
let currentIndex = 0;

// Создаем кружки навигации
for (let i = 0; i < imagesCount; i++) {
	const dot = document.createElement('span');
	dot.className = 'dot';
	if (i === currentIndex) dot.classList.add('active');
	dot.dataset.index = i; // сохраняем индекс
	dotsContainer.appendChild(dot);
}

// Обработчик клика по кружкам
dotsContainer.addEventListener('click', (e) => {
	if (e.target.classList.contains('dot')) {
		const index = parseInt(e.target.dataset.index);
		goToSlide(index);
	}
});

// Функция для переключения слайдов
function goToSlide(index) {
	currentIndex = index;
	const offset = -index * 100 + '%';
	slides.style.transform = `translateX(${offset})`;
	updateDots();
}

// Обновление активных кружков
function updateDots() {
	const dots = document.querySelectorAll('.dot');
	dots.forEach((dot, i) => {
		dot.classList.toggle('active', i === currentIndex);
	});
}

// Автоматическая смена слайдов (по желанию)
let autoSlideInterval = setInterval(() => {
	let nextIndex = (currentIndex +1) % imagesCount;
	goToSlide(nextIndex);
},5000); // смена каждые 5 секунд

// Остановка автоматической смены при наведении (по желанию)
// document.querySelector('.carousel').addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
// document.querySelector('.carousel').addEventListener('mouseleave', () => {
	// autoSlideInterval = setInterval(() => {
		// let nextIndex = (currentIndex +1) % imagesCount;
		// goToSlide(nextIndex);
	// },5000);
// });

const texts = ["Фотопечать", "Фото на документы", "Вывески", "Сувенирная продукция", "Дизайн", "Брошюровка", "Ламинация"];
let currentIndexForSlogs = 0;

const element = document.getElementById('scrollText');

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

async function animateText() {
	element.textContent = texts[currentIndexForSlogs];

	element.style.transition = 'none';
	element.style.transform = 'translateX(-40%)';
	element.style.opacity = 0;
	await sleep(10);

	// 1. Вылетает на -5% за 1.5 сек
	element.style.transition = 'transform 1s ease, opacity 1.5s ease';
	element.style.transform = 'translateX(-5%)';
	element.style.opacity = 1;
	await sleep(1000);

	// 2. Движется до +5% за 1 сек
	element.style.transition = 'transform 15s ease, opacity 1s ease';
	element.style.transform = 'translateX(5%)';
    element.style.opacity = 1;
	await sleep(4500);

	// 3. В течение 0.5 сек двигается в 100%
	element.style.transition = 'transform 1s ease, opacity .35s ease';
	element.style.transform = 'translateX(100%)';
	element.style.opacity = 0;
	await sleep(1000);

	element.style.transition = 'none';
	element.style.transform = 'translateX(-100%)';
	element.style.opacity = 0;
	currentIndexForSlogs = (currentIndexForSlogs + 1) % texts.length;
	await sleep(10);

	startAnimation();

	// После этого можно сменить текст и начать заново или выполнить другие действия
}

// Для запуска
function startAnimation() {
	animateText();
}

startAnimation();