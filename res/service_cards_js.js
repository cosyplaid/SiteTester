const services = [
 { title:"Услуга 1", description:"Описание услуги №1", icon:"🔧" },
 { title:"Услуга 2", description:"Описание услуги №2", icon:"💡" },
 { title:"Услуга 3", description:"Описание услуги №3", icon:"🚀" },
 { title:"Услуга 4", description:"Описание услуги №4", icon:"🎨" },
 { title:"Услуга 5", description:"Описание услуги №5", icon:"📞" },
];

const wrapper = document.getElementById('service-cardsWrapper');


let currentServiceIndex = 0; // центральная активная
//let currentServiceIndex = Math.floor(services.length/2); // центральная активная
const visibleCount =3; // сколько показывать одновременно
let totalWrapperWidth = 0;

// Создаем карточки
services.forEach((service, index) => {
 const card = document.createElement('div');
 card.classList.add('service-card');

 if(index === currentServiceIndex) {
   card.classList.add('active');
 } else {
   card.classList.add('inactive');
 }

 // Внутри карточки
 if(index === currentServiceIndex) {
 // Активная
 card.innerHTML= `
 <h3>${service.title}</h3>
 <p>${service.description}</p>
 `;
 } else {
 // Неактивные
 card.innerHTML= `
 <div class="icon">${service.icon}</div>
 <div class="title">${service.title}</div>
 `;
 }

 wrapper.appendChild(card);
});

// Функция обновления классов активных/неактивных
function updateCards() {
 const cards = wrapper.children;

 for(let i=0; i<cards.length; i++) {
 cards[i].classList.remove('active','inactive');
 if(i===currentServiceIndex) {
 cards[i].classList.add('active');
 // Обновляем содержимое для активной
 const service = services[i];
 cards[i].innerHTML= `
 <h3>${service.title}</h3>
 <p>${service.description}</p>
 `;
 } else {
 cards[i].classList.add('inactive');
 // Обновляем содержимое для неактивных
 const service = services[i];
 cards[i].innerHTML= `
 <div class="icon">${service.icon}</div>
 <div class="title">${service.title}</div>
 `;
 }
 }
}

// Обработчики кнопок
document.getElementById('service-prevBtn').addEventListener('click', () => {
 if(currentServiceIndex >0) {
 currentServiceIndex--;
 updateCards();
 moveCarousel();
 }
});

document.getElementById('service-nextBtn').addEventListener('click', () => {
 if(currentServiceIndex < services.length -1) {
   currentServiceIndex++;
   updateCards();
   moveCarousel(); // перемещаем так, чтобы активная была по центру
 }
});

// Функция перемещения карусели
function moveCarousel() {
 const cardWidth = wrapper.children[0].offsetWidth + 20; // ширина + margin
 const targetX = - ((currentServiceIndex+1) * (cardWidth));
 wrapper.style.transform = `translateX(${targetX + ((cardWidth+20)*services.length)/2}px)`;
}

// Изначально позиционируем
window.onload=()=>{ moveCarousel(); };