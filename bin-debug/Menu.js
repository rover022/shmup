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
var Menu = /** @class */ (function (_super) {
    __extends(Menu, _super);
    function Menu() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.titleTxt = null;
        _this.startTxt = null;
        return _this;
    }
    Menu.prototype.create = function () {
        var x = this.game.width / 2, y = this.game.height / 2;
        this.titleTxt = this.add.bitmapText(x, y, 'minecraftia', 'PHASER SHMUP');
        this.titleTxt.align = 'center';
        this.titleTxt.x = this.game.width / 2 - this.titleTxt.textWidth / 2;
        this.titleTxt.y = this.titleTxt.y - this.titleTxt.height * 2 + 5;
        y = y + this.titleTxt.height + 5;
        this.startTxt = this.add.bitmapText(x, y, 'minecraftia', '_______________\nControls\nW : shoot / start\nArrows : move\n_______________');
        this.startTxt.align = 'center';
        this.startTxt.x = this.game.width / 2 - this.startTxt.textWidth / 2;
        this.input.onDown.add(this.onDown, this);
    };
    Menu.prototype.update = function () {
        var keyboard = this.input.keyboard;
        if (keyboard.isDown(Phaser.Keyboard.W)) {
            this.game.state.start('game');
        }
    };
    Menu.prototype.onDown = function () {
        this.game.state.start('game');
    };
    return Menu;
}(Phaser.State));
//# sourceMappingURL=Menu.js.map