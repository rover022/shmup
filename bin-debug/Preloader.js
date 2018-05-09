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
var R = /** @class */ (function () {
    function R() {
    }
    R.URL = "resource/";
    return R;
}());
var Preloader = /** @class */ (function (_super) {
    __extends(Preloader, _super);
    function Preloader() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.asset = null;
        _this.ready = false;
        return _this;
    }
    Preloader.prototype.preload = function () {
        this.asset = this.add.sprite(320, 240, 'preloader');
        this.asset.anchor.setTo(0.5, 0.5);
        this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
        this.load.setPreloadSprite(this.asset);
        // GAME ASSETS
        // Graphics
        this.load.image('tileset_1', R.URL + 'assets/tileset_1.png');
        this.load.image('tileset_1_debug', R.URL + 'assets/tileset_1_debug.png');
        this.load.spritesheet('clouds', R.URL + 'assets/clouds.png', 96, 168);
        this.load.spritesheet('player_1', R.URL + 'assets/player_ship_1.png', 24, 28);
        this.load.spritesheet('player_2', R.URL + 'assets/player_ship_2.png', 24, 28);
        this.load.spritesheet('player_3', R.URL + 'assets/player_ship_3.png', 24, 28);
        this.load.spritesheet('player_4', R.URL + 'assets/player_ship_4.png', 24, 28);
        this.load.spritesheet('player_bullet', R.URL + 'assets/player_bullets.png', 16, 16);
        this.load.image('mob_bullet_1', R.URL + 'assets/mob_bullet_1.png');
        this.load.image('mob_bullet_2', R.URL + 'assets/mob_bullet_2.png');
        this.load.spritesheet('explosion_1', R.URL + 'assets/explosion_1.png', 32, 32);
        this.load.spritesheet('mob_plane', R.URL + 'assets/mob_planes.png', 32, 32);
        this.load.spritesheet('mob_vessel_1', R.URL + 'assets/mob_vessel_1.png', 37, 28);
        this.load.spritesheet('mob_flagship_1', R.URL + 'assets/mob_flagship_1.png', 93, 80);
        this.load.spritesheet('mob_turret_1', R.URL + 'assets/mob_turret_1.png', 24, 28);
        this.load.spritesheet('bonus_cube', R.URL + 'assets/cubes.png', 24, 24);
        this.load.spritesheet('bonus_coin', R.URL + 'assets/coins.png', 12, 12);
        this.load.bitmapFont('minecraftia', R.URL + 'assets/minecraftia.png', R.URL + 'assets/minecraftia.xml');
        // Audio
        this.load.audio('shoot_player_1', R.URL + 'assets/audio/shoot_player_1.wav');
        this.load.audio('shoot_player_2', R.URL + 'assets/audio/shoot_player_2.wav');
        this.load.audio('shoot_player_3', R.URL + 'assets/audio/shoot_player_3.wav');
        this.load.audio('shoot_player_4', R.URL + 'assets/audio/shoot_player_4.wav');
        this.load.audio('shoot_player_5', R.URL + 'assets/audio/shoot_player_5.wav');
        this.load.audio('explosion_1', R.URL + 'assets/audio/explosion_1.wav');
        this.load.audio('explosion_2', R.URL + 'assets/audio/explosion_2.wav');
        this.load.audio('explosion_3', R.URL + 'assets/audio/explosion_3.wav');
        this.load.audio('explosion_4', R.URL + 'assets/audio/explosion_4.wav');
        this.load.audio('hurt_1', R.URL + 'assets/audio/hurt_1.wav');
        this.load.audio('collect_1', R.URL + 'assets/audio/collect_1.wav');
        // this.load.binary('music_1', 'assets/audio/mod/4-track_from_heaven.mod');
        // this.load.audio('music_1', 'assets/audio/music_1.wav');
        // Scripts
        // /!\ PROBLEM /!\
        // loading scripts this way seems to defer them after the execution of game.js
        // leading to undefined things
        // For now, using raw <scripts> tags in index.html
        // (could be related to gulp pipeline)
        // this.load.script('spriter.js', 'js/class/spriter.js');
    };
    Preloader.prototype.create = function () {
        this.asset.cropEnabled = false;
    };
    Preloader.prototype.update = function () {
        if (!!this.ready) {
            this.game.state.start('menu');
            console.log("Preloader run menu");
        }
    };
    Preloader.prototype.onLoadComplete = function () {
        this.ready = true;
    };
    return Preloader;
}(Phaser.State));
var SoundManager = /** @class */ (function () {
    function SoundManager() {
        this.isOpen = true;
    }
    SoundManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new SoundManager();
        }
        return this._instance;
    };
    SoundManager.prototype.play = function (_name) {
        if (this.isOpen) {
            // if (this.isOpen) {
            this.game.sound.play(_name);
            //console.log("play sound" + _name);
        }
    };
    return SoundManager;
}());
//# sourceMappingURL=Preloader.js.map