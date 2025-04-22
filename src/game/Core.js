import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import ScoreLabel from './ScoreLabel';
import BombSpawner from './BombSpawner';
import Player from './Player';
import Platforms from './Platforms';
import Stars from './Stars';
//import Vampire from './Vampire';

class GameScene extends Phaser.Scene {
    constructor() {
        super('game-scene');
        this.player = undefined;
        this.cursors = undefined;
        this.scoreLabel = undefined; //not required
        this.isGameOver = false;
    }

    preload() {
        this.load.image('sky', 'game_assets/sky.png');
        this.load.image('star', 'game_assets/star.png');
        this.load.image('ground', 'game_assets/platform.png');
        this.load.image('sky_platform', 'game_assets/sky_platform.png');
        this.load.image('bomb', 'game_assets/bomb.png');
        this.load.spritesheet('vampire', 'game_assets/vampire.png', {
            frameWidth: 64,
            frameHeight: 64,
        });

        this.load.spritesheet('dude', 'game_assets/dude.png', {
            frameWidth: 64, // width of each frame
            frameHeight: 64, // height of each frame
        });
    }

    create() {
        this.add.image(400, 287, 'sky');

       //platforms and stars
        this.platforms = new Platforms(this).getGroup();
        this.stars = new Stars(this).getGroup();

        // make the player
        this.player = new Player(this, 50, 300, 'dude');
        this.physics.add.collider(this.player, this.platforms);

        //make vampire
        //this.vampire = new Vampire(this, 50, 300, 'vampire');
        //this.physics.add.collider(this.vampire, this.platforms);

        //collide stars with platforms
        this.physics.add.collider(this.stars, this.platforms);
        //allow player to collect stars
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);

        //make score ui
        this.scoreLabel = this.createScoreLabel(16, 16, 0);

        //creaet bomb
        this.bombSpawner = new BombSpawner(this, 'bomb');
        this.bombGroup = this.bombSpawner.group;

        this.physics.add.collider(this.platforms, this.bombGroup);
        this.physics.add.collider(this.player, this.bombGroup, this.gameOver, null, this);

        //movement
        this.cursors = this.input.keyboard.createCursorKeys();

    }



    update() {
        if (this.isGameOver) {
            this.bombGroup.children.iterate((bomb) => {
                bomb.body.enable = false;
            });
            return;
        }
        this.player.move(this.cursors);
        this.player.animate();
        // this.vampire.move(this.player.x, this.player.y);
        // this.vampire.animate();

    }


    createPlatforms() {
        this.platforms = this.physics.add.staticGroup(); 

        this.platforms.create(375, 390, 'ground').setScale(2).refreshBody(); // Floor

        // 1 -> near the top-left
        this.platforms.create(150, 75, 'ground');

        // 2 -> middle
        this.platforms.create(600, 250, 'ground');

        // Platform 3 - near the bottom-right
        this.platforms.create(375, 150, 'ground');

        return this.platforms;
    }


    collectStar(player, star) {
        //allow for post death star collection
        // if(this.isGameOver){
        //     return;
        // }
        star.disableBody(true, true);

        this.scoreLabel.add(10);

        if (this.stars.countActive(true) === 0) {
            this.stars.children.iterate((child) => {
                child.enableBody(true, child.x, 0, true, true);
            });
        }

        this.bombSpawner.spawn(player.x);
        //this.vampire = new Vampire(this, 500, 300, 'vampire');
    }

    createScoreLabel(x, y, score) {
        const style = { fontSize: '32px', fill: '#000' };
        const label = new ScoreLabel(this, x, y, score, style);
        this.add.existing(label);
        return label;
    }

    gameOver() {
        this.isGameOver = true;
        this.player.handleGameOver();
        this.gameOver = true;
    }
}

const Core = (props) => {
    const gameRef = useRef(null); // reference for the game container

    useEffect(() => {
        const config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 300 },
                    debug: false,
                },
            },
            scene: [GameScene],
            parent: 'phaser-container', 
        };

        const game = new Phaser.Game(config);
        gameRef.current = game;

        return () => {
            game.destroy(true);
        };
    }, []);


    useEffect(() => {
        const interval = setInterval(() => {
            if (gameRef.current && gameRef.current.scene.scenes[0].isGameOver) {
                props.setGameOver(true);
                clearInterval(interval);
            }
        }, 5000); // check every 5 seconds

        return () => clearInterval(interval);
    }, [props]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (gameRef.current && gameRef.current.scene.scenes[0].isGameOver) {
                props.setScore(gameRef.current.scene.scenes[0].scoreLabel.getScore());
                clearInterval(interval);
            }
        }, 5000); // check every 5 seconda

        return () => clearInterval(interval);
    }, [props]);



    return (
        <div>
            <div id="phaser-container" ref={gameRef} className="core-game"></div>
            <button onClick={() => {
                props.setScore(gameRef.current.scene.scenes[0].scoreLabel.getScore());
                props.setGameOver(true);
            }}>End Game</button>
        </div >
    );
    
};

export default Core;
