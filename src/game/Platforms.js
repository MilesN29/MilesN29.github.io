export default class Platforms {
    constructor(scene) {
        this.scene = scene;
        this.group = this.scene.physics.add.staticGroup();

        const platformWidth = 44; // Width of each platform tile


        this.group.create(400, 600, 'ground').setScale(2).refreshBody();


        for (let i = 0; i < 3; i++) {//left platform loop
            this.group.create(platformWidth * i+400, 500, 'sky_platform');
        }

        for (let i = 0; i < 3; i++) {//middle platform loop
            this.group.create(platformWidth * i + 100, 400, 'sky_platform');
        }


    }

    getGroup() {
        return this.group;
    }
}
