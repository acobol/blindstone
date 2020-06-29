// eslint-disable-next-line @typescript-eslint/no-var-requires
const addon = require("./build/Release/interactionapi.node");

export const getGameWindowHandle: (gameWindowName: string) => Buffer =
  addon.getGameWindowHandle;
export const focusWindow: (handle: Buffer) => void = addon.focusWindow;
export const moveCursorA: (handle: Buffer, x: number, y: number) => void =
  addon.moveCursorA;
export const moveCursorR: (handle: Buffer, x: number, y: number) => void =
  addon.moveCursorR;
export const clickA: (handle: Buffer, x: number, y: number) => void =
  addon.clickA;
export const clickR: (handle: Buffer, x: number, y: number) => void =
  addon.clickR;
export const clickAndDragA: (handle: Buffer, x: number, y: number) => void =
  addon.clickAndDragA;
export const clickAndDragR: (handle: Buffer, x: number, y: number) => void =
  addon.clickAndDragR;
