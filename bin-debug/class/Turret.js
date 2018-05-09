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
var Turret = (function (_super) {
    __extends(Turret, _super);
    /*globals CONFIG */
    function Turret(state) {
        var _this = _super.call(this, state, "mob_turret_1") || this;
        _this.maxHealth = 150;
        _this.speed = 0;
        _this.isPinnedToGround = true;
        // this.groundType =
        _this.bulletType = 1;
        _this.shootDelay = 5000;
        _this.points = 5000;
        _this.lootProbability = 0.5;
        _this.shootConfig = {
            bulletType: 1,
            nBullets: 4,
            bulletDelay: 0,
            bulletAngle: 0,
            bulletSpread: 0,
            nShoots: 3,
            shootDelay: 50,
            shootAngle: 0,
            shootRotationSpeed: 0.1
        };
        //
        var preshoot = _this.animations.add('pre-shoot', [0, 1, 2, 3, 4, 5, 6, 7, 8], 15, false);
        // preshoot.onStart.add(animationStarted, this);
        preshoot.onComplete.add(function () {
            // Call the parent shoot function
            // todo
            // window['firsttry'].Enemy.prototype.shoot.call(this, this.shootConfig);
            _super.prototype.shoot.call(_this, _this.shootConfig);
            // this.shoot(this.shootConfig);
            _this.play('shoot');
        }, _this);
        // preshoot.onComplete.add(function (sprite) {
        //
        //     // Call the parent shoot function
        //     // todo
        //     // window['firsttry'].Enemy.prototype.shoot.call(this, this.shootConfig);
        //
        //     sprite.play('shoot');
        // }, this);
        var shoot = _this.animations.add('shoot', [8, 7, 6, 5, 4, 3, 2, 1, 0], 15, false);
        shoot.onComplete.add(function (sprite) {
            sprite.play('idle');
        }, _this);
        _this.animations.add('idle', [0], 5, true);
        // this.animations.add('pre-shoot', [0, 1, 2, 3, 4, 5, 6, 7, 8], 10, true);
        // this.animations.add('shoot', [8, 7, 6, 5, 4, 3, 2, 1, 0], 10, true);
        _this.play('idle');
        return _this;
    }
    Turret.prototype.shoot = function () {
        this.play('pre-shoot');
        // Call the parent shoot function
        // window['firsttry'].Enemy.prototype.shoot.call(this);
    };
    ;
    // revive(i, j) {
    Turret.prototype.revive = function (health) {
        // this.reset(
        //     (i + 0.5) * 24 * CONFIG.PIXEL_RATIO,
        //     ((j + 0.5) - CONFIG.WORLD_SWAP_HEIGHT) * 28 * CONFIG.PIXEL_RATIO
        // );
        this.body.velocity.y = this.state.scrollSpeed * CONFIG.PIXEL_RATIO;
        this.nextShotAt = this.game.rnd.integerInRange(0, this.shootDelay);
        // Call the parent revive function
        // window['firsttry'].Mob.prototype.revive.call(this);
        return _super.prototype.revive.call(this);
    };
    ;
    Turret.prototype.reviveW = function (i, j) {
        this.reset((i + 0.5) * 24 * CONFIG.PIXEL_RATIO, ((j + 0.5) - CONFIG.WORLD_SWAP_HEIGHT) * 28 * CONFIG.PIXEL_RATIO);
        this.body.velocity.y = this.state.scrollSpeed * CONFIG.PIXEL_RATIO;
        this.nextShotAt = this.game.rnd.integerInRange(0, this.shootDelay);
        // Call the parent revive function
        // window['firsttry'].Mob.prototype.revive.call(this);
        return _super.prototype.revive.call(this);
    };
    ;
    return Turret;
}(Enemy));
__reflect(Turret.prototype, "Turret");
//# sourceMappingURL=Turret.js.map