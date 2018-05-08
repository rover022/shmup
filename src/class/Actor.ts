class Actor extends Spriter {
    public isPinnedToGround: boolean;

    constructor(state, image) {
        super(state, image)
        this.isPinnedToGround = false;
    }

    public getAngleTo(target) {
        let angle;
        if (target.x || target.y) {
            angle = Math.atan2(target.x - this.x, target.y - this.y);
        }

        return angle;
    };
}