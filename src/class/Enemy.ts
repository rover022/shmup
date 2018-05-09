class Enemy extends Mob {
    public shootDelay = 1000;
    public speed = 50;
    public points = 100;
    public bulletType = 0;
    public bulletSpeed = 100;
    public bulletCancel = false;

    public lootProbability = 0.2;
    public lootType = 1;

    public shootConfig = {};
    public shoots: Shoot[] = [];
    public nextShotAt: number;

    constructor(state, image) {
        super(state, image)
        this.shootConfig = {}
    }

    update() {
        super.update();
        // Mob shoot
        if (this.alive && 	// Enemy is alive
            this.state.player.alive && 	// Player is alive
            this.y < this.state.player.y - 100 * CONFIG.PIXEL_RATIO && // Enemy above player

            this.state.time.now > this.nextShotAt &&
            this.state.bulletPoolsMob[this.bulletType].countDead() > 0
        ) {
            this.shoot(this.shootConfig);
        }
    };

    public shoot(shootConfig) {
        this.shoots.push(new Shoot(this.state, this, shootConfig));
        this.nextShotAt = this.state.time.now + this.shootDelay;
    };

    kill() {

        // Call the parent die function
        // Explosion sound
        let s = this.maxHealth;
        let f: number;

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
        //敌人死亡时候播放声音
        // console.log(this.alive);
        if (this.alive) {
            SoundManager.getInstance().play('explosion_' + f)
        }
        super.kill();
        // Cancel planed shoots
        let bulletCancel = this.bulletCancel;
        this.shoots.forEach(((value, index, array) => {
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



        // this.game.sound['explosion_' + f].play();
        return this;
    };

    revive(h?: number) {
        if (!this.isPinnedToGround) {
            // spawn at a random location top of the screen
            this.reset(this.game.rnd.between(16, CONFIG.WORLD_WIDTH * 24 * CONFIG.PIXEL_RATIO - 16), -32);
            this.body.velocity.y = (this.speed + this.state.scrollSpeed) * CONFIG.PIXEL_RATIO;
        } else {
            // spawn at a random location top of the screen, aligned with ground grid
            this.reset((this.game.rnd.integerInRange(1, CONFIG.WORLD_WIDTH) - 0.5) * 24 * CONFIG.PIXEL_RATIO, -32);
            this.body.velocity.y = this.state.scrollSpeed * CONFIG.PIXEL_RATIO;
        }
        this.nextShotAt = this.game.rnd.integerInRange(0, this.shootDelay);

        // Call the parent revive function
        // window['firsttry'].Mob.prototype.revive.call(this);
        return super.revive();
    };

    loot(type) {

        let bonus = this.state.bonusPool.getFirstExists(false);
        bonus.updateClass();
        bonus.reset(this.x, this.y);
        bonus.body.velocity.y = 40 * CONFIG.PIXEL_RATIO;
        bonus.body.angularVelocity = 30;

        type = type;
    };

    /*globals CONFIG */


}