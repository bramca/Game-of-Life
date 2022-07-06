var board;
var board_width = 100;
var board_height = 100;
var c;
var filled_boxes = [];
var framerate = 10;
var sketch = function (p) {
    p.setup = function () {
        c = p.createCanvas(p.windowWidth, p.windowHeight);
        document.getElementById("canvascontainer").appendChild(c.canvas);
        document.body.scrollTop = 0;
        board = new Board(board_width, board_height, c.width, c.height);
        gen_random_game(0.4);
        p.frameRate(framerate);
    };

    p.draw = function () {
        board.render(p, filled_boxes);
        let new_filled_boxes = [];
        for (let r = 0; r < board_height; r++) {
            for (let c = 0; c < board_width; c++) {
                let buren = [
                    [(r-1) % (board_height+1), ((c-1)) % (board_width+1)],
                    [(r-1) % (board_height+1), c],
                    [(r-1) % (board_height+1), (c+1) % (board_width+1)],
                    [r, (c+1) % (board_width+1)],
                    [(r+1) % (board_height+1), (c+1) % (board_width+1)],
                    [(r+1) % (board_height+1), c],
                    [(r+1) % (board_height+1), (c-1) % (board_width+1)],
                    [r, (c-1) % (board_width+1)]
                ];
                let aantallevendeburen = 0;
                for (let buur = 0; buur < buren.length; buur++) {
                    if (filled_boxes[buren[buur][1] + buren[buur][0] * board_height]) {
                         aantallevendeburen++;
                     }
                }
                if (filled_boxes[c + r * board_height] && aantallevendeburen < 2 || aantallevendeburen > 3) {
                    new_filled_boxes[c + r * board_height] = 0;
                } else if (!filled_boxes[c + r * board_height] && aantallevendeburen == 3) {
                    new_filled_boxes[c + r * board_height] = 1;
                } else {
                    new_filled_boxes[c + r * board_height] = filled_boxes[c + r * board_height];
                }
            }
        }
        filled_boxes = new_filled_boxes;
    };

    p.keyPressed = function () {
        console.log(p.key);
        if (p.key == 'R') {
            p.noLoop();
            gen_random_game(0.4);
            p.loop();
        }
        if (p.key == 'U') {
            framerate++;
            p.frameRate(framerate);
        }
        if (p.key == 'D') {
            framerate--;
            p.frameRate(framerate);
        }
        if (p.key == 'G') {
            p.noLoop();
            filled_boxes = glidergun;
            p.loop();
        }
    };

    function gen_random_game(density) {
        var side_size = c.width / board_width;
        for (let row = 0; row < board_height; row++) {
            for (let col = 0; col < board_width; col++) {
                if (Math.random() < density) {
                    filled_boxes[col + row * board_height] = 1;
                } else {
                    filled_boxes[col + row * board_height] = 0;
                }
            }
        }
    };
};

var app = new p5(sketch);
