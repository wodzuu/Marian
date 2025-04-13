// Add your code here
namespace Levelgen {
    class Set<T> {
        elements: Array<T>

        constructor(init: T[]) {
            this.elements = init
        }

        add(element: T) {
            this.elements.push(element)
        }

        has(element: T) {
            for (let i = 0; i < this.elements.length; i++) {
                if (this.elements[i] === element) {
                    return true;
                }
            }
            return false;
        }

        size() {
            return this.elements.length
        }

        prettyPrint() {
            console.log('Set ' + this.elements.join(','))
        }
    }

    enum Direction {
        UP,
        DOWN,
        LEFT,
        RIGHT,
    }

    enum RoomType {
        TOP_LEFT,
        TOP_RIGHT,
        BOTTOM_LEFT,
        BOTTOM_RIGHT,
        TOP_BOTTOM,
        LEFT_RIGHT,
        TOP_LEFT_RIGHT,
        BOTTOM_LEFT_RIGHT,
        LEFT_TOP_BOTTOM,
        RIGHT_TOP_BOTTOM,
        ALL
    }

    let RoomTypeRepresentation: { [key: number]: string } = {
        0: "╝",
        1: "╚",
        2: "╗",
        3: "╔",
        4: "║",
        5: "═",
        6: "╩",
        7: "╦",
        8: "╣",
        9: "╠",
        10: "╬"
    }

    const RoomCompatibility = {
        ALL: new Set([RoomType.TOP_LEFT, RoomType.TOP_RIGHT, RoomType.BOTTOM_LEFT, RoomType.BOTTOM_RIGHT, RoomType.TOP_BOTTOM, RoomType.LEFT_RIGHT, RoomType.TOP_LEFT_RIGHT, RoomType.BOTTOM_LEFT_RIGHT, RoomType.LEFT_TOP_BOTTOM, RoomType.RIGHT_TOP_BOTTOM, RoomType.ALL]),
        TOP: new Set([RoomType.TOP_LEFT, RoomType.TOP_RIGHT, RoomType.TOP_BOTTOM, RoomType.TOP_LEFT_RIGHT, RoomType.LEFT_TOP_BOTTOM, RoomType.RIGHT_TOP_BOTTOM, RoomType.ALL]),
        BOTTOM: new Set([RoomType.BOTTOM_LEFT, RoomType.BOTTOM_RIGHT, RoomType.TOP_BOTTOM, RoomType.BOTTOM_LEFT_RIGHT, RoomType.LEFT_TOP_BOTTOM, RoomType.RIGHT_TOP_BOTTOM, RoomType.ALL]),
        LEFT: new Set([RoomType.TOP_LEFT, RoomType.BOTTOM_LEFT, RoomType.LEFT_RIGHT, RoomType.TOP_LEFT_RIGHT, RoomType.BOTTOM_LEFT_RIGHT, RoomType.LEFT_TOP_BOTTOM, RoomType.ALL]),
        RIGHT: new Set([RoomType.TOP_RIGHT, RoomType.BOTTOM_RIGHT, RoomType.LEFT_RIGHT, RoomType.TOP_LEFT_RIGHT, RoomType.BOTTOM_LEFT_RIGHT, RoomType.RIGHT_TOP_BOTTOM, RoomType.ALL]),
        TOP_LEFT: new Set([RoomType.TOP_LEFT, RoomType.TOP_LEFT_RIGHT, RoomType.LEFT_TOP_BOTTOM, RoomType.ALL]),
        TOP_RIGHT: new Set([RoomType.TOP_RIGHT, RoomType.TOP_LEFT_RIGHT, RoomType.RIGHT_TOP_BOTTOM, RoomType.ALL]),
        BOTTOM_LEFT: new Set([RoomType.BOTTOM_LEFT, RoomType.BOTTOM_LEFT_RIGHT, RoomType.LEFT_TOP_BOTTOM, RoomType.ALL]),
        BOTTOM_RIGHT: new Set([RoomType.BOTTOM_RIGHT, RoomType.BOTTOM_LEFT_RIGHT, RoomType.RIGHT_TOP_BOTTOM, RoomType.ALL]),
        TOP_BOTTOM: new Set([RoomType.TOP_BOTTOM, RoomType.LEFT_TOP_BOTTOM, RoomType.RIGHT_TOP_BOTTOM, RoomType.ALL]),
        LEFT_RIGHT: new Set([RoomType.LEFT_RIGHT, RoomType.TOP_LEFT_RIGHT, RoomType.BOTTOM_LEFT_RIGHT, RoomType.ALL])
    }

