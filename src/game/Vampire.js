import Phaser from 'phaser';

const Direction = Object.freeze({
    LEFT: 0,
    RIGHT: 1,
    FORWARD: 2,
});

export default class Vampire extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        // Add the sprite to the scene's physics system
        scene.physics.add.existing(this);

        this.setBounce(0.2);
        this.setCollideWorldBounds(true);
        this.body.setDrag(400);
        this.body.setGravityY(300);

        this.direction = Direction.FORWARD;
        this.isJumping = false;
        this.body.setSize(32, 32);
        this.body.setOffset(16, 16);

        if (scene.textures.exists(texture)) {
            console.log(`Texture ${texture} exists, creating animations.`);
            this.createAnimations(scene, texture);
        } else {
            console.error(`Texture ${texture} not found`);
            scene.load.on('complete', () => {
                console.log(`Texture ${texture} loaded, creating animations.`);
                this.createAnimations(scene, texture);
            });
        }
    }

    createAnimations(scene, texture) {
        if (!scene.anims.exists('vampire-left')) {
            scene.anims.create({
                key: 'vampire-left',
                frames: scene.anims.generateFrameNumbers(texture, { start: 234, end: 242 }),
                frameRate: 10,
                repeat: -1
            });
        }

        if (!scene.anims.exists('vampire-right')) {
            scene.anims.create({
                key: 'vampire-right',
                frames: scene.anims.generateFrameNumbers(texture, { start: 243, end: 251 }),
                frameRate: 10,
                repeat: -1
            });
        }

        if (!scene.anims.exists('vampire-forward')) {
            scene.anims.create({
                key: 'vampire-forward',
                frames: scene.anims.generateFrameNumbers(texture, { start: 252, end: 260 }),
                frameRate: 10,
                repeat: -1
            });
        }
    }

    get group() {
        return this._group;
    }

    spawn(playerX = 0) {
        // Implementation for spawn
    }

    move(playerX, playerY) {
        if (playerX < this.x - 10) {
            this.setVelocityX(-160);
            this.direction = Direction.LEFT;
        } else if (playerX > this.x + 10) {
            this.setVelocityX(160);
            this.direction = Direction.RIGHT;
        } else {
            this.setVelocityX(0);
            this.direction = Direction.FORWARD;
        }

        if (this.isJumping) {
            return;
        }

        if (playerY < this.y - 10) {
            this.setVelocityY(-330);
            this.isJumping = true;
        }
    }

    animate() {
        let animationKey;
        if (this.isJumping) {
            animationKey = 'vampire-forward';
        }
        else if (this.direction === Direction.LEFT) {
            animationKey = 'vampire-left';
        }
        else if (this.direction === Direction.RIGHT) {
            animationKey = 'vampire-right';
        }
        else {
            animationKey = 'vampire-forward';
        }

        if (this.anims.get(animationKey)) {
            this.anims.play(animationKey, true);
        } else {
            console.error(`Animation key ${animationKey} is not defined.`);
        }
    }
}