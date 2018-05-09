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
var load = EXML.load;
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player(state) {
        // this.playerClass = this.game.rnd.between(1, 4);
        // this.playerStats = CONFIG.CLASS_STATS[this.playerClass - 1];
        // this.classStats = this.playerStats;
        var _this = _super.call(this, state, "player_" + 1) || this;
        _this.playerClass = 0;
        _this.playerClass = _this.game.rnd.between(1, 4);
        _this.playerStats = CONFIG.CLASS_STATS[_this.playerClass - 1];
        _this.classStats = _this.playerStats;
        _this.body.setSize(7 * CONFIG.PIXEL_RATIO, 7 * CONFIG.PIXEL_RATIO, 0, 3 * CONFIG.PIXEL_RATIO);
        _this.spawn();
        _this.animations.add('left_full', [0], 5, true);
        _this.animations.add('left', [1], 5, true);
        _this.animations.add('idle', [2], 5, true);
        _this.animations.add('right', [3], 5, true);
        _this.animations.add('right_full', [4], 5, true);
        _this.play('idle');
        _this.health = _this.playerStats.health;
        _this.updateStats();
        _this.nextShotAt = 0;
        _this.lastUpdate = 0;
        _this.game.add.existing(_this);
        // PLAYER BULLETS
        _this.createBulletPool();
        return _this;
    }
    Player.prototype.spawn = function () {
        this.x = this.game.width / 2;
        this.y = this.game.height / 4 * 3;
    };
    ;
    Player.prototype.createBulletPool = function () {
        this.bulletPool = this.game.add.group();
        this.bulletPool.enableBody = true;
        this.bulletPool.physicsBodyType = Phaser.Physics.ARCADE;
        this.bulletPool.createMultiple(100, 'player_bullet');
        this.bulletPool.setAll('anchor.x', 0.5);
        this.bulletPool.setAll('anchor.y', 0.5);
        this.bulletPool.setAll('scale.x', CONFIG.PIXEL_RATIO);
        this.bulletPool.setAll('scale.y', CONFIG.PIXEL_RATIO);
        this.bulletPool.setAll('outOfBoundsKill', true);
        this.bulletPool.setAll('checkWorldBounds', true);
        this.updateBulletPool();
    };
    ;
    Player.prototype.update = function () {
        _super.prototype.update.call(this);
        this.updateInputs();
        this.updateSprite();
        this.updateBullets();
    };
    ;
    Player.prototype.updateStats = function () {
        this.speed = this.playerStats.speed * CONFIG.PIXEL_RATIO;
        this.accel = this.speed * this.playerStats.accel;
        this.strength = this.playerStats.strength;
        this.shootDelay = 1000 / this.playerStats.rate;
    };
    ;
    Player.prototype.updateInputs = function () {
        // USER INPUTS
        var cursors = this.state.cursors;
        var keyboard = this.state.input.keyboard;
        if (this.state.gameState === 0) { // Pre-play
            if (keyboard.isDown(Phaser.Keyboard.W)) {
                this.state.statePreplay2Play();
            }
        }
        else if (this.state.gameState === 2) { // Post-play (game over)
            if (keyboard.isDown(Phaser.Keyboard.W)) {
                this.game.state.start('menu');
            }
        }
        else { // Play
            var delta = (this.game.time.now - this.lastUpdate) / 1000; //in seconds
            this.lastUpdate = this.game.time.now;
            // Move
            if (cursors.left.isDown && this.x > 20 * CONFIG.PIXEL_RATIO) {
                this.moveLeft(delta);
            }
            else if (cursors.right.isDown && this.x < (CONFIG.WORLD_WIDTH * 24 - 20) * CONFIG.PIXEL_RATIO) {
                this.moveRight(delta);
            }
            else {
                this.floatH(delta);
            }
            if (cursors.up.isDown && this.y > 30 * CONFIG.PIXEL_RATIO) {
                this.moveUp();
            }
            else if (cursors.down.isDown && this.y < (CONFIG.GAME_HEIGHT - 20) * CONFIG.PIXEL_RATIO) {
                this.moveDown();
            }
            else {
                this.floatV(delta);
            }
            // Fire
            if (keyboard.isDown(Phaser.Keyboard.W)) {
                this.fire();
            }
        }
    };
    ;
    Player.prototype.updateSprite = function () {
        var spd = this.body.velocity.x;
        if (spd < -this.speed / 4 * 3) {
            this.play('left_full');
        }
        else if (spd > this.speed / 4 * 3) {
            this.play('right_full');
        }
        else if (spd < -this.speed / 5) {
            this.play('left');
        }
        else if (spd > this.speed / 5) {
            this.play('right');
        }
        else {
            this.play('idle');
        }
    };
    ;
    Player.prototype.moveLeft = function (delta) {
        this.body.velocity.x -= this.accel * delta;
        if (this.body.velocity.x < -this.speed) {
            this.body.velocity.x = -this.speed;
        }
    };
    ;
    Player.prototype.moveRight = function (delta) {
        this.body.velocity.x += this.accel * delta;
        if (this.body.velocity.x > this.speed) {
            this.body.velocity.x = this.speed;
        }
    };
    ;
    Player.prototype.moveUp = function () {
        this.body.velocity.y -= this.accel * this.state.delta;
        if (this.body.velocity.y < -this.speed) {
            this.body.velocity.y = -this.speed;
        }
        return this;
    };
    ;
    Player.prototype.moveDown = function () {
        this.body.velocity.y += this.accel * this.state.delta;
        if (this.body.velocity.y > this.speed) {
            this.body.velocity.y = this.speed;
        }
        return this;
    };
    ;
    Player.prototype.floatH = function (delta) {
        if (this.body.velocity.x > 0) {
            this.body.velocity.x -= this.accel * delta;
            if (this.body.velocity.x < 0) {
                this.body.velocity.x = 0;
            }
        }
        else {
            this.body.velocity.x += this.accel * delta;
            if (this.body.velocity.x > 0) {
                this.body.velocity.x = 0;
            }
        }
    };
    ;
    Player.prototype.floatV = function (delta) {
        if (this.body.velocity.y > 0) {
            this.body.velocity.y -= this.accel * delta;
            if (this.body.velocity.y < 0) {
                this.body.velocity.y = 0;
            }
        }
        else {
            this.body.velocity.y += this.accel * delta;
            if (this.body.velocity.y > 0) {
                this.body.velocity.y = 0;
            }
        }
    };
    ;
    Player.prototype.fire = function () {
        if (this.alive) {
            if (this.nextShotAt > this.game.time.now) {
                return;
            }
            this.nextShotAt = this.game.time.now + this.shootDelay;
            var bullet = this.bulletPool.getFirstExists(false);
            bullet.reset(this.x, this.y - 20);
            bullet.body.velocity.y = -500 * CONFIG.PIXEL_RATIO;
            // TODO in updateBulletPool instead !!!
            var s = this.strength, f;
            if (s < 100) {
                f = 1;
            }
            else if (s < 120) {
                f = 2;
            }
            else if (s < 140) {
                f = 3;
            }
            else if (s < 160) {
                f = 4;
            }
            else {
                f = 5;
            }
            this.game.sound['shoot_player_' + f].play('', 0, 0.25);
        }
    };
    ;
    Player.prototype.updateBullets = function () {
        // PLAYER BULLETS
        // (dunno why some hi-speed bullets stay alive outside of the screen / world)
        this.bulletPool.forEachAlive(function (bullet) {
            if (bullet.y < -200) {
                bullet.kill();
                return;
            }
        }, this);
    };
    ;
    Player.prototype.updateBulletPool = function () {
        var s = this.strength, f;
        if (s < 100) {
            f = 0;
        }
        else if (s < 120) {
            f = 1;
        }
        else if (s < 160) {
            f = 2;
        }
        else {
            f = 3;
        }
        this.bulletPool.forEach(function (bullet) {
            bullet.animations.add('idle', [f], 5, true);
            bullet.play('idle');
        }, null);
    };
    ;
    Player.prototype.collectUpgrade = function (upgrade) {
        // TODO : relative upgrades
        // var nSteps = 7; // Number of upgrades needed for max level
        // var maxFactor = 2; // How many times the base (read class) level
        // var nParts = 0;
        // for (var i = 1; i < nSteps; i++) {
        // 	nParts += i;
        // };
        // var strengthPart = this.classStats.strength * (maxFactor - 1);
        if (upgrade === 0) {
            this.playerStats.strength += 10;
        }
        else if (upgrade === 1) {
            this.playerStats.rate += 1;
        }
        else if (upgrade === 2) {
            this.playerStats.speed += 10;
        }
        else {
            this.playerStats.accel += 1;
        }
        this.updateStats();
        this.updateBulletPool();
        this.state.sound['collect_1'].play();
    };
    ;
    return Player;
}(Mob));
//# sourceMappingURL=Player.js.map