    enum RoomCategory {
        PATH,
        START,
        EXIT,
        OTHER,
    }

    export enum Tiles {
        NOTHING = 0,
        WALL = 1,
        START = 2,
        END = 3,
        COIN = 4,
        LADDER = 5,
        SPIKES = 6,
        SNAKE = 7,
        BRICK = 8
    }

    export const ROOM_WIDTH = 10;
    export const ROOM_HEIGHT = 8;

    function chunkArray(arr: number[], size: number): number[][] {
        const result: number[][] = [];
        for (let i = 0; i < arr.length; i += size) {
            result.push(arr.slice(i, i + size));
        }
        return result;
    }

    function printRoom(room: number[]): void {
        console.log('room');
        for (let y = 0; y < ROOM_HEIGHT; y++) {
            let line: number[] = [];
            for (let x = 0; x < ROOM_WIDTH; x++) {
                line.push(room[y * ROOM_WIDTH + x]);
            }
            console.log(line.join(''));
        }
    }

    class PathSection {
        x: number
        y: number
        roomType: RoomType

        constructor(x: number, y: number) {
            this.x = x;
            this.y = y;
            this.roomType = RoomType.ALL
        }

        setRoomType(t: RoomType) {
            this.roomType = t;
        }
    }

    export class Path {
        steps: PathSection[];

        constructor(fromX: number, fromY: number) {
            this.steps = [new PathSection(fromX, fromY)]
        }

        addStep(x: number, y: number): void {
            this.steps.push(new PathSection(x, y));
        }

        setCurrentRoomType(roomType: RoomType): void {
            this.steps[this.steps.length - 1].setRoomType(roomType);
        }

        forEachStep(callback: (x: number, y: number) => void): void {
            if (this.steps != null) {
                this.steps.forEach((step) => callback(step.x, step.y));
            }
        }

        getRoomTypeAt(x: number, y: number): RoomType | undefined {
            const step = this.steps.find(step => step.x === x && step.y === y)
            if (step != null) {
                return step.roomType;
            }
            return null;
        }

        isEndRoom(x: number, y: number): boolean {
            return this.steps[this.steps.length - 1].x === x && this.steps[this.steps.length - 1].y === y;
        }

        isStartRoom(x: number, y: number): boolean {
            return this.steps[0].x === x && this.steps[0].y === y;
        }

        prettyPrint() {
            /*const lines = []
            for (let i = 0; i < this.steps.length; i++) {
                //console.log(this.steps[i].x + "," + this.steps[i].y + " " + RoomTypeRepresentation[this.steps[i].roomType])
                let x = this.steps[i].x
                let y = this.steps[i].y
                let tile = RoomTypeRepresentation[this.steps[i].roomType]
                while (y >= lines.length) {
                    lines.push([' '])
                }
                while (x >= lines[y].length) {
                    lines[y].push([' '])
                }
                lines[y][x] = tile
            }
            for (let i = 0; i < lines.length; i++) {
                console.log(lines[i].join(''))
            }*/
            console.log('nope')
        }
    }

    export class LevelGenerator {
        width: number;
        height: number;

        constructor(width: number = 4, height: number = 4) {
            this.width = width;
            this.height = height;
        }

