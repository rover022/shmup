class Mob extends Actor {

    public alive = true;
    public health = 100;
    public maxHealth = this.health;
    public isDamaged = false;
    public damageBlinkLast = 0;
    public tint = 0xffffff;

    constructor(state, image) {
        super(state, image)

    }

    update() {

        // Call parent update function
        window['firsttry'].Actor.prototype.update.call(this);

        // Kill mob if below the screen
        if (this.y > CONFIG.GAME_HEIGHT * CONFIG.PIXEL_RATIO + 200) {
            this.kill();
            return;
        }

        this.updateTint();
    };

    updateTint() {

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

    revive() {
        // replenish health (dunno why, but it's always set to 1 when calling a dead sprite from a pool)
        this.health = this.maxHealth;
    };

    die = function () {

        this.kill();
    };
    /*globals CONFIG */

}