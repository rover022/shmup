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
var Enemy = /** @class */ (function (_super) {
    __extends(Enemy, _super);
    function Enemy(state, image) {
        var _this = _super.call(this, state, image) || this;
        _this.shootDelay = 1000;
        _this.speed = 50;
        _this.points = 100;
        _this.bulletType = 0;
        _this.bulletSpeed = 100;
        _this.bulletCancel = false;
        _this.lootProbability = 0.2;
        _this.lootType = 1;
        _this.shootConfig = {};
        _this.shoots = [];
        _this.shootConfig = {};
        return _this;
    }
    Enemy.prototype.update = function () {
        _super.prototype.update.call(this);
        // Mob shoot
        if (this.alive && // Enemy is alive
            this.state.player.alive && // Player is alive
            this.y < this.state.player.y - 100 * CONFIG.PIXEL_RATIO && // Enemy above player
            this.state.time.now > this.nextShotAt &&
            this.state.bulletPoolsMob[this.bulletType].countDead() > 0) {
            this.shoot(this.shootConfig);
        }
    };
    ;
    Enemy.prototype.shoot = function (shootConfig) {
        this.shoots.push(new Shoot(this.state, this, shootConfig));
        this.nextShotAt = this.state.time.now + this.shootDelay;
    };
    ;
    Enemy.prototype.kill = function () {
        // Call the parent die function
        //window['firsttry'].Mob.prototype.die.call(this);
        _super.prototype.kill.call(this);
        // Cancel planed shoots
        var bulletCancel = this.bulletCancel;
        this.shoots.forEach((function (value, index, array) {
            value.die(bulletCancel);
        }));
        // this.shoots.forEach(function (shoot) {
        //     // shoot.kill();
        //     shoot.die()
        // });
        // Loot things
        if (this.state.rnd.realInRange(0, 1) < this.lootProbability) {
            this.loot(this.lootType);
        }
        // Explosion sound
        var s = this.maxHealth, f;
        if (s < 80) {
            f = 1;
        }
        else if (s < 200) {
            f = 2;
        }
        else if (s < 500) {
            f = 3;
        }
        else {
            f = 4;
        }
        this.game.sound['explosion_' + f].play();
        return this;
    };
    ;
    Enemy.prototype.revive = function (h) {
        if (!this.isPinnedToGround) {
            // spawn at a random location top of the screen
            this.reset(this.game.rnd.between(16, CONFIG.WORLD_WIDTH * 24 * CONFIG.PIXEL_RATIO - 16), -32);
            this.body.velocity.y = (this.speed + this.state.scrollSpeed) * CONFIG.PIXEL_RATIO;
        }
        else {
            // spawn at a random location top of the screen, aligned with ground grid
            this.reset((this.game.rnd.integerInRange(1, CONFIG.WORLD_WIDTH) - 0.5) * 24 * CONFIG.PIXEL_RATIO, -32);
            this.body.velocity.y = this.state.scrollSpeed * CONFIG.PIXEL_RATIO;
        }
        this.nextShotAt = this.game.rnd.integerInRange(0, this.shootDelay);
        // Call the parent revive function
        // window['firsttry'].Mob.prototype.revive.call(this);
        return _super.prototype.revive.call(this);
    };
    ;
    Enemy.prototype.loot = function (type) {
        var bonus = this.state.bonusPool.getFirstExists(false);
        bonus.updateClass();
        bonus.reset(this.x, this.y);
        bonus.body.velocity.y = 40 * CONFIG.PIXEL_RATIO;
        bonus.body.angularVelocity = 30;
        type = type;
    };
    ;
    return Enemy;
}(Mob));
//# sourceMappingURL=Enemy.js.map