        generatePath(): Path {
            let x = Math.floor(Math.random() * this.width);
            let y = 0;
            let path = new Path(x, y);

            let visited = new Set([]);
            visited.add(`${x},${y}`)
            let prevDirection: [number, number] | null = null;
            let type: RoomType;

            while (y < this.height) {
                let directions: [number, number][] = [];
                if (x > 0 && !visited.has(`${x - 1},${y}`)) directions.push([-1, 0]);
                if (x < this.width - 1 && !visited.has(`${x + 1},${y}`)) directions.push([1, 0]);
                directions.push([0, 1]);

                let [dx, dy] = directions[Math.floor(Math.random() * directions.length)];
                if (dy === 1 && y === this.height - 1) break;
                x += dx;
                y += dy;
                visited.add(`${x},${y}`);

                if (!prevDirection) {
                    const compat = dy === 1 ? RoomCompatibility.BOTTOM : dx === 1 ? RoomCompatibility.RIGHT : RoomCompatibility.LEFT;
                    const randomRoomType = this.randomRoomType(compat);
                    path.setCurrentRoomType(randomRoomType);
                } else {
                    const [px, py] = prevDirection;
                    if (py === 0) {
                        type = this.randomRoomType(
                            dy === 1 ?
                                (px === 1 ? RoomCompatibility.BOTTOM_LEFT : RoomCompatibility.BOTTOM_RIGHT) :
                                RoomCompatibility.LEFT_RIGHT
                        );
                    } else {
                        type = this.randomRoomType(
                            dx === 1 ? RoomCompatibility.TOP_RIGHT :
                                dx === -1 ? RoomCompatibility.TOP_LEFT :
                                    RoomCompatibility.TOP_BOTTOM
                        );
                    }
                    path.setCurrentRoomType(type);
                }

                path.addStep(x, y);
                prevDirection = [dx, dy];
            }

            if (prevDirection) {
                const [px, py] = prevDirection;
                path.setCurrentRoomType(this.randomRoomType(
                    py === 1 ? RoomCompatibility.TOP :
                        px === 1 ? RoomCompatibility.LEFT :
                            RoomCompatibility.RIGHT
                ));
            }

            return path;
        }

        randomRoomType(roomTypes: Set<RoomType>): RoomType {
            roomTypes.prettyPrint();
            return roomTypes.elements[Math.floor(Math.random() * roomTypes.size())];
        }

        generate(): [RoomType[][], Path] {
            const roomGrid: RoomType[][] = arrayFrom(this.width, () =>
                arrayFrom(this.height, () => this.randomRoomType(RoomCompatibility.ALL))
            );
            let path = this.generatePath();
            path.forEachStep((x, y) => {
                const roomType = path.getRoomTypeAt(x, y);
                if (roomType) roomGrid[x][y] = roomType;
            });
            return [roomGrid, path];
        }
    }

    function arrayFrom<typ>(length: number, initializer: () => typ) {
        const result: typ[] = []
        for (let i = 0; i < length; i++) {
            result.push(initializer())
        }
        return result;
    }

    export class RoomCollection {
        roomsX: number
        roomsY: number

        constructor() {
            this.roomsX = 3;
            this.roomsY = 3;
        }

        roomTypeMappings: { [key: number]: Room[] } = {}

        getRandomRoomOfType(roomType: RoomType): Room | undefined {
            const rooms = this.roomTypeMappings[roomType];
            if (rooms) {
                return rooms[Math.floor(Math.random() * rooms.length)].copy()
            }
            return null
            console.error(`Could not find room of type: ${roomType}`);
        }

        addRoomType(room: Room): void {
            const roomType = room.type;
            if (!this.roomTypeMappings[roomType]) {
                this.roomTypeMappings[roomType] = [];
            }
            this.roomTypeMappings[roomType].push(room);
        }

        extractRoom(chunks: number[][], x: number, y: number): number[] {
            const skip = y * this.roomsX * ROOM_HEIGHT + x;
            const room: number[] = [];

            for (let i = 0; i < ROOM_HEIGHT; i++) {
                const row = chunks[skip + i * 3];
                for (let j = 0; j < row.length; j++) {
                    room.push(row[j]);
                }
            }

            return room;
        }

        addRooms(roomSet: number[]): void {
            const chunks = chunkArray(roomSet, ROOM_WIDTH);
            for (let y = 0; y < this.roomsY; y++) {
                for (let x = 0; x < this.roomsX; x++) {
                    const roomTiles = this.extractRoom(chunks, x, y);
                    const room = new Room(roomTiles);
                    this.addRoomType(room);
                    if (room.canBeMirrored()) {
                        this.addRoomType(room.mirrorCopy());
                    }
                }
            }
        }
    }

    export class LevelAssembler {
        printMap(roomGrid: RoomType[][]): void {
            const height = roomGrid[0].length;
            const width = roomGrid.length;
            for (let y = 0; y < height; y++) {
                let line: string[] = [];
                for (let x = 0; x < width; x++) {
                    line.push(roomGrid[x][y].toString());
                }
                console.log(line.join(''));
            }
        }

