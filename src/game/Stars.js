import Phaser from 'phaser';

export default class Stars {
    constructor(scene) {
        this.scene = scene;
        this.group = this.scene.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 },
        });

        this.group.children.iterate((child) => {
            const star = /** @type {Phaser.Physics.Arcade.Sprite} */ (child); // type cast
            star.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8)); 
        });
    }

    getGroup() {
        return this.group;
    }

    
}
