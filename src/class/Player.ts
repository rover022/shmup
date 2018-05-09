import load = EXML.load;
import Key = Phaser.Key;
import Keyboard = Phaser.Keyboard;

class Player extends Mob {
    playerClass: number = 0;
    playerStats: any
    classStats: any;
    private bulletPool: Phaser.Group;
    private nextShotAt: number;
    private lastUpdate: number;
    private speed: number;
    private accel: number;
    private strength: number;
    private shootDelay: number;

    constructor(state) {


        // this.playerClass = this.game.rnd.between(1, 4);
        // this.playerStats = CONFIG.CLASS_STATS[this.playerClass - 1];
        // this.classStats = this.playerStats;

        super(state, "player_" + 2);
        this.playerClass = this.game.rnd.between(1, 4);
        this.playerStats = CONFIG.CLASS_STATS[this.playerClass - 1];
        this.classStats = this.playerStats;
        this.body.setSize(7 * CONFIG.PIXEL_RATIO, 7 * CONFIG.PIXEL_RATIO, 0, 3 * CONFIG.PIXEL_RATIO);

        this.spawn();

        this.animations.add('left_full', [0], 5, true);
        this.animations.add('left', [1], 5, true);
        this.animations.add('idle', [2], 5, true);
        this.animations.add('right', [3], 5, true);
        this.animations.add('right_full', [4], 5, true);
        this.play('idle');

        this.health = this.playerStats.health;

        this.updateStats();

        this.nextShotAt = 0;
        this.lastUpdate = 0;

        this.game.add.existing(this);

        // PLAYER BULLETS

        this.createBulletPool();
    }

    spawn() {

        this.x = this.game.width / 2;
        this.y = this.game.height / 4 * 3;
    };

    createBulletPool() {
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

    update() {
        super.update();
        this.updateInputs();
        this.updateSprite();
        this.updateBullets();
    };

    updateStats() {

        this.speed = this.playerStats.speed * CONFIG.PIXEL_RATIO;
        this.accel = this.speed * this.playerStats.accel;
        this.strength = this.playerStats.strength;
        this.shootDelay = 1000 / this.playerStats.rate;
    };

    updateInputs() {
        // USER INPUTS
        let cursors = this.state.cursors;
        let keyboard = this.state.input.keyboard;


        if (this.state.gameState === 0) {	// Pre-play
            if (keyboard.isDown(Phaser.Keyboard.W)) {
                this.state.statePreplay2Play();
            }

        } else if (this.state.gameState === 2) {	// Post-play (game over)

            if (keyboard.isDown(Phaser.Keyboard.W)) {
                this.game.state.start('menu');
            }

        } else { // Play
            let delta = (this.game.time.now - this.lastUpdate) / 1000; //in seconds
            this.lastUpdate = this.game.time.now;

            // Move
            //console.log("cursors.left.isDown:",cursors.left.isDown)
            //console.log(this.x > 20 * CONFIG.PIXEL_RATIO)


            let is_LEFT = this.game.input.keyboard.isDown(Keyboard.A);
            let is_RIGHT = this.game.input.keyboard.isDown(Keyboard.D);
            let is_UP = this.game.input.keyboard.isDown(Keyboard.W);
            let is_DOWN = this.game.input.keyboard.isDown(Keyboard.S);

            if (is_LEFT && this.x > 20 * CONFIG.PIXEL_RATIO) {
                this.moveLeft( );
            } else if (is_RIGHT && this.x < (CONFIG.WORLD_WIDTH * 24 - 20) * CONFIG.PIXEL_RATIO) {
                this.moveRight( );
            } else {
                this.floatH(delta);
            }
            if (is_UP && this.y > 30 * CONFIG.PIXEL_RATIO) {
                this.moveUp();
            } else if (is_DOWN && this.y < (CONFIG.GAME_HEIGHT - 20) * CONFIG.PIXEL_RATIO) {
                this.moveDown();
            } else {
                this.floatV(delta);
            }

            // Fire
            let isAuto = true;
            if (isAuto) {
                this.fire();
            } else {
                if (keyboard.isDown(Phaser.Keyboard.W)) {
                    this.fire();
                }
            }

        }
    };

    updateSprite() {
        let spd = this.body.velocity.x;

        if (spd < -this.speed / 4 * 3) {
            this.play('left_full');
        } else if (spd > this.speed / 4 * 3) {
            this.play('right_full');
        } else if (spd < -this.speed / 5) {
            this.play('left');
        } else if (spd > this.speed / 5) {
            this.play('right');
        } else {
            this.play('idle');
        }
    };

    moveLeft() {
        //console.log("moveLeft")
        this.body.velocity.x -= this.accel * this.state.delta;
        if (this.body.velocity.x < -this.speed) {
            this.body.velocity.x = -this.speed;
        }
    };

    moveRight() {
        //console.log("moveRight")
        this.body.velocity.x += this.accel * this.state.delta;
        if (this.body.velocity.x > this.speed) {
            this.body.velocity.x = this.speed;
        }
    };

    moveUp() {
        //console.log("moveUp")
        this.body.velocity.y -= this.accel * this.state.delta;
        if (this.body.velocity.y < -this.speed) {
            this.body.velocity.y = -this.speed;
        }
        return this;
    };

    moveDown() {
        //console.log("moveDown")
        this.body.velocity.y += this.accel * this.state.delta;
        if (this.body.velocity.y > this.speed) {
            this.body.velocity.y = this.speed;
        }
        return this;
    };

    floatH(delta) {

        if (this.body.velocity.x > 0) {
            this.body.velocity.x -= this.accel * delta;
            if (this.body.velocity.x < 0) {
                this.body.velocity.x = 0;
            }
        } else {
            this.body.velocity.x += this.accel * delta;
            if (this.body.velocity.x > 0) {
                this.body.velocity.x = 0;
            }
        }
    };

    floatV(delta) {

        if (this.body.velocity.y > 0) {
            this.body.velocity.y -= this.accel * delta;
            if (this.body.velocity.y < 0) {
                this.body.velocity.y = 0;
            }
        } else {
            this.body.velocity.y += this.accel * delta;
            if (this.body.velocity.y > 0) {
                this.body.velocity.y = 0;
            }
        }
    };

    fire() {

        if (this.alive) {
            if (this.nextShotAt > this.game.time.now) {
                return;
            }

            this.nextShotAt = this.game.time.now + this.shootDelay;

            var bullet = this.bulletPool.getFirstExists(false);
            bullet.reset(this.x, this.y - 20);

            bullet.body.velocity.y = -500 * CONFIG.PIXEL_RATIO;


            // TODO in updateBulletPool instead !!!
            var s = this.strength,
                f;

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

    updateBullets() {

        // PLAYER BULLETS
        // (dunno why some hi-speed bullets stay alive outside of the screen / world)

        this.bulletPool.forEachAlive(function (bullet) {
            if (bullet.y < -200) {
                bullet.kill();
                return;
            }
        }, this);
    };

    updateBulletPool() {

        var s = this.strength,
            f;

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

    collectUpgrade(upgrade) {

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

        } else if (upgrade === 1) {
            this.playerStats.rate += 1;

        } else if (upgrade === 2) {
            this.playerStats.speed += 10;

        } else {
            this.playerStats.accel += 1;
        }

        this.updateStats();
        this.updateBulletPool();

        this.state.sound['collect_1'].play();
    };


    /*globals CONFIG */


}