// Sidebar toggle
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("active");

  // Optional: close on outside click
  document.addEventListener(
    "click",
    function (e) {
      if (!sidebar.contains(e.target) && !e.target.classList.contains("burger")) {
        sidebar.classList.remove("active");
      }
    },
    { once: true }
  );
}

// Scroll anime row
function scrollRow(button, direction) {
  const row = button.parentElement.querySelector(".anime-row");
  const scrollAmount = row.clientWidth / 1.2;
  row.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
}

// Toggle dark/light mode
function toggleMode() {
  document.body.classList.toggle("light");
}

// =======================
// Homepage: Search System
// =======================
const animeList = [
  { name: "Naruto", image: "imgs/naruto.jpg" },
  { name: "Bleach", image: "imgs/bleach.jpeg" },
  { name: "Demon Slayer", image: "imgs/demon slayer.jpg" },
  { name: "One Piece", image: "imgs/onepiece.jpg" },
  { name: "Dragon Ball Z", image: "imgs/DBZ.jpg" },
  { name: "FMAB", image: "imgs/FMAB.jpg" },
  { name: "AOT", image: "imgs/AOT.jpg" },
  { name: "Chainsaw Man", image: "imgs/Chainsawman.jpg" },
  { name: "Solo Leveling", image: "imgs/solo leveling.jpeg" },
  { name: "Wind Breaker", image: "imgs/windbreaker.jpg" },
  { name: "Assassination Classroom", image: "imgs/assassinationclassroom.jpg" },
  { name: "Death Note", image: "imgs/Deathnote.jpg" },
  { name: "Blue Lock", image: "imgs/bluelock.jpg" },
  { name: "My Hero Academia", image: "imgs/MHA.jpg" },
  { name: "Tokyo Revengers", image: "imgs/tokyo revengers.jpg" },
  { name: "Erased", image: "imgs/erased.jpg" },
  { name: "Another", image: "imgs/another.jpg" },
  { name: "Tokyo Ghoul", image: "imgs/tokyo ghoul.jpg" },
  { name: "Psycho-Pass", image: "imgs/psychopass.jpg" },
  { name: "Ergo Proxy", image: "imgs/ergoproxy.jpg" },
  { name: "No Game No Life", image: "imgs/nogamenolife.jpg" },
  { name: "Charlotte", image: "imgs/charlotte.jpg" },
  { name: "Parasyte: The Maxim", image: "imgs/parasyte.jpg" },
  { name: "Made in Abyss", image: "imgs/made in abyss.jpg" },
  { name: "March Comes in Like a Lion", image: "imgs/march comes in.jpg" },
  { name: "Hajime no Ippo", image: "imgs/hajime no ippo.jpg" },
  { name: "Re:Zero", image: "imgs/rezerro.jpg" },
  { name: "Clannad: After Story", image: "imgs/clanned.jpg" },
  { name: "Black Clover", image: "imgs/black clover.jpg" },
  { name: "Berserk", image: "imgs/berserk.jpg" },
  { name: "Jujutsu Kaisen", image: "imgs/JK.jpg" },
  { name: "Hunter x Hunter", image: "imgs/hunterxhunter.jpg" },
  { name: "The Promised Neverland", image: "imgs/promisednverland.jpeg" },
  { name: "Mob Psycho 100", image: "imgs/mobpsycho100.jpg" },
  { name: "stein's Gate", image: "imgs/stein gate.jpg" },
  { name: "The SpyxFamily", image: "imgs/spyfamily.jpeg" },
  { name: "Fairy Tail", image: "imgs/fairytail.jpg" },
  { name: "That Time I Got Reincarnated as a Slime", image: "imgs/Slime incarnation.jpg" },
  { name: "Overload", image: "imgs/overload.jpg" },
];

const searchBar = document.getElementById("searchBar");
const animeContainer = document.querySelector(".anime-container");