        assemble(roomCollection: RoomCollection, levelMap: RoomType[][], path: Path): Level {
            const height = levelMap[0].length;
            const width = levelMap.length;
            const level = new Level(width * ROOM_WIDTH, height * ROOM_HEIGHT);

            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    const roomType = levelMap[x][y];
                    const room = roomCollection.getRandomRoomOfType(roomType);
                    if (!room) continue;

                    if (path.isStartRoom(x, y)) {
                        room.setRoomCategory(RoomCategory.START);
                    }
                    if (path.isEndRoom(x, y)) {
                        room.setRoomCategory(RoomCategory.EXIT);
                    }
                    level.setRoom(room, x, y);
                }
            }
            return level;
        }
    }

    class Room {
        tiles: number[];
        type: RoomType;

        constructor(tiles: number[]) {
            this.tiles = tiles;
            this.type = this.checkRoomType();
        }

        tileTypeAt(x: number, y: number): number {
            return this.tiles[x + y * ROOM_WIDTH];
        }

        setRoomCategory(category: RoomCategory): void {
            let tile: Tiles;
            switch (category) {
                case RoomCategory.START:
                    tile = Tiles.START;
                    break;
                case RoomCategory.EXIT:
                    tile = Tiles.END;
                    break;
                default:
                    return;
            }

            const candidates: number[] = [];
            this.tiles.forEach((block, index) => {
                if (block === Tiles.COIN) {
                    candidates.push(index);
                }
            });
            if (candidates.length > 0) {
                this.tiles[candidates[Math.floor(Math.random() * candidates.length)]] = tile;
            }
        }

        checkRoomType(): RoomType {
            let doors = 0;
            if (this.tileTypeAt(4, 0) !== Tiles.WALL && this.tileTypeAt(5, 0) !== Tiles.WALL) doors += 1;
            if (this.tileTypeAt(4, ROOM_HEIGHT - 1) !== Tiles.WALL && this.tileTypeAt(5, ROOM_HEIGHT - 1) !== Tiles.WALL) doors += 2;
            if (this.tileTypeAt(0, 2) !== Tiles.WALL && this.tileTypeAt(0, 3) !== Tiles.WALL && this.tileTypeAt(0, 4) !== Tiles.WALL && this.tileTypeAt(0, 5) !== Tiles.WALL) doors += 4;
            if (this.tileTypeAt(ROOM_WIDTH - 1, 2) !== Tiles.WALL && this.tileTypeAt(ROOM_WIDTH - 1, 3) !== Tiles.WALL && this.tileTypeAt(ROOM_WIDTH - 1, 4) !== Tiles.WALL && this.tileTypeAt(ROOM_WIDTH - 1, 5) !== Tiles.WALL) doors += 8;

            switch (doors) {
                case 3:
                    return RoomType.TOP_BOTTOM;
                case 5:
                    return RoomType.TOP_LEFT;
                case 6:
                    return RoomType.BOTTOM_LEFT;
                case 7:
                    return RoomType.LEFT_TOP_BOTTOM;
                case 9:
                    return RoomType.TOP_RIGHT;
                case 10:
                    return RoomType.BOTTOM_RIGHT;
                case 11:
                    return RoomType.RIGHT_TOP_BOTTOM;
                case 12:
                    return RoomType.LEFT_RIGHT;
                case 13:
                    return RoomType.TOP_LEFT_RIGHT;
                case 14:
                    return RoomType.BOTTOM_LEFT_RIGHT;
                case 15:
                    return RoomType.ALL;
                default:
                    return RoomType.ALL;
            }
        }

        mirrorCopy(): Room {
            const mirroredRoom: number[] = [];
            for (let y = 0; y < ROOM_HEIGHT; y++) {
                for (let x = 0; x < ROOM_WIDTH; x++) {
                    mirroredRoom.push(this.tiles[(ROOM_WIDTH - x - 1) + (y * ROOM_WIDTH)]);
                }
            }
            return new Room(mirroredRoom);
        }

        copy(): Room {
            return new Room(this.tiles.slice())
        }

        canBeMirrored(): boolean {
            return !RoomCompatibility.LEFT_RIGHT.has(this.type) &&
                (RoomCompatibility.LEFT.has(this.type) || RoomCompatibility.RIGHT.has(this.type));
        }
    }

    class Level {
        width: number;
        height: number;
        level: number[];

        constructor(width: number, height: number, array: number[] = null) {
            this.width = width;
            this.height = height;
            if (array !== null) {
                this.level = array;
            } else {
                this.level = arrayFrom(width * height, () => 0)
            }
        }

        prettyPrint(): void {
            console.log('level');
            for (let y = 0; y < this.height; y++) {
                let line: (number | string)[] = [];
                for (let x = 0; x < this.width; x++) {
                    line.push(this.level[y * this.width + x]);
                    if (x % ROOM_WIDTH === 9) line.push(' ');
                }
                console.log(line.join(''));
                if (y % ROOM_HEIGHT === 7) console.log('');
            }
        }

        setRoom(room: Room, roomPosX: number, roomPosY: number): void {
            const posX = roomPosX * ROOM_WIDTH;
            const posY = roomPosY * ROOM_HEIGHT;
            for (let y = 0; y < ROOM_HEIGHT; y++) {
                for (let x = 0; x < ROOM_WIDTH; x++) {
                    this.level[(posX + x) + (posY + y) * this.width] = room.tileTypeAt(x, y);
                }
            }
        }

        getWalled(): Level {
            const result: number[] = arrayFrom((this.width + 2) * (this.height + 2), () => 0);
            for (let y = -1; y <= this.height; y++) {
                for (let x = -1; x <= this.width; x++) {
                    const index = (x + 1) + (y + 1) * (this.width + 2);
                    if (y === -1 || y === this.height || x === -1 || x === this.width) {
                        result[index] = Tiles.BRICK;
                    } else {
                        result[index] = this.level[x + y * this.width];
                    }
                }
            }
            return new Level(this.width + 2, this.height + 2, result);
        }
    }

    export function isWalkableTileType(tile: Tiles) {
        return tile === Tiles.WALL || tile === Tiles.BRICK
    }
}

