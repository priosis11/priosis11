/* 1. Fill contact details from contact.js */
(function(){
var C=window.CONTACT;
document.title=C.name+' – '+C.title;
var v={name:C.name,phoneDisplay:C.phoneDisplay,email:C.email,city:C.city,instagramHandle:C.instagramHandle,promoTitle:C.promo.title,promoText:C.promo.text,address:C.address,footerText:C.footerText,aboutText:C.aboutText,year:new Date().getFullYear()};
document.querySelectorAll('[data-c]').forEach(function(e){e.textContent=v[e.dataset.c]});
var L={tel:'tel:+'+C.whatsapp,mail:'mailto:'+C.email,whatsapp:'https://wa.me/'+C.whatsapp,instagram:C.instagram,facebook:C.facebook};
document.querySelectorAll('[data-link]').forEach(function(e){e.href=L[e.dataset.link]});

/* Videos: shown only if you add them in contact.js */
var vs=C.videos||[];
if(vs.length){
  var vg=document.getElementById('vgrid');
  vs.forEach(function(x){
    var d=document.createElement('div');d.className='glass vid rv';
    var vd=document.createElement('video');vd.controls=true;vd.preload='metadata';vd.src=x.src;if(x.poster)vd.poster=x.poster;
    d.appendChild(vd);
    if(x.title){var h3=document.createElement('h3');h3.textContent=x.title;d.appendChild(h3)}
    vg.appendChild(d);
  });
  if(C.videosHeading){document.getElementById('vtitle').textContent=C.videosHeading;document.getElementById('vhead').hidden=false}
  document.getElementById('videos').hidden=false;
  document.querySelectorAll('[data-sec="videos"]').forEach(function(e){e.hidden=false});
}

/* Service "Learn more" links -> WhatsApp with the service name */
document.querySelectorAll('[data-wa]').forEach(function(e){e.href='https://wa.me/'+C.whatsapp+'?text='+encodeURIComponent('Hello, I want to know about: '+e.dataset.wa)});

/* Hero: background video + auto-changing text (from contact.js) */
var H=C.hero||{},hero=document.getElementById('home'),hv=document.querySelector('.bgvid');
if(H.video){hv.querySelector('source').src=H.video;hv.load()}else hv.remove();
if(H.poster){hero.style.background='url("'+H.poster+'") center/cover no-repeat, #0b2a6b'}
var sl=document.querySelector('.slides'),dt=document.querySelector('.dots');
if(H.slides&&H.slides.length){
  sl.innerHTML='';dt.innerHTML='';
  H.slides.forEach(function(x,n){
    var d=document.createElement('div');d.className='slide'+(n?'':' on');
    var t1=document.createElement('h1');t1.textContent=x.title;
    var p=document.createElement('p');p.textContent=x.text;
    var a=document.createElement('a');a.className='btn pulse';a.href='#';a.setAttribute('data-quote','');
    a.appendChild(document.createTextNode((x.button||'Get Started')+' '));
    var ic=document.createElement('i');ic.className='fa-solid fa-arrow-right';a.appendChild(ic);
    d.appendChild(t1);d.appendChild(p);d.appendChild(a);sl.appendChild(d);
    var b=document.createElement('button');b.setAttribute('aria-label','Slide '+(n+1));if(!n)b.className='on';dt.appendChild(b);
  });
  if(H.slides.length<2){document.querySelectorAll('.arrow,.dots').forEach(function(e){e.hidden=true})}
}

/* Get a Quote popup */
var qm=document.getElementById('qmodal');
function openQ(e){e.preventDefault();qm.hidden=false;document.body.style.overflow='hidden'}
function closeQ(){qm.hidden=true;document.body.style.overflow=''}
document.querySelectorAll('[data-quote]').forEach(function(a){a.addEventListener('click',openQ)});
qm.addEventListener('click',function(e){if(e.target===qm||e.target.closest('.qclose'))closeQ()});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!qm.hidden)closeQ()});

