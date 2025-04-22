import Phaser from 'phaser';



const Direction = Object.freeze({
    LEFT: 0,
    RIGHT: 1,
    FORWARD: 2,
});

class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setBounce(0.2);
        this.setCollideWorldBounds(true);
        this.body.setDrag(400);//friction
        this.body.setGravityY(300);

        this.direction = Direction.FORWARD;
        this.isJumping = false;
        this.body.setSize(32, 32);
        this.body.setOffset(16, 16);
        this.keyA = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyW = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keySpace = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.keyShift = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        //animation formula:
        //26*row-->start of animation
        //26*row+column-->end of animation

        scene.anims.create({
            key: 'left',
            frames: scene.anims.generateFrameNumbers(texture, { start: 234, end: 242 }),
            frameRate: 10,
            repeat: -1,
        });
        scene.anims.create({
            key: 'forward',
            frames: scene.anims.generateFrameNumbers(texture, {
                start: 624, end: 625
            }),
            frameRate: 2,
            repeat: -1,
        });

        scene.anims.create({
            key: 'right',
            frames: scene.anims.generateFrameNumbers(texture, { start: 286, end: 294 }),
            frameRate: 10,
            repeat: -1,
        });
        scene.anims.create({
            key: 'right-run',
            frames: scene.anims.generateFrameNumbers(texture, { start: 962, end: 969 }),
            frameRate: 10,
            repeat: -1,
        });

        scene.anims.create({
            key: 'left-run',
            frames: scene.anims.generateFrameNumbers(texture, { start: 910, end: 917 }),
            frameRate: 10,
            repeat: -1,
        });

        scene.anims.create({
            key: 'left-jump',
            frames: scene.anims.generateFrameNumbers(texture, { start: 702, end: 706 }),
            frameRate: 10,
            repeat: 0,
        });
        scene.anims.create({
            key: 'right-jump',
            frames: scene.anims.generateFrameNumbers(texture, { start: 754, end: 758 }),
            frameRate: 10,
            repeat: 0,
        });
        scene.anims.create({
            key: 'forward-jump',
            frames: scene.anims.generateFrameNumbers(texture, { start: 728, end: 732 }),
            frameRate: 10,
            repeat: 0,
        });
        scene.anims.create({
            key: 'forward-fall',
            frames: scene.anims.generateFrameNumbers(texture, { start: 732, end: 732 }),
            frameRate: 10,
            repeat: 0,
        });
        scene.anims.create({
            key: 'left-fall',
            frames: scene.anims.generateFrameNumbers(texture, { start: 706, end: 706 }),
            frameRate: 10,
            repeat: 0,
        });
        scene.anims.create({
            key: 'right-fall',
            frames: scene.anims.generateFrameNumbers(texture, { start: 758, end: 758 }),
            frameRate: 10,
            repeat: 0,
        });
        scene.anims.create({
            key: 'die',
            frames: scene.anims.generateFrameNumbers(texture, { start: 520, end: 525 }),
            frameRate: 10,
            repeat: 0,
        });


        this.anims.play('forward');
    }

    move(cursors) {
        if ((cursors.up.isDown || this.keyW.isDown || this.keySpace.isDown) && this.body.touching.down) {//juump
            this.setVelocityY(-500);
            this.isJumping = true;
            //console.log('Jumping');
        }
        /*
        this prevents double jump & make sure isJumping is true and also ensures the isJump value remains true
        when the player first starts their jump.
        (before this if the player woulud jump and then the isJump value would immediately be set to false, causing the jumping
        animation to be cut off)
        */
        if (!this.body.touching.down && this.body.velocity.y !== 0) {
            this.isJumping = true;
        }

        if (this.body.touching.down && this.isJumping) {
            this.isJumping = false;
            //console.log('Landed');
        }

        if (this.keyShift.isDown) {
            if ((cursors.left.isDown) || this.keyA.isDown) {
                this.direction = Direction.LEFT;
                this.setVelocityX(-200);
            }
            else if (cursors.right.isDown || this.keyD.isDown) {
                this.direction = Direction.RIGHT;
                this.setVelocityX(200);
            }
        } else {
            if ((cursors.left.isDown) || this.keyA.isDown) {
                this.direction = Direction.LEFT;
                this.setVelocityX(-100);
            } else if (cursors.right.isDown || this.keyD.isDown) {
                this.direction = Direction.RIGHT;
                this.setVelocityX(100);
            }
        }

        if (this.body.velocity.x === 0) {
            this.direction = Direction.FORWARD;
        }
    }

    animate() {//omg animation was literaly so hard
        if (this.scene.isGameOver) return;
        if (this.anims.currentAnim) {//check if there is an animation playing
            const currentAnimKey = this.anims.currentAnim.key;

            if (this.isJumping && this.body.velocity.y < 0) {//jumping
                if (this.direction === Direction.LEFT && currentAnimKey !== 'left-jump') {
                    this.anims.play('left-jump');
                }
                else if (this.direction === Direction.RIGHT && currentAnimKey !== 'right-jump') {
                    this.anims.play('right-jump');
                }
                else if (this.direction === Direction.FORWARD && currentAnimKey !== 'forward-jump') {
                    this.anims.play('forward-jump');
                }
            }
            else if (this.body.velocity.y > 0) {//falling
                if (this.direction === Direction.LEFT && currentAnimKey !== 'left-fall') {
                    this.anims.play('left-fall');
                }
                else if (this.direction === Direction.RIGHT && currentAnimKey !== 'right-fall') {
                    this.anims.play('right-fall');
                }
                else if (this.direction === Direction.FORWARD && currentAnimKey !== 'forward-fall') {
                    this.anims.play('forward-fall');
                }
            }
            else {//moving
                if (this.keyShift.isDown) {//running
                    if (this.direction === Direction.LEFT && currentAnimKey !== 'left-run') {
                        this.anims.play('left-run');
                    }
                    if (this.direction === Direction.RIGHT && currentAnimKey !== 'right-run') {
                        this.anims.play('right-run');
                    }
                }
                else {//walking
                    if (this.direction === Direction.LEFT && currentAnimKey !== 'left') {
                        this.anims.play('left');
                    }
                    else if (this.direction === Direction.RIGHT && currentAnimKey !== 'right') {
                        this.anims.play('right');
                    }
                    else if (this.direction === Direction.FORWARD && currentAnimKey !== 'forward') {
                        this.anims.play('forward');
                    }
                }
            }
        }
        else {
            this.anims.play('forward');
        }
    }

    handleGameOver() {
        this.setTint(0xff0000);
        console.log('Game Over');
        this.anims.stop();
        this.anims.play('die');
        this.body.setSize(64, 1);
    }


}

