var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Actor = (function (_super) {
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
__reflect(Actor.prototype, "Actor");
//# sourceMappingURL=Actor.js.map