#include <napi.h>
#include "interaction_api.h"
#include "types.h"

Napi::Buffer<NativeWindowHandle> getGameWindowHandle(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  if (info.Length() != 1) {
    Napi::TypeError::New(env, "Wrong number of arguments")
      .ThrowAsJavaScriptException();
  }
  if (!info[0].IsString()) {
    Napi::TypeError::New(env, "Argument must be of type String")
      .ThrowAsJavaScriptException();
  }

  std::string gameWindowName = info[0].As<Napi::String>();

  NativeWindowHandle handle = interactionapi::getGameWindowHandle(gameWindowName.c_str());
  return Napi::Buffer<NativeWindowHandle>::Copy(env, &handle, 1);
}

void focusWindow(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  if (info.Length() != 1) {
    Napi::TypeError::New(env, "Wrong number of arguments")
      .ThrowAsJavaScriptException();
  }
  if (!info[0].IsBuffer()) {
    Napi::TypeError::New(env, "Argument must be of type Buffer")
      .ThrowAsJavaScriptException();
  }
  Napi::Buffer<void *> handle = info[0].As<Napi::Buffer<void *>>();
  NativeWindowHandle win = static_cast<NativeWindowHandle>(*reinterpret_cast<void **>(handle.Data()));
  interactionapi::focusWindow(win);
}

void moveCursorA(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  if (info.Length() != 3) {
    Napi::TypeError::New(env, "Wrong number of arguments")
      .ThrowAsJavaScriptException();
  }
  if (!info[0].IsBuffer() || !info[1].IsNumber() || !info[2].IsNumber()) {
    Napi::TypeError::New(env, "Arguments must be of type Buffer, Double, Double")
      .ThrowAsJavaScriptException();
  }
  Napi::Buffer<void *> handle = info[0].As<Napi::Buffer<void *>>();
  NativeWindowHandle win = static_cast<NativeWindowHandle>(*reinterpret_cast<void **>(handle.Data()));
  double x = info[1].As<Napi::Number>().DoubleValue();
  double y = info[2].As<Napi::Number>().DoubleValue();
  interactionapi::moveCursorA(win, x, y);
}

void moveCursorR(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  if (info.Length() != 3) {
    Napi::TypeError::New(env, "Wrong number of arguments")
      .ThrowAsJavaScriptException();
  }
  if (!info[0].IsBuffer() || !info[1].IsNumber() || !info[2].IsNumber()) {
    Napi::TypeError::New(env, "Arguments must be of type Buffer, Double, Double")
      .ThrowAsJavaScriptException();
  }
  Napi::Buffer<void *> handle = info[0].As<Napi::Buffer<void *>>();
  NativeWindowHandle win = static_cast<NativeWindowHandle>(*reinterpret_cast<void **>(handle.Data()));
  double x = info[1].As<Napi::Number>().DoubleValue();
  double y = info[2].As<Napi::Number>().DoubleValue();
  interactionapi::moveCursorR(win, x, y);
}

void clickA(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  if (info.Length() != 3) {
    Napi::TypeError::New(env, "Wrong number of arguments")
      .ThrowAsJavaScriptException();
  }
  if (!info[0].IsBuffer() || !info[1].IsNumber() || !info[2].IsNumber()) {
    Napi::TypeError::New(env, "Arguments must be of type Buffer, Double, Double")
      .ThrowAsJavaScriptException();
  }
  Napi::Buffer<void *> handle = info[0].As<Napi::Buffer<void *>>();
  NativeWindowHandle win = static_cast<NativeWindowHandle>(*reinterpret_cast<void **>(handle.Data()));
  double x = info[1].As<Napi::Number>().DoubleValue();
  double y = info[2].As<Napi::Number>().DoubleValue();
  interactionapi::clickA(win, x, y);
}

void clickR(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  if (info.Length() != 3) {
    Napi::TypeError::New(env, "Wrong number of arguments")
      .ThrowAsJavaScriptException();
  }
  if (!info[0].IsBuffer() || !info[1].IsNumber() || !info[2].IsNumber()) {
    Napi::TypeError::New(env, "Arguments must be of type Buffer, Double, Double")
      .ThrowAsJavaScriptException();
  }
  Napi::Buffer<void *> handle = info[0].As<Napi::Buffer<void *>>();
  NativeWindowHandle win = static_cast<NativeWindowHandle>(*reinterpret_cast<void **>(handle.Data()));
  double x = info[1].As<Napi::Number>().DoubleValue();
  double y = info[2].As<Napi::Number>().DoubleValue();
  interactionapi::clickR(win, x, y);
}

void clickAndDragA(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  if (info.Length() != 5) {
    Napi::TypeError::New(env, "Wrong number of arguments")
      .ThrowAsJavaScriptException();
  }
  if (!info[0].IsBuffer() || !info[1].IsNumber() || !info[2].IsNumber()|| !info[3].IsNumber()|| !info[4].IsNumber()) {
    Napi::TypeError::New(env, "Arguments must be of type Buffer, Double, Double, Double, Double")
      .ThrowAsJavaScriptException();
  }
  Napi::Buffer<void *> handle = info[0].As<Napi::Buffer<void *>>();
  NativeWindowHandle win = static_cast<NativeWindowHandle>(*reinterpret_cast<void **>(handle.Data()));
  double originX = info[1].As<Napi::Number>().DoubleValue();
  double originY = info[2].As<Napi::Number>().DoubleValue();
  double destX = info[3].As<Napi::Number>().DoubleValue();
  double destY = info[4].As<Napi::Number>().DoubleValue();
  interactionapi::clickAndDragA(win, originX, originY, destX, destY);
}

void clickAndDragR(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  if (info.Length() != 5) {
    Napi::TypeError::New(env, "Wrong number of arguments")
      .ThrowAsJavaScriptException();
  }
  if (!info[0].IsBuffer() || !info[1].IsNumber() || !info[2].IsNumber()|| !info[3].IsNumber()|| !info[4].IsNumber()) {
    Napi::TypeError::New(env, "Arguments must be of type Buffer, Double, Double, Double, Double")
      .ThrowAsJavaScriptException();
  }
  Napi::Buffer<void *> handle = info[0].As<Napi::Buffer<void *>>();
  NativeWindowHandle win = static_cast<NativeWindowHandle>(*reinterpret_cast<void **>(handle.Data()));
  double originX = info[1].As<Napi::Number>().DoubleValue();
  double originY = info[2].As<Napi::Number>().DoubleValue();
  double destX = info[3].As<Napi::Number>().DoubleValue();
  double destY = info[4].As<Napi::Number>().DoubleValue();
  interactionapi::clickAndDragR(win, originX, originY, destX, destY);
}

Napi::Object exportFunctions(Napi::Env env, Napi::Object exports) {
  exports.Set("getGameWindowHandle", Napi::Function::New(env, getGameWindowHandle));
  exports.Set("focusWindow", Napi::Function::New(env, focusWindow));
  exports.Set("moveCursorA", Napi::Function::New(env, moveCursorA));
  exports.Set("moveCursorR", Napi::Function::New(env, moveCursorR));
  exports.Set("clickA", Napi::Function::New(env, clickA));
  exports.Set("clickR", Napi::Function::New(env, clickR));
  exports.Set("clickAndDragA", Napi::Function::New(env, clickAndDragA));
  exports.Set("clickAndDragR", Napi::Function::New(env, clickAndDragR));
  return exports;
}

NODE_API_MODULE(interaction_api, exportFunctions);