/* Promo video banner + popup player */
var P=C.promo||{},pr=document.getElementById('promo');
if(P.poster)pr.style.backgroundImage='linear-gradient(rgba(7,24,66,.78),rgba(7,24,66,.78)),url("'+P.poster+'"),linear-gradient(120deg,#0b2a6b,#1457d9)';
var md=document.getElementById('modal'),mv=document.getElementById('mvid'),mh=document.getElementById('mhint');
function openV(){md.hidden=false;document.body.style.overflow='hidden';
  if(P.src){mv.hidden=false;mh.hidden=true;mv.src=P.src;mv.play().catch(function(){})}else{mv.hidden=true;mh.hidden=false}}
function closeV(){md.hidden=true;document.body.style.overflow='';mv.pause();mv.removeAttribute('src');mv.load()}
document.getElementById('playbtn').onclick=openV;
document.getElementById('playbig').onclick=openV;
md.onclick=function(e){if(e.target===md||e.target.closest('.mclose'))closeV()};
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!md.hidden)closeV()});

/* 2. Hero text slider */
var s=document.querySelectorAll('.slide'),d=document.querySelectorAll('.dots button'),i=0,t;
function go(n){s[i].classList.remove('on');d[i].classList.remove('on');i=(n+s.length)%s.length;s[i].classList.add('on');d[i].classList.add('on')}
function start(){clearInterval(t);t=setInterval(function(){go(i+1)},(H.interval||6000))}
d.forEach(function(b,n){b.onclick=function(){go(n);start()}});
document.querySelector('.prev').onclick=function(){go(i-1);start()};
document.querySelector('.next').onclick=function(){go(i+1);start()};
if(s.length>1)start();

/* 3. Mobile menu */
var m=document.getElementById('menu'),l=document.getElementById('links');
m.onclick=function(){var o=l.classList.toggle('open');m.setAttribute('aria-expanded',o)};
l.onclick=function(e){if(e.target.closest('a'))l.classList.remove('open')};

/* 4. Scroll reveal + counters */
function runCount(e){
  var n=+e.dataset.n,suf=e.dataset.suf===undefined?'+':e.dataset.suf,t0=null,dur=2200;
  cancelAnimationFrame(e._r);
  function step(t){if(!t0)t0=t;var p=Math.min(1,(t-t0)/dur);e.textContent=Math.round(n*p)+suf;if(p<1)e._r=requestAnimationFrame(step)}
  e._r=requestAnimationFrame(step);
}
function resetCount(e){cancelAnimationFrame(e._r);e.textContent='0'+(e.dataset.suf===undefined?'+':e.dataset.suf)}
function runAll(){document.querySelectorAll('[data-n]').forEach(runCount)}
function resetAll(){document.querySelectorAll('[data-n]').forEach(resetCount)}
if('IntersectionObserver' in window){
  var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{threshold:.15});
  document.querySelectorAll('.rv').forEach(function(e){io.observe(e)});
  var so=new IntersectionObserver(function(en){if(en[0].isIntersecting){runAll();so.disconnect()}},{threshold:.35});so.observe(document.querySelector('.stats'));
}else{document.querySelectorAll('.rv').forEach(function(e){e.classList.add('in')});runAll()}

/* 5. Back-to-top button */
var tt=document.getElementById('totop');
window.addEventListener('scroll',function(){tt.classList.toggle('show',window.scrollY>400)});

/* 6. Show a hint box when an image or video file is missing */
document.querySelectorAll('[data-ph]').forEach(function(box){
  var el=box.querySelector('img,video');
  var src=el.tagName==='VIDEO'?el.querySelector('source'):el;
  function miss(){box.classList.add('missing')}
  (src).addEventListener('error',miss);
  if(el.tagName==='IMG'&&el.complete&&el.naturalWidth===0)miss();
});

/* 7. Footer email box -> opens your mail app */
document.getElementById('sub').onsubmit=function(e){e.preventDefault();
  var mail=e.target.querySelector('input').value;
  window.location.href='mailto:'+C.email+'?subject='+encodeURIComponent('Please contact me')+'&body='+encodeURIComponent('My email: '+mail)};

})();
