(()=>{
  const header=document.querySelector('.site-header');
  const overlay=document.querySelector('.menu-overlay');
  const opener=document.querySelector('.menu-button');
  const closer=document.querySelector('.close-button');
  if(!header||!overlay||!opener||!closer)return;
  let lastFocus=null;
  const links=[...overlay.querySelectorAll('a')];
  function closeMenu(){
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden','true');
    overlay.inert=true;
    opener.setAttribute('aria-expanded','false');
    document.body.style.overflow='';
    (lastFocus&&lastFocus.isConnected?lastFocus:opener).focus();
  }
  function openMenu(){
    lastFocus=document.activeElement;
    overlay.inert=false;
    overlay.setAttribute('aria-hidden','false');
    overlay.classList.add('is-open');
    opener.setAttribute('aria-expanded','true');
    document.body.style.overflow='hidden';
    closer.focus();
  }
  opener.addEventListener('click',openMenu);
  closer.addEventListener('click',closeMenu);
  links.forEach(link=>link.addEventListener('click',closeMenu));
  document.addEventListener('keydown',event=>{
    if(!overlay.classList.contains('is-open'))return;
    if(event.key==='Escape'){event.preventDefault();closeMenu();return}
    if(event.key==='Tab'){
      const items=[closer,...links];
      const first=items[0],last=items[items.length-1];
      if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}
      else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}
    }
  });
  const panels=[...document.querySelectorAll('[data-tone]')];
  if(!panels.length){header.classList.add('on-dark');return}
  let queued=false;
  function updateTone(){
    queued=false;
    const line=header.getBoundingClientRect().bottom+1;
    const active=panels.find(panel=>{const rect=panel.getBoundingClientRect();return rect.top<=line&&rect.bottom>line});
    header.classList.toggle('on-dark',active?.dataset.tone==='dark');
  }
  function queueTone(){if(!queued){queued=true;requestAnimationFrame(updateTone)}}
  addEventListener('scroll',queueTone,{passive:true});
  addEventListener('resize',queueTone,{passive:true});
  updateTone();
})();
