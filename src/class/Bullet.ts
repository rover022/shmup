class Bullet extends Spriter {
    public type = 0;
    public energy = 30;
    public speed = 120;
    public shooter = undefined;

    constructor(state: Phaser.State, type) {
        super(state, 'mob_bullet_' + (type + 1));
    }

    revive(h?: number) {
        return super.revive()
    };

    reviveH(shooter: Actor, angle) {
        this.shooter = shooter;
        this.reset(shooter.x, shooter.y);
        this.body.velocity.x = (this.speed * Math.sin(angle)) * CONFIG.PIXEL_RATIO;
        this.body.velocity.y = (this.speed * Math.cos(angle)) * CONFIG.PIXEL_RATIO;
        return super.revive()
    };


    update() {
        if (this.alive) {
            super.update();
            let safeRange = 20;
            if (this.x < -safeRange * CONFIG.PIXEL_RATIO ||
                this.x > (CONFIG.WORLD_WIDTH * 24 + safeRange) * CONFIG.PIXEL_RATIO ||
                this.y < -safeRange * CONFIG.PIXEL_RATIO ||
                this.y > (CONFIG.GAME_HEIGHT + safeRange) * CONFIG.PIXEL_RATIO) {
                this.kill();
            }
        }
    };

    /*globals CONFIG */


}