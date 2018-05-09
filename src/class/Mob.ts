class Mob extends Actor {
    public isDamaged = false;
    public damageBlinkLast = 0;

    constructor(state, image) {
        super(state, image)
        this.alive = true;
        this.health = 100;
        this.maxHealth = this.health;
        this.tint = 0xffffff;
    }

    public update(): void {

        // Call parent update function
        // window['firsttry'].Actor.prototype.update.call(this);
        super.update();
        // Kill mob if below the screen
        if (this.y > CONFIG.GAME_HEIGHT * CONFIG.PIXEL_RATIO + 200) {
            this.kill();
            return;
        }

        this.updateTint();
    };

    public updateTint() {

        // Mob hit
        if (this.isDamaged) {
            this.damageBlinkLast -= 2;

            if (this.damageBlinkLast < 0) {

                this.isDamaged = false;
            }
        }

        if (this.isDamaged) {
            this.tint = 0xff0000;
        } else {
            this.tint = 0xffffff;
        }
    };

    takeDamage(damage) {

        this.health -= damage;

        if (this.health <= 0) {
            this.kill();

        } else {
            this.blink();
        }
    };

    blink() {

        this.isDamaged = true;
        this.damageBlinkLast = CONFIG.BLINK_DAMAGE_TIME;
    };

    revive(health?: number) {
        // replenish health (dunno why, but it's always set to 1 when calling a dead sprite from a pool)
        this.health = this.maxHealth;
        return this;
    };

    die = function () {

        this.kill();
    };
    /*globals CONFIG */

}