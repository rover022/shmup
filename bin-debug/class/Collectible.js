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
var Collectible = (function (_super) {
    __extends(Collectible, _super);
    function Collectible(state, image) {
        var _this = _super.call(this, state, image) || this;
        _this.alive = true;
        _this.updateClass();
        return _this;
    }
    Collectible.prototype.update = function () {
        // Call parent update function
        // window['firsttry'].Actor.prototype.update.call(this);
        _super.prototype.update.call(this);
        // Kill mob if below the screen
        if (this.y > CONFIG.GAME_HEIGHT * CONFIG.PIXEL_RATIO + 200) {
            this.kill();
            return;
        }
    };
    ;
    Collectible.prototype.updateClass = function () {
        this.bonusClass = this.game.rnd.integerInRange(0, 3);
        // Ugly hack to skip the last spritesheet row (4 instead of 3)
        var fakeClass = this.bonusClass;
        if (fakeClass === 3) {
            fakeClass = 4;
        }
        var offset = fakeClass * 3;
        this.animations.add('idle', [0 + offset, 1 + offset, 2 + offset, 1 + offset], 15, true);
        this.play('idle');
    };
    ;
    return Collectible;
}(Actor));
__reflect(Collectible.prototype, "Collectible");
//# sourceMappingURL=Collectible.js.map