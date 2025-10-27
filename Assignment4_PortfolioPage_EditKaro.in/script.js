// Video mapping (title → YouTube video ID)
const videoMap = {
  "Temple & Webster — Short Ad": "iXgCDzwi00U",
  "Long-form Editing Example": "1DZlKwQ7bIQ",
  "Gaming Montage": "zZZ4kkmFP0c",
  "Football Edits": "i8ngAU1jAjY",
  "Temple & Webster — eCommerce Ad": "gN6wFjQlsm4",
  "Documentary-style Edit": "O7lPO2AeG9Q",
  "Color Grading Transformations": "NXJjttnp9YI",
  "Anime AMV Mix": "CMF3qeu7fHY",
  "Nike — So Win (Commercial)": "b0Ezn5pZE7o",
};

// Elements
const filterButtons = document.querySelectorAll(".filter-btn");
const cards = document.querySelectorAll(".card");
const searchInput = document.getElementById("searchInput");
const modal = document.getElementById("modal");
const player = document.getElementById("player");
const closeModal = document.getElementById("closeModal");

// Filter function
function applyFilter(filter) {
  const query = searchInput.value.trim().toLowerCase();

  cards.forEach((card) => {
    const cat = card.dataset.cat;
    const title = card.dataset.title.toLowerCase();
    const matchesSearch = title.includes(query);

    if ((filter === "all" || cat === filter) && matchesSearch) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }
  });
}

// Filter button click
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    applyFilter(btn.dataset.filter);
  });
});

// Search input
searchInput.addEventListener("input", () => {
  const activeFilter =
    document.querySelector(".filter-btn.active").dataset.filter;
  applyFilter(activeFilter);
});

// Modal open
cards.forEach((card) => {
  card.addEventListener("click", () => {
    const title = card.dataset.title;
    const videoId = videoMap[title];
    if (videoId) {
      player.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
      modal.classList.add("open");
    }
  });
});

// Modal close
closeModal.addEventListener("click", () => {
  player.src = "";
  modal.classList.remove("open");
});
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    player.src = "";
    modal.classList.remove("open");
  }
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    player.src = "";
    modal.classList.remove("open");
  }
});
