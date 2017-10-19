import el from './el';



export default (src, async = true) => {
  const script = el('script', { type: 'text/javascript', async, src });

  const scripts = window.document.getElementsByTagName('script')[0];

  if (scripts.length) {
    const siblingScript = scripts[scripts.length - 1];

    siblingScript.parentNode.insertBefore(script, siblingScript);
  } else {
    document.body.appendChild(script);
  }

  return script;
};
