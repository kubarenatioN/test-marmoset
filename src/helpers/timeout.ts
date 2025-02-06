export const requestTimeout = (fn: () => void, delay: number) => {
  const start = new Date().getTime();
  let rafId: number | null = null;

  const cancel = () => {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  };

  const loop = () => {
    const delta = new Date().getTime() - start;

    if (delta >= delay) {
      fn();
      cancel(); // Automatically cancel after the function is executed
      return;
    }

    rafId = requestAnimationFrame(loop);
  };

  rafId = requestAnimationFrame(loop);

  return cancel;
};
