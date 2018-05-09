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
var Turret = /** @class */ (function (_super) {
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
//# sourceMappingURL=Turret.js.map