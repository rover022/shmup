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
var Spriter = /** @class */ (function (_super) {
    __extends(Spriter, _super);
    //private state: Phaser.State;
    function Spriter(state, image) {
        var _this = 
        //super(state, 0, 0);
        _super.call(this, state.game, 0, 0, image) || this;
        // Add the object to the game world
        _this.game.add.existing(_this);
        // Pure common things to ALL objects
        _this.anchor.setTo(0.5, 0.5);
        // this.scale.setTo(CONFIG.PIXEL_RATIO, CONFIG.PIXEL_RATIO);
        _this.game.physics.enable(_this, Phaser.Physics.ARCADE);
        return _this;
    }
    Object.defineProperty(Spriter.prototype, "state", {
        get: function () {
            return this.game.state.getCurrentState();
        },
        enumerable: true,
        configurable: true
    });
    return Spriter;
}(Phaser.Sprite));
//# sourceMappingURL=Spriter.js.map