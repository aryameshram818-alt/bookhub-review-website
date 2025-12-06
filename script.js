const books = [
  {title:"The Power of Habit",author:"Charles Duhigg",genre:"Self-help",rating:4.5,image:"https://m.media-amazon.com/images/I/71eoUH2EngL._SL1500_.jpg",review:"This book explores the science behind habits and how they shape our lives. It's a must-read for anyone looking to change their routines and achieve personal growth."},
  {title:"Atomic Habits",author:"James Clear",genre:"Self-help",rating:5,image:"https://m.media-amazon.com/images/I/817HaeblezL._SL1500_.jpg",review:"Atomic Habits provides actionable strategies to build good habits and break bad ones. It's practical, insightful, and backed by research."},
  {title:"1984",author:"George Orwell",genre:"Fiction",rating:5,image:"https://m.media-amazon.com/images/I/61OYuB86NFL._SL1280_.jpg",review:"A dystopian masterpiece that explores the dangers of totalitarianism and extreme political ideology."},
  {title:"The Alchemist",author:"Paulo Coelho",genre:"Fiction",rating:4.5,image:"https://m.media-amazon.com/images/I/617lxveUjYL._SL1500_.jpg",review:"An inspiring tale about following your dreams and listening to your heart."},
  {title:"Deep Work",author:"Cal Newport",genre:"Motivation",rating:4,image:"https://m.media-amazon.com/images/I/61zt25yYrCL._SL1500_.jpg",review:"A practical guide to focus and productivity in a distracted world."},
  {title:"Sherlock Holmes",author:"Arthur Conan Doyle",genre:"Mystery",rating:4.5,image:"https://m.media-amazon.com/images/I/71FnvvhcaTL._SL1500_.jpg",review:"Classic detective stories full of intrigue and brilliant deduction."},
  {title:"Harry Potter",author:"J.K. Rowling",genre:"Fiction",rating:5,image:"https://m.media-amazon.com/images/I/81q77Q39nEL._SL1500_.jpg",review:"A magical adventure of friendship and courage."},
  {title:"The Hobbit",author:"J.R.R. Tolkien",genre:"Fiction",rating:4.5,image:"https://m.media-amazon.com/images/I/81iLCTUEboL._SL1500_.jpg",review:"A fantasy classic filled with adventure."},
  {title:"Dune",author:"Frank Herbert",genre:"Sci-Fi",rating:5,image:"https://m.media-amazon.com/images/I/81Ua99CURsL._SL1500_.jpg",review:"An epic tale set on a desert planet."},
  {title:"The Martian",author:"Andy Weir",genre:"Sci-Fi",rating:4.5,image:"https://m.media-amazon.com/images/I/91pw0THBwBL._SL1500_.jpg",review:"Survival and science on Mars."},
  {title:"The Da Vinci Code",author:"Dan Brown",genre:"Mystery",rating:4,image:"https://m.media-amazon.com/images/I/71y4X5150dL._SL1500_.jpg",review:"A fast-paced mystery thriller."},
  {title:"Sapiens",author:"Yuval Noah Harari",genre:"Non-Fiction",rating:5,image:"https://m.media-amazon.com/images/I/713jIoMO3UL._SL1500_.jpg",review:"A brief history of humankind."},
  {title:"Educated",author:"Tara Westover",genre:"Non-Fiction",rating:4.5,image:"https://m.media-amazon.com/images/I/71N2HZwRo3L._SL1500_.jpg",review:"A powerful memoir of resilience."},
  {title:"Freedom at Midnight",author:"Larry Collins",genre:"History",rating:4,image:"https://m.media-amazon.com/images/I/91tDbqeySSL._SL1500_.jpg",review:"Historical account of India’s independence."},
  {title:"The Monk Who Sold His Ferrari",author:"Robin Sharma",genre:"Motivation",rating:4,image:"https://m.media-amazon.com/images/I/61OByUf1TfL._SL1275_.jpg",review:"Life lessons for happiness and success."}
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

    card.innerHTML = `
      <img src="${book.image}" alt="${book.title}">
      <div class="card-body">
        <h3>${book.title}</h3>
        <p class="author">${book.author}</p>
        <p class="genre">${book.genre}</p>
        <div class="rating">
          ${'★'.repeat(Math.floor(book.rating)) + (book.rating % 1 ? '½' : '')}
        </div>
        <button class="read-btn">Read Review</button>
      </div>
    `;

    card.querySelector('.read-btn').onclick = () => {
      modalTitle.innerText = book.title;
      modalReview.innerText = book.review;
      modal.style.display = 'flex';
    };

    booksContainer.appendChild(card);
  });
}

renderBooks(books);

document.querySelectorAll('.genre-btn').forEach(btn=>{
  btn.onclick = () => {
    document.querySelectorAll('.genre-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const genre = btn.dataset.genre;
    genre === 'All'
      ? renderBooks(books)
      : renderBooks(books.filter(b => b.genre === genre));
  };
});

document.getElementById('searchBtn').onclick = () => {
  const q = document.getElementById('searchInput').value.toLowerCase();
  renderBooks(
    books.filter(b =>
      b.title.toLowerCase().includes(q) ||
      b.author.toLowerCase().includes(q)
    )
  );
};

closeModal.onclick = () => modal.style.display = 'none';
modal.onclick = e => { if(e.target === modal) modal.style.display = 'none'; };




