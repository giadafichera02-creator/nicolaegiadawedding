
const scene = document.getElementById("envelopeScene");
const seal = document.getElementById("sealButton");
const petals = document.getElementById("petals");
const enterSite = document.getElementById("enterSite");
const intro = document.getElementById("intro");
const weddingSite = document.getElementById("weddingSite");

let opened = false;

function waxSound(){
  try{
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(170, now);
    osc.frequency.exponentialRampToValueAtTime(55, now + .18);

    gain.gain.setValueAtTime(.0001, now);
    gain.gain.exponentialRampToValueAtTime(.08, now + .02);
    gain.gain.exponentialRampToValueAtTime(.0001, now + .22);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + .23);
  }catch(e){}
}

function createPetals(){
  const total = 32;

  for(let i = 0; i < total; i++){
    const petal = document.createElement("span");
    petal.className = "petal" + (i % 7 === 0 ? " leaf" : "");

    petal.style.left = `${Math.random() * 100}%`;
    petal.style.animationDuration = `${5.4 + Math.random() * 4.8}s`;
    petal.style.animationDelay = `${Math.random() * 1.4}s`;
    petal.style.setProperty("--drift", `${-90 + Math.random() * 180}px`);
    petal.style.setProperty("--spin", `${240 + Math.random() * 520}deg`);
    petal.style.transform = `scale(${.65 + Math.random() * .8})`;

    petals.appendChild(petal);
    setTimeout(() => petal.remove(), 11500);
  }
}

seal.addEventListener("click", () => {
  if(opened) return;
  opened = true;
  waxSound();
  if(navigator.vibrate) navigator.vibrate([30,20,40]);
  scene.classList.add("open");
  createPetals();
});

enterSite.addEventListener("click", () => {
  intro.style.transition = "opacity .9s ease, transform .9s ease";
  intro.style.opacity = "0";
  intro.style.transform = "scale(1.03)";

  setTimeout(() => {
    intro.style.display = "none";
    weddingSite.classList.add("show");
    window.scrollTo({top:0,behavior:"instant"});
    observeReveal();
  }, 900);
});

function observeReveal(){
  const items = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, {threshold:.18});

  items.forEach(item => observer.observe(item));
}
