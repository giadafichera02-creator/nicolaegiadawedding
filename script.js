
const intro = document.getElementById('intro');
const envelopeStage = document.getElementById('envelopeStage');
const envelopeWrap = document.getElementById('envelopeWrap');
const envelope = document.getElementById('envelope');
const invitation = document.getElementById('invitation');
const bookStage = document.getElementById('bookStage');
const pages = [...document.querySelectorAll('.page')];
const next = document.getElementById('nextPage');
const prev = document.getElementById('prevPage');
const counter = document.getElementById('counter');
let current = 0;
let turning = false;

document.getElementById('continueIntro').onclick = () => {
  intro.classList.add('hidden');
  envelopeStage.classList.remove('hidden');
};

document.getElementById('seal').onclick = () => {
  envelope.classList.add('open');
  setTimeout(() => {
    envelopeWrap.style.opacity = '0';
    envelopeWrap.style.transform = 'translateY(30px) scale(.97)';
    envelopeWrap.style.transition = 'opacity .7s ease, transform .7s ease';
  }, 1100);
  setTimeout(() => invitation.classList.add('show'), 1450);
};

document.getElementById('openBook').onclick = () => {
  envelopeStage.classList.add('hidden');
  bookStage.classList.remove('hidden');
};

function updateControls() {
  counter.textContent = `${current + 1} / ${pages.length}`;
  prev.classList.toggle('visible', current > 0);
  next.style.display = current === pages.length - 1 ? 'none' : 'block';
}

next.onclick = () => {
  if (turning || current >= pages.length - 1) return;
  turning = true;
  const out = pages[current];
  const inc = pages[current + 1];
  inc.classList.add('revealed');
  out.classList.add('turning');
  setTimeout(() => {
    out.classList.remove('current', 'turning');
    inc.classList.remove('revealed');
    inc.classList.add('current');
    current += 1;
    updateControls();
    turning = false;
  }, 1040);
};

prev.onclick = () => {
  if (turning || current <= 0) return;
  pages[current].classList.remove('current');
  current -= 1;
  pages[current].classList.add('current');
  updateControls();
};

document.getElementById('rsvpForm').onsubmit = (event) => {
  event.preventDefault();
  document.getElementById('confirmation').style.display = 'block';
};

document.getElementById('restart').onclick = () => {
  pages.forEach((p, i) => p.className = 'page' + (i === 0 ? ' current' : ''));
  current = 0;
  updateControls();
};

updateControls();
