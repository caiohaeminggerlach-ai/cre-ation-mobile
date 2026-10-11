(()=>{
  const header=document.querySelector('.site-header');
  if(!header)return;
  const sections=[...document.querySelectorAll('main .panel,main .contact-band')];
  const dark=new Set(['not-marketing','metrics','selective-partnership','conclusion']);
  let queued=false;
  const update=()=>{
    queued=false;
    const y=header.getBoundingClientRect().bottom+1;
    const active=sections.find(section=>{const r=section.getBoundingClientRect();return r.top<=y&&r.bottom>y});
    header.classList.toggle('on-dark',!!active&&((active.dataset.theme ? active.dataset.theme==='dark' : dark.has(active.id))||active.classList.contains('contact-band')));
  };
  const queue=()=>{if(!queued){queued=true;requestAnimationFrame(update)}};
  addEventListener('scroll',queue,{passive:true});
  addEventListener('resize',queue,{passive:true});
  update();
})();
