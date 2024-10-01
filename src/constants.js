class Constants {
    static get GRAVITY() { return 0.05; }
    static get JUMP_FORCE() { return 2.5; }
    static get BIRD_START_X() { return 50; }
    static get BIRD_START_Y() { return window.innerHeight / 2; }
    static get PIPE_WIDTH() { return 80; }
    static get PIPE_GAP() { return 200; }
    static get GAME_SPEED() { return 2; }
    static get BIRD_RADIUS() { return 50; }
    static get PIPE_START_X() { return window.innerWidth - 80; }
    static get PIPE_SPEED() { return 2; }
}

export default Constants;