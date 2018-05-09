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
var Mob = (function (_super) {
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
__reflect(Mob.prototype, "Mob");
//# sourceMappingURL=Mob.js.map