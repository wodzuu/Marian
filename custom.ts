// Add your code here

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

    //% block="random tile map"
    export function randomTileMap(width: number, height: number) {
        // var hexWidth = width.toString(16);
        // var hexHeigth = height.toString(16);

        return tiles.createTilemap(hex`0800080001020000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000`, img`
. . . . . . . . 
222..... 
. . . 222 . . 
. . . . . . . . 
. . . . . . . . 
. . . . . . . . 
. . . . . . . . 
. . . . . . . . 
`, [myTiles.transparency16, sprites.swamp.swampTile3, myTiles.tile1], TileScale.Sixteen);
    }
}