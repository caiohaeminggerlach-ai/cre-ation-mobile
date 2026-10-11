(()=>{
 const overlay=document.querySelector('.overlay');
 if(!overlay)return;
 const buttons=[...document.querySelectorAll('.menu-hit')];
 const close=overlay.querySelector('.close');
 let opener,previousOverflow='',background=[];
 const toggle=open=>{
  if(open===overlay.classList.contains('open'))return;
  if(open){
   opener=document.activeElement;
   previousOverflow=document.body.style.overflow;
   background=[...document.body.children].filter(el=>el!==overlay&&el.tagName!=='SCRIPT').map(el=>[el,el.inert]);
   background.forEach(([el])=>{el.inert=true});
  }
  overlay.inert=!open;
  overlay.classList.toggle('open',open);
  overlay.setAttribute('aria-hidden',String(!open));
  buttons.forEach(b=>b.setAttribute('aria-expanded',String(open)));
  document.body.style.overflow=open?'hidden':previousOverflow;
  if(open)close.focus({preventScroll:true});
  else{
   background.forEach(([el,inert])=>{el.inert=inert});
   (opener?.isConnected?opener:buttons[0])?.focus({preventScroll:true});
  }
 };
 overlay.id='site-menu';overlay.inert=true;
 buttons.forEach(button=>{button.setAttribute('aria-controls','site-menu');button.setAttribute('aria-expanded','false');button.addEventListener('click',()=>toggle(true))});
 close.addEventListener('click',()=>toggle(false));
 overlay.querySelectorAll('.nav a').forEach(link=>link.addEventListener('click',()=>toggle(false)));
 document.addEventListener('keydown',event=>{
  if(!overlay.classList.contains('open'))return;
  if(event.key==='Escape'){event.preventDefault();toggle(false)}
  if(event.key==='Tab'){
   const items=[...overlay.querySelectorAll('a[href],button:not([disabled])')];
   const first=items[0],last=items.at(-1);
   if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}
   else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}
  }
 });
 addEventListener('pagehide',()=>toggle(false));
})();
