class Shoot {
    public game: Phaser.Game;
    public t: any[];
    public bullets: any[];
    public shootConfig: any;
    public shooter: Mob;

    public get state(): Game {
        return this.game.state.getCurrentState() as Game;
    }

    constructor(state: Phaser.State, shooter: Mob, shootConfig) {
        //super(state, 0, 0);
        this.game = state.game;
        this.shooter = shooter;
        this.shootConfig = shootConfig;
        // this.nBulletsAlive = shootConfig.nBullets;
        this.bullets = [];
        this.t = [];
        for (let j = 0; j < shootConfig.nShoots; j++) {
            // bulletDelay: 0,
            // bulletAngle: 0,
            // shootRotationSpeed: 0.2
            this.t[j] = setTimeout(() => {
                let config = this.shootConfig;
                // Shoot angle
                let shootAngle;

                if (config.shootAngle === 999) {	// Auto-aim player

                    shootAngle = this.shooter.getAngleTo(this.state.player);

                } else if (config.shootAngle === -999) {	// Random aim
                    shootAngle = this.game.rnd.realInRange(0, 2 * Math.PI);

                } else {
                    shootAngle = config.shootAngle;
                }

                // Shoot rotation speed

                shootAngle += this.shooter.x * config.shootRotationSpeed;

                // Bullets spread

                var bulletAngleStep = 0;

                if (config.nBullets > 1) {

                    if (config.bulletSpread === 0) { // This is the "auto-pan" at 360° special mode
                        bulletAngleStep = 2 * Math.PI / config.nBullets;

                    } else {
                        bulletAngleStep = config.bulletSpread;
                    }
                }
                // One salve
                for (let i = 0; i < config.nBullets; i++) {

                    if (this.state.bulletPoolsMob[config.bulletType].countDead() > 0) {

                        this.bullets[i] = this.state.bulletPoolsMob[config.bulletType].getFirstExists(false);

                        // this.state.physics.arcade.moveToObject(bullet, this.state.player, this.bulletSpeed * CONFIG.PIXEL_RATIO);

                        let angle: number;

                        if (config.bulletSpread === 0) {
                            angle = shootAngle + (i * bulletAngleStep);

                        } else {
                            angle = shootAngle + ((i - (config.nBullets - 1) / 2) * bulletAngleStep);
                        }

                        if (angle < 0 || angle >= 2 * Math.PI) {
                            angle = angle % (2 * Math.PI);
                        }
                        this.bullets[i].reviveH(shooter, angle);
                    }
                }
            }, j * shootConfig.shootDelay);
        }
    }

    die(bulletCancel) {
        // Bullet cancel : kill all bullets of the shoot
        if (bulletCancel) {
            this.bullets.forEach(function (bullet) {
                bullet.kill();
            });
        }
        // Cancel all running timers
        this.t.forEach(function (timer) {
            window.clearTimeout(timer);
        });
    };


}