//const { SyncHook } = require('tapable');

// 发布订阅机制
class SyncHook {
  constructor(args) {
    this.args = args;
    this.argsLength = args ? args.length : 0;
    this.taps = [];
  }
  tap(name, fn) {
    this.taps.push({ name, fn });
  }
  call() {
    let args = Array.prototype.slice.call(arguments, 0, this.argsLength);
    this.taps.forEach((tap) => tap.fn(...args));
  }
}
let syncHook = new SyncHook(["aa"]);

// plugin订阅事件
syncHook.tap("语法监听器1", (value) => {
  console.log("语法监听器1", value);
});

class SyncPlugin {
  apply() {
    syncHook.tap("语法监听器2", (value) => {
      console.log("语法监听器2", value);
    });
  }
}
new SyncPlugin().apply();


// 便利到对应语法树 发布事件
SyncHook.call("名称");
