#include <napi.h>
#include "types.h"

namespace interactionapi {
  NativeWindowHandle getGameWindowHandle(const char* gameWindowName);
  void focusWindow(NativeWindowHandle window);
  void moveCursorA(NativeWindowHandle window, double x, double y);
  void moveCursorR(NativeWindowHandle window, double x, double y);
  void clickA(NativeWindowHandle window, double x, double y);
  void clickR(NativeWindowHandle window, double x, double y);
  void clickAndDragA(NativeWindowHandle window, double originX, double originY,
                    double destX, double destY);
  void clickAndDragR(NativeWindowHandle window, double originX, double originY,
                    double destX, double destY);
}  // namespace interactionapi