// Dependencies

import { Coordinates, Direction } from "./matrix.ts";

// Public

export type onMoveFunction = (
  coords: Coordinates,
  direction: Direction
) => void;

export interface PlaneWalkerOptions {
  coords?: Coordinates;
  onMove?: onMoveFunction;
}

export default class PlaneWalker {
  x: number;
  y: number;
  onMove: onMoveFunction;

  constructor(options?: PlaneWalkerOptions) {
    const { coords, onMove } = options || {};

    this.x = coords?.x ?? 0;
    this.y = coords?.y ?? 0;
    this.onMove = typeof onMove === "function" ? onMove : () => {};
  }

  get coords(): Coordinates {
    return { x: this.x, y: this.y };
  }

  north() {
    this.y += 1;
    this.onMove(this.coords, Direction.NORTH);
  }

  northeast() {
    this.y += 1;
    this.x += 1;
    this.onMove(this.coords, Direction.NORTHEAST);
  }

  east() {
    this.x += 1;
    this.onMove(this.coords, Direction.EAST);
  }

  southeast() {
    this.y -= 1;
    this.x += 1;
    this.onMove(this.coords, Direction.SOUTHEAST);
  }

  south() {
    this.y -= 1;
    this.onMove(this.coords, Direction.SOUTH);
  }

  southwest() {
    this.y -= 1;
    this.x -= 1;
    this.onMove(this.coords, Direction.SOUTHWEST);
  }

  west() {
    this.x -= 1;
    this.onMove(this.coords, Direction.WEST);
  }

  northwest() {
    this.y += 1;
    this.x -= 1;
    this.onMove(this.coords, Direction.NORTHWEST);
  }

  move(direction: string) {
    switch (direction) {
      case "north":
        this.north();
        break;

      case "northeast":
        this.northeast();
        break;

      case "east":
        this.east();
        break;

      case "southeast":
        this.southeast();
        break;

      case "south":
        this.south();
        break;

      case "southwest":
        this.southwest();
        break;

      case "west":
        this.west();
        break;
        
      case "northwest":
        this.northwest();
        break;
    }
  }

  distanceTo(coords: Coordinates): Coordinates {
    return { x: coords.x - this.x, y: coords.y - this.y };
  }

  toString() {
    return `${this.x},${this.y}`;
  }
}
