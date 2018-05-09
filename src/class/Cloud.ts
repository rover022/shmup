class Cloud extends Mob {
    private speed: number;

    constructor(state) {
        super(state, "clouds")
        this.speed = 0;
        this.type = 0;
        this.animations.add('idle_0', [0]);
        this.animations.add('idle_1', [1]);
        this.animations.add('idle_2', [2]);
        this.animations.add('idle_3', [3]);
        this.animations.add('idle_4', [4]);
        this.animations.add('idle_5', [5]);
        this.animations.add('idle_6', [6]);
        this.animations.add('idle_7', [7]);
    }


    revive(h?: number) {

        this.reset(
            this.game.rnd.integerInRange(0, CONFIG.WORLD_WIDTH) * 24 * CONFIG.PIXEL_RATIO,
            -3 * 28 * CONFIG.PIXEL_RATIO
        );

        this.body.velocity.y = (this.game.rnd.realInRange(-1, 1) * CONFIG.CLOUD_WIND_SPEED +
            CONFIG.CLOUD_WIND_SPEED +
            this.state.scrollSpeed) * CONFIG.PIXEL_RATIO;


        this.type = this.game.rnd.integerInRange(0, 7);
        this.play('idle_' + this.type);

        // Call the parent revive function
        // window['firsttry'].Mob.prototype.revive.call(this);
        return super.revive();
    };


}