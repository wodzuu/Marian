const rooms = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 4, 0, 0, 0, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0,
    1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 5, 1,
    1, 1, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 4, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 5, 1,
    4, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 6, 0, 0, 0, 0, 5, 1,
    0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 6, 1, 1, 1, 0, 0, 0, 0, 0, 4, 1, 0, 0, 1, 1, 1, 0, 0, 5, 4,
    1, 1, 0, 0, 0, 0, 0, 0, 0, 6, 1, 4, 0, 0, 0, 0, 0, 0, 6, 1, 1, 0, 0, 0, 0, 0, 0, 1, 4, 1,
    1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 4, 1, 1, 0, 0, 0, 0, 1, 1,
    1, 1, 5, 0, 4, 0, 0, 0, 0, 0, 1, 1, 0, 0, 4, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 6, 0, 5, 0,
    4, 0, 5, 0, 1, 1, 6, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 5, 0,
    1, 1, 5, 0, 1, 1, 1, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 1,
    1, 1, 5, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 4,
    1, 1, 5, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 6, 1, 1, 1, 0, 0, 1,
    1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 6, 1, 1, 1, 1, 1, 1, 1, 0, 6, 1,
    1, 1, 4, 0, 0, 0, 0, 0, 6, 6, 1, 4, 0, 0, 0, 0, 4, 0, 6, 1, 1, 4, 4, 0, 0, 0, 0, 0, 1, 1,
    1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 0, 0, 0, 4, 0, 0, 1, 1, 0, 4, 0, 0, 5, 0, 0, 4, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0,
    4, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 5, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0,
    1, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 5, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
    1, 1, 0, 5, 1, 1, 1, 0, 0, 0, 0, 0, 0, 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    1, 1, 0, 5, 1, 1, 0, 0, 0, 0, 0, 0, 5, 1, 1, 1, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    1, 1, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0,
    1, 1, 6, 5, 0, 4, 0, 0, 0, 1, 4, 0, 5, 0, 0, 0, 0, 0, 0, 1, 6, 0, 0, 0, 6, 6, 1, 1, 6, 0,
    1, 1, 1, 1, 1, 1, 1, 1, 6, 1, 1, 1, 1, 1, 1, 1, 1, 6, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

const wallTiles = [1]
const coin = 4
const spikes = 6

//% color=#FF5733 icon="\uf11b" weight=100
namespace myCategory {
    //% block="say hello"
    export function sayHello() {
        console.log("Hello, MakeCode!");
    }

    //% block="show number %num"
    export function showNumber(num: number) {
        console.log(num);
    }

    //% block="random tile map %width by %height"
    export function randomTileMap(width: number, height: number) {
        // var hexWidth = width.toString(16);
        // var hexHeigth = height.toString(16);
        const width_ = 30
        const height_ = 24

        const room = rooms.slice()
        const i = image.create(width_, height_)
        i.fill(0)
        for (let y = 0; y < height_; y++) {
            for (let x = 0; x < width_; x++) {
                const index = y * width_ + x;
                if(room[index] == coin && Math.random() < 0.8){
                    room[index] = 0;
                }
                if (room[index] == spikes && Math.random() < 0.5) {
                    room[index] = 0;
                }
                if (wallTiles.indexOf(room[index]) >= 0) {
                    i.setPixel(x, y, 2)
                }
            }
        }


        const b = Buffer.fromArray([width_, 0, height_, 0].concat(room))
        return tiles.createTilemap(b, i, [myTiles.transparency16, myTiles.wall, myTiles.entrance, myTiles.exit, myTiles.coin, myTiles.ladder, myTiles.spikes], TileScale.Eight);
    }
}