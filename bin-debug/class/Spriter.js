var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Spriter = (function (_super) {
    __extends(Spriter, _super);
    //private state: Phaser.State;
    function Spriter(state, image) {
        var _this = 
        //super(state, 0, 0);
        _super.call(this, state.game, 0, 0, image) || this;
        // Add the object to the game world
        _this.game.add.existing(_this);
        // Pure common things to ALL objects
        _this.anchor.setTo(0.5, 0.5);
        _this.scale.setTo(CONFIG.PIXEL_RATIO, CONFIG.PIXEL_RATIO);
        _this.game.physics.enable(_this, Phaser.Physics.ARCADE);
        return _this;
    }
    Object.defineProperty(Spriter.prototype, "state", {
        get: function () {
            return this.game.state.getCurrentState();
        },
        enumerable: true,
        configurable: true
    });
    return Spriter;
}(Phaser.Sprite));
__reflect(Spriter.prototype, "Spriter");
//# sourceMappingURL=Spriter.js.map