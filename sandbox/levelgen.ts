namespace Levelgen {

    enum Direction {
        UP = "up",
        DOWN = "down",
        LEFT = "left",
        RIGHT = "right"
    }

    enum RoomType {
        TOP_LEFT = "╝",
        TOP_RIGHT = "╚",
        BOTTOM_LEFT = "╗",
        BOTTOM_RIGHT = "╔",
        TOP_BOTTOM = "║",
        LEFT_RIGHT = "═",
        TOP_LEFT_RIGHT = "╩",
        BOTTOM_LEFT_RIGHT = "╦",
        LEFT_TOP_BOTTOM = "╣",
        RIGHT_TOP_BOTTOM = "╠",
        ALL = "╬"
    }

    const RoomCompatibility: Record<string, RoomType[]> = {
        ALL: [RoomType.TOP_LEFT, RoomType.TOP_RIGHT, RoomType.BOTTOM_LEFT, RoomType.BOTTOM_RIGHT, RoomType.TOP_BOTTOM, RoomType.LEFT_RIGHT, RoomType.TOP_LEFT_RIGHT, RoomType.BOTTOM_LEFT_RIGHT, RoomType.LEFT_TOP_BOTTOM, RoomType.RIGHT_TOP_BOTTOM, RoomType.ALL],
        TOP: [RoomType.TOP_LEFT, RoomType.TOP_RIGHT, RoomType.TOP_BOTTOM, RoomType.TOP_LEFT_RIGHT, RoomType.LEFT_TOP_BOTTOM, RoomType.RIGHT_TOP_BOTTOM, RoomType.ALL],
        BOTTOM: [RoomType.BOTTOM_LEFT, RoomType.BOTTOM_RIGHT, RoomType.TOP_BOTTOM, RoomType.BOTTOM_LEFT_RIGHT, RoomType.LEFT_TOP_BOTTOM, RoomType.RIGHT_TOP_BOTTOM, RoomType.ALL],
        LEFT: [RoomType.TOP_LEFT, RoomType.BOTTOM_LEFT, RoomType.LEFT_RIGHT, RoomType.TOP_LEFT_RIGHT, RoomType.BOTTOM_LEFT_RIGHT, RoomType.LEFT_TOP_BOTTOM, RoomType.ALL],
        RIGHT: [RoomType.TOP_RIGHT, RoomType.BOTTOM_RIGHT, RoomType.LEFT_RIGHT, RoomType.TOP_LEFT_RIGHT, RoomType.BOTTOM_LEFT_RIGHT, RoomType.RIGHT_TOP_BOTTOM, RoomType.ALL],
        TOP_LEFT: [RoomType.TOP_LEFT, RoomType.TOP_LEFT_RIGHT, RoomType.LEFT_TOP_BOTTOM, RoomType.ALL],
        TOP_RIGHT: [RoomType.TOP_RIGHT, RoomType.TOP_LEFT_RIGHT, RoomType.RIGHT_TOP_BOTTOM, RoomType.ALL],
        BOTTOM_LEFT: [RoomType.BOTTOM_LEFT, RoomType.BOTTOM_LEFT_RIGHT, RoomType.LEFT_TOP_BOTTOM, RoomType.ALL],
        BOTTOM_RIGHT: [RoomType.BOTTOM_RIGHT, RoomType.BOTTOM_LEFT_RIGHT, RoomType.RIGHT_TOP_BOTTOM, RoomType.ALL],
        TOP_BOTTOM: [RoomType.TOP_BOTTOM, RoomType.LEFT_TOP_BOTTOM, RoomType.RIGHT_TOP_BOTTOM, RoomType.ALL],
        LEFT_RIGHT: [RoomType.LEFT_RIGHT, RoomType.TOP_LEFT_RIGHT, RoomType.BOTTOM_LEFT_RIGHT, RoomType.ALL]
    }

    enum RoomCategory {
        PATH = "P",
        START = "S",
        EXIT = "E",
        OTHER = "O"
    }

    enum Tiles {
        WALL = 1,
        START = 2,
        END = 3,
        COIN = 4,
        LADDER = 5,
        SPIKE = 6,
        SNAKE = 7,
        BRICK = 1
    }

    export const ROOM_WIDTH = 10;
    const ROOM_HEIGHT = 8;

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

    class Path {
        steps: [number, number, RoomType][];

        constructor(fromX: number, fromY: number) {
            this.steps = [[fromX, fromY, RoomType.ALL]];
        }

        addStep(x: number, y: number): void {
            this.steps.push([x, y, RoomType.ALL]);
        }

        setCurrentRoomType(type: RoomType): void {
            this.steps[this.steps.length - 1][2] = type;
        }

        forEachStep(callback: (x: number, y: number) => void): void {
            this.steps.forEach(([x, y]) => callback(x, y));
        }

        getRoomTypeAt(x: number, y: number): RoomType | undefined {
            return this.steps.find(step => step[0] === x && step[1] === y)?.[2];
        }

        isEndRoom(x: number, y: number): boolean {
            return this.steps[this.steps.length - 1][0] === x && this.steps[this.steps.length - 1][1] === y;
        }

        isStartRoom(x: number, y: number): boolean {
            return this.steps[0][0] === x && this.steps[0][1] === y;
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

            let visited = new Set<string>([`${x},${y}`]);
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
                    const compat = dy === 1 ? RoomCompatibility.BOTTOM :
                        dx === 1 ? RoomCompatibility.RIGHT : RoomCompatibility.LEFT;
                    path.setCurrentRoomType(this.randomRoomType(compat));
                } else {
                    const [px, py] = prevDirection;
                    if (py === 0) {
                        type = this.randomRoomType(
                            dy === 1 ?
                                (dx === 1 ? RoomCompatibility.BOTTOM_LEFT : RoomCompatibility.BOTTOM_RIGHT) :
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

        randomRoomType(roomTypes: RoomType[] = RoomCompatibility.ALL): RoomType {
            return roomTypes[Math.floor(Math.random() * roomTypes.length)];
        }

        generate(): [RoomType[][], Path] {
            const roomGrid: RoomType[][] = Array.from({length: this.width}, () =>
                Array.from({length: this.height}, () => this.randomRoomType())
            );
            let path = this.generatePath();
            path.forEachStep((x, y) => {
                const roomType = path.getRoomTypeAt(x, y);
                if (roomType) roomGrid[x][y] = roomType;
            });
            return [roomGrid, path];
        }
    }

    export class RoomCollection {
        roomsX = 3;
        roomsY = 3;
        roomTypeMappings: Record<RoomType, Room[]> = {} as Record<RoomType, Room[]>;

        getRandomRoomOfType(roomType: RoomType): Room | undefined {
            const rooms = this.roomTypeMappings[roomType];
            if (rooms) {
                return rooms[Math.floor(Math.random() * rooms.length)];
            }
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
                    line.push(roomGrid[x][y]);
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

        canBeMirrored(): boolean {
            return !RoomCompatibility.LEFT_RIGHT.includes(this.type) &&
                (RoomCompatibility.LEFT.includes(this.type) || RoomCompatibility.RIGHT.includes(this.type));
        }
    }

    class Level {
        width: number;
        height: number;
        level: number[];

        constructor(width: number, height: number) {
            this.width = width;
            this.height = height;
            this.level = Array(width * height).fill(0);
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

        getWalled(): number[] {
            const result: number[] = Array((this.width + 2) * (this.height + 2)).fill(0);
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
            return result;
        }
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
    const levelWidth = width * Levelgen.ROOM_WIDTH + 2;
    const height = tiles.length / levelWidth;
    for (let y = 0; y < height; y++) {
        let line: string[] = [];
        for (let x = 0; x < levelWidth; x++) {
            line.push(tiles[x + y * levelWidth].toString());
        }
        console.log(line.join(''));
    }
}

const roomCollection = new Levelgen.RoomCollection();
roomSets.forEach(roomSet => roomCollection.addRooms(roomSet));

const width = 2;
const height = 2;
const [levelMap, path] = new Levelgen.LevelGenerator(width, height).generate();

const level = new Levelgen.LevelAssembler().assemble(roomCollection, levelMap, path);
level.prettyPrint();
console.log(path);
printRawLevel(level.getWalled(), width);