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
var Mob = /** @class */ (function (_super) {
    __extends(Mob, _super);
    function Mob(state, image) {
        var _this = _super.call(this, state, image) || this;
        _this.isDamaged = false;
        _this.damageBlinkLast = 0;
        _this.die = function () {
            this.kill();
        };
        _this.alive = true;
        _this.health = 100;
        _this.maxHealth = _this.health;
        _this.tint = 0xffffff;
        return _this;
    }
    Mob.prototype.update = function () {
        // Call parent update function
        // window['firsttry'].Actor.prototype.update.call(this);
        _super.prototype.update.call(this);
        // Kill mob if below the screen
        if (this.y > CONFIG.GAME_HEIGHT * CONFIG.PIXEL_RATIO + 200) {
            this.kill();
            return;
        }
        this.updateTint();
    };
    ;
    Mob.prototype.updateTint = function () {
        // Mob hit
        if (this.isDamaged) {
            this.damageBlinkLast -= 2;
            if (this.damageBlinkLast < 0) {
                this.isDamaged = false;
            }
        }
        if (this.isDamaged) {
            this.tint = 0xff0000;
        }
        else {
            this.tint = 0xffffff;
        }
    };
    ;
    Mob.prototype.takeDamage = function (damage) {
        this.health -= damage;
        if (this.health <= 0) {
            this.kill();
        }
        else {
            this.blink();
        }
    };
    ;
    Mob.prototype.blink = function () {
        this.isDamaged = true;
        this.damageBlinkLast = CONFIG.BLINK_DAMAGE_TIME;
    };
    ;
    Mob.prototype.revive = function (health) {
        // replenish health (dunno why, but it's always set to 1 when calling a dead sprite from a pool)
        this.health = this.maxHealth;
        return this;
    };
    ;
    return Mob;
}(Actor));
//# sourceMappingURL=Mob.js.map