const roomSets: number[][] = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 4, 0, 0, 0, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0,
        1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 5, 1,
        1, 1, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 4, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 5, 1,
        4, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 6, 0, 7, 0, 0, 5, 1,
        0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 6, 1, 1, 1, 0, 0, 0, 0, 0, 4, 1, 0, 0, 1, 1, 1, 0, 0, 5, 4,
        1, 1, 0, 0, 0, 0, 7, 0, 0, 6, 1, 4, 0, 0, 0, 0, 0, 0, 6, 1, 1, 0, 0, 0, 0, 0, 0, 1, 4, 1,
        1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 4, 1, 1, 0, 0, 0, 0, 1, 1,
        1, 1, 5, 0, 4, 0, 0, 0, 0, 0, 1, 1, 0, 0, 4, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 6, 0, 5, 0,
        4, 0, 5, 1, 1, 1, 6, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 5, 0,
        1, 1, 5, 0, 1, 1, 1, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 1,
        1, 1, 5, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 4,
        1, 1, 5, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 7, 0, 4, 0, 0, 0, 0, 0, 0, 0, 6, 1, 1, 1, 0, 0, 1,
        1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 6, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1,
        1, 1, 4, 0, 0, 0, 0, 0, 6, 6, 1, 4, 0, 0, 0, 0, 4, 0, 6, 1, 1, 1, 4, 4, 0, 0, 0, 0, 1, 1,
        1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 0, 0, 0, 4, 0, 0, 1, 1, 0, 4, 0, 0, 5, 0, 0, 4, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0,
        4, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 5, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0,
        1, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 5, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        1, 1, 0, 5, 1, 1, 1, 0, 0, 0, 0, 0, 0, 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        1, 1, 0, 5, 1, 1, 0, 0, 0, 0, 0, 0, 5, 1, 1, 1, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        1, 1, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0,
        1, 1, 6, 5, 0, 4, 0, 0, 0, 1, 4, 0, 5, 0, 7, 0, 0, 0, 0, 1, 6, 0, 0, 7, 6, 6, 1, 1, 6, 0,
        1, 1, 1, 1, 1, 1, 1, 1, 6, 1, 1, 1, 1, 1, 1, 1, 1, 6, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

function printRawLevel(tiles: number[], width: number): void {
    const height = tiles.length / width;
    for (let y = 0; y < height; y++) {
        let line: string[] = [];
        for (let x = 0; x < width; x++) {
            const tile = tiles[x + y * width];
            if (tile === Levelgen.Tiles.END || tile === Levelgen.Tiles.START) {
                line.push('\x1b[31m');
                line.push(tile.toString());
                line.push('\x1b[0m');
            } else {
                line.push(tile.toString());
            }
        }
        console.log(line.join(''));
    }
}