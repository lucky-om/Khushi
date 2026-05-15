/* ================================================================
   Happy Birthday Khushi — Birthday Surprise 2026
   © Lucky | khushi.luckyverse.tech/birthday2026
   Protected — Unauthorized use & copying strictly prohibited.
================================================================ */

(function () {
    'use strict';

    /* ============================================================
       SECTION 1 — SECURITY & ANTI-THEFT
    ============================================================ */

    // 1. Block right-click
    document.addEventListener('contextmenu', function (e) { e.preventDefault(); return false; });

    // 2. Block keyboard shortcuts
    document.addEventListener('keydown', function (e) {
        if (
            e.key === 'F12' ||
            e.key === 'F11' ||
            (e.ctrlKey && ['u','U','s','S','a','A','c','C','p','P','i','I'].includes(e.key)) ||
            (e.ctrlKey && e.shiftKey && ['i','I','j','J','c','C','k','K'].includes(e.key)) ||
            (e.metaKey && ['u','U','s','S','a','A','c','C'].includes(e.key))
        ) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    });

    // 3. Disable drag & text selection
    document.addEventListener('selectstart', function (e) { e.preventDefault(); });
    document.addEventListener('dragstart',   function (e) { e.preventDefault(); });

    // 4. Disable print (Ctrl+P handled above, also via media)
    window.addEventListener('beforeprint', function (e) { e.preventDefault(); window.stop(); });

    // 5. Console warning — deters casual devtools users
    setTimeout(function () {
        console.clear();
        console.log('%c⛔ STOP!', 'color:#ff0000;font-size:52px;font-weight:bold;');
        console.log(
            '%c© khushi.luckyverse.tech | Protected Content\nUnauthorized copying is strictly prohibited.',
            'color:#8a2be2;font-size:15px;font-weight:600;'
        );
        console.log('%cThis birthday surprise was made with ❤ by Lucky.', 'color:#dda0dd;font-size:13px;');
    }, 800);

    // 6. DevTools size detection — shows overlay when open
    (function devToolsGuard() {
        var warned = false;
        var overlay = null;

        function showOverlay() {
            if (overlay) return;
            overlay = document.createElement('div');
            overlay.style.cssText = [
                'position:fixed;inset:0;z-index:999999',
                'background:#000;color:#8a2be2',
                'display:flex;flex-direction:column;align-items:center;justify-content:center',
                'font-family:Arial,sans-serif;text-align:center;padding:20px'
            ].join(';');
            overlay.innerHTML = '<div style="font-size:clamp(40px,10vw,80px)">⛔</div>' +
                '<div style="font-size:clamp(18px,4vw,28px);margin:16px 0;font-weight:700">Access Restricted</div>' +
                '<div style="font-size:clamp(13px,3vw,16px);color:#dda0dd">Please close Developer Tools to continue.</div>';
            document.body.appendChild(overlay);
        }

        function hideOverlay() {
            if (overlay && overlay.parentNode) { overlay.parentNode.removeChild(overlay); overlay = null; }
        }

        setInterval(function () {
            var threshold = 160;
            var w = window.outerWidth  - window.innerWidth  > threshold;
            var h = window.outerHeight - window.innerHeight > threshold;
            if (w || h) { warned = true; showOverlay(); }
            else         { warned = false; hideOverlay(); }
        }, 1000);
    })();


    /* ============================================================
       SECTION 2 — CONFIGURATION (edit here to customise)
    ============================================================ */
    var CONFIG = {
        matrixText:    'HAPPYBIRTHDAYKHUSHI',
        matrixColor1:  '#87ceeb',   // cool blue light
        matrixColor2:  '#4169e1',   // royal blue dark
        countdownFrom: 3,
        words:         ['HAPPY', 'BIRTHDAY', 'TO', 'YOU', 'KHUSHI ❤'],
        wordDelay:     1400         // ms between each word
    };


    /* ============================================================
       SECTION 3 — MATRIX RAIN
    ============================================================ */
    (function initMatrix() {
        var canvas = document.getElementById('matrix-rain');
        var ctx    = canvas.getContext('2d');
        var chars  = CONFIG.matrixText.split('');
        var cols, drops, fontSize;

        function resize() {
            canvas.width  = window.innerWidth;
            canvas.height = window.innerHeight;
            fontSize = Math.max(12, Math.floor(Math.min(window.innerWidth, window.innerHeight) / 40));
            cols  = Math.floor(canvas.width / fontSize);
            drops = [];
            for (var i = 0; i < cols; i++) drops[i] = 1;
        }

        function draw() {
            ctx.fillStyle = 'rgba(0,0,0,0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.font = fontSize + 'px monospace';
            for (var i = 0; i < cols; i++) {
                ctx.fillStyle = i % 2 === 0 ? CONFIG.matrixColor1 : CONFIG.matrixColor2;
                var ch = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(ch, i * fontSize, drops[i] * fontSize);
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
                drops[i]++;
            }
            requestAnimationFrame(draw);
        }

        window.addEventListener('resize', resize);
        resize();
        draw();
    })();


    /* ============================================================
       SECTION 4 — HELPERS
    ============================================================ */
    function spawnHeart() {
        var el = document.createElement('span');
        el.className = 'floatheart';
        el.textContent = '❤';
        el.style.left     = (Math.random() * 95) + 'vw';
        el.style.bottom   = '-30px';
        el.style.color    = 'hsl(' + (200 + Math.random() * 30) + ',80%,' + (55 + Math.random() * 25) + '%)';
        el.style.fontSize = (16 + Math.random() * 18) + 'px';
        document.body.appendChild(el);
        setTimeout(function () { el.parentNode && el.parentNode.removeChild(el); }, 4200);
    }

    function launchFirework(x, y) {
        var fw     = document.getElementById('fireworks');
        var colors = ['#87ceeb','#4169e1','#1e90ff','#b0d4ff','#fff','#63a9e8'];
        for (var i = 0; i < 28; i++) {
            var s     = document.createElement('div');
            s.className = 'spark';
            var angle = (i / 28) * Math.PI * 2;
            var dist  = 60 + Math.random() * 80;
            s.style.setProperty('--dx',  (Math.cos(angle) * dist) + 'px');
            s.style.setProperty('--dy',  (Math.sin(angle) * dist) + 'px');
            s.style.setProperty('--dur', (0.8 + Math.random() * 0.7) + 's');
            s.style.left       = x + 'px';
            s.style.top        = y + 'px';
            s.style.background = colors[Math.floor(Math.random() * colors.length)];
            fw.appendChild(s);
            (function (el) { setTimeout(function () { el.parentNode && el.parentNode.removeChild(el); }, 1600); })(s);
        }
    }

    function burstFireworks() {
        for (var i = 0; i < 6; i++) {
            (function (idx) {
                setTimeout(function () {
                    launchFirework(
                        100 + Math.random() * (window.innerWidth  - 200),
                        80  + Math.random() * (window.innerHeight - 160)
                    );
                }, idx * 300);
            })(i);
        }
    }


    /* ============================================================
       SECTION 5 — MAIN BIRTHDAY SEQUENCE
    ============================================================ */
    function runSequence() {
        var cdEl    = document.getElementById('countdown');
        var textBox = document.getElementById('textDisplay');
        var textEl  = document.getElementById('textContent');
        var gifEl   = document.getElementById('giftGif');
        var t       = 0;

        /* Phase 1 — Countdown 3 → 2 → 1 */
        for (var n = CONFIG.countdownFrom; n >= 1; n--) {
            (function (num, delay) {
                setTimeout(function () {
                    cdEl.textContent = num;
                    cdEl.classList.add('show');
                }, delay);
            })(n, t);
            t += 1000;
        }
        setTimeout(function () { cdEl.classList.remove('show'); cdEl.textContent = ''; }, t);
        t += 400;

        /* Phase 2 — Text card + words one-by-one */
        setTimeout(function () { textBox.classList.add('show'); textEl.textContent = ''; }, t);
        t += 300;

        // Floating hearts during text phase
        (function (start) {
            setTimeout(function () {
                var hi = setInterval(spawnHeart, 700);
                setTimeout(function () { clearInterval(hi); }, CONFIG.words.length * CONFIG.wordDelay + 2000);
            }, start);
        })(t);

        CONFIG.words.forEach(function (word, idx) {
            (function (w, delay) {
                setTimeout(function () { textEl.textContent = w; }, delay);
            })(word, t + idx * CONFIG.wordDelay);
        });
        t += CONFIG.words.length * CONFIG.wordDelay + 800;

        /* Phase 3 — All words together */
        setTimeout(function () { textEl.textContent = CONFIG.words.join('  '); }, t);
        t += 1200;

        /* Phase 4 — Fireworks */
        setTimeout(burstFireworks, t);
        t += 800;

        /* Phase 5 — Hide card, show GIF, loop fireworks + hearts */
        setTimeout(function () {
            textBox.style.opacity = '0';
            setTimeout(function () { textBox.classList.remove('show'); textBox.style.opacity = ''; }, 600);

            gifEl.classList.add('show');

            setInterval(burstFireworks, 1800);
            setInterval(spawnHeart,    400);
        }, t);
    }

    /* Start on load */
    window.addEventListener('load', function () {
        setTimeout(runSequence, 800);
    });

})();
