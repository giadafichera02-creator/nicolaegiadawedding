
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const intro=$('#intro'),introLine=$('#introLine'),invitation=$('#invitation'),envelope=$('#envelope'),scene=$('.scene'),seal=$('#seal'),letter=$('#letter'),openBook=$('#openBook'),bookStage=$('#bookStage'),pages=$$('.page'),next=$('#nextPage'),prev=$('#prevPage'),indicator=$('#pageIndicator'),restart=$('#restart'),soundToggle=$('#soundToggle');
let page=0,turning=false,audioContext,windGain,windOn=false;
const lines=['Ogni storia ha un inizio.','La nostra ha trovato la sua strada.','Benvenuti.'];

function introSequence(){let i=0;const t=setInterval(()=>{i++;if(i<lines.length){introLine.style.opacity=0;setTimeout(()=>{introLine.textContent=lines[i];introLine.style.opacity=1},350)}else{clearInterval(t);setTimeout(()=>{intro.style.opacity=0;intro.style.transition='opacity 1.15s';setTimeout(()=>{intro.classList.add('hidden');invitation.classList.remove('hidden')},1150)},950)}},1700)}

function createWind(){if(audioContext)return;audioContext=new(window.AudioContext||window.webkitAudioContext)();const b=audioContext.createBuffer(1,audioContext.sampleRate*2,audioContext.sampleRate),d=b.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;const src=audioContext.createBufferSource(),filter=audioContext.createBiquadFilter();windGain=audioContext.createGain();src.buffer=b;src.loop=true;filter.type='lowpass';filter.frequency.value=480;windGain.gain.value=.0001;src.connect(filter);filter.connect(windGain);windGain.connect(audioContext.destination);src.start()}
soundToggle.addEventListener('click',()=>{createWind();if(audioContext.state==='suspended')audioContext.resume();windOn=!windOn;windGain.gain.cancelScheduledValues(audioContext.currentTime);windGain.gain.linearRampToValueAtTime(windOn?.032:.0001,audioContext.currentTime+.7);soundToggle.textContent=windOn?'Disattiva il vento':'Attiva il vento'});

seal.addEventListener('click',()=>{envelope.classList.add('open');setTimeout(()=>scene.classList.add('done'),1250);setTimeout(()=>{letter.classList.add('show');letter.setAttribute('aria-hidden','false')},1700)});
openBook.addEventListener('click',()=>{invitation.style.opacity=0;invitation.style.transition='opacity .9s';setTimeout(()=>{invitation.classList.add('hidden');bookStage.classList.remove('hidden')},900)});

function controls(){indicator.textContent=`${page+1} / ${pages.length}`;prev.classList.toggle('visible',page>0);next.style.display=page===pages.length-1?'none':'block'}
function goNext(){if(turning||page>=pages.length-1)return;turning=true;const out=pages[page],inc=pages[page+1];inc.classList.add('revealed');out.classList.add('turning');setTimeout(()=>{out.classList.remove('current','turning');inc.classList.remove('revealed');inc.classList.add('current');page++;controls();turning=false},1020)}
function goPrev(){if(turning||page<=0)return;pages[page].classList.remove('current');page--;pages[page].classList.add('current');controls()}
next.addEventListener('click',goNext);prev.addEventListener('click',goPrev);
let sx=0;bookStage.addEventListener('touchstart',e=>sx=e.changedTouches[0].screenX,{passive:true});bookStage.addEventListener('touchend',e=>{const dx=e.changedTouches[0].screenX-sx;if(dx<-55)goNext();if(dx>55)goPrev()},{passive:true});
document.addEventListener('keydown',e=>{if(bookStage.classList.contains('hidden'))return;if(e.key==='ArrowRight'||e.key===' ')goNext();if(e.key==='ArrowLeft')goPrev()});
restart.addEventListener('click',()=>{page=0;pages.forEach((p,i)=>p.className='page'+(i===0?' current':''));controls()});

const cfg=window.WEDDING_CONFIG||{};
$('#venueName').textContent=cfg.venueName||'Villa delle Magnolie';
$('#venueAddress').textContent=cfg.venueAddress||'Da definire';
$('#weddingDate').textContent=cfg.weddingDate||'Settembre 2027';
if(cfg.mapUrl&&cfg.mapUrl!=='#'){const a=$('#mapLink');a.href=cfg.mapUrl;a.classList.remove('disabled');a.removeAttribute('aria-disabled')}

const form=$('#rsvpForm'),status=$('#formStatus');
const email=(cfg.destinationEmail||'').trim();
if(email&&email!=='INSERISCI_LA_TUA_EMAIL'){form.action=`https://formsubmit.co/${encodeURIComponent(email)}`}
form.addEventListener('submit',e=>{if(!form.action||form.action===location.href||email==='INSERISCI_LA_TUA_EMAIL'){e.preventDefault();status.textContent='Modulo pronto: inserisci la tua email nel file config.js per ricevere le risposte.'}});

$$('img').forEach(img=>img.addEventListener('error',()=>{img.closest('figure')?.classList.add('image-error');img.alt='Foto non disponibile: sostituire con una foto locale'}));
controls();introSequence();
