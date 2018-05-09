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
var Plane = (function (_super) {
    __extends(Plane, _super);
    function Plane(state) {
        var _this = _super.call(this, state, "mob_plane") || this;
        _this.maxHealth = 30;
        _this.speed = 60;
        _this.shootDelay = 3000;
        _this.bulletSpeed = 125;
        _this.points = 100;
        _this.lootProbability = 0.1;
        _this.shootConfig = {
            bulletType: 0,
            nBullets: 1,
            bulletDelay: 0,
            bulletAngle: 0,
            bulletSpread: 0,
            nShoots: 1,
            shootDelay: 0,
            shootAngle: 999,
            shootRotationSpeed: 0
        };
        _this.planeClass = state.rnd.integerInRange(0, 7);
        var offset = _this.planeClass * 3;
        _this.animations.add('idle', [offset + 1], 5, true);
        _this.animations.add('left', [offset + 0], 5, true);
        _this.animations.add('right', [offset + 2], 5, true);
        _this.play('idle');
        return _this;
    }
    Plane.prototype.update = function () {
        _super.prototype.update.call(this);
        // Call the parent update function
    };
    ;
    return Plane;
}(Enemy));
__reflect(Plane.prototype, "Plane");
var Vessel = (function (_super) {
    __extends(Vessel, _super);
    function Vessel(state) {
        var _this = _super.call(this, state, "mob_vessel_1") || this;
        _this.maxHealth = 100;
        _this.speed = 30;
        _this.shootDelay = 2000;
        _this.points = 500;
        _this.lootProbability = 0.5;
        _this.shootConfig = {
            bulletType: 0,
            nBullets: 5,
            bulletDelay: 0,
            bulletAngle: 0,
            bulletSpread: 0.2,
            nShoots: 1,
            shootDelay: 0,
            shootAngle: 999,
            shootRotationSpeed: 0
        };
        _this.animations.add('idle', [0], 5, true);
        _this.play('idle');
        return _this;
    }
    return Vessel;
}(Enemy));
__reflect(Vessel.prototype, "Vessel");
var Flagship = (function (_super) {
    __extends(Flagship, _super);
    /************************************************************************************************
     * FLAGSHIP CLASS
     *
     * A specific type of (huge) Enemy
     *
     ************************************************************************************************/
    function Flagship(state) {
        var _this = 
        // Call parent constructor
        _super.call(this, state, "mob_flagship_1") || this;
        // window['firsttry'].Enemy.call(this, state, 'mob_flagship_1');
        _this.maxHealth = 750;
        _this.speed = 10;
        _this.shootDelay = 3000;
        _this.points = 2000;
        _this.lootProbability = 0.8;
        _this.bulletCancel = true;
        _this.shootConfig = {
            bulletType: 1,
            nBullets: 7,
            bulletDelay: 0,
            bulletAngle: 0,
            bulletSpread: 0.2,
            nShoots: 3,
            shootDelay: 500,
            shootAngle: 0,
            shootRotationSpeed: 0.2
        };
        _this.animations.add('idle', [0], 5, true);
        _this.play('idle');
        return _this;
    }
    return Flagship;
}(Enemy));
__reflect(Flagship.prototype, "Flagship");
//# sourceMappingURL=Plane.js.map