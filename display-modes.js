/* Device layout is independent of campaign saves. No orientation lock is required. */
(()=>{
  'use strict';
  const root=document.documentElement;
  let preferred=matchMedia('(max-width: 760px)').matches?'portrait':'landscape';
  try{const saved=localStorage.getItem('mpm_display_mode');if(['portrait','landscape'].includes(saved))preferred=saved;}catch(_){}
  function apply(){
    // A small window must stay usable even when the laptop option was selected.
    root.dataset.displayMode=preferred;
    root.dataset.layout=preferred==='portrait'||innerWidth<760?'portrait':'landscape';
    root.style.setProperty('--app-height',`${Math.round(window.visualViewport?.height||innerHeight)}px`);
    document.querySelectorAll('[data-display-option]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.displayOption===preferred)));
    const tutorial=document.querySelector('.v3-tutorial-card p');
    if(tutorial)tutorial.textContent=root.dataset.layout==='portrait'?'Tahan tombol arah di kiri bawah untuk bergerak. Ketuk AKSI saat dekat objek atau warga.':'Gunakan WASD atau tombol panah. Tahan Shift untuk berlari. Tekan E untuk berinteraksi.';
    const action=document.getElementById('actionButton');if(action)action.textContent=root.dataset.layout==='portrait'?'AKSI':'E';
    window.dispatchEvent(new Event('mpm:layout'));
    window.MPM_PERF_STAGE17?.refreshCamera?.();
  }
  function select(mode){if(!['portrait','landscape'].includes(mode))return;preferred=mode;try{localStorage.setItem('mpm_display_mode',mode)}catch(_){}apply();window.dispatchEvent(new Event('resize'));}
  const card=document.createElement('div');card.className='display-settings';
  card.innerHTML='<strong>Tampilan permainan</strong><div><button type="button" data-display-option="landscape">💻 Laptop · Landscape</button><button type="button" data-display-option="portrait">📱 HP · Potret</button></div><small>Pilihan ini tidak mengubah progres misi.</small>';
  document.querySelector('.pause-card .settings-grid')?.after(card);
  card.addEventListener('click',e=>{const b=e.target.closest('[data-display-option]');if(b)select(b.dataset.displayOption)});
  const actions=document.querySelector('.hud-actions');if(actions){actions.setAttribute('aria-label','Menu permainan — geser ke samping untuk pilihan lainnya');actions.setAttribute('role','navigation');}
  window.MPM_DISPLAY=Object.freeze({select,state:()=>({preferred,layout:root.dataset.layout})});
  window.addEventListener('resize',apply);window.visualViewport?.addEventListener('resize',apply);
  apply();
})();
