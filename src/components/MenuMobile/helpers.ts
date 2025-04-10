export interface PageScrollState {
  start: boolean;
  scrolledDown: boolean;
  y: number;
}

export function pageScrollReducer(
  state: PageScrollState,
  action: { y: number }
): PageScrollState {
  const { y } = action;

  const scrolledDown = state.y < y;

  if (y < 20) {
    return {
      start: true,
      scrolledDown,
      y,
    };
  }

  return {
    start: false,
    scrolledDown,
    y,
  };
}
