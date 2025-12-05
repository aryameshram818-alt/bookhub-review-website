const books = [
  {title:"The Power of Habit",author:"Charles Duhigg",genre:"Self‑help",rating:4.5,image:"https://images.unsplash.com/photo-1529655683826-aba9b3e77383?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",review:"This book explores the science behind habits and how they shape our lives. It's a must-read for anyone looking to change their routines and achieve personal growth."},
  {title:"Atomic Habits",author:"James Clear",genre:"Self‑help",rating:5,image:"https://images.unsplash.com/photo-1512820790803-83ca734da794?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",review:"Atomic Habits provides actionable strategies to build good habits and break bad ones. It's practical, insightful, and backed by research."},
  {title:"1984",author:"George Orwell",genre:"Fiction",rating:5,image:"https://images.unsplash.com/photo-1532012197267-da84d127e765?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",review:"A dystopian masterpiece that explores the dangers of totalitarianism and extreme political ideology."},
  {title:"The Alchemist",author:"Paulo Coelho",genre:"Fiction",rating:4.5,image:"https://images.unsplash.com/photo-1544947950-fa07a98d237f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",review:"An inspiring tale about following your dreams and listening to your heart."},
  {title:"Deep Work",author:"Cal Newport",genre:"Motivation",rating:4,image:"https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",review:"A practical guide to focus and productivity in a distracted world."},
  {title:"Dune",author:"Frank Herbert",genre:"Sci‑Fi",rating:5,image:"https://images.unsplash.com/photo-1544939403-38fa0b7f205f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",review:"Epic science fiction about politics, religion, and power on a desert planet."},
  {title:"Sherlock Holmes",author:"Arthur Conan Doyle",genre:"Mystery",rating:4.5,image:"https://images.unsplash.com/photo-1581091012184-86c3e82ca3a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",review:"Classic detective stories full of intrigue and brilliant deduction."}
];

const booksContainer = document.getElementById('booksContainer');
const modal = document.getElementById('reviewModal');
const modalTitle = document.getElementById('modalTitle');
const modalReview = document.getElementById('modalReview');
const closeModal = document.getElementById('closeModal');

function renderBooks(list){
  booksContainer.innerHTML = '';
  list.forEach(book=>{
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML=`
      <img src="${book.image}" alt="${book.title}">
      <div class="card-body">
        <h3>${book.title}</h3>
        <p class="author">${book.author}</p>
        <div class="rating">${'★'.repeat(Math.floor(book.rating)) + (book.rating%1?'½':'')}</div>
        <button class="read-btn">Read Review</button>
      </div>`;
    card.querySelector('.read-btn').onclick=()=>{
      modalTitle.innerText=book.title;
      modalReview.innerText=book.review;
      modal.style.display='flex';
    };
    booksContainer.appendChild(card);
  });
}

renderBooks(books);

document.querySelectorAll('.genre-btn').forEach(btn=>{
  btn.onclick=()=>{
    document.querySelectorAll('.genre-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const genre = btn.dataset.genre;
    if(genre==='All') renderBooks(books);
    else renderBooks(books.filter(b=>b.genre===genre));
  }
});

document.getElementById('searchBtn').onclick=()=>{
  const q = document.getElementById('searchInput').value.toLowerCase();
  renderBooks(books.filter(b=>b.title.toLowerCase().includes(q)||b.author.toLowerCase().includes(q)));
};

closeModal.onclick=()=>modal.style.display='none';
modal.onclick=e=>{if(e.target===modal) modal.style.display='none';};