if (searchBar && animeContainer) {
  const searchResultsContainer = document.createElement("div");
  searchResultsContainer.className = "anime-section";
  animeContainer.parentElement.insertBefore(searchResultsContainer, animeContainer);

  searchBar.addEventListener("input", () => {
    const query = searchBar.value.toLowerCase();
    const filtered = animeList.filter((anime) =>
      anime.name.toLowerCase().includes(query)
    );

    animeContainer.style.display = query ? "none" : "block";
    searchResultsContainer.innerHTML = "";

    if (query) {
      searchResultsContainer.innerHTML = "<h2>🔍 Search Results</h2>";
      const row = document.createElement("div");
      row.className = "anime-row";

      filtered.forEach((anime) => {
        const slug = anime.name.toLowerCase().replace(/[^a-z0-9]/g, "");
        const card = document.createElement("div");
        card.className = "anime-card";
        card.innerHTML = `
          <a href="watch.html?anime=${slug}" class="anime-link">
            <img src="${anime.image}" alt="${anime.name}">
            <h3>${anime.name}</h3>
          </a>
        `;
        row.appendChild(card);
      });

      if (filtered.length === 0) {
        searchResultsContainer.innerHTML += "<p style='padding: 1rem;'>No anime found.</p>";
      } else {
        searchResultsContainer.appendChild(row);
      }
    }
  });
}

// =======================
// Watch Page: Episode Loader
// =======================
const videoMap = {
  naruto: (ep) => `/videos/naruto/Naruto Ep${ep}.mp4`,
  bleach: (ep) => `/videos/bleach/Bleach Ep${ep}.mp4`,
  aot: (ep) => `/videos/aot/AOT Ep${ep}.mp4`,
  // Add more anime here following the same pattern
};

if (document.querySelector("video")) {
  const params = new URLSearchParams(window.location.search);
  const animeRaw = params.get("anime") || "naruto";
  const anime = animeRaw.toLowerCase().replace(/[^a-z0-9]/g, ""); // normalize

  // Set heading and title
  document.title = `Watch ${animeRaw} - AnimeXpress`;
  document.querySelector("h2").innerText = animeRaw;

  // Load episode function
  window.loadEpisode = function (num) {
    const video = document.querySelector("video source");
    const player = video.parentElement;
    const wrapper = document.querySelector(".video-wrapper");

    if (videoMap[anime]) {
      const videoUrl = videoMap[anime](num);
      video.src = videoUrl;
      player.load(); // Reload the video player
  
      // Check if video exists before playing
      video.onloadstart = () => {
        console.log(`Loaded: ${videoUrl}`);
      };
  
      // Optional: Error handling
      video.onerror = () => {
        wrapper.innerHTML += `<p style="color: red;">Error loading episode ${num}. Please try again later.</p>`;
      };
    } else {
      video.src = "";
      player.load();
      wrapper.innerHTML += `<p style="color: red;">Video not found for this anime.</p>`;
    }
  };

  // Auto-load Episode 1
  window.onload = () => loadEpisode(1);
}




// Nextpage manga

if (window.location.pathname.includes("manga.html")) {
// Get the query parameters (mangaId and chapter)
const urlParams = new URLSearchParams(window.location.search);
const mangaId = urlParams.get('mangaId');
let chapter = parseInt(urlParams.get('chapter'), 10);

// Function to load the manga chapter
function loadChapter(chapter) {
  const mangaTitle = document.getElementById('mangaTitle');
  const mangaPagesContainer = document.getElementById('mangaPages');

  // Example of how to load chapter data (you should replace with actual data)
  // In a real-world scenario, you may fetch the manga data via an API or from a database
  mangaTitle.innerText = `Manga Title ${mangaId}`; // Dynamically load the manga title based on mangaId
  
  // Clear previous images
  mangaPagesContainer.innerHTML = '';

  // Load images for the current chapter
  for (let i = 1; i <= 10; i++) { // Assuming 10 pages per chapter
    const img = document.createElement('img');
    img.src = `manga-${mangaId}-chapter-${chapter}-page-${i}.jpg`; // Example image source
    img.alt = `Chapter ${chapter} - Page ${i}`;
    mangaPagesContainer.appendChild(img);
  }
}

// Function to handle chapter change
function changeChapter(direction) {
  chapter += direction;

  // Optionally, you can prevent going to a chapter less than 1 or more than the last chapter
  if (chapter < 1) chapter = 1; // Prevent going to the previous chapter if we're already at chapter 1
  // No upper limit here, as you might have an unlimited number of chapters, or you can define one.

  // Load the new chapter's images
  loadChapter(chapter);
}

// Initially load the chapter
loadChapter(chapter);


}

