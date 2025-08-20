// SW 註冊
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js', { scope: './' });
  });
}

// 面板切換（hash 導航）
function showPanel(id){
  document.querySelectorAll('.panel').forEach(p => p.classList.add('hidden'));
  const el = document.querySelector(id);
  if(el) el.classList.remove('hidden');
}
window.addEventListener('hashchange', () => showPanel(location.hash || '#'));
showPanel(location.hash || '#');

// 首次進站免責
(function(){
  try {
    const agreed = localStorage.getItem('ag_disclaimer_ok') === '1';
    const overlay = document.getElementById('disclaimer');
    if(!agreed){
      overlay.classList.remove('hidden');
      document.getElementById('agreeBtn').addEventListener('click', () => {
        try{ localStorage.setItem('ag_disclaimer_ok', '1'); }catch(e){}
        overlay.classList.add('hidden');
      });
    }
  } catch(e){}
})();

// 訪問計數器（total + session）
(function(){
  const LS = {
    get(k, def){ try{ return JSON.parse(localStorage.getItem(k)) ?? def; }catch(e){ return def; } },
    set(k, v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} }
  };
  const total = (LS.get('ag_total', 0) || 0) + 1;
  const session = (sessionStorage.getItem('ag_session') ? Number(sessionStorage.getItem('ag_session')) : 0) + 1;

  LS.set('ag_total', total);
  try{ sessionStorage.setItem('ag_session', String(session)); }catch(e){}

  const $total = document.querySelector('[data-counter="total"]');
  const $session = document.querySelector('[data-counter="session"]');
  if($total) $total.textContent = total.toLocaleString();
  if($session) $session.textContent = session.toLocaleString();
})();

// 冥想播放 + 倒數
(function(){
  const audio = document.getElementById('audio');
  const playBtn = document.getElementById('playBtn');
  const pauseBtn = document.getElementById('pauseBtn');
  const countdown = document.getElementById('countdown');

  let dur = 5 * 60; // 300 秒
  let left = dur;
  let t = null;

  function fmt(sec){
    const m = Math.floor(sec/60).toString().padStart(2,'0');
    const s = Math.floor(sec%60).toString().padStart(2,'0');
    return `${m}:${s}`;
  }
  countdown.textContent = fmt(left);

  function tick(){
    left = Math.max(0, left - 1);
    countdown.textContent = fmt(left);
    if(left === 0){
      clearInterval(t); t = null;
      audio.pause(); audio.currentTime = 0;
    }
  }

  playBtn.addEventListener('click', async () => {
    try{ await audio.play(); }catch(e){ /* iOS 需使用者互動 */ }
    if(t) clearInterval(t);
    t = setInterval(tick, 1000);
  });
  pauseBtn.addEventListener('click', () => {
    audio.pause();
    if(t){ clearInterval(t); t = null; }
  });

  // 導航到冥想自動聚焦球
  document.getElementById('goMeditate').addEventListener('click', () => {
    setTimeout(() => {
      const ball = document.querySelector('.glow-ball');
      if(ball) ball.scrollIntoView({behavior:'smooth', block:'center'});
    }, 0);
  });
})();

// 緊急支援卡片載入
(async function(){
  try{
    const res = await fetch('./data/emergency.json', {cache:'reload'});
    const data = await res.json();
    const wrap = document.getElementById('cards');
    wrap.innerHTML = '';
    data.forEach(item => {
      const card = document.createElement('article');
      card.className = 'card';
      card.innerHTML = `
        <h3>${item.title}</h3>
        <p>${item.desc}</p>
        ${item.actions?.map(a => `<a class="btn-secondary" href="${a.href}" target="_blank" rel="noopener">${a.label}</a>`).join('') || ''}
      `;
      wrap.appendChild(card);
    });
  }catch(e){ /* 略過 */ }
})();
