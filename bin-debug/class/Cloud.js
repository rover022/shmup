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
var Cloud = /** @class */ (function (_super) {
    __extends(Cloud, _super);
    function Cloud(state) {
        var _this = _super.call(this, state, "clouds") || this;
        _this.speed = 0;
        _this.type = 0;
        _this.animations.add('idle_0', [0]);
        _this.animations.add('idle_1', [1]);
        _this.animations.add('idle_2', [2]);
        _this.animations.add('idle_3', [3]);
        _this.animations.add('idle_4', [4]);
        _this.animations.add('idle_5', [5]);
        _this.animations.add('idle_6', [6]);
        _this.animations.add('idle_7', [7]);
        return _this;
    }
    Cloud.prototype.revive = function (h) {
        this.reset(this.game.rnd.integerInRange(0, CONFIG.WORLD_WIDTH) * 24 * CONFIG.PIXEL_RATIO, -3 * 28 * CONFIG.PIXEL_RATIO);
        this.body.velocity.y = (this.game.rnd.realInRange(-1, 1) * CONFIG.CLOUD_WIND_SPEED +
            CONFIG.CLOUD_WIND_SPEED +
            this.state.scrollSpeed) * CONFIG.PIXEL_RATIO;
        this.type = this.game.rnd.integerInRange(0, 7);
        this.play('idle_' + this.type);
        // Call the parent revive function
        // window['firsttry'].Mob.prototype.revive.call(this);
        return _super.prototype.revive.call(this);
    };
    ;
    return Cloud;
}(Mob));
//# sourceMappingURL=Cloud.js.map