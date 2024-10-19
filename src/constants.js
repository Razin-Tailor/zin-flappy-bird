// class Constants {
//     static get GRAVITY() { return 0.05; }
//     static get JUMP_FORCE() { return 2.5; }
//     static get BIRD_START_X() { return 100; }
//     static get BIRD_START_Y() { return window.innerHeight / 2; }
//     static get PIPE_WIDTH() { return 80; }
//     static get PIPE_GAP() { return 200; }
//     static get GAME_SPEED() { return 2; }
//     static get BIRD_RADIUS() { return 20; }
//     static get PIPE_START_X() { return window.innerWidth - 80; }
//     static get PIPE_SPEED() { return 2; }
//     static get PIPE_INTERVAL() { return 2000; }
// }

// export default Constants;


class Constants {
    static baseWidth = 3440;  // Use LG monitor as the baseline resolution
    static baseHeight = 1440;
    static baseRefreshRate = 60;  // Standard 60Hz as baseline for speed adjustments

    static get GRAVITY() {
        return this.scaleWithRefreshRate(0.05);  // Adjust gravity with refresh rate
    }

    static get JUMP_FORCE() {
        return this.scaleWithRefreshRate(2.5);  // Adjust jump force
    }

    static get BIRD_START_X() {
        return this.scaleWithResolution(100).width;  // Scale bird X position based on resolution
    }

    static get BIRD_START_Y() {
        return window.innerHeight / 2;  // Middle of the screen
    }

    static get PIPE_WIDTH() {
        return this.scaleWithResolution(80).width;  // Scale pipe width
    }

    static get PIPE_GAP() {
        return this.scaleWithResolution(200).height;  // Scale pipe gap based on screen height
    }

    static get GAME_SPEED() {
        return this.scaleWithRefreshRate(2);  // Scale game speed with refresh rate
    }

    static get BIRD_RADIUS() {
        return this.scaleWithResolution(20).height;  // Scale bird size based on resolution
    }

    static get PIPE_START_X() {
        return window.innerWidth - this.PIPE_WIDTH;  // Start pipe at the far right
    }

    static get PIPE_SPEED() {
        return this.scaleWithRefreshRate(2);  // Scale pipe speed based on refresh rate
    }

    static get PIPE_INTERVAL() {
        return 2000;  // Pipe interval can remain fixed
    }

    // Utility methods for scaling
    static scaleWithResolution(value) {
        return {
            width: value * (window.innerWidth / this.baseWidth),
            height: value * (window.innerHeight / this.baseHeight)
        };
    }

    static scaleWithRefreshRate(value) {
        // Use base refresh rate of 60Hz for comparison
        const currentRefreshRate = window.matchMedia('(min-resolution: 160dpi)').matches ? 160 : 60;
        return value * (currentRefreshRate / this.baseRefreshRate);
    }
}

export default Constants;
