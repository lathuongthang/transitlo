
(function(){
const V=document.getElementById('viewer'), img=document.getElementById('viewerImg'), title=document.getElementById('viewerTitle'), zoomTxt=document.getElementById('zoomTxt'), scroll=document.getElementById('viewerScroll'), full=document.getElementById('fullPage');
let zoom=1,path='',current='';
const map={}; document.querySelectorAll('.project').forEach(el=>map[el.dataset.id]=el);
function setZoom(v){zoom=Math.max(1,Math.min(3,v)); img.style.width=(zoom*100)+'%'; zoomTxt.textContent=Math.round(zoom*100)+'%';}
function openCard(el,push=true){if(!el)return;current=el.dataset.id;path=el.dataset.path;img.src=el.dataset.shot;title.textContent=el.dataset.title;setZoom(1);scroll.scrollTop=0;scroll.scrollLeft=0;V.classList.add('open');document.body.classList.add('no-scroll');if(push)history.replaceState(null,'','#'+current);}
function close(){V.classList.remove('open');document.body.classList.remove('no-scroll');img.removeAttribute('src');history.replaceState(null,'',location.pathname);}
document.querySelectorAll('.project').forEach(el=>el.addEventListener('click',()=>openCard(el)));
document.getElementById('closeViewer').onclick=close;document.getElementById('zoomIn').onclick=()=>setZoom(zoom+.25);document.getElementById('zoomOut').onclick=()=>setZoom(zoom-.25);
document.addEventListener('keydown',e=>{if(e.key==='Escape')close();if(V.classList.contains('open')&&e.key==='+')setZoom(zoom+.25);if(V.classList.contains('open')&&e.key==='-')setZoom(zoom-.25)});
full.addEventListener('click',()=>{const p=['h','t','t','p','s',':'].join('');const h=['lathuongthang','.github','.io'].join('');window.open(p+'//'+h+'/transitlo/'+path,'_blank','noopener')});
if(location.hash){const id=location.hash.slice(1);if(map[id])setTimeout(()=>openCard(map[id],false),0)}
})();
