
const intro=document.getElementById('intro');
const introLine=document.getElementById('introLine');
const invitationStage=document.getElementById('invitationStage');
const envelope=document.getElementById('envelope');
const envelopeScene=document.getElementById('envelopeScene');
const waxSeal=document.getElementById('waxSeal');
const invitationLetter=document.getElementById('invitationLetter');
const openBook=document.getElementById('openBook');
const bookStage=document.getElementById('bookStage');
const pages=[...document.querySelectorAll('.book-page')];
const nextPage=document.getElementById('nextPage');
const prevPage=document.getElementById('prevPage');
const pageIndicator=document.getElementById('pageIndicator');
const restart=document.getElementById('restart');
const soundToggle=document.getElementById('soundToggle');

let currentPage=0,isTurning=false,audioContext,windGain,windEnabled=false;
const introMessages=['Ogni storia ha un inizio.','La nostra ha trovato la sua strada.','Benvenuti.'];

function runIntro(){
  let i=0;
  const timer=setInterval(()=>{
    i++;
    if(i<introMessages.length){
      introLine.style.opacity='0';
      setTimeout(()=>{introLine.textContent=introMessages[i];introLine.style.opacity='1';},350);
    }else{
      clearInterval(timer);
      setTimeout(()=>{
        intro.style.opacity='0';
        intro.style.transition='opacity 1.2s';
        setTimeout(()=>{intro.classList.add('is-hidden');invitationStage.classList.remove('is-hidden');},1200);
      },1000);
    }
  },1700);
}

function createWind(){
  if(audioContext)return;
  audioContext=new (window.AudioContext||window.webkitAudioContext)();
  const buffer=audioContext.createBuffer(1,audioContext.sampleRate*2,audioContext.sampleRate);
  const data=buffer.getChannelData(0);
  for(let i=0;i<data.length;i++)data[i]=Math.random()*2-1;
  const source=audioContext.createBufferSource();
  const filter=audioContext.createBiquadFilter();
  windGain=audioContext.createGain();
  source.buffer=buffer;source.loop=true;filter.type='lowpass';filter.frequency.value=500;windGain.gain.value=.0001;
  source.connect(filter);filter.connect(windGain);windGain.connect(audioContext.destination);source.start();
}
soundToggle.addEventListener('click',()=>{
  createWind(); if(audioContext.state==='suspended')audioContext.resume();
  windEnabled=!windEnabled;
  windGain.gain.linearRampToValueAtTime(windEnabled?.035:.0001,audioContext.currentTime+.8);
  soundToggle.textContent=windEnabled?'Disattiva il vento':'Attiva il vento';
});

waxSeal.addEventListener('click',()=>{
  envelope.classList.add('is-open');
  setTimeout(()=>envelopeScene.classList.add('opened'),1250);
  setTimeout(()=>invitationLetter.classList.add('visible'),1700);
});

openBook.addEventListener('click',()=>{
  invitationStage.style.opacity='0';
  invitationStage.style.transition='opacity .9s';
  setTimeout(()=>{invitationStage.classList.add('is-hidden');bookStage.classList.remove('is-hidden');},900);
});

function updateControls(){
  pageIndicator.textContent=`${currentPage+1} / ${pages.length}`;
  prevPage.classList.toggle('visible',currentPage>0);
  nextPage.style.display=currentPage===pages.length-1?'none':'block';
}
function goNext(){
  if(isTurning||currentPage>=pages.length-1)return;
  isTurning=true;
  const outgoing=pages[currentPage],incoming=pages[currentPage+1];
  incoming.classList.add('revealed');outgoing.classList.add('turning');
  setTimeout(()=>{outgoing.classList.remove('current','turning');incoming.classList.remove('revealed');incoming.classList.add('current');currentPage++;updateControls();isTurning=false;},920);
}
function goPrev(){
  if(isTurning||currentPage<=0)return;
  pages[currentPage].classList.remove('current');
  currentPage--;
  pages[currentPage].classList.add('current');
  updateControls();
}
nextPage.addEventListener('click',goNext);
prevPage.addEventListener('click',goPrev);
restart.addEventListener('click',()=>{currentPage=0;pages.forEach((p,i)=>{p.className='book-page'+(i===0?' current':'')});updateControls();});
document.addEventListener('keydown',e=>{if(bookStage.classList.contains('is-hidden'))return;if(e.key==='ArrowRight')goNext();if(e.key==='ArrowLeft')goPrev();});
updateControls();runIntro();
