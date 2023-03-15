// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/components/userComponent.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var UserComponent = /*#__PURE__*/function () {
  /**
   * @param {Phaser.GameObjects.GameObject} gameObject The entity.
   */
  function UserComponent(gameObject) {
    var _this = this;
    _classCallCheck(this, UserComponent);
    /** @type {Phaser.Scene} */
    _defineProperty(this, "scene", void 0);
    this.scene = gameObject.scene;
    var listenAwake = this.awake !== UserComponent.prototype.awake;
    var listenStart = this.start !== UserComponent.prototype.start;
    var listenUpdate = this.update !== UserComponent.prototype.update;
    var listenDestroy = this.destroy !== UserComponent.prototype.destroy;
    if (listenAwake) {
      this.scene.events.once("scene-awake", this.awake, this);
    }
    if (listenStart) {
      this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.start, this);
    }
    if (listenUpdate) {
      this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }
    if (listenStart || listenUpdate || listenDestroy) {
      gameObject.on(Phaser.GameObjects.Events.DESTROY, function () {
        _this.scene.events.off(Phaser.Scenes.Events.UPDATE, _this.start, _this);
        _this.scene.events.off(Phaser.Scenes.Events.UPDATE, _this.update, _this);
        if (listenDestroy) {
          _this.destroy();
        }
      });
    }
  }
  _createClass(UserComponent, [{
    key: "awake",
    value: function awake() {
      // override this
    }
  }, {
    key: "start",
    value: function start() {
      // override this
    }
  }, {
    key: "update",
    value: function update() {
      // override this
    }
  }, {
    key: "destroy",
    value: function destroy() {
      // override this
    }
  }]);
  return UserComponent;
}();
exports.default = UserComponent;
},{}],"src/components/FloatAnim.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _userComponent2 = _interopRequireDefault(require("./userComponent.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var FloatAnim = /*#__PURE__*/function (_userComponent) {
  _inherits(FloatAnim, _userComponent);
  var _super = _createSuper(FloatAnim);
  function FloatAnim(gameObject) {
    var _this;
    _classCallCheck(this, FloatAnim);
    _this = _super.call(this, gameObject);
    /** @type {Phaser.GameObjects.Image} */
    _defineProperty(_assertThisInitialized(_this), "gameObject", void 0);
    _this.gameObject = gameObject;
    gameObject["__FloatAnim"] = _assertThisInitialized(_this);
    return _this;
  }

  /** @returns {FloatAnim} */
  _createClass(FloatAnim, [{
    key: "awake",
    value: function awake() {
      this.scene.add.tween({
        targets: this.gameObject,
        y: "+=10",
        // Move the object 20 pixels down
        ease: "Sine.easeInOut",
        duration: 2500,
        // One second
        yoyo: true,
        delay: Phaser.Math.Between(100, 1000),
        repeat: -1,
        // Repeat infinitely
        repeatDelay: 100
      });
    }
  }], [{
    key: "getComponent",
    value: function getComponent(gameObject) {
      return gameObject["__FloatAnim"];
    }
  }]);
  return FloatAnim;
}(_userComponent2.default);
exports.default = FloatAnim;
},{"./userComponent.js":"src/components/userComponent.js"}],"src/scenes/menu.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _FloatAnim = _interopRequireDefault(require("../components/FloatAnim.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var sceneConfig = {
  key: 'menuScene',
  pack: {
    files: [{
      type: 'plugin',
      key: 'rexwebfontloaderplugin',
      url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexwebfontloaderplugin.min.js',
      start: true
    }]
  }
};
var Menu = /*#__PURE__*/function (_Phaser$Scene) {
  _inherits(Menu, _Phaser$Scene);
  var _super = _createSuper(Menu);
  function Menu() {
    _classCallCheck(this, Menu);
    return _super.call(this, sceneConfig);
  }
  _createClass(Menu, [{
    key: "init",
    value: function init(data) {
      // background
      this.logo = this.add.image(400, 300, 'logo');
      this.cameras.main.setBackgroundColor('#2c97b3');
    }
  }, {
    key: "preload",
    value: function preload() {
      this.plugins.get('rexwebfontloaderplugin').addToScene(this);
      var config = {
        google: {
          families: ['Gloria Hallelujah', 'Source Sans Pro:300']
        }
      };
      this.load.rexWebFont(config);
      this.load.plugin('rexdropshadowpipelineplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexdropshadowpipelineplugin.min.js', true);
    }
  }, {
    key: "create",
    value: function create(data) {
      var _this = this;
      this.logo.destroy();
      this.graphics = this.add.graphics().setDepth(3);
      this.pencil = this.add.image(95, 140, "pencil").setScale(0.15).setFlipX(false).setDepth(5).setVisible(false);
      //this.cameras.main.fadeIn(1000,44,151,179);
      this.addFloatingGadgets();
      //Add Title TODO: fancy it up
      this.add.text(180, 0, "Mini Networks", {
        fontFamily: 'Gloria Hallelujah ',
        fill: '#fff',
        fontSize: '64px',
        shadow: {
          color: '#000',
          fill: true,
          offsetY: 5,
          offsetX: 5
        },
        padding: {
          right: 10
        }
      });
      this.startDrawing = false;

      // Add level menu buttons.

      var freeplay_button = this.add.text(90, 100, 'Freeplay', {
        fontFamily: 'Gloria Hallelujah ',
        fontSize: '30px',
        fill: '#fff',
        shadow: {
          color: '#000',
          fill: true,
          offsetY: 3,
          offsetX: 3
        },
        padding: {
          right: 10
        }
      }).setInteractive().on('pointerup', function () {
        return _this.exitMenuAnimation('freeplayScene', 500, freeplay_button);
      }).on('pointerover', function () {
        _this.pencil.setVisible(true);
        _this.pencil.setPosition(95, 95);
      }).on('pointerout', function () {
        return _this.pencil.setVisible(false);
      });
      var tutorial_button = this.add.text(90, 150, 'Tutorial', {
        fontFamily: 'Gloria Hallelujah ',
        fontSize: '30px',
        fill: '#fff',
        shadow: {
          color: '#000',
          fill: true,
          offsetY: 3,
          offsetX: 3
        },
        padding: {
          right: 10
        }
      }).setInteractive().on('pointerup', function () {
        return _this.exitMenuAnimation('tutorialScene', 500, tutorial_button);
      }).on('pointerover', function () {
        _this.pencil.setVisible(true);
        _this.pencil.setPosition(90, 145);
      }).on('pointerout', function () {
        return _this.pencil.setVisible(false);
      });
      var theory_button = this.add.text(90, 200, 'Theory', {
        fontFamily: 'Gloria Hallelujah ',
        fontSize: '30px',
        fill: '#fff',
        shadow: {
          color: '#000',
          fill: true,
          offsetY: 3,
          offsetX: 3
        },
        padding: {
          right: 10
        }
      }).setInteractive().on('pointerup', function () {
        return _this.exitMenuAnimation('theoryScene', 500, theory_button);
      }).on('pointerover', function () {
        _this.pencil.setVisible(true);
        _this.pencil.setPosition(95, 195);
      }).on('pointerout', function () {
        return _this.pencil.setVisible(false);
      });
      this.events.emit("scene-awake");
    }
  }, {
    key: "exitMenuAnimation",
    value: function exitMenuAnimation(newScene, duration, button) {
      var _this2 = this;
      //Add pencil strikethrough
      this.strikeThrough = new Phaser.Curves.Line([90, button.y + 33, this.pencil.x, button.y + 33]);
      var pencilDuration = 200;
      this.input.enabled = false;
      this.startDrawing = true;
      this.tweens.add({
        targets: this.pencil,
        x: button.width + this.pencil.x + 30,
        duration: pencilDuration,
        onComplete: function onComplete() {
          _this2.time.delayedCall(500, _this2.exitMenu(newScene, duration));
        },
        onCompleteScope: this
      });
    }
  }, {
    key: "exitMenu",
    value: function exitMenu(newScene, duration) {
      var _this3 = this;
      this.cameras.main.fadeOut(duration, 0, 0, 0);
      this.time.delayedCall(duration, function () {
        _this3.scene.start(newScene);
      });
    }
  }, {
    key: "update",
    value: function update(time, delta) {
      this.graphics.clear();
      this.graphics.lineStyle(5, 0x00000, 1);
      if (this.startDrawing && this.pencil.x > 90) {
        this.strikeThrough.p1.x = this.pencil.x - 30;
        this.strikeThrough.draw(this.graphics);
      }
    }
  }, {
    key: "addFloatingGadgets",
    value: function addFloatingGadgets() {
      //Animations
      var shadowPlugin = this.plugins.start('rexdropshadowpipelineplugin');
      this.anims.create({
        key: "modemAnim",
        frames: this.anims.generateFrameNames("mm_modem", {
          prefix: 'anim',
          start: 1,
          end: 3
        }),
        frameRate: 2,
        repeat: -1
      });
      this.anims.create({
        key: "phone1Anim",
        frames: this.anims.generateFrameNames("mm_phone1", {
          prefix: 'doodlejump',
          start: 1,
          end: 12
        }),
        frameRate: 6,
        repeat: -1
      });
      this.anims.create({
        key: "phone2Anim",
        frames: this.anims.generateFrameNames("mm_phone2", {
          prefix: 'text',
          start: 1,
          end: 6
        }),
        frameRate: 2,
        repeat: -1
      });
      this.anims.create({
        key: "laptopAnim",
        frames: this.anims.generateFrameNames("mm_laptop", {
          prefix: 'dvd',
          start: 1,
          end: 30
        }),
        frameRate: 6,
        repeat: -1
      });
      this.anims.create({
        key: "tabletAnim",
        frames: this.anims.generateFrameNames("mm_tablet", {
          prefix: 'angrybird',
          start: 1,
          end: 10
        }),
        frameRate: 5,
        repeat: -1
      });

      //Add floating UI elements
      var laptop = this.add.sprite(400, 480, "mm_laptop", "default").setInteractive().on('pointerover', function () {
        laptop.anims.play('laptopAnim');
      }).on('pointerout', function () {
        laptop.anims.stop('laptopAnim');
        laptop.setFrame("default");
      });
      new _FloatAnim.default(laptop);
      var modem = this.add.sprite(700, 150, "mm_modem", "default").setInteractive().on('pointerover', function () {
        modem.anims.play('modemAnim');
      }).on('pointerout', function () {
        modem.anims.stop('modemAnim');
        modem.setFrame("default");
      });
      new _FloatAnim.default(modem);
      var phone1 = this.add.sprite(580, 430, "mm_phone1", "default").setInteractive().on('pointerover', function () {
        phone1.anims.play('phone1Anim');
      }).on('pointerout', function () {
        phone1.anims.stop('phone1Anim');
        phone1.setFrame("default");
      });
      new _FloatAnim.default(phone1);
      var phone2 = this.add.sprite(160, 360, "mm_phone2", "default").setInteractive().on('pointerover', function () {
        phone2.anims.play('phone2Anim');
      }).on('pointerout', function () {
        phone2.anims.stop('phone2Anim');
        phone2.setFrame("default");
      });
      new _FloatAnim.default(phone2);
      var tablet = this.add.sprite(470, 260, "mm_tablet", "default").setInteractive().on('pointerover', function () {
        tablet.anims.play('tabletAnim');
      }).on('pointerout', function () {
        tablet.anims.stop('tabletAnim');
        tablet.setFrame("default");
      });
      new _FloatAnim.default(tablet);

      //Shadow Plugin
      shadowPlugin.add(laptop, {
        distance: 30,
        angle: -90,
        shadowColor: 0x1f7086,
        alpha: 1.0
      });
      shadowPlugin.add(modem, {
        distance: 30,
        angle: -90,
        shadowColor: 0x1f7086,
        alpha: 1.0
      });
      shadowPlugin.add(phone1, {
        distance: 30,
        angle: -90,
        shadowColor: 0x1f7086,
        alpha: 1.0
      });
      shadowPlugin.add(tablet, {
        distance: 30,
        angle: -90,
        shadowColor: 0x1f7086,
        alpha: 1.0
      });
      shadowPlugin.add(phone2, {
        distance: 30,
        angle: -90,
        shadowColor: 0x1f7086,
        alpha: 1.0
      });
    }
  }]);
  return Menu;
}(Phaser.Scene);
var _default = Menu;
exports.default = _default;
},{"../components/FloatAnim.js":"src/components/FloatAnim.js"}],"src/scenes/preloader.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var Preloader = /*#__PURE__*/function (_Phaser$Scene) {
  _inherits(Preloader, _Phaser$Scene);
  var _super = _createSuper(Preloader);
  function Preloader() {
    _classCallCheck(this, Preloader);
    return _super.call(this, {
      key: 'preloaderScene'
    });
  }
  _createClass(Preloader, [{
    key: "init",
    value: function init(data) {}
  }, {
    key: "preload",
    value: function preload() {
      // Preload all required assets.
      this.load.image('greenbutton', 'assets/Sprites/green-button.png');
      this.load.image('bluebutton', 'assets/Sprites/blue-button.png');
      this.load.image('redbutton', 'assets/Sprites/red-button.png');
      this.load.atlas('basestation', 'assets/Sprites/basestation.png', 'assets/Sprites/basestation.json', null, Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
      this.load.atlas("mm_laptop", "assets/mainmenu/laptop_atlas.png", "assets/mainmenu/laptop_atlas.json", null, Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
      this.load.atlas("mm_phone1", "assets/mainmenu/phone1_atlas.png", "assets/mainmenu/phone1_atlas.json", null, Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
      this.load.atlas("mm_phone2", "assets/mainmenu/phone2_atlas.png", "assets/mainmenu/phone2_atlas.json", null, Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
      this.load.atlas("mm_tablet", "assets/mainmenu/tablet_atlas.png", "assets/mainmenu/tablet_atlas.json", null, Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
      this.load.image("mm_wifi", "assets/mainmenu/wifi.png");
      this.load.atlas("mm_modem", "assets/mainmenu/modem_atlas.png", "assets/mainmenu/modem_atlas.json", null, Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
      this.load.image("pausebutton", "assets/Hand-Drawn/square_button_pause.png");
      this.load.image("pencil", "assets/mainmenu/pencil.png");
      this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');

      //New handdrawn assets
      this.load.image('hd_phone', 'assets/Hand-Drawn/phone.png');
      this.load.image('hd_laptop', 'assets/Hand-Drawn/laptop.png');
      this.load.image('hd_tablet', 'assets/Hand-Drawn/tablet.png');
      this.load.image('hd_car', 'assets/Hand-Drawn/car.png');
      this.load.image('hd_baseStation', 'assets/Hand-Drawn/base_station_empty.png');
      this.load.image('hd_envelope', 'assets/Hand-Drawn/envelope.png');
      this.load.image('hd_relayStation', 'assets/Hand-Drawn/relay_station_empty.png');
      this.load.image('pencil_cursor', 'assets/Hand-Drawn/cursor_black.png');
      this.load.image('paper_bg', "assets/paper_background.png");
      this.load.atlas('device_bars', 'assets/Hand-Drawn/device_bars.png', 'assets/Hand-Drawn/device_bars.json', null, Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
      this.load.atlas('relay_bands', 'assets/Hand-Drawn/relay_bands.png', 'assets/Hand-Drawn/relay_bands.json', null, Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
      this.load.atlas('shapes', 'assets/Hand-Drawn/shapes.png', 'assets/Hand-Drawn/shapes.json', null, Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
      this.load.atlas('timer', 'assets/Hand-Drawn/timer.png', 'assets/Hand-Drawn/timer.json', null, Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
    }
  }, {
    key: "create",
    value: function create(data) {
      var _this = this;
      this.cameras.main.fadeOut(500, 24, 24, 24);
      this.time.delayedCall(500, function () {
        _this.scene.stop('bootScene');
        _this.scene.start('menuScene');
      });
    }
  }]);
  return Preloader;
}(Phaser.Scene);
var _default = Preloader;
exports.default = _default;
},{}],"src/entities/eventDispatcher.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var emitter = new Phaser.Events.EventEmitter();
var _default = emitter;
exports.default = _default;
},{}],"src/entities/baseEquipment.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _eventDispatcher = _interopRequireDefault(require("./eventDispatcher.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var baseEquipment = /*#__PURE__*/function (_Phaser$GameObjects$C) {
  _inherits(baseEquipment, _Phaser$GameObjects$C);
  var _super = _createSuper(baseEquipment);
  function baseEquipment(scene, x, y, key) {
    var _this;
    _classCallCheck(this, baseEquipment);
    _this = _super.call(this, scene, x, y);
    scene.add.existing(_assertThisInitialized(_this));
    _this.mainSprite = scene.add.sprite(10, 0, key);
    _this.graphics = scene.add.graphics();
    _this.add([_this.mainSprite, _this.graphics]);
    _this.frequency = 0xec1c24; //Frequency for communication, default to red
    _this.freqType = 'red'; //This makes navigating atlas related to frequency easier:)
    scene.input.on('pointermove', _this.drawLineToPointer, _assertThisInitialized(_this));
    _this.hover = false; //Is mouse hovering, might not be needed to initalise

    _this.toggled = false; //This is how we tell if this BS is selected
    _this.mainSprite.on('pointerover', function () {
      _this.hover = true;
    });
    _this.mainSprite.on('pointerout', function () {
      _this.hover = false;
    });
    return _this;
  }
  _createClass(baseEquipment, [{
    key: "drawLineToPointer",
    value: function drawLineToPointer() {
      this.graphics.clear();
      this.cursorLocation = this.scene.cameras.main.getWorldPoint(this.scene.input.activePointer.x, this.scene.input.activePointer.y);
      var zoom = this.scene.cameras.main.zoom;
      this.worldPoint = {
        x: this.cursorLocation.x - this.x,
        y: this.cursorLocation.y - this.y
      };
      if (this.toggled && this.rangeCircle.contains(this.worldPoint.x, this.worldPoint.y)) {
        this.graphics.lineStyle(5, this.frequency, 1.0);
        this.graphics.beginPath();
        var headCoords = this.getLocalPoint(this.x + 16, this.y - 50);
        this.graphics.moveTo(headCoords.x, headCoords.y);
        this.graphics.lineTo(this.worldPoint.x, this.worldPoint.y);
        this.graphics.closePath();
        this.graphics.strokePath();
      }
    }
  }, {
    key: "update",
    value: function update() {
      if (this.toggled) {
        this.graphics.lineStyle(2, 0xCCCCCC);
        this.graphics.strokeCircle(0, 0, this.range);
      } else {
        this.graphics.clear();
      }
    }
  }]);
  return baseEquipment;
}(Phaser.GameObjects.Container);
exports.default = baseEquipment;
},{"./eventDispatcher.js":"src/entities/eventDispatcher.js"}],"src/entities/baseStation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _eventDispatcher = _interopRequireDefault(require("./eventDispatcher.js"));
var _baseEquipment2 = _interopRequireDefault(require("./baseEquipment.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var baseStation = /*#__PURE__*/function (_baseEquipment) {
  _inherits(baseStation, _baseEquipment);
  var _super = _createSuper(baseStation);
  function baseStation(scene, x, y) {
    var _this;
    _classCallCheck(this, baseStation);
    _this = _super.call(this, scene, x, y, 'hd_baseStation');
    _this.mainSprite.setScale(0.3);
    _this.setSize(_this.mainSprite.displayWidth, _this.mainSprite.displayHeight);
    _this.mainSprite.setInteractive();
    _this.range = 600;
    _this.rangeCircle = new Phaser.Geom.Circle(0, 0, _this.range);
    //Base Station Listeners for Frequency Channels
    _eventDispatcher.default.on('new_frequency', function (freqInfo) {
      _this.frequency = freqInfo.f;
      _this.freqType = freqInfo.name;
    });
    _eventDispatcher.default.on('user_started', function (bsInfo) {
      if (bsInfo.x === _this.x + 12 && bsInfo.y === _this.y - 50) {
        _this.channelsInUse.push(bsInfo.f);
      }
    });
    _eventDispatcher.default.on('relay_to_bs', function (relayInfo) {
      if (relayInfo.x === _this.x + 12 && relayInfo.y === _this.y - 50) {
        if (_this.channelsInUse.includes(_this.f)) {
          _this.channelsInUse = _this.channelsInUse.filter(function (item) {
            return item !== bsInfo.f;
          });
        } else {
          _this.channelsInUse.push(relayInfo.f);
        }
      }
    });
    _eventDispatcher.default.on('user_finished', function (bsInfo) {
      if (bsInfo.x === _this.x + 12 && bsInfo.y === _this.y - 50) {
        _this.channelsInUse = _this.channelsInUse.filter(function (item) {
          return item !== bsInfo.f;
        });
      }
    });
    _this.channelsInUse = [];
    scene.input.on('pointerdown', _this.mouseClick, _assertThisInitialized(_this));
    return _this;
  }
  _createClass(baseStation, [{
    key: "mouseClick",
    value: function mouseClick() {
      if (!this.toggled & this.hover) {
        this.toggled = true;
        if (!this.channelsInUse.includes(this.frequency)) _eventDispatcher.default.emit('bs_selected', {
          x: this.x + 12,
          y: this.y - 50,
          f: this.frequency,
          t: this.freqType
        });
      } else {
        this.graphics.clear();
        this.toggled = false;
        _eventDispatcher.default.emit('bs_unselected', {
          x: this.x + 12,
          y: this.y - 50,
          f: this.frequency,
          t: this.freqType
        });
      }
    }
  }, {
    key: "update",
    value: function update() {
      _get(_getPrototypeOf(baseStation.prototype), "update", this).call(this);
    }
  }]);
  return baseStation;
}(_baseEquipment2.default);
exports.default = baseStation;
},{"./eventDispatcher.js":"src/entities/eventDispatcher.js","./baseEquipment.js":"src/entities/baseEquipment.js"}],"src/entities/userEquipment.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _eventDispatcher = _interopRequireDefault(require("./eventDispatcher.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var userEquipment = /*#__PURE__*/function (_Phaser$GameObjects$C) {
  _inherits(userEquipment, _Phaser$GameObjects$C);
  var _super = _createSuper(userEquipment);
  function userEquipment(scene, x, y, key) {
    var _this;
    _classCallCheck(this, userEquipment);
    _this = _super.call(this, scene, x, y);
    scene.add.existing(_assertThisInitialized(_this));
    _this.mainSprite = scene.add.sprite(0, 0, key);
    _this.graphics = scene.add.graphics().setDepth(2);
    _this.connectionIndictator = scene.add.sprite(0, 0, 'device_bars', 'default').setScale(0.1);
    _this.userText = scene.add.text(0, 40, '0%', {
      fontSize: '16px',
      fill: '#fff'
    });
    _this.tLine = new Phaser.Curves.Line([0, 0, 0, 0]);
    _this.envelopeGroup = scene.add.container(0, 0).setVisible(false); //Idk why this needed to be a container
    _this.add([_this.mainSprite, _this.graphics, _this.userText, _this.connectionIndictator, _this.envelopeGroup]);
    _this.cameraZoom = scene.cameras.main.zoom;
    console.log(_this.cameraZoom);
    //this.setRotation(Phaser.Math.RND.between(-15,15))

    //Unique Properties
    _this.bars = 3;
    _this.bsCoords = {
      x: 0,
      y: 0
    };
    _this.bs_target = false;
    _this.successCount = 0;
    _this.begun = false;
    _this.tethered = false;
    //UI, Animations & Listeners
    _this.on('pointerdown', _this.handlePointerDown, _assertThisInitialized(_this));
    //Base station selected
    _eventDispatcher.default.on('bs_selected', function (eventData) {
      if (_this.begun) return;
      _this.bs_target = true;
      if (!_this.tethered) {
        _this.frequency = eventData.f;
        _this.freqType = eventData.t;
      }
      if (eventData.x == _this.bsCoords.x && eventData.y == _this.bsCoords.y) return; //No need to run this function if its the same Base Station.
      //Except frequency, which could change.
      _this.bsCoords = {
        x: eventData.x,
        y: eventData.y
      };
      var localCoords = _this.getLocalPoint(_this.bsCoords.x, _this.bsCoords.y);
      _this.tLine.p0.x = localCoords.x;
      _this.tLine.p0.y = localCoords.y;
      _this.speed = Math.min(_this.tLine.getLength() / 60, 8);
      _this.duration = 3000 + Math.pow(2.71, _this.speed);
      if (_this.duration > 7000) {
        _this.bars = 1;
      } else if (_this.duration > 4000) {
        _this.bars = 2;
      } else {
        _this.bars = 3;
      }
      var _this$newBoxAnim = _this.newBoxAnim(_this.scene, _this.handleEnvelope, _this.successHandler);
      var _this$newBoxAnim2 = _slicedToArray(_this$newBoxAnim, 2);
      _this.boxMove = _this$newBoxAnim2[0];
      _this.paths = _this$newBoxAnim2[1];
    });

    //Base station unselected
    _eventDispatcher.default.on('bs_unselected', function () {
      _this.bs_target = false;
    });
    return _this;
  }
  _createClass(userEquipment, [{
    key: "handlePointerDown",
    value: function handlePointerDown() {
      this.tethered = this.bs_target;
      if (this.tethered) {
        _eventDispatcher.default.emit('user_started', {
          x: this.bsCoords.x,
          y: this.bsCoords.y,
          f: this.frequency
        });
        this.connectionIndictator.setFrame(this.freqType + '_' + this.bars);
        this.envelopeGroup.setVisible(true);
        this.disableInteractive();
      }
    }
  }, {
    key: "newBoxAnim",
    value: function newBoxAnim(scene, handleComplete, handleSuccess) {
      var boxMove = scene.tweens.createTimeline({
        onComplete: handleSuccess,
        onCompleteScope: this
      });
      var paths = [];
      //var animTime = Math.round(this.duration * this.speed);
      for (var i = 0; i < this.envCount; i++) {
        var temp_envelope = scene.add.sprite(-400, -400, 'hd_envelope').setScale(0.2).setVisible(true);
        var temp_path = {
          t: 0,
          vec: new Phaser.Math.Vector2()
        };
        paths.push(temp_path);
        this.envelopeGroup.add(temp_envelope);
        boxMove.add({
          targets: paths[i],
          t: 1,
          ease: 'linear',
          duration: this.duration,
          offset: 500 * i,
          onComplete: handleComplete,
          repeat: 0,
          onCompleteScope: this
        });
      }
      return [boxMove, paths];
    }
  }, {
    key: "handleEnvelope",
    value: function handleEnvelope() {
      _eventDispatcher.default.emit('add_score', 1);
      this.envelopeGroup.list[this.successCount].setVisible(false);
      this.successCount += 1;
      //this.envCount -= 1; // Decrements envelopes by 1 for each successful data packet
      this.userText.setText(Phaser.Math.CeilTo(Phaser.Math.Percent(this.successCount, 0, this.envCount) * 100) + '%'); // Update the packetCount
      if (this.envCount == this.successCount) {
        this.boxMove.emit('Success');
      }
    }
  }, {
    key: "boxAnim",
    value: function boxAnim() {
      this.begun = true;
      this.graphics.lineStyle(5, this.frequency, 1); //Red Line for Red Freq.
      this.tLine.draw(this.graphics);
      this.boxMove.play();
      for (var i = 0; i < this.paths.length; i++) {
        this.tLine.getPoint(this.paths[i].t, this.paths[i].vec);
        var worldPoint = this.scene.cameras.main.getWorldPoint(this.paths[i].vec.x, this.paths[i].vec.y);
        this.envelopeGroup.list[i].setPosition(worldPoint.x * this.cameraZoom, worldPoint.y * this.cameraZoom);
        //this.graphics.fillRect(this.paths[i].vec.x - 8, this.paths[i].vec.y - 8, 16, 16);
      }
    }
  }, {
    key: "update",
    value: function update() {
      this.graphics.clear();
      if (this.begun) this.disableInteractive();
      if (typeof this.boxMove != "undefined") {
        if (this.tethered || this.begun) {
          this.boxAnim();
        }
      }
    }

    /*
    reset_tweens() {
        for(var i=0;i<this.paths.length;i++) {
            this.boxMove.data[i].restart();
            this.paths[i].t = 0;
        }
    
    }*/
  }, {
    key: "successHandler",
    value: function successHandler(scene) {
      this.envelopeGroup.setVisible(false);
      this.boxMove.stop();
      _eventDispatcher.default.emit('add_score', 5);
      _eventDispatcher.default.emit('user_finished', {
        x: this.bsCoords.x,
        y: this.bsCoords.y,
        f: this.frequency
      }); //This informs the Base Station that the user has finished.
      _eventDispatcher.default.emit('userFinished'); // This updates the scene to spawn new entities.
      this.cleanup();
    }
  }, {
    key: "cleanup",
    value: function cleanup() {
      this.graphics.clear();
      this.setActive(false);
      this.setVisible(false);
      this.scene.active = false;
      //this.userText.destroy();
      //this.destroy();
    }
  }]);
  return userEquipment;
}(Phaser.GameObjects.Container);
exports.default = userEquipment;
},{"./eventDispatcher.js":"src/entities/eventDispatcher.js"}],"src/entities/car.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _eventDispatcher = _interopRequireDefault(require("./eventDispatcher.js"));
var _userEquipment2 = _interopRequireDefault(require("./userEquipment.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var Car = /*#__PURE__*/function (_userEquipment) {
  _inherits(Car, _userEquipment);
  var _super = _createSuper(Car);
  function Car(scene, x, y, scoreCallback) {
    var _this;
    _classCallCheck(this, Car);
    _this = _super.call(this, scene, x, y, 'hd_car', scoreCallback);
    _this.mainSprite.setScale(0.5);
    _this.setSize(_this.mainSprite.displayWidth, _this.mainSprite.displayHeight);
    _this.setInteractive();
    _this.userText.setPosition(0, 50);
    _this.connectionIndictator.setPosition(50, -50);
    _this.envCount = Phaser.Math.RND.between(3, 5);
    _this.progressPerc = 100 / _this.envCount;
    // [this.boxMove, this.paths] = this.newBoxAnim(scene,this.handleEnvelope,this.successHandler);
    _this.carSpeed = 0.5;
    if (x < scene.sys.game.config.width / 2) {
      _this.mainSprite.setFlipX(true);
      _this.mainSprite.x = _this.carSpeed;
    } else _this.mainSprite.x = -_this.carSpeed;
    _this.distance = 0;
    return _this;
  }
  _createClass(Car, [{
    key: "isSpriteCentreOutOfBounds",
    value: function isSpriteCentreOutOfBounds() {
      var bounds = this.scene.physics.world.bounds;
      return !Phaser.Geom.Rectangle.ContainsPoint(bounds, new Phaser.Geom.Point(this.x, this.y));
    }
  }, {
    key: "update",
    value: function update() {
      _get(_getPrototypeOf(Car.prototype), "update", this).call(this);
      var conCoords = this.getLocalPoint(this.x, this.y);
      this.setPosition(this.x + this.mainSprite.x, this.y);
      var bsAdjustedCoords = this.getLocalPoint(this.bsCoords.x, this.bsCoords.y);
      this.tLine.p0 = {
        x: bsAdjustedCoords.x,
        y: bsAdjustedCoords.y
      };
      this.tLine.p1 = {
        x: conCoords.x,
        y: conCoords.y
      };
      if (this.isSpriteCentreOutOfBounds()) {
        _eventDispatcher.default.emit('gameover', this);
      }
    }
  }]);
  return Car;
}(_userEquipment2.default);
exports.default = Car;
},{"./eventDispatcher.js":"src/entities/eventDispatcher.js","./userEquipment.js":"src/entities/userEquipment.js"}],"src/entities/phone.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _eventDispatcher = _interopRequireDefault(require("./eventDispatcher.js"));
var _userEquipment2 = _interopRequireDefault(require("./userEquipment.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var Phone = /*#__PURE__*/function (_userEquipment) {
  _inherits(Phone, _userEquipment);
  var _super = _createSuper(Phone);
  function Phone(scene, x, y, scoreCallback) {
    var _this;
    var maxTime = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 20;
    _classCallCheck(this, Phone);
    _this = _super.call(this, scene, x, y, 'hd_phone', scoreCallback);
    _this.mainSprite.setScale(0.3);
    _this.connectionIndictator.setPosition(40, -50);
    _this.setSize(_this.mainSprite.displayWidth, _this.mainSprite.displayHeight);
    _this.setInteractive();
    _this.timerSprite = scene.add.sprite(-30, 30, 'timer', 'timer_1').setScale(0.2);
    _this.envCount = Phaser.Math.RND.between(10, 25);
    _this.progressPerc = 100 / _this.envCount;
    // [this.boxMove, this.paths] = this.newBoxAnim(scene,this.handleEnvelope,this.successHandler);
    _this.countdown = maxTime;
    _this.add(_this.timerSprite);
    _this.countEvent = scene.time.addEvent({
      delay: 1000,
      callback: function callback() {
        _this.countdownUpdate(maxTime);
      },
      callbackScope: _assertThisInitialized(_this),
      loop: true
    });
    return _this;
  }
  //Todo: Add graphical indication for countdown
  _createClass(Phone, [{
    key: "countdownUpdate",
    value: function countdownUpdate(maxTime) {
      if (!this.tethered) {
        this.timerSprite.setVisible(true);
        this.countdown -= 1;
        if (this.countdown < maxTime / 4) {
          this.timerSprite.setFrame('timer_3');
        } else if (this.countdown < maxTime / 2) {
          this.timerSprite.setFrame('timer_2');
        }
        if (this.countdown < 0) _eventDispatcher.default.emit('gameover', this);
      } else {
        this.timerSprite.setVisible(false);
      }
    }
  }]);
  return Phone;
}(_userEquipment2.default);
exports.default = Phone;
},{"./eventDispatcher.js":"src/entities/eventDispatcher.js","./userEquipment.js":"src/entities/userEquipment.js"}],"src/entities/laptop.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _eventDispatcher = _interopRequireDefault(require("./eventDispatcher.js"));
var _userEquipment2 = _interopRequireDefault(require("./userEquipment.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var Laptop = /*#__PURE__*/function (_userEquipment) {
  _inherits(Laptop, _userEquipment);
  var _super = _createSuper(Laptop);
  function Laptop(scene, x, y, scoreCallback) {
    var _this;
    var maxTime = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 32;
    _classCallCheck(this, Laptop);
    _this = _super.call(this, scene, x, y, 'hd_laptop', scoreCallback);
    _this.mainSprite.setScale(0.3);
    _this.connectionIndictator.setPosition(-50, 0);
    _this.setSize(_this.mainSprite.displayWidth, _this.mainSprite.displayHeight);
    _this.setInteractive();
    _this.timerSprite = scene.add.sprite(5, -25, 'timer', 'timer_1').setScale(0.15);
    _this.envCount = Phaser.Math.RND.between(10, 25);
    _this.progressPerc = 100 / _this.envCount;
    // [this.boxMove, this.paths] = this.newBoxAnim(scene,this.handleEnvelope,this.successHandler);
    _this.countdown = maxTime;
    _this.add(_this.timerSprite);
    _this.countEvent = scene.time.addEvent({
      delay: 1000,
      callback: function callback() {
        _this.countdownUpdate(maxTime);
      },
      callbackScope: _assertThisInitialized(_this),
      loop: true
    });
    return _this;
  }
  //Todo: Add graphical indication for countdown
  _createClass(Laptop, [{
    key: "countdownUpdate",
    value: function countdownUpdate(maxTime) {
      if (!this.tethered) {
        this.timerSprite.setVisible(true);
        this.countdown -= 1;
        if (this.countdown < maxTime / 4) {
          this.timerSprite.setFrame('timer_3');
        } else if (this.countdown < maxTime / 2) {
          this.timerSprite.setFrame('timer_2');
        }
        if (this.countdown < 0) _eventDispatcher.default.emit('gameover', this);
      } else {
        this.timerSprite.setVisible(false);
      }
    }
  }]);
  return Laptop;
}(_userEquipment2.default);
exports.default = Laptop;
},{"./eventDispatcher.js":"src/entities/eventDispatcher.js","./userEquipment.js":"src/entities/userEquipment.js"}],"src/entities/tablet.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _eventDispatcher = _interopRequireDefault(require("./eventDispatcher.js"));
var _userEquipment2 = _interopRequireDefault(require("./userEquipment.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var Tablet = /*#__PURE__*/function (_userEquipment) {
  _inherits(Tablet, _userEquipment);
  var _super = _createSuper(Tablet);
  function Tablet(scene, x, y, scoreCallback) {
    var _this;
    var maxTime = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 16;
    _classCallCheck(this, Tablet);
    _this = _super.call(this, scene, x, y, 'hd_tablet', scoreCallback);
    _this.mainSprite.setScale(0.2);
    _this.connectionIndictator.setPosition(60, -30);
    _this.setSize(_this.mainSprite.displayWidth, _this.mainSprite.displayHeight);
    _this.setInteractive();
    _this.timerSprite = scene.add.sprite(0, 0, 'timer', 'timer_1').setScale(0.2);
    _this.envCount = Phaser.Math.RND.between(10, 25);
    _this.progressPerc = 100 / _this.envCount;
    // [this.boxMove, this.paths] = this.newBoxAnim(scene,this.handleEnvelope,this.successHandler);
    _this.countdown = maxTime;
    _this.add(_this.timerSprite);
    _this.countEvent = scene.time.addEvent({
      delay: 1000,
      callback: function callback() {
        _this.countdownUpdate(maxTime);
      },
      callbackScope: _assertThisInitialized(_this),
      loop: true
    });
    return _this;
  }
  //Todo: Add graphical indication for countdown
  _createClass(Tablet, [{
    key: "countdownUpdate",
    value: function countdownUpdate(maxTime) {
      if (!this.tethered) {
        this.timerSprite.setVisible(true);
        this.countdown -= 1;
        if (this.countdown < maxTime / 4) {
          this.timerSprite.setFrame('timer_3');
        } else if (this.countdown < maxTime / 2) {
          this.timerSprite.setFrame('timer_2');
        }
        if (this.countdown < 0) _eventDispatcher.default.emit('gameover', this);
      } else {
        this.timerSprite.setVisible(false);
      }
    }
  }]);
  return Tablet;
}(_userEquipment2.default);
exports.default = Tablet;
},{"./eventDispatcher.js":"src/entities/eventDispatcher.js","./userEquipment.js":"src/entities/userEquipment.js"}],"src/entities/relayBase.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _eventDispatcher = _interopRequireDefault(require("./eventDispatcher.js"));
var _baseEquipment2 = _interopRequireDefault(require("./baseEquipment.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var relayBase = /*#__PURE__*/function (_baseEquipment) {
  _inherits(relayBase, _baseEquipment);
  var _super = _createSuper(relayBase);
  function relayBase(scene, x, y) {
    var _this;
    _classCallCheck(this, relayBase);
    _this = _super.call(this, scene, x, y, 'hd_relayStation');
    //Always readjust your hit areas :)
    _this.mainSprite.setScale(0.5);
    _this.setSize(_this.mainSprite.displayWidth, _this.mainSprite.displayHeight);
    _this.mainSprite.setInteractive();
    _this.baseLine = new Phaser.Curves.Line([0, 0, 12, -50]);
    _this.userLine = new Phaser.Curves.Line([0, 0, 0, 0]);
    _this.tethered = false;
    _this.bs_target = false;
    _this.inUse = false;
    _this.range = 300;
    _this.rangeCircle = new Phaser.Geom.Circle(0, 0, _this.range);
    _this.bsCoords = {
      x: 0,
      y: 0
    };
    _this.targetCoords = {
      x: 0,
      y: 0
    };
    _this.relayIcon = scene.add.sprite(12, -50, 'relay_bands', 'red').setScale(0.5);
    _this.add(_this.relayIcon);
    scene.input.on('pointerdown', _this.mouseClick, _assertThisInitialized(_this));
    _eventDispatcher.default.on('bs_selected', function (eventData) {
      //Catch clause
      if (eventData.x == _this.x + 12) {
        return;
      }
      _this.bs_target = !_this.bs_target;
      console.log(_this.bs_target);
      if (!_this.tethered) {
        _this.frequency = eventData.f;
        _this.freqType = eventData.t;
      }
      if (eventData.x == _this.bsCoords.x && eventData.y == _this.bsCoords.y) return; //No need to run this function if its the same Base Station.
      //Except frequency, which could change.
      _this.bsCoords = {
        x: eventData.x,
        y: eventData.y
      };
      var localCoords = _this.getLocalPoint(_this.bsCoords.x, _this.bsCoords.y);
      _this.baseLine.p0.x = localCoords.x;
      _this.baseLine.p0.y = localCoords.y;
      _this.speed = Math.min(_this.baseLine.getLength() / 60, 8);
      _this.duration = 3000 + Math.pow(2.71, _this.speed);

      // [this.boxMove, this.paths] = this.newBoxAnim(this.scene,this.handleEnvelope,this.successHandler);
    });

    _eventDispatcher.default.on('user_started', function (bsInfo, user) {
      if (bsInfo.x === _this.x + 12 && bsInfo.y === _this.y - 50) {
        _eventDispatcher.default.emit('relay_to_bs', {
          x: _this.bsCoords.x,
          y: _this.bsCoords.y,
          f: _this.frequency
        });
        _this.inUse = true;
      }
    });
    _eventDispatcher.default.on('user_finished', function (bsInfo) {
      if (bsInfo.x === _this.x + 12 && bsInfo.y === _this.y - 50) {
        _eventDispatcher.default.emit('relay_to_bs', {
          x: _this.bsCoords.x,
          y: _this.bsCoords.y,
          f: _this.frequency
        });
        _this.inUse = false;
      }
    });
    _eventDispatcher.default.on('bs_unselected', function (bsInfo) {
      if (bsInfo.x == _this.bsCoords.x && bsInfo.y == _this.bsCoords.y) {
        //this.scene.time.delayedCall(1000, this.bs_target = false);
      }
    });
    return _this;
  }

  //Necessary functions:
  //-Ability to be selected as a target by a base station
  //-Ability to select a single user once connected to a base station
  //-Graphical indication of what frequency the relay is using. Colour of bulb?
  _createClass(relayBase, [{
    key: "mouseClick",
    value: function mouseClick() {
      console.log(this.bs_target);
      if (!this.toggled & this.hover) {
        this.tethered = this.bs_target;
        if (this.tethered && !this.inUse) {
          this.toggled = true;
          _eventDispatcher.default.emit('bs_selected', {
            x: this.x + 12,
            y: this.y - 50,
            f: this.frequency,
            t: this.freqType
          });
        }
      } else {
        this.graphics.clear();
        this.toggled = false;
      }
    }
  }, {
    key: "update",
    value: function update() {
      _get(_getPrototypeOf(relayBase.prototype), "update", this).call(this);
      if (this.tethered) {
        this.graphics.lineStyle(5, this.frequency, 1.0);
        this.relayIcon.setFrame(this.freqType).setVisible(true);
        this.baseLine.draw(this.graphics);
      } else {
        this.relayIcon.setVisible(false);
      }
    }
  }]);
  return relayBase;
}(_baseEquipment2.default);
exports.default = relayBase;
},{"./eventDispatcher.js":"src/entities/eventDispatcher.js","./baseEquipment.js":"src/entities/baseEquipment.js"}],"src/scenes/freeplay.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _baseStation = _interopRequireDefault(require("../entities/baseStation.js"));
var _eventDispatcher = _interopRequireDefault(require("../entities/eventDispatcher.js"));
var _car = _interopRequireDefault(require("../entities/car.js"));
var _phone = _interopRequireDefault(require("../entities/phone.js"));
var _laptop = _interopRequireDefault(require("../entities/laptop.js"));
var _tablet = _interopRequireDefault(require("../entities/tablet.js"));
var _relayBase = _interopRequireDefault(require("../entities/relayBase.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var RED_HEX = 0xec1c24;
var BLUE_HEX = 0x3f48cc;
var GREEN_HEX = 0x0ed145;
var Freeplay = /*#__PURE__*/function (_Phaser$Scene) {
  _inherits(Freeplay, _Phaser$Scene);
  var _super = _createSuper(Freeplay);
  function Freeplay() {
    _classCallCheck(this, Freeplay);
    return _super.call(this, {
      key: 'freeplayScene'
    });
  }
  _createClass(Freeplay, [{
    key: "init",
    value: function init(data) {
      this.cameras.main.fadeIn(1000, 0, 0, 0);
    }
  }, {
    key: "preload",
    value: function preload() {
      this.load.plugin('rexkawaseblurpipelineplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexkawaseblurpipelineplugin.min.js', true);
    }
  }, {
    key: "create",
    value: function create() {
      var _this = this;
      //Background magic
      var background = this.add.group();
      background.add(this.add.image(0, 0, 'paper_bg').setScale(0.5));
      background.add(this.add.image(700, 0, 'paper_bg').setScale(0.5));
      background.add(this.add.image(0, 500, 'paper_bg').setScale(0.5));
      background.add(this.add.image(700, 500, 'paper_bg').setScale(0.5));
      //Camera Control
      this.fadePlugin = this.plugins.start('rexkawaseblurpipelineplugin');
      this.input.setDefaultCursor('pencil_cursor, pointer');
      this.score = 0;
      this.score_threshold = 20;
      var cam = this.cameras.main;
      cam.setBounds(0, 0, this.game.config.width * 2, this.game.config.height * 2);
      var UIcam = this.cameras.add(0, 0, this.game.config.width, this.game.config.height).setName("UIcam");
      var pauseCam = this.cameras.add(0, 0, this.game.config.width, this.game.config.height).setName("pauseCam");
      _eventDispatcher.default.once('begin_camera', function () {
        cam.zoomTo(0.8, 1000);
        /*
        const visibleWidth = this.game.config.width*2 / cam.zoom;
        const visibleHeight = this.game.config.height*2 / cam.zoom;
        const offsetX = (visibleWidth - this.game.config.width*2) / 2;
        const offsetY = (visibleHeight - this.game.config.height*2) / 2;
        const bounds = new Phaser.Geom.Rectangle(
        offsetX,
        offsetY,
        visibleWidth,
        visibleHeight
        );
        cam.setBounds(bounds.x, bounds.y, bounds.width, bounds.height);*/
      });

      this.cameras.main.on('zoom', this.updatePhysicsWorldBounds, this);

      //Gameobject Reactive
      this.input.on('gameobjectdown', function (pointer, gameObject) {
        if (typeof gameObject.mainSprite != "undefined") {
          gameObject.scene.add.tween({
            targets: gameObject.mainSprite,
            scaleX: "*=0.8",
            scaleY: "*=0.8",
            duration: 120,
            onComplete: function onComplete() {
              gameObject.setInteractive();
            },
            yoyo: true
          });
          gameObject.disableInteractive();
        } else {
          gameObject.scene.add.tween({
            targets: gameObject,
            scaleX: "*=0.8",
            scaleY: "*=0.8",
            duration: 120,
            onComplete: function onComplete() {
              gameObject.setInteractive();
            },
            yoyo: true
          });
          gameObject.disableInteractive();
        }
      });
      this.UE_group = this.add.group({
        runChildUpdate: true
      });
      this.BS_group = this.add.group({
        runChildUpdate: true
      });
      _eventDispatcher.default.on('userFinished', function (bsInfo) {
        var carCoords = [25, 775 / cam.zoom];
        _this.maxUsers = 1 + Phaser.Math.FloorTo(_this.score / _this.score_threshold);
        for (var i = 0; i < _this.maxUsers; i++) {
          var newUser = 0;
          if (_this.UE_group.countActive() > _this.maxUsers) break;
          switch (Phaser.Math.RND.between(3, 4)) {
            //1 to Types of Devices
            case 1:
              //Default: Mobile Phone
              newUser = new _phone.default(_this, Phaser.Math.RND.between(150, 750 / cam.zoom), Phaser.Math.RND.between(50, 500 / cam.zoom)).setDepth(5);
              break;
            case 2:
              //Car Class, moves across screen but changes
              newUser = new _car.default(_this, carCoords[Phaser.Math.RND.between(0, 1)], Phaser.Math.RND.between(100, 550 / cam.zoom)).setDepth(5);
              break;
            case 3:
              //Laptop?
              newUser = new _laptop.default(_this, Phaser.Math.RND.between(150, 750 / cam.zoom), Phaser.Math.RND.between(50, 500 / cam.zoom)).setDepth(5);
              break;
            case 4:
              //Tablet
              newUser = new _tablet.default(_this, Phaser.Math.RND.between(150, 750 / cam.zoom), Phaser.Math.RND.between(50, 500 / cam.zoom)).setDepth(5);
              break;
          }
          _this.UE_group.add(newUser);
        }
        UIcam.ignore(_this.UE_group);
        pauseCam.ignore(_this.UE_group);
      });
      this.scoreText = this.add.text(10, -10, 'Score: ' + this.score, {
        fontSize: '40px',
        fill: '#000',
        fontFamily: 'Gloria Hallelujah'
      });
      this.mainTower = new _baseStation.default(this, Phaser.Math.RND.between(50, 125), 100).setDepth(1);
      var relayOne = new _relayBase.default(this, 450, 450).setDepth(1);
      this.BS_group.add(this.mainTower);
      this.BS_group.add(relayOne);
      //this.add.existing(this.mainTower);
      //this.add.existing(relayOne);
      _eventDispatcher.default.emit('userFinished');
      _eventDispatcher.default.on('gameover', function (failUE) {
        console.log(failUE); //Could show the user this?
        _this.blur_cameras(cam, UIcam, 4);
        _this.scene.pause();
        _this.scene.launch('gameoverScene', {
          finalScore: _this.score
        });
      }, this);

      //UI Buttons-------------------------------------------------------------------------------------
      var pause_button = this.add.sprite(this.game.config.width - 50, 30, 'pausebutton').setInteractive().on('pointerdown', function () {
        _this.blur_cameras(cam, UIcam, 4);
        pause_button.setVisible(false);
        _this.scene.pause();
        _this.scene.launch('pauseScene');
      }).setScale(0.5).setAlpha(1);
      _eventDispatcher.default.on('add_score', function (num) {
        _this.score += num;
        _this.scoreText.setText('Score: ' + _this.score);
      });

      //Base Station UI Control
      var red_button = this.add.sprite(300, this.game.config.height - 50, 'redbutton').setInteractive().setDepth(1).on('pointerdown', function () {
        _eventDispatcher.default.emit('new_frequency', {
          f: RED_HEX,
          name: 'red'
        });
      });
      var green_button = this.add.sprite(400, this.game.config.height - 50, 'greenbutton').setInteractive().setDepth(1).on('pointerdown', function () {
        _eventDispatcher.default.emit('new_frequency', {
          f: GREEN_HEX,
          name: 'green'
        });
      });
      var blue_button = this.add.sprite(500, this.game.config.height - 50, 'bluebutton').setInteractive().setDepth(1).on('pointerdown', function () {
        _eventDispatcher.default.emit('new_frequency', {
          f: BLUE_HEX,
          name: 'blue'
        });
      });
      this.events.on('resume', function () {
        _this.fadePlugin.remove(cam);
        _this.fadePlugin.remove(UIcam);
        pause_button.setVisible(true);
      });
      this.events.once('shutdown', function () {
        this.UE_group.destroy();
        this.mainTower.destroy();
        this.fadePlugin.stop();
        _eventDispatcher.default.removeAllListeners();
      }, this);
      cam.ignore([this.scoreText, red_button, green_button, blue_button, pause_button]);
      UIcam.ignore([this.mainTower, this.mainTower.graphics, this.UE_group, relayOne, pause_button, background]);
      pauseCam.ignore([this.scoreText, red_button, green_button, blue_button, this.mainTower, this.mainTower.graphics, this.UE_group, relayOne, background]);
    }

    //UPDATE FUNCTION
  }, {
    key: "update",
    value: function update(time, delta) {
      if (this.score > 10) _eventDispatcher.default.emit('begin_camera');
    }
  }, {
    key: "blur_cameras",
    value: function blur_cameras(cam, UIcam, b) {
      this.fadePlugin.add(cam, {
        blur: b
      });
      this.fadePlugin.add(UIcam, {
        blur: b
      });
    }
  }, {
    key: "updatePhysicsWorldBounds",
    value: function updatePhysicsWorldBounds() {
      var zoomFactor = this.cameras.main.zoom;
      var worldWidth = this.scale.width / zoomFactor;
      var worldHeight = this.scale.height / zoomFactor;
      this.physics.world.setBounds(0, 0, worldWidth, worldHeight);
    }
  }]);
  return Freeplay;
}(Phaser.Scene);
exports.default = Freeplay;
},{"../entities/baseStation.js":"src/entities/baseStation.js","../entities/eventDispatcher.js":"src/entities/eventDispatcher.js","../entities/car.js":"src/entities/car.js","../entities/phone.js":"src/entities/phone.js","../entities/laptop.js":"src/entities/laptop.js","../entities/tablet.js":"src/entities/tablet.js","../entities/relayBase.js":"src/entities/relayBase.js"}],"src/scenes/pause.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var Pause = /*#__PURE__*/function (_Phaser$Scene) {
  _inherits(Pause, _Phaser$Scene);
  var _super = _createSuper(Pause);
  function Pause() {
    _classCallCheck(this, Pause);
    return _super.call(this, {
      key: 'pauseScene'
    });
  }
  _createClass(Pause, [{
    key: "create",
    value: function create() {
      var _this = this;
      this.add.text(290, 240, 'Paused', {
        fontSize: '64px',
        fill: '#000',
        fontFamily: 'Gloria Hallelujah'
      }).setInteractive();
      this.add.text(235, 330, 'Wish this trick worked in real life', {
        fontSize: '20px',
        fontFamily: 'Gloria Hallelujah',
        fill: '#000'
      });
      var pause_button = this.add.sprite(this.game.config.width - 50, 30, 'pausebutton').on('pointerdown', function () {
        _this.scene.resume("freeplayScene");
        _this.scene.stop();
      }).setScale(0.5);
      pause_button.scene.add.tween({
        targets: pause_button,
        scaleX: "*=0.8",
        scaleY: "*=0.8",
        duration: 120,
        onComplete: function onComplete() {
          pause_button.setInteractive();
        },
        yoyo: true
      });
    }
  }, {
    key: "update",
    value: function update(time, delta) {}
  }]);
  return Pause;
}(Phaser.Scene);
var _default = Pause;
exports.default = _default;
},{}],"src/scenes/gameover.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var Gameover = /*#__PURE__*/function (_Phaser$Scene) {
  _inherits(Gameover, _Phaser$Scene);
  var _super = _createSuper(Gameover);
  function Gameover() {
    _classCallCheck(this, Gameover);
    return _super.call(this, {
      key: 'gameoverScene'
    });
  }
  _createClass(Gameover, [{
    key: "init",
    value: function init(data) {
      this.finalScore = data.finalScore;
    }
  }, {
    key: "create",
    value: function create() {
      var _this = this;
      this.graphics = this.add.graphics().setDepth(2);
      this.pencil = this.add.image(230, 445, 'pencil').setVisible(false).setScale(0.18).setDepth(3);
      this.add.text(80, 150, 'Game over!', {
        fontSize: '120px',
        fill: '#000',
        fontFamily: 'Gloria Hallelujah'
      });
      this.add.text(210, 300, 'Final score: ' + this.finalScore, {
        fontSize: '60px',
        fill: '#000',
        fontFamily: 'Gloria Hallelujah'
      });
      var return_button = this.add.text(230, 450, 'Return to menu', {
        fontSize: '48px',
        fill: '#000',
        fontFamily: 'Gloria Hallelujah '
      }).setInteractive().setDepth(1);
      return_button.on('pointerup', function () {
        return _this.exitMenu(return_button);
      }).on('pointerover', function () {
        _this.pencil.setVisible(true);
      }).on('pointerout', function () {
        _this.pencil.setVisible(false);
      });
    }
  }, {
    key: "update",
    value: function update(time, delta) {
      this.graphics.clear();
      this.graphics.lineStyle(6, 0x00000, 1);
      if (this.startDrawing && this.pencil.x > 230) {
        this.strikeThrough.p1.x = this.pencil.x - 30;
        this.strikeThrough.draw(this.graphics);
      }
    }
  }, {
    key: "exitMenu",
    value: function exitMenu(button) {
      var _this2 = this;
      //Add pencil strikethrough
      this.strikeThrough = new Phaser.Curves.Line([230, button.y + 42, this.pencil.x - 30, button.y + 42]);
      var pencilDuration = 300;
      this.input.enabled = false;
      this.startDrawing = true;
      this.tweens.add({
        targets: this.pencil,
        x: button.width + this.pencil.x + 30,
        duration: pencilDuration
      });
      this.time.delayedCall(500, function () {
        _this2.cameras.main.fadeOut(1000, 0, 0, 0);
        _this2.time.delayedCall(1000, function () {
          _this2.scene.stop('freeplayScene');
          _this2.scene.start('menuScene');
        });
      });
    }
  }]);
  return Gameover;
}(Phaser.Scene);
var _default = Gameover;
exports.default = _default;
},{}],"src/scenes/tutorial.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _baseStation = _interopRequireDefault(require("../entities/baseStation.js"));
var _eventDispatcher = _interopRequireDefault(require("../entities/eventDispatcher.js"));
var _car = _interopRequireDefault(require("../entities/car.js"));
var _phone = _interopRequireDefault(require("../entities/phone.js"));
var _relayBase = _interopRequireDefault(require("../entities/relayBase.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var Tutorial = /*#__PURE__*/function (_Phaser$Scene) {
  _inherits(Tutorial, _Phaser$Scene);
  var _super = _createSuper(Tutorial);
  function Tutorial() {
    _classCallCheck(this, Tutorial);
    return _super.call(this, {
      key: 'tutorialScene'
    });
  }
  _createClass(Tutorial, [{
    key: "preload",
    value: function preload() {}
  }, {
    key: "create",
    value: function create() {
      var _this = this;
      this.textBoxCount = 0;
      this.allDevices = this.add.group({
        runChildUpdate: true
      });
      this.progress = true;
      this.txtScene = this.scene.get('textBoxScene');
      //Emitters
      _eventDispatcher.default.on('user_started', function () {
        this.progress = true;
        this.events.emit('Progress');
        _eventDispatcher.default.off('user_started');
      }, this);

      //textBox.on('pointerdown', () => {textBox.setVisible(false);});
      this.events.on('Progress', function () {
        switch (_this.textBoxCount) {
          case 1:
            _this.mainTower = new _baseStation.default(_this, 400, 150).setScale(2);
            _this.txtScene.handleTextBoxUpdate(_this.textBoxCount);
            break;
          case 2:
            var tween = _this.tweens.add({
              targets: _this.mainTower,
              y: '+=30',
              // '+=100'
              x: '-=300',
              scale: 1,
              ease: 'Linear',
              // 'Cubic', 'Elastic', 'Bounce', 'Back'
              duration: 500,
              repeat: 0,
              // -1: infinity
              scope: _this
            });
            break;
          case 3:
            _this.phone_1 = new _phone.default(_this, 400, 150, _this.add_score, 10000).setScale(1);
            _this.allDevices.add(_this.phone_1);
            _this.txtScene.handleTextBoxUpdate(_this.textBoxCount);
            break;
          case 4:
            var tween = _this.tweens.add({
              targets: _this.phone_1,
              y: '+=70',
              // '+=100'
              x: '-=150',
              scale: 1,
              ease: 'Linear',
              // 'Cubic', 'Elastic', 'Bounce', 'Back'
              duration: 500,
              repeat: 0,
              // -1: infinity
              scope: _this
            });
            textBox.start(text_4, 30);
            _this.progress = false;
            break;
          case 5:
            if (_this.progress) {
              textBox.start(text_5, 30);
              _this.progress = false;
            }
          case 6:
            if (_this.progress) {
              textBox.start(text_6);
              _this.phone_2 = new _phone.default(_this, 700, 300, _this.add_score);
              _this.progress = false;
            }
        }
      });
      this.scene.run('textBoxScene');
    }
  }, {
    key: "update",
    value: function update() {}
  }, {
    key: "add_score",
    value: function add_score(num) {
      console.log('No scoring this time!');
    }
  }, {
    key: "handleTextBoxFinished",
    value: function handleTextBoxFinished() {
      this.input.enabled = true;
      this.textBoxCount += 1;
      this.events.emit('Progress');
    }
  }]);
  return Tutorial;
}(Phaser.Scene);
var _default = Tutorial;
exports.default = _default;
},{"../entities/baseStation.js":"src/entities/baseStation.js","../entities/eventDispatcher.js":"src/entities/eventDispatcher.js","../entities/car.js":"src/entities/car.js","../entities/phone.js":"src/entities/phone.js","../entities/relayBase.js":"src/entities/relayBase.js"}],"src/scenes/theory.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var Theory = /*#__PURE__*/function (_Phaser$Scene) {
  _inherits(Theory, _Phaser$Scene);
  var _super = _createSuper(Theory);
  function Theory() {
    _classCallCheck(this, Theory);
    return _super.call(this, {
      key: 'theoryScene'
    });
  }
  _createClass(Theory, [{
    key: "init",
    value: function init(data) {}
  }, {
    key: "preload",
    value: function preload() {}
  }, {
    key: "create",
    value: function create() {
      var _this = this;
      this.add.text(20, 20, 'This will have some theory about 5G, some of the challenges and some extended reading for those interested in some of the technologies hinted at.', {
        font: 'Arial 30px',
        fill: '#fff'
      });
      this.add.text(600, 500, 'Back', {
        font: 'Arial 30x',
        fill: '#fff'
      }).setInteractive().on('pointerup', function () {
        return _this.scene.start('menuScene');
      });
    }
  }]);
  return Theory;
}(Phaser.Scene);
var _default = Theory;
exports.default = _default;
},{}],"src/scenes/textbox.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _eventDispatcher = _interopRequireDefault(require("../entities/eventDispatcher"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var COLOR_PRIMARY = 0x77b5d9;
var COLOR_LIGHT = 0xd7eaf3;
var COLOR_DARK = 0x14397d;
var text_1 = "Hello! Welcome to the Tutorial of Mini Networks! This is a game about managing the many devices that rely on the wireless communications network we take for granted everyday.";
var text_2 = 'This is a Base Station! It acts as a central coordination point for wireless devices to connect to.';
var text_3 = 'This is a mobile phone, and is one of the many devices that require an internet connection.';
var text_4 = 'In Mini Networks, your job is to act as coordinator for all these wireless devices. In this example, try left clicking on the Base Station and then again on the phone to connect the phone to the network.';
var text_5 = 'Brilliant! The mobile phone will now be serviced, and the progress can be seen as a percentage. Each envelope is a visual representation of a data packet being sent from the Base Station to the User Equipment (A common term for these devices).';
var text_6 = 'Nice! That is one happy phone user. That user was quite close to the base station, let us see what happens when they are much further away';
var text_7 = 'As you can see, it takes a lot longer to service a user far away from the base station. This is due to the signal waveforms detoriating the further they must travel (In maths, this is usually expressed as the inverse square law).';
var textBox = /*#__PURE__*/function (_Phaser$Scene) {
  _inherits(textBox, _Phaser$Scene);
  var _super = _createSuper(textBox);
  function textBox() {
    _classCallCheck(this, textBox);
    return _super.call(this, {
      key: 'textBoxScene'
    });
  }
  _createClass(textBox, [{
    key: "preload",
    value: function preload() {
      this.load.scenePlugin({
        key: 'rexuiplugin',
        url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
        sceneKey: 'rexUI'
      });
      this.load.image('nextPage', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/assets/images/arrow-down-left.png');
    }
  }, {
    key: "create",
    value: function create() {
      var _this = this;
      this.tutScene = this.scene.get('tutorialScene');
      this.mainTextBox = createTextBox(this, 100, 400, {
        wrapWidth: 500,
        fixedWidth: 500,
        fixedHeight: 65
      }).start(text_1, 30);
      _eventDispatcher.default.on('textBoxFinished', function () {
        _this.tutScene.handleTextBoxFinished();
      });
      //Main logic used to update TextBox
    }
  }, {
    key: "handleTextBoxUpdate",
    value: function handleTextBoxUpdate(tbCount) {
      this.tutScene.input.enabled = false;
      console.log(tbCount);
      switch (tbCount) {
        case 1:
          this.mainTextBox.start(text_2, 30);
        case 2:
          this.mainTextBox.start(text_3, 30);
      }
    }
  }]);
  return textBox;
}(Phaser.Scene); //Code from Rex Plugin (Textbox UI)
var GetValue = Phaser.Utils.Objects.GetValue;
var createTextBox = function createTextBox(scene, x, y, config) {
  var wrapWidth = GetValue(config, 'wrapWidth', 0);
  var fixedWidth = GetValue(config, 'fixedWidth', 0);
  var fixedHeight = GetValue(config, 'fixedHeight', 0);
  var textBox = scene.rexUI.add.textBox({
    x: x,
    y: y,
    background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_PRIMARY).setStrokeStyle(2, COLOR_LIGHT),
    icon: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_DARK),
    text: getBuiltInText(scene, wrapWidth, fixedWidth, fixedHeight),
    //text: getBBcodeText(scene, wrapWidth, fixedWidth, fixedHeight),

    action: scene.add.image(0, 0, 'nextPage').setTint(COLOR_LIGHT).setVisible(false),
    space: {
      left: 20,
      right: 20,
      top: 20,
      bottom: 20,
      icon: 10,
      text: 10
    }
  }).setOrigin(0).layout();
  textBox.setInteractive().on('pointerdown', function () {
    var icon = this.getElement('action').setVisible(false);
    this.resetChildVisibleState(icon);
    if (this.isTyping) {
      this.stop(true);
    } else {
      this.typeNextPage();
    }
  }, textBox).on('pageend', function () {
    if (this.isLastPage) {
      this.once('pointerup', function () {
        _eventDispatcher.default.emit('textBoxFinished');
      });
    }
    var icon = this.getElement('action').setVisible(true);
    this.resetChildVisibleState(icon);
    icon.y -= 30;
    var tween = scene.tweens.add({
      targets: icon,
      y: '+=30',
      // '+=100'
      ease: 'Bounce',
      // 'Cubic', 'Elastic', 'Bounce', 'Back'
      duration: 500,
      repeat: 0,
      // -1: infinity
      yoyo: false
    });
  }, textBox);
  return textBox;
};
var getBuiltInText = function getBuiltInText(scene, wrapWidth, fixedWidth, fixedHeight) {
  return scene.add.text(0, 0, '', {
    fontSize: '20px',
    wordWrap: {
      width: wrapWidth
    },
    fontFamily: 'Source Sans Pro',
    maxLines: 3
  }).setFixedSize(fixedWidth, fixedHeight);
};
var getBBcodeText = function getBBcodeText(scene, wrapWidth, fixedWidth, fixedHeight) {
  return scene.rexUI.add.BBCodeText(0, 0, '', {
    fixedWidth: fixedWidth,
    fixedHeight: fixedHeight,
    fontSize: '20px',
    wrap: {
      mode: 'word',
      width: wrapWidth
    },
    maxLines: 3
  });
};
var _default = textBox;
exports.default = _default;
},{"../entities/eventDispatcher":"src/entities/eventDispatcher.js"}],"src/index.js":[function(require,module,exports) {
"use strict";

var _menu = _interopRequireDefault(require("./scenes/menu"));
var _preloader = _interopRequireDefault(require("./scenes/preloader"));
var _freeplay = _interopRequireDefault(require("./scenes/freeplay"));
var _pause = _interopRequireDefault(require("./scenes/pause"));
var _gameover = _interopRequireDefault(require("./scenes/gameover"));
var _tutorial = _interopRequireDefault(require("./scenes/tutorial"));
var _theory = _interopRequireDefault(require("./scenes/theory"));
var _textbox = _interopRequireDefault(require("./scenes/textbox"));
var _eventDispatcher = _interopRequireDefault(require("./entities/eventDispatcher"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
window.addEventListener('load', function () {
  var game = new Phaser.Game({
    width: 800,
    height: 600,
    type: Phaser.WebGL,
    backgroundColor: "#cccccc",
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
      default: 'arcade'
    },
    plugins: {}
  });
  game.scene.add("Preload", _preloader.default);
  game.scene.add("Menu", _menu.default);
  game.scene.add("Boot", Boot, true);
  game.scene.add("Freeplay", _freeplay.default);
  game.scene.add("Tutorial", _tutorial.default);
  game.scene.add("Theory", _theory.default);
  game.scene.add("Gameover", _gameover.default);
  game.scene.add("Pause", _pause.default);
  game.scene.add("Textbox", _textbox.default);
});
var Boot = /*#__PURE__*/function (_Phaser$Scene) {
  _inherits(Boot, _Phaser$Scene);
  var _super = _createSuper(Boot);
  function Boot() {
    _classCallCheck(this, Boot);
    return _super.call(this, {
      key: 'bootScene'
    });
  }
  _createClass(Boot, [{
    key: "init",
    value: function init(data) {}
  }, {
    key: "preload",
    value: function preload() {
      // Preload splash logo to be displayed in the preloader scene.
      this.load.image('logo', 'assets/phaser3-logo.png');
    }
  }, {
    key: "create",
    value: function create(data) {
      // Start the preloader
      this.add.image(400, 300, 'logo');
      this.scene.launch('preloaderScene');
    }
  }]);
  return Boot;
}(Phaser.Scene);
},{"./scenes/menu":"src/scenes/menu.js","./scenes/preloader":"src/scenes/preloader.js","./scenes/freeplay":"src/scenes/freeplay.js","./scenes/pause":"src/scenes/pause.js","./scenes/gameover":"src/scenes/gameover.js","./scenes/tutorial":"src/scenes/tutorial.js","./scenes/theory":"src/scenes/theory.js","./scenes/textbox":"src/scenes/textbox.js","./entities/eventDispatcher":"src/entities/eventDispatcher.js"}],"C:/Users/hh3g17/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "60998" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["C:/Users/hh3g17/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map