export default Player;


/*
SPRITE CREDITS:
Authors: bluecarrot16, Benjamin K. Smith (BenCreating), Evert, Eliza Wyatt (ElizaWy), TheraHedwig, MuffinElZangano, Durrani, Johannes Sj?lund (wulax), Stephen Challener (Redshrike), ElizaWy, JaidynReiman, Carlo Enrico Victoria (Nemisys), Matthew Krohn (makrohn), Marcel van de Steeg (MadMarcel), Nila122, Johannes Sjölund (wulax), Michael Whitlock (bigbeargames), ElizaWy; walk and down by JaidynReiman

- body/bodies/male/light.png: by bluecarrot16, Benjamin K. Smith (BenCreating), Evert, Eliza Wyatt (ElizaWy), TheraHedwig, MuffinElZangano, Durrani, Johannes Sj?lund (wulax), Stephen Challener (Redshrike). License(s): CC-BY-SA 3.0, GPL 3.0. see details at https://opengameart.org/content/lpc-character-bases; 'Thick' Male Revised Run/Climb by JaidynReiman (based on ElizaWy's LPC Revised)
    - https://opengameart.org/content/liberated-pixel-cup-lpc-base-assets-sprites-map-tiles
    - https://opengameart.org/content/lpc-medieval-fantasy-character-sprites
    - https://opengameart.org/content/lpc-male-jumping-animation-by-durrani
    - https://opengameart.org/content/lpc-runcycle-and-diagonal-walkcycle
    - https://opengameart.org/content/lpc-revised-character-basics

- head/heads/human/male/light.png: by bluecarrot16, Benjamin K. Smith (BenCreating), Stephen Challener (Redshrike). License(s): OGA-BY 3.0, CC-BY-SA 3.0, GPL 3.0. original head by Redshrike; tweaks by BenCreating; modular version by bluecarrot16
    - https://opengameart.org/content/liberated-pixel-cup-lpc-base-assets-sprites-map-tiles
    - https://opengameart.org/content/lpc-character-bases

- head/nose/elderly/adult/light.png: by ElizaWy. License(s): OGA-BY 3.0. 
    - https://opengameart.org/content/lpc-revised-elders

- eyes/eyebrows/thin/adult/dark_gray.png: by ElizaWy. License(s): OGA-BY 3.0. 
    - https://github.com/ElizaWy/LPC/tree/main/Characters/Hair
    - https://opengameart.org/content/expanded-universal-lpc-spritesheet-idle-run-jump-lpc-revised-combat-and-assets

- head/wrinkles/light.png: by bluecarrot16. License(s): CC0. 

- beards/beard/basic/dark_gray.png: by JaidynReiman, Carlo Enrico Victoria (Nemisys). License(s): CC-BY-SA 3.0, GPL 3.0. Original by Nemisys, repositioning by JaidynReiman.
    - https://opengameart.org/content/lpc-white-beard

- hair/jewfro/adult/gray.png: by JaidynReiman. License(s): OGA-BY 3.0+, CC-BY 3.0+, CC-BY-SA 3.0, GPL 3.0. 
    - https://opengameart.org/content/lpc-1-hairstyle-2-hair-extensions-3-previously-unofficially-released-hairstyles
    - https://github.com/jrconway3/Universal-LPC-spritesheet/commit/46ddcf05a0e43e7aa6ffd47d350eef0eb529ac24

- torso/clothes/sleeveless/laced/male/white.png: by bluecarrot16, Matthew Krohn (makrohn), JaidynReiman, Marcel van de Steeg (MadMarcel), Nila122, Johannes Sjölund (wulax), Stephen Challener (Redshrike). License(s): CC-BY-SA 3.0. 
    - https://opengameart.org/content/lpc-female-orcogregoblintroll-base-walkcycle
    - https://opengameart.org/content/lpc-curly-hair-elven-ears-white-cape-with-blue-trim-and-more
    - https://opengameart.org/content/more-lpc-clothes-and-hair
    - https://opengameart.org/content/lpc-pirates

- torso/aprons/overalls/male/black.png: by ElizaWy, bluecarrot16, JaidynReiman. License(s): OGA-BY 3.0, GPL 3.0. original overalls by ElizaWy, extended to all animation frames, adapted from teen to male base, and edited for v3 bases by bluecarrot16; extended to combat animations by JaidynReiman
    - https://opengameart.org/content/lpc-revised-character-basics
    - http://opengameart.org/content/lpc-clothing-updates

- torso/armour/plate/male/silver.png: by JaidynReiman, bluecarrot16, Michael Whitlock (bigbeargames), Johannes Sjölund (wulax). License(s): OGA-BY 3.0, CC-BY-SA 3.0, GPL 3.0. original by wulax; recolor by bigbeargames; color reduced to 7 colors and adapted to v3 bases by bluecarrot16; run/jump/sit/climb/revised combat by JaidynReiman
    - https://opengameart.org/content/lpc-medieval-fantasy-character-sprites
    - https://opengameart.org/content/lpc-combat-armor-for-women

- feet/socks/tabi/male/black.png: by JaidynReiman. License(s): OGA-BY 3.0+, CC-BY 3.0+, GPL 3.0. 
    - https://opengameart.org/content/lpc-relm-outfit-pieces-2-kimonos-2-sleeves-2-boots-tabi-socks

- weapon/sword/arming/universal/fg/silver.png: by ElizaWy; walk and down by JaidynReiman. License(s): OGA-BY 3.0. 
    - https://github.com/ElizaWy/LPC/tree/main/Characters/Props/Sword%2001%20-%20Arming%20Sword
    - https://opengameart.org/content/expanded-universal-lpc-spritesheet-idle-run-jump-lpc-revised-combat-and-assets

- weapon/sword/arming/universal/bg/silver.png: by ElizaWy; walk and down by JaidynReiman. License(s): OGA-BY 3.0. 
    - https://github.com/ElizaWy/LPC/tree/main/Characters/Props/Sword%2001%20-%20Arming%20Sword
    - https://opengameart.org/content/expanded-universal-lpc-spritesheet-idle-run-jump-lpc-revised-combat-and-assets

- weapon/sword/arming/attack_slash/bg/silver.png: by ElizaWy; walk and down by JaidynReiman. License(s): OGA-BY 3.0. 
    - https://github.com/ElizaWy/LPC/tree/main/Characters/Props/Sword%2001%20-%20Arming%20Sword
    - https://opengameart.org/content/expanded-universal-lpc-spritesheet-idle-run-jump-lpc-revised-combat-and-assets

- weapon/sword/arming/attack_slash/fg/silver.png: by ElizaWy; walk and down by JaidynReiman. License(s): OGA-BY 3.0. 
    - https://github.com/ElizaWy/LPC/tree/main/Characters/Props/Sword%2001%20-%20Arming%20Sword
    - https://opengameart.org/content/expanded-universal-lpc-spritesheet-idle-run-jump-lpc-revised-combat-and-assets

- weapon/sword/arming/attack_backslash/bg/silver.png: by ElizaWy; walk and down by JaidynReiman. License(s): OGA-BY 3.0. 
    - https://github.com/ElizaWy/LPC/tree/main/Characters/Props/Sword%2001%20-%20Arming%20Sword
    - https://opengameart.org/content/expanded-universal-lpc-spritesheet-idle-run-jump-lpc-revised-combat-and-assets

- weapon/sword/arming/attack_backslash/fg/silver.png: by ElizaWy; walk and down by JaidynReiman. License(s): OGA-BY 3.0. 
    - https://github.com/ElizaWy/LPC/tree/main/Characters/Props/Sword%2001%20-%20Arming%20Sword
    - https://opengameart.org/content/expanded-universal-lpc-spritesheet-idle-run-jump-lpc-revised-combat-and-assets

- weapon/sword/arming/attack_halfslash/bg/silver.png: by ElizaWy; walk and down by JaidynReiman. License(s): OGA-BY 3.0. 
    - https://github.com/ElizaWy/LPC/tree/main/Characters/Props/Sword%2001%20-%20Arming%20Sword
    - https://opengameart.org/content/expanded-universal-lpc-spritesheet-idle-run-jump-lpc-revised-combat-and-assets

- weapon/sword/arming/attack_halfslash/fg/silver.png: by ElizaWy; walk and down by JaidynReiman. License(s): OGA-BY 3.0. 
    - https://github.com/ElizaWy/LPC/tree/main/Characters/Props/Sword%2001%20-%20Arming%20Sword
    - https://opengameart.org/content/expanded-universal-lpc-spritesheet-idle-run-jump-lpc-revised-combat-and-assets
*/ 
