const intro = document.getElementById("intro");
const envelopeStage = document.getElementById("envelopeStage");
const envelopeWrap = document.getElementById("envelopeWrap");
const envelope = document.getElementById("envelope");
const invitation = document.getElementById("invitation");
const bookStage = document.getElementById("bookStage");

const pages = [...document.querySelectorAll(".page")];
const nextButton = document.getElementById("nextPage");
const prevButton = document.getElementById("prevPage");
const counter = document.getElementById("counter");

let currentPage = 0;
let isTurning = false;

document.getElementById("continueIntro").addEventListener("click", () => {
  intro.classList.add("hidden");
  envelopeStage.classList.remove("hidden");
});

document.getElementById("seal").addEventListener("click", () => {
  envelope.classList.add("open");

  window.setTimeout(() => {
    envelopeWrap.style.opacity = "0";
    envelopeWrap.style.transform = "translateY(28px) scale(.97)";
  }, 1050);

  window.setTimeout(() => {
    invitation.classList.add("show");
  }, 1380);
});

document.getElementById("openBook").addEventListener("click", () => {
  envelopeStage.classList.add("hidden");
  bookStage.classList.remove("hidden");
  pages[currentPage].scrollTop = 0;
});

function updateControls() {
  counter.textContent = `${currentPage + 1} / ${pages.length}`;
  prevButton.classList.toggle("visible", currentPage > 0);
  nextButton.style.display = currentPage === pages.length - 1 ? "none" : "grid";
}

function goToNextPage() {
  if (isTurning || currentPage >= pages.length - 1) return;

  isTurning = true;

  const outgoingPage = pages[currentPage];
  const incomingPage = pages[currentPage + 1];

  incomingPage.classList.add("revealed");
  outgoingPage.classList.add("turning");

  window.setTimeout(() => {
    outgoingPage.classList.remove("current", "turning");
    incomingPage.classList.remove("revealed");
    incomingPage.classList.add("current");
    incomingPage.scrollTop = 0;

    currentPage += 1;
    updateControls();
    isTurning = false;
  }, 820);
}

function goToPreviousPage() {
  if (isTurning || currentPage <= 0) return;

  pages[currentPage].classList.remove("current");
  currentPage -= 1;
  pages[currentPage].classList.add("current");
  pages[currentPage].scrollTop = 0;

  updateControls();
}

nextButton.addEventListener("click", goToNextPage);
prevButton.addEventListener("click", goToPreviousPage);

document.addEventListener("keydown", (event) => {
  if (bookStage.classList.contains("hidden")) return;

  if (event.key === "ArrowRight") goToNextPage();
  if (event.key === "ArrowLeft") goToPreviousPage();
});

document.getElementById("rsvpForm").addEventListener("submit", (event) => {
  event.preventDefault();
  document.getElementById("confirmation").style.display = "block";
});

document.getElementById("restart").addEventListener("click", () => {
  pages.forEach((page, index) => {
    page.className = index === 0 ? "page current" : "page";
    page.scrollTop = 0;
  });

  currentPage = 0;
  updateControls();
});

updateControls();
