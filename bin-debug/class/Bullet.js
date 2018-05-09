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
var Bullet = /** @class */ (function (_super) {
    __extends(Bullet, _super);
    function Bullet(state, type) {
        var _this = _super.call(this, state, 'mob_bullet_' + (type + 1)) || this;
        _this.type = 0;
        _this.energy = 30;
        _this.speed = 120;
        _this.shooter = undefined;
        return _this;
    }
    Bullet.prototype.revive = function (h) {
        return _super.prototype.revive.call(this);
    };
    ;
    Bullet.prototype.reviveH = function (shooter, angle) {
        this.shooter = shooter;
        this.reset(shooter.x, shooter.y);
        this.body.velocity.x = (this.speed * Math.sin(angle)) * CONFIG.PIXEL_RATIO;
        this.body.velocity.y = (this.speed * Math.cos(angle)) * CONFIG.PIXEL_RATIO;
        return _super.prototype.revive.call(this);
    };
    ;
    Bullet.prototype.update = function () {
        if (this.alive) {
            _super.prototype.update.call(this);
            var safeRange = 20;
            if (this.x < -safeRange * CONFIG.PIXEL_RATIO ||
                this.x > (CONFIG.WORLD_WIDTH * 24 + safeRange) * CONFIG.PIXEL_RATIO ||
                this.y < -safeRange * CONFIG.PIXEL_RATIO ||
                this.y > (CONFIG.GAME_HEIGHT + safeRange) * CONFIG.PIXEL_RATIO) {
                this.kill();
            }
        }
    };
    ;
    return Bullet;
}(Spriter));
//# sourceMappingURL=Bullet.js.map