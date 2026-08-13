(function(){
const cards=[...document.querySelectorAll('.project-button')];let timer=null,preview=false,active=null,suppress=0,sx=0,sy=0;
function showPreview(c){if(active===c)return;hideActive();active=c;if(!c)return;const img=c.querySelector('img');if(img){if(!img.dataset.defaultSrc)img.dataset.defaultSrc=img.getAttribute('src');const p=c.dataset.preview;if(p)img.setAttribute('src',p);}c.classList.add('is-preview','is-pressed');}
function hideActive(){if(!active)return;const img=active.querySelector('img');if(img&&img.dataset.defaultSrc)img.setAttribute('src',img.dataset.defaultSrc);active.classList.remove('is-preview','is-pressed');active=null;}
function end(){clearTimeout(timer);timer=null;hideActive();if(preview)suppress=Date.now()+650;preview=false;}
cards.forEach(c=>{const img=c.querySelector('img');if(img)img.dataset.defaultSrc=img.getAttribute('src');
 c.addEventListener('mouseenter',()=>{if(matchMedia('(hover:hover)').matches){showPreview(c);c.classList.remove('is-pressed')}});c.addEventListener('mouseleave',()=>{if(matchMedia('(hover:hover)').matches)hideActive()});
 c.addEventListener('touchstart',e=>{const t=e.touches[0];if(!t)return;sx=t.clientX;sy=t.clientY;clearTimeout(timer);timer=setTimeout(()=>{preview=true;showPreview(c)},400)},{passive:true});
 c.addEventListener('touchmove',e=>{const t=e.touches[0];if(!t)return;if(!preview){if(Math.hypot(t.clientX-sx,t.clientY-sy)>12){clearTimeout(timer);timer=null}return}const el=document.elementFromPoint(t.clientX,t.clientY);const n=el&&el.closest&&el.closest('.project-button');if(n)showPreview(n)},{passive:true});
 c.addEventListener('touchend',end,{passive:true});c.addEventListener('touchcancel',end,{passive:true});c.addEventListener('click',e=>{if(Date.now()<suppress){e.preventDefault();e.stopPropagation()}});
});window.addEventListener('blur',end);
})();