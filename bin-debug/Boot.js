var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var PlayerState = /** @class */ (function () {
    function PlayerState() {
        this.className = 'Viper';
        this.health = 100;
        this.speed = 140;
        this.accel = 8;
        this.strength = 100;
        this.rate = 8;
    }
    PlayerState.make = function (obj) {
        var a = new PlayerState();
        for (var objKey in obj) {
            a[objKey] = obj[objKey];
        }
        return a;
    };
    return PlayerState;
}());
var CONFIG = /** @class */ (function () {
    function CONFIG() {
    }
    CONFIG.GAME_WIDTH = 320;
    CONFIG.GAME_HEIGHT = 400;
    CONFIG.PIXEL_RATIO = 2;
    CONFIG.WORLD_WIDTH = 16;
    CONFIG.WORLD_HEIGHT = 150;
    CONFIG.WORLD_SWAP_HEIGHT = 8;
    CONFIG.MOBPOOL_SIZE = 25;
    CONFIG.BULLETPOOL_SIZE = 100;
    CONFIG.BULLETPOOL_SIZE_ENNEMY = 100;
    CONFIG.BONUSPOOL_SIZE = 20;
    CONFIG.CLOUDPOOL_SIZE = 10;
    CONFIG.CLOUD_WIND_SPEED = 20;
    CONFIG.SCROLL_SPEED = 40;
    CONFIG.SCROLL_ACCEL = 15;
    CONFIG.BLINK_DAMAGE_TIME = 8;
    CONFIG.AUDIO_LEVEL = 0.5;
    CONFIG.CLASS_STATS = [PlayerState.make({
            className: 'Viper',
            health: 100,
            speed: 140,
            accel: 8,
            strength: 100,
            rate: 8
        }), PlayerState.make({
            className: 'Cobra',
            health: 80,
            speed: 160,
            accel: 9,
            strength: 80,
            rate: 7
        }), PlayerState.make({
            className: 'Anaconda',
            health: 100,
            speed: 140,
            accel: 7,
            strength: 100,
            rate: 6
        }), PlayerState.make({
            className: 'Boa',
            health: 140,
            speed: 100,
            accel: 5,
            strength: 150,
            rate: 4
        })];
    CONFIG.DEBUG = {
        bottomInfos: true,
        tileset: false,
    };
    return CONFIG;
}());
;
// Array.prototype.remove = function (from, to) {
//     var rest = this.slice((to || from) + 1 || this.length);
//     this.length = from < 0 ? this.length + from : from;
//     return this.push.apply(this, rest);
// };
var Boot = /** @class */ (function (_super) {
    __extends(Boot, _super);
    function Boot() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Boot.prototype.preload = function () {
        this.load.image('preloader', R.URL + 'assets/preloader.gif');
    };
    Boot.prototype.create = function () {
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
        console.log("Boot run preloader state");
    };
    return Boot;
}(Phaser.State));
;
//# sourceMappingURL=Boot.js.map