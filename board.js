function Board (board_width, board_height, canvas_width, canvas_height) {
    this.color = '#' + (function co(lor){   return (lor +=
                                              [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'][Math.floor(Math.random()*16)])
                                      && (lor.length == 6) ?  lor : co(lor); })('');
    this.render = function (p, filled_boxes) {
        var side_size = canvas_width / board_width;
        for (var i = 0; i < board_height; i++) {
            for (var j = 0; j < board_width; j++) {
                p.push();
                p.noStroke();
                p.fill(filled_boxes[j + i * board_height] == 1 ? this.color : "gray");
                p.rect(j * side_size, i * side_size, side_size, side_size);
                p.pop();
            }
        }
    };
}
