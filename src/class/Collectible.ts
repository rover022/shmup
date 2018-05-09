class Collectible extends Actor{
    private bonusClass: number;
    constructor(state, image) {
        super(state, image)
        this.alive = true;
        this.updateClass();
    }
    update () {

        // Call parent update function
        // window['firsttry'].Actor.prototype.update.call(this);
        super.update();
        // Kill mob if below the screen
        if (this.y > CONFIG.GAME_HEIGHT * CONFIG.PIXEL_RATIO + 200) {
            this.kill();
            return;
        }
    };

    updateClass () {

        this.bonusClass = this.game.rnd.integerInRange(0, 3);

        // Ugly hack to skip the last spritesheet row (4 instead of 3)
        var fakeClass = this.bonusClass;
        if (fakeClass === 3) { fakeClass = 4; }

        var offset = fakeClass * 3;

        this.animations.add('idle', [0 + offset, 1 + offset, 2 + offset, 1 + offset], 15, true);
        this.play('idle');
    };
    /*globals CONFIG */


}