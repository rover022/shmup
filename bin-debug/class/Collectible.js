var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Collectible = /** @class */ (function (_super) {
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
//# sourceMappingURL=Collectible.js.map