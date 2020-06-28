#include <Windows.h>
#include <math.h>

#include <iostream>

#include "interaction_api.h"

void mouseClick() {
  INPUT Input = {0};
  Input.type = INPUT_MOUSE;
  Input.mi.dwFlags = MOUSEEVENTF_LEFTDOWN;
  SendInput(1, &Input, sizeof(INPUT));
}

void mouseRelease() {
  INPUT Input = {0};
  Input.type = INPUT_MOUSE;
  Input.mi.dwFlags = MOUSEEVENTF_LEFTUP;
  SendInput(1, &Input, sizeof(INPUT));
}

NativeWindowHandle getGameWindowHandle(const char* gameWindowHandle) {
  //TODO implentar
}

void interactionapi::focusWindow(NativeWindowHandle window) {
  bool pressed = false;
  if ((GetAsyncKeyState(VK_MENU) & 0x8000) == 0) {
    pressed = true;
    keybd_event(VK_MENU, 0, KEYEVENTF_EXTENDEDKEY | 0, 0);
  }

  SetForegroundWindow(window);
  SetFocus(window);

  if (pressed) {
    keybd_event(VK_MENU, 0, KEYEVENTF_EXTENDEDKEY | KEYEVENTF_KEYUP, 0);
  }
}

void interactionapi::moveCursorA(NativeWindowHandle window, double x,
                                 double y) {
  RECT gameWindowRect = {0};
  GetWindowRect(window, &gameWindowRect);
  SetCursorPos(gameWindowRect.left + x, gameWindowRect.top + y);
}

void interactionapi::moveCursorR(NativeWindowHandle window, double x,
                                 double y) {
  RECT gameWindowRect = {0};
  GetWindowRect(window, &gameWindowRect);
  int width = gameWindowRect.right - gameWindowRect.left;
  int heigth = gameWindowRect.bottom - gameWindowRect.top;
  int relativeX = width * x;
  int relativeY = heigth * y;
  interactionapi::moveCursorA(window, relativeX, relativeY);
}

void interactionapi::clickA(NativeWindowHandle window, double x, double y) {
  interactionapi::moveCursorA(window, x, y);
  Sleep(10);
  mouseClick();
  Sleep(10);
  mouseRelease();
  Sleep(10);
}

void interactionapi::clickR(NativeWindowHandle window, double x, double y) {
  interactionapi::moveCursorR(window, x, y);
  Sleep(10);
  mouseClick();
  Sleep(10);
  mouseRelease();
  Sleep(10);
}

void interactionapi::clickAndDragA(NativeWindowHandle window, double originX,
                                   double originY, double destX, double destY) {
  interactionapi::moveCursorA(window, originX, originY);
  Sleep(10);
  mouseClick();
  Sleep(10);
  interactionapi::moveCursorA(window, destX, destY);
  Sleep(10);
  mouseRelease();
  Sleep(10);
}

void interactionapi::clickAndDragR(NativeWindowHandle window, double originX,
                                   double originY, double destX, double destY) {
  interactionapi::moveCursorR(window, originX, originY);
  Sleep(10);
  mouseClick();
  Sleep(10);
  interactionapi::moveCursorR(window, destX, destY);
  Sleep(10);
  mouseRelease();
  Sleep(10);
}