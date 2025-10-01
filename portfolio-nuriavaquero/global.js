
/** Hidrata un header ya insertado en el DOM */
function initHeader(headerRoot){
  const nav    = headerRoot.querySelector('.nav');
  const abrir  = headerRoot.querySelector('#abrir');
  const cerrar = headerRoot.querySelector('#cerrar');
  if(!nav || !abrir || !cerrar) return;

  const openMenu  = () => { nav.classList.add('visible');  abrir.setAttribute('aria-expanded','true');  };
  const closeMenu = () => { nav.classList.remove('visible'); abrir.setAttribute('aria-expanded','false'); };

  abrir.addEventListener('click', openMenu);
  cerrar.addEventListener('click', closeMenu);

  // Cerrar al hacer click en el overlay vacío (opcional)
  nav.addEventListener('click', (e)=>{ if(e.target === nav) closeMenu(); });

  // Cerrar con Escape
  document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') closeMenu(); });
}

/** Carga un fragmento y llama a un callback cuando esté en el DOM */
function loadPartial(url, mountSelector, onLoaded){
  const mount = document.querySelector(mountSelector);
  if(!mount) return Promise.reject('Mount no encontrado: ' + mountSelector);
  return fetch(url)
    .then(r => r.text())
    .then(html => {
      mount.innerHTML = html;
      if(typeof onLoaded === 'function') onLoaded(mount.querySelector('[data-header]') || mount);
    });
}

// Auto-carga header si hay un #header en la página
document.addEventListener('DOMContentLoaded', () => {
  const hasHeaderMount = document.querySelector('#header');
  if(hasHeaderMount){
    loadPartial('/components/header.html', '#header', initHeader)
      .catch(err => console.error('Header error:', err));
  }
});

