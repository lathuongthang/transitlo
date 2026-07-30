(()=>{
  const sourceImages=[...document.querySelectorAll(
    '.concept-media img, .gallery figure img, .references figure img'
  )];

  if(!sourceImages.length)return;

  const box=document.createElement('div');
  box.className='lightbox';
  box.setAttribute('role','dialog');
  box.setAttribute('aria-modal','true');
  box.setAttribute('aria-label','Project image viewer');
  box.innerHTML=`
    <button class="lightbox-close" type="button" aria-label="Close image viewer">×</button>
    <button class="lightbox-prev" type="button" aria-label="Previous image">‹</button>
    <img class="lightbox-image" alt="">
    <button class="lightbox-next" type="button" aria-label="Next image">›</button>
    <div class="lightbox-count" aria-live="polite"></div>
  `;
  document.body.appendChild(box);

  const large=box.querySelector('.lightbox-image');
  const closeButton=box.querySelector('.lightbox-close');
  const prevButton=box.querySelector('.lightbox-prev');
  const nextButton=box.querySelector('.lightbox-next');
  const count=box.querySelector('.lightbox-count');
  let activeIndex=0;
  let touchStartX=null;

  function showImage(index){
    activeIndex=(index+sourceImages.length)%sourceImages.length;
    const source=sourceImages[activeIndex];
    large.src=source.currentSrc||source.src;
    large.alt=source.alt||'Expanded project image';
    count.textContent=`${activeIndex+1} / ${sourceImages.length}`;
    const multiple=sourceImages.length>1;
    prevButton.hidden=!multiple;
    nextButton.hidden=!multiple;
  }

  function openLightbox(index){
    showImage(index);
    box.classList.add('open');
    document.body.classList.add('lightbox-open');
    closeButton.focus({preventScroll:true});
  }

  function closeLightbox(){
    box.classList.remove('open');
    document.body.classList.remove('lightbox-open');
    large.removeAttribute('src');
  }

  sourceImages.forEach((source,index)=>{
    const target=source.closest('figure')||source.closest('.concept-media')||source;
    target.setAttribute('role','button');
    target.setAttribute('tabindex','0');
    target.setAttribute('aria-label',`Open image ${index+1} of ${sourceImages.length}`);
    target.addEventListener('click',()=>openLightbox(index));
    target.addEventListener('keydown',event=>{
      if(event.key==='Enter'||event.key===' '){
        event.preventDefault();
        openLightbox(index);
      }
    });
  });

  closeButton.addEventListener('click',event=>{
    event.stopPropagation();
    closeLightbox();
  });
  prevButton.addEventListener('click',event=>{
    event.stopPropagation();
    showImage(activeIndex-1);
  });
  nextButton.addEventListener('click',event=>{
    event.stopPropagation();
    showImage(activeIndex+1);
  });
  large.addEventListener('click',event=>event.stopPropagation());
  box.addEventListener('click',event=>{
    if(event.target===box)closeLightbox();
  });

  box.addEventListener('touchstart',event=>{
    touchStartX=event.changedTouches[0]?.clientX??null;
  },{passive:true});
  box.addEventListener('touchend',event=>{
    if(touchStartX===null)return;
    const endX=event.changedTouches[0]?.clientX??touchStartX;
    const distance=endX-touchStartX;
    touchStartX=null;
    if(Math.abs(distance)<45)return;
    showImage(activeIndex+(distance<0?1:-1));
  },{passive:true});

  document.addEventListener('keydown',event=>{
    if(!box.classList.contains('open'))return;
    if(event.key==='Escape')closeLightbox();
    if(event.key==='ArrowLeft')showImage(activeIndex-1);
    if(event.key==='ArrowRight')showImage(activeIndex+1);
  });
})();
