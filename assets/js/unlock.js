/* Login con Supabase para las secciones privadas (Diagnóstico y Proyectos).
   El contenido está en la tabla portfolio_private; solo lo leen usuarios logueados. */
(() => {
  const cfg = window.SUPABASE_CONFIG || {};
  const configured = cfg.url && cfg.anonKey && !cfg.url.startsWith('PEGAR') && !cfg.anonKey.startsWith('PEGAR');
  let sb = null;
  if (configured && window.supabase) sb = window.supabase.createClient(cfg.url, cfg.anonKey);

  const gates = () => [...document.querySelectorAll('[data-gate]')];
  const forms = () => [...document.querySelectorAll('[data-gate-form]')];
  const setMsg = (text) => forms().forEach(f => {
    const err = f.parentElement.querySelector('.gate__err');
    err.textContent = text; err.hidden = !text;
  });
  const setBusy = (busy) => forms().forEach(f => f.querySelector('button').disabled = busy);

  function unlockWith(content){
    gates().forEach(g => g.hidden = true);
    const dv = document.getElementById('diag-vault');
    if (dv){ dv.innerHTML = content.diag; dv.hidden = false; }
    const pv = document.getElementById('proj-vault');
    if (pv) pv.hidden = false;
    document.dispatchEvent(new CustomEvent('vault:unlocked', {detail:{projects: content.projects}}));
    const out = document.getElementById('logout');
    if (out) out.hidden = false;
  }

  async function loadContent(){
    const { data, error } = await sb.from('portfolio_private').select('content').eq('id', 'main').single();
    if (error || !data) throw error || new Error('sin contenido');
    return data.content;
  }

  async function tryRestore(){
    if (!sb) return;
    const { data } = await sb.auth.getSession();
    if (data && data.session){
      try { unlockWith(await loadContent()); } catch (e) { setMsg('No pudimos cargar el contenido. Probá recargar la página.'); }
    }
  }

  // Mensaje claro si todavía no se configuró Supabase
  if (!sb){
    document.addEventListener('DOMContentLoaded', () => setMsg('Esta parte todavía no está configurada. Falta cargar la URL y la clave de Supabase.'));
    forms().forEach(f => f.querySelectorAll('input,button').forEach(el => el.disabled = true));
    return;
  }

  forms().forEach(form => {
    const email = form.querySelector('input[type=email]');
    const pass = form.querySelector('input[type=password]');
    form.addEventListener('submit', async e => {
      e.preventDefault();
      setMsg(''); setBusy(true);
      const { data, error } = await sb.auth.signInWithPassword({ email: email.value.trim(), password: pass.value });
      if (error || !data.session){
        setBusy(false);
        setMsg('Email o contraseña incorrectos.');
        form.parentElement.classList.remove('is-shake'); void form.parentElement.offsetWidth;
        form.parentElement.classList.add('is-shake');
        pass.select();
        return;
      }
      try { unlockWith(await loadContent()); }
      catch (ex){ setMsg('Entraste, pero no pudimos cargar el contenido. Revisá las reglas de la tabla en Supabase.'); }
      setBusy(false);
    });
  });

  // Botón para cerrar sesión (opcional)
  const out = document.getElementById('logout');
  if (out) out.addEventListener('click', async () => { await sb.auth.signOut(); location.reload(); });

  tryRestore();
})();
