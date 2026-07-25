
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const intro=$('#intro'),introText=$('#introText'),envelopeStage=$('#envelopeStage'),envelope=$('#envelope'),envelopeScene=$('#envelopeScene'),seal=$('#seal'),letter=$('#invitationLetter'),openBook=$('#openBook'),bookStage=$('#bookStage'),pages=$$('.page'),next=$('#nextPage'),prev=$('#prevPage'),indicator=$('#pageIndicator'),restart=$('#restart'),soundToggle=$('#soundToggle'),rsvpButton=$('#rsvpButton'),rsvpNote=$('#rsvpNote');
let page=0,turning=false,audioContext,windGain,windOn=false;
const messages=['Ogni storia ha un inizio.','La nostra ha trovato la sua strada.','Benvenuti.'];

function introSequence(){let i=0;const timer=setInterval(()=>{i++;if(i<messages.length){introText.style.opacity=0;setTimeout(()=>{introText.textContent=messages[i];introText.style.opacity=1},350)}else{clearInterval(timer);setTimeout(()=>{intro.style.opacity=0;intro.style.transition='opacity 1.15s';setTimeout(()=>{intro.classList.add('hidden');envelopeStage.classList.remove('hidden')},1150)},950)}},1700)}

function createWind(){if(audioContext)return;audioContext=new(window.AudioContext||window.webkitAudioContext)();const b=audioContext.createBuffer(1,audioContext.sampleRate*2,audioContext.sampleRate),d=b.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;const src=audioContext.createBufferSource(),filter=audioContext.createBiquadFilter();windGain=audioContext.createGain();src.buffer=b;src.loop=true;filter.type='lowpass';filter.frequency.value=460;windGain.gain.value=.0001;src.connect(filter);filter.connect(windGain);windGain.connect(audioContext.destination);src.start()}
function noiseBurst(duration=.12,freq=1100,volume=.025){try{const ctx=audioContext||new(window.AudioContext||window.webkitAudioContext)();const b=ctx.createBuffer(1,ctx.sampleRate*duration,ctx.sampleRate),d=b.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=(Math.random()*2-1)*(1-i/d.length);const s=ctx.createBufferSource(),f=ctx.createBiquadFilter(),g=ctx.createGain();s.buffer=b;f.type='bandpass';f.frequency.value=freq;g.gain.value=volume;s.connect(f);f.connect(g);g.connect(ctx.destination);s.start()}catch(e){}}

soundToggle.addEventListener('click',()=>{createWind();if(audioContext.state==='suspended')audioContext.resume();windOn=!windOn;windGain.gain.cancelScheduledValues(audioContext.currentTime);windGain.gain.linearRampToValueAtTime(windOn?.028:.0001,audioContext.currentTime+.7);soundToggle.textContent=windOn?"Disattiva l'audio":"Attiva l'audio"});

seal.addEventListener('click',()=>{noiseBurst(.09,1800,.04);envelope.classList.add('open');setTimeout(()=>envelopeScene.classList.add('done'),1260);setTimeout(()=>letter.classList.add('show'),1710)});
openBook.addEventListener('click',()=>{noiseBurst(.16,900,.02);envelopeStage.style.opacity=0;envelopeStage.style.transition='opacity .9s';setTimeout(()=>{envelopeStage.classList.add('hidden');bookStage.classList.remove('hidden')},900)});

function controls(){indicator.textContent=`${page+1} / ${pages.length}`;prev.classList.toggle('visible',page>0);next.style.display=page===pages.length-1?'none':'block'}
function goNext(){if(turning||page>=pages.length-1)return;turning=true;const out=pages[page],inc=pages[page+1];inc.classList.add('revealed');out.classList.add('turning');noiseBurst(.18,1350,.018);setTimeout(()=>{out.classList.remove('current','turning');inc.classList.remove('revealed');inc.classList.add('current');page++;controls();turning=false},1100)}
function goPrev(){if(turning||page<=0)return;pages[page].classList.remove('current');page--;pages[page].classList.add('current');controls()}
next.addEventListener('click',goNext);prev.addEventListener('click',goPrev);
let sx=0;bookStage.addEventListener('touchstart',e=>sx=e.changedTouches[0].screenX,{passive:true});bookStage.addEventListener('touchend',e=>{const dx=e.changedTouches[0].screenX-sx;if(dx<-55)goNext();if(dx>55)goPrev()},{passive:true});
document.addEventListener('keydown',e=>{if(bookStage.classList.contains('hidden'))return;if(e.key==='ArrowRight'||e.key===' ')goNext();if(e.key==='ArrowLeft')goPrev()});
restart.addEventListener('click',()=>{page=0;pages.forEach((p,i)=>p.className='page'+(i===0?' current':''));controls()});

const cfg=window.WEDDING_CONFIG||{};
$('#venueName').textContent=cfg.venueName||'Villa da definire';
$('#venueAddress').textContent=cfg.venueAddress||'Da definire';
$('#weddingDate').textContent=cfg.weddingDate||'Settembre 2027';
if(cfg.mapUrl){const map=$('#mapLink');map.href=cfg.mapUrl;map.classList.remove('disabled')}
rsvpButton.addEventListener('click',()=>{if(cfg.googleFormUrl){document.body.style.transition='opacity .65s';document.body.style.opacity=.15;setTimeout(()=>window.open(cfg.googleFormUrl,'_blank','noopener'),650);setTimeout(()=>document.body.style.opacity=1,1100)}else{rsvpNote.textContent='Inserisci il link del tuo Google Form nel file config.js.'}});
controls();introSequence();
