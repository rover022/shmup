class Menu extends Phaser.State {
    public titleTxt = null;
    public startTxt = null;

    create() {
        let x = this.game.width / 2
            , y = this.game.height / 2;
        this.titleTxt = this.add.bitmapText(x, y, 'minecraftia', 'PHASER SHMUP');
        this.titleTxt.align = 'center';
        this.titleTxt.x = this.game.width / 2 - this.titleTxt.textWidth / 2;
        this.titleTxt.y = this.titleTxt.y - this.titleTxt.height * 2 + 5;

        y = y + this.titleTxt.height + 5;
        this.startTxt = this.add.bitmapText(x, y, 'minecraftia', '_______________\nControls\nW : shoot / start\nArrows : move\n_______________');
        this.startTxt.align = 'center';
        this.startTxt.x = this.game.width / 2 - this.startTxt.textWidth / 2;

        this.input.onDown.add(this.onDown, this);
    }

    update() {

        let keyboard = this.input.keyboard;

        if (keyboard.isDown(Phaser.Keyboard.W)) {
            this.game.state.start('game');
        }
    }

    onDown() {
        this.game.state.start('game');
    }

}