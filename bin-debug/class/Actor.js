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
var Actor = /** @class */ (function (_super) {
    __extends(Actor, _super);
    function Actor(state, image) {
        var _this = _super.call(this, state, image) || this;
        _this.isPinnedToGround = false;
        return _this;
    }
    Actor.prototype.getAngleTo = function (target) {
        var angle;
        if (target.x || target.y) {
            angle = Math.atan2(target.x - this.x, target.y - this.y);
        }
        return angle;
    };
    ;
    return Actor;
}(Spriter));
//# sourceMappingURL=Actor.js.map