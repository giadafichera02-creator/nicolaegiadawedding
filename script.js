const scene=document.getElementById("scene");
const seal=document.getElementById("sealBtn");
const petals=document.getElementById("petals");
const enter=document.getElementById("enterBtn");
const intro=document.getElementById("intro");
const site=document.getElementById("site");
let opened=false;

function sound(){
  try{
    const ctx=new(window.AudioContext||window.webkitAudioContext)();
    const now=ctx.currentTime;
    const osc=ctx.createOscillator();
    const gain=ctx.createGain();
    osc.type="triangle";
    osc.frequency.setValueAtTime(170,now);
    osc.frequency.exponentialRampToValueAtTime(55,now+.18);
    gain.gain.setValueAtTime(.0001,now);
    gain.gain.exponentialRampToValueAtTime(.075,now+.02);
    gain.gain.exponentialRampToValueAtTime(.0001,now+.22);
    osc.connect(gain);gain.connect(ctx.destination);osc.start(now);osc.stop(now+.23);
  }catch(e){}
}

function createPetals(){
  for(let i=0;i<38;i++){
    const p=document.createElement("span");
    p.className="petal"+(i%7===0?" leaf":"");
    p.style.left=`${Math.random()*100}%`;
    p.style.animationDuration=`${5.5+Math.random()*4.5}s`;
    p.style.animationDelay=`${Math.random()*1.5}s`;
    p.style.setProperty("--drift",`${-100+Math.random()*200}px`);
    p.style.setProperty("--spin",`${240+Math.random()*520}deg`);
    p.style.transform=`scale(${.65+Math.random()*.8})`;
    petals.appendChild(p);
    setTimeout(()=>p.remove(),11500);
  }
}

seal.addEventListener("click",()=>{
  if(opened)return;
  opened=true;
  sound();
  if(navigator.vibrate)navigator.vibrate([30,20,40]);
  scene.classList.add("open");
  createPetals();
});

enter.addEventListener("click",()=>{
  intro.style.transition="opacity .9s ease,transform .9s ease";
  intro.style.opacity="0";
  intro.style.transform="scale(1.03)";
  setTimeout(()=>{
    intro.style.display="none";
    site.classList.add("show");
    window.scrollTo(0,0);
    observe();
  },900);
});

function observe(){
  const items=document.querySelectorAll(".reveal");
  const ob=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add("visible");
        ob.unobserve(e.target);
      }
    });
  },{threshold:.16});
  items.forEach(i=>ob.observe(i));
}
