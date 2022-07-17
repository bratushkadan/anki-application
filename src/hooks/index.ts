import {useState, useEffect, useLayoutEffect} from "react";

function useTopWindowOffset(initialState: any, ref: any) {
  const [offset, setOffset] = useState(initialState);

  useLayoutEffect(() => {
    setOffset(Math.ceil(ref.current.getBoundingClientRect().top) + 'px');
  }, [ref])

  return offset;
}

function useShortcut(callback: any, shortcutKeys: any, deps: any) {
  let keysSet = new Set();

  let timeout: NodeJS.Timeout;

  function handler(e: any) {
    clearTimeout(timeout);

    keysSet.add(e.code.toLowerCase().replace('left', '').replace('key', ''));
    shortcutKeys = shortcutKeys.map((key: string) => key.toLowerCase());
    let cond = shortcutKeys.every((key: string) => keysSet.has(key));
    if (cond) {
      callback();
      keysSet.clear();
    }
    timeout = setTimeout(() => keysSet.clear(), 400)
  }

  useEffect(() => {
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, deps);
}

export { useTopWindowOffset, useShortcut };