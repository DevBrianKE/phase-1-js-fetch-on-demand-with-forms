const init = () => {
  // Select the form and movie details section
  const inputForm = document.querySelector("form");
  const movieDetails = document.querySelector("#movieDetails");

  // Add event listener to the form
  inputForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form refresh

    // Get user input value
    const input = document.querySelector("input#searchByID");
    const movieId = input.value.trim(); // Remove extra spaces

    // Validate input
    if (!movieId) {
      alert("Please enter a movie ID.");
      return;
    }

    // Fetch movie details based on ID
    fetch(`http://localhost:3000/movies/${movieId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Movie not found");
        }
        return response.json();
      })
      .then((data) => {
        // Update the movie details section
        movieDetails.innerHTML = `
          <h4>${data.title}</h4>
          <p>${data.summary}</p>
        `;
      })
      .catch((error) => {
        // Handle errors (e.g., movie not found)
        movieDetails.innerHTML = `<p style="color:red;">Movie not found. Please enter a valid ID.</p>`;
      });

    // Clear input field after submission
    input.value = "";
  });
};

// Run init function when DOM loads
document.addEventListener("DOMContentLoaded", init);
