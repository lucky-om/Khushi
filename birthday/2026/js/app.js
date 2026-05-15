/* Happy Birthday Khushi 2026 */
(function(){
'use strict';

/* ── CONFIG ── */
var BIRTH_YEAR = 2003;
var PHOTOS = [
  { src:'photos/photo1.jpg', cap:'Khushi 💙' },
  { src:'photos/photo2.jpg', cap:'My Bestie 🌸' },
  { src:'photos/photo3.jpg', cap:'Always Smiling ✨' },
  { src:'photos/photo4.jpg', cap:'My Favourite Human 🌷' },
  { src:'photos/photo5.jpg', cap:'Happy Birthday! 🎂' }
];
var CONFIG = {
  matrixText:'HAPPYBIRTHDAYKHUSHI',
  matrixColor1:'#87ceeb', matrixColor2:'#4169e1',
  countdownFrom:3,
  words:['HAPPY','BIRTHDAY','TO','MY BESTFRIEND 💙','KHUSHI 🌷'],
  wordDelay:1400
};

/* ── INIT ── */
document.getElementById('ageText').textContent = new Date().getFullYear() - BIRTH_YEAR;
var music = document.getElementById('bgMusic');
music.volume = 0.45;

/* ── SECTION SWITCHER ── */
function show(id) {
  document.querySelectorAll('.sec').forEach(function(s){ s.classList.add('hidden'); });
  var el = document.getElementById(id);
  el.classList.remove('hidden');
  if (el.classList.contains('scrollable')) el.scrollTop = 0;
}

/* ── MATRIX RAIN ── */
  var matrixStarted = false;
function initMatrix() {
  if (matrixStarted) return; matrixStarted = true;
  var canvas = document.getElementById('matrix-rain');
  var ctx = canvas.getContext('2d');
  var chars = CONFIG.matrixText.split('');
  var cols, drops, fontSize;
  function resize() {
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    fontSize = Math.max(18, Math.floor(Math.min(window.innerWidth, window.innerHeight) / 22));
    cols = Math.floor(canvas.width / fontSize);
    drops = []; for (var i = 0; i < cols; i++) drops[i] = 1;
  }
  function draw() {
    ctx.fillStyle = 'rgba(0,0,0,0.05)'; ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.font = fontSize + 'px monospace';
    for (var i = 0; i < cols; i++) {
      ctx.fillStyle = i % 2 === 0 ? CONFIG.matrixColor1 : CONFIG.matrixColor2;
      ctx.fillText(chars[Math.floor(Math.random()*chars.length)], i*fontSize, drops[i]*fontSize);
      if (drops[i]*fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
    setTimeout(function(){ requestAnimationFrame(draw); }, 60); // Slower speed
  }
  window.addEventListener('resize', resize); resize(); draw();
}

/* ── HELPERS ── */
function spawnHeart() {
  var el = document.createElement('span');
  el.className = 'floatheart'; el.textContent = '❤';
  el.style.left = (Math.random()*94)+'vw'; el.style.bottom = '-30px';
  el.style.color = 'hsl('+(200+Math.random()*30)+',80%,'+(55+Math.random()*25)+'%)';
  el.style.fontSize = (14+Math.random()*16)+'px';
  document.getElementById('s2').appendChild(el);
  setTimeout(function(){ el.parentNode && el.parentNode.removeChild(el); }, 4200);
}
function launchFirework(x,y) {
  var fw = document.getElementById('fireworks');
  var colors = ['#87ceeb','#4169e1','#1e90ff','#b0d4ff','#fff','#63a9e8'];
  for (var i = 0; i < 26; i++) {
    var s = document.createElement('div'); s.className = 'spark';
    var angle = (i/26)*Math.PI*2, dist = 55+Math.random()*75;
    s.style.setProperty('--dx',(Math.cos(angle)*dist)+'px');
    s.style.setProperty('--dy',(Math.sin(angle)*dist)+'px');
    s.style.setProperty('--dur',(0.8+Math.random()*0.7)+'s');
    s.style.left = x+'px'; s.style.top = y+'px';
    s.style.background = colors[Math.floor(Math.random()*colors.length)];
    fw.appendChild(s);
    (function(el){ setTimeout(function(){ el.parentNode && el.parentNode.removeChild(el); },1600); })(s);
  }
}
function burstFireworks() {
  for (var i = 0; i < 6; i++) {
    (function(idx){ setTimeout(function(){
      launchFirework(100+Math.random()*(window.innerWidth-200), 80+Math.random()*(window.innerHeight-160));
    }, idx*300); })(i);
  }
}

/* ── SEQUENCE (S2) ── */
function runSequence() {
  var cdEl = document.getElementById('countdown');
  var textBox = document.getElementById('textDisplay');
  var textEl = document.getElementById('textContent');
  var gifEl = document.getElementById('giftGif');
  var t = 0;
  for (var n = CONFIG.countdownFrom; n >= 1; n--) {
    (function(num, delay){ setTimeout(function(){ cdEl.textContent=num; cdEl.classList.add('show'); }, delay); })(n, t);
    t += 1000;
  }
  setTimeout(function(){ cdEl.classList.remove('show'); cdEl.textContent=''; }, t); t += 400;
  setTimeout(function(){ textBox.classList.add('show'); textEl.textContent=''; }, t); t += 300;
  (function(start){ setTimeout(function(){
    var hi = setInterval(spawnHeart, 700);
    setTimeout(function(){ clearInterval(hi); }, CONFIG.words.length*CONFIG.wordDelay+2000);
  }, start); })(t);
  CONFIG.words.forEach(function(word, idx){
    (function(w,d){ setTimeout(function(){ textEl.textContent = w; }, d); })(word, t+idx*CONFIG.wordDelay);
  });
  t += CONFIG.words.length*CONFIG.wordDelay+800;
  setTimeout(function(){ textEl.textContent = CONFIG.words.join('  '); }, t); t += 1200;
  setTimeout(burstFireworks, t); t += 800;
  setTimeout(function(){
    textBox.style.opacity = '0';
    setTimeout(function(){ textBox.classList.remove('show'); textBox.style.opacity=''; }, 600);
    gifEl.classList.add('show');
    setInterval(burstFireworks, 1800);
    setInterval(spawnHeart, 400);
    setTimeout(function(){ document.getElementById('gifNext').classList.add('show'); }, 2600);
  }, t);
}

/* ── GALLERY (S3) ── */
function buildGallery() {
  var container = document.getElementById('stackGallery');
  var nextBtn = document.getElementById('galleryNext');
  container.innerHTML = '';
  
  var cards = [];
  var total = PHOTOS.length;
  var clicks = 0;

  PHOTOS.forEach(function(p, i) {
    var card = document.createElement('div');
    card.className = 'polaroid photo-glow stack-card';
    card.style.zIndex = total - i;
    
    // Add random slight rotation for stack effect
    var rot = (Math.random() * 8) - 4; 
    card.style.setProperty('--rot', rot + 'deg');
    card.style.transform = 'rotate(' + rot + 'deg)';
    
    var img = new Image();
    img.src = p.src;
    img.alt = p.cap;
    img.style.opacity = '1';
    
    var placeholder = document.createElement('div');
    placeholder.className = 'ph-placeholder';
    placeholder.innerHTML = '<span>🖼️</span><p>Add your photos to<br><strong>photos/</strong> folder</p>';
    
    img.onload = function() { placeholder.style.display = 'none'; };
    img.onerror = function() { img.style.display = 'none'; placeholder.style.display = 'flex'; };

    var cap = document.createElement('p');
    cap.className = 'pcap';
    cap.textContent = p.cap;

    card.appendChild(img);
    card.appendChild(placeholder);
    card.appendChild(cap);
    container.appendChild(card);
    cards.push(card);

    card.addEventListener('click', function() {
      clicks++;
      if(clicks >= total - 1) {
        nextBtn.style.display = 'inline-flex';
      }
      // Animate card going to back
      card.style.transform = 'translateX(120%) rotate(' + (rot + 15) + 'deg)';
      card.style.opacity = '0';
      
      setTimeout(function() {
        container.prepend(card); // move to bottom of DOM
        cards.forEach(function(c, idx) {
           // Recalculate z-index: first in DOM is lowest z-index
           c.style.zIndex = Array.from(container.children).indexOf(c);
        });
        card.style.transform = 'translateX(0) rotate(' + rot + 'deg)';
        card.style.opacity = '1';
      }, 300);
    });
  });
}
var galleryBuilt = false;

/* ── STARS ── */
var starsBuilt = {};
function initStars(containerId) {
  if (starsBuilt[containerId]) return;
  starsBuilt[containerId] = true;
  var c = document.getElementById(containerId);
  if (!c) return;
  for (var i = 0; i < 100; i++) {
    var s = document.createElement('div'); s.className = 'star';
    var sz = Math.random()*2.5+0.5;
    s.style.cssText='width:'+sz+'px;height:'+sz+'px;left:'+Math.random()*100+'%;top:'+Math.random()*100+'%;--d:'+(2+Math.random()*4)+'s;--dl:-'+(Math.random()*4)+'s';
    c.appendChild(s);
  }
}

/* ── BUTTON EVENTS ── */
document.getElementById('startBtn').addEventListener('click', function(){
  music.play().catch(function(){});
  show('s2'); initMatrix(); setTimeout(runSequence, 800);
});

document.getElementById('gifNext').addEventListener('click', function(){
  if (!galleryBuilt) { buildGallery(); galleryBuilt = true; }
  show('s3');
});

document.getElementById('galleryNext').addEventListener('click', function(){
  initStars('cakeStars');
  show('s4');
});

document.getElementById('cakeNext').addEventListener('click', function(){
  initStars('stars');
  show('s5');
});

document.getElementById('letterNext').addEventListener('click', function(){
  initStars('s6Stars');
  show('s6');
});

document.getElementById('replayBtn').addEventListener('click', function(){
  show('s1'); music.currentTime=0; music.play().catch(function(){});
});

})();
