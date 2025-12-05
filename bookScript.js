let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

const urlParams = new URLSearchParams(window.location.search);
const bookId = parseInt(urlParams.get('id'));

fetch('books.json')
  .then(response => response.json())
  .then(books => {
      const book = books.find(b => b.id === bookId);

      // Display book details
      const bookDetail = document.getElementById("book-detail");
      bookDetail.innerHTML = `
          <h2>${book.title}</h2>
          <p><strong>Author:</strong> ${book.author}</p>
          <img src="${book.image}" class="img-fluid mb-2" style="max-height:400px; object-fit:cover;">
          <p>${book.description}</p>
      `;

      // Display reviews
      const reviewsSection = document.getElementById("reviews-section");
      function showReviews() {
          const bookReviews = reviews.filter(r => r.bookId === bookId);
          reviewsSection.innerHTML = `<h4>Reviews:</h4>`;
          if(bookReviews.length){
              bookReviews.forEach(r=>{
                  reviewsSection.innerHTML += `<p><strong>${r.name}</strong> (⭐${r.rating})<br>${r.comment}</p><hr>`;
              });
          } else {
              reviewsSection.innerHTML += "<p>No reviews yet.</p>";
          }
      }
      showReviews();

      // Add review form
      const addReview = document.getElementById("add-review");
      addReview.innerHTML = `
          <h4>Add a Review:</h4>
          <input type="text" id="name" class="form-control mb-2" placeholder="Your Name">
          <select id="rating" class="form-select mb-2">
              <option value="1">⭐1</option>
              <option value="2">⭐2</option>
              <option value="3">⭐3</option>
              <option value="4">⭐4</option>
              <option value="5">⭐5</option>
          </select>
          <textarea id="comment" class="form-control mb-2" placeholder="Write your review"></textarea>
          <button class="btn btn-success" id="submitReview">Submit Review</button>
      `;

      document.getElementById("submitReview").addEventListener("click", ()=>{
          const name = document.getElementById("name").value;
          const rating = document.getElementById("rating").value;
          const comment = document.getElementById("comment").value;

          if(!name || !comment){
              alert("Please enter your name and comment.");
              return;
          }

          const newReview = {bookId, name, rating, comment};
          reviews.push(newReview);
          localStorage.setItem("reviews", JSON.stringify(reviews));

          showReviews();

          document.getElementById("name").value = "";
          document.getElementById("rating").value = "1";
          document.getElementById("comment").value = "";
      });
  })
  .catch(error => console.error("Error loading book:", error));
