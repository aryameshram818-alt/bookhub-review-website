const bookList = document.getElementById("book-list");

fetch('books.json')
  .then(response => response.json())
  .then(books => {
      books.forEach(book => {
          const card = document.createElement("div");
          card.className = "col-md-4 mb-4";
          card.innerHTML = `
              <div class="card shadow">
                  <img src="${book.image}" class="card-img-top" style="height:300px; object-fit:cover;">
                  <div class="card-body">
                      <h5 class="card-title">${book.title}</h5>
                      <p>${book.author}</p>
                      <a href="book.html?id=${book.id}" class="btn btn-primary">Read Review</a>
                  </div>
              </div>
          `;
          bookList.appendChild(card);
      });
  })
  .catch(error => console.error("Error loading books:", error));

