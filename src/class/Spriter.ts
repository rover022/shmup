class Spriter extends Phaser.Sprite {
    //private state: Phaser.State;
    constructor(state: Phaser.State, image) {
        //super(state, 0, 0);
        super(state.game, 0, 0, image);
        // Add the object to the game world
        this.game.add.existing(this);
        // Pure common things to ALL objects
        this.anchor.setTo(0.5, 0.5);
        this.scale.setTo(CONFIG.PIXEL_RATIO, CONFIG.PIXEL_RATIO);
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
    }

    public get state(): Game {
        return this.game.state.getCurrentState() as Game;
    }

    // }


}