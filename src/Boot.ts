class CONFIG {
    static GAME_WIDTH: number = 320;
    static GAME_HEIGHT: number = 400;
    static PIXEL_RATIO: number = 2;
    static WORLD_WIDTH: number = 16;
    static WORLD_HEIGHT: number = 150;
    static WORLD_SWAP_HEIGHT: number = 8;
    static MOBPOOL_SIZE: number = 25;
    static BULLETPOOL_SIZE: number = 100;
    static BULLETPOOL_SIZE_ENNEMY: number = 100;
    static BONUSPOOL_SIZE: number = 20;
    static CLOUDPOOL_SIZE: number = 10;
    static CLOUD_WIND_SPEED: number = 20;
    static SCROLL_SPEED: number = 40;
    static SCROLL_ACCEL: number = 15;
    static BLINK_DAMAGE_TIME: number = 8;
    static AUDIO_LEVEL: number = 0.5;
    static CLASS_STATS: [{
        className: 'Viper',
        health: 100,
        speed: 140,
        accel: 8,
        strength: 100,
        rate: 8
    }, {
        className: 'Cobra',
        health: 80,
        speed: 160,
        accel: 9,
        strength: 80,
        rate: 7
    }, {
        className: 'Anaconda',
        health: 100,
        speed: 140,
        accel: 7,
        strength: 100,
        rate: 6
    }, {
        className: 'Boa',
        health: 140,
        speed: 100,
        accel: 5,
        strength: 150,
        rate: 4
    }]
    ;

    static DEBUG: {
        bottomInfos: true,
        tileset: false,
    }
    ;
};

// Array.prototype.remove = function (from, to) {
//     var rest = this.slice((to || from) + 1 || this.length);
//     this.length = from < 0 ? this.length + from : from;
//     return this.push.apply(this, rest);
// };
class Boot extends Phaser.State {


////////////////////////////////////////////////////////
// Array Remove - By John Resig (MIT Licensed)


////////////////////////////////////////////////////////


    preload() {
        this.load.image('preloader', 'assets/preloader.gif');
    }


    create() {
        this.game.input.maxPointers = 1;

        // if (! this.game.device.desktop) {
        // } else {
        this.game.scale.minWidth = CONFIG.GAME_WIDTH;
        this.game.scale.minHeight = CONFIG.GAME_HEIGHT;
        this.game.scale.maxWidth = CONFIG.GAME_WIDTH * 4;
        this.game.scale.maxHeight = CONFIG.GAME_HEIGHT * 4;
        // this.game.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        // this.game.scale.forcePortrait = true;
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;

        this.game.antialias = false;
        this.game.stage.smoothed = false;
        this.game.scale.width = CONFIG.GAME_WIDTH * CONFIG.PIXEL_RATIO;
        this.game.scale.height = CONFIG.GAME_HEIGHT * CONFIG.PIXEL_RATIO;
        this.game.scale.refresh();

        // this.game.scale.setScreenSize(true);

        // }
        this.game.state.start('preloader');
    }
};

