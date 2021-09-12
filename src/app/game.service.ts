import { Injectable } from '@angular/core';
import { IBloxx } from 'models/bloxx.interface';
import { IFloor } from 'models/floor.interface';
import { interval } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  floor_offset = 0;
  node_offset = 0;
  floors_count = 16;
  unit_count = 30;
  activeBlock: IBloxx = 'pointer';
  total_floors: IFloor[] = [];

  tick$ = interval(2000);

  constructor() {
    this.total_floors = [...Array(this.floors_count).keys()].map((i) => ({
      id: i,
      stairs: false,
      nodes: [...Array(this.unit_count).keys()].map((j) => ({
        id: j,
        floor: i,
      })),
    }));
  }

  isAbleToStart(floor: number, node: number): boolean {
    // if (floor === 10) {
    //   console.log(
    //     'floor === 10',
    //     floor,
    //     node,
    //     !this.total_floors[floor].nodes[node].unit
    //   );
    // }
    // if (floor < 10) {
    //   console.log(
    //     'floor < 10',
    //     floor,
    //     node,
    //     !this.total_floors[floor].nodes[node].unit,
    //     !!this.total_floors[floor + 1].nodes[node].unit
    //   );
    // }
    // if (floor > 10) {
    //   console.log(
    //     'floor > 10',
    //     floor,
    //     node,
    //     !this.total_floors[floor].nodes[node].unit,
    //     !!this.total_floors[floor - 1].nodes[node].unit
    //   );
    // }

    if (floor === 10 && !this.total_floors[floor].nodes[node].unit) {
      return true;
    }
    if (
      floor < 10 &&
      !this.total_floors[floor].nodes[node].unit &&
      !!this.total_floors[floor + 1].nodes[node].unit
    ) {
      return true;
    }
    if (
      floor > 10 &&
      !this.total_floors[floor].nodes[node].unit &&
      !!this.total_floors[floor - 1].nodes[node].unit
    ) {
      return true;
    }
    return false;
  }

  connectFloor(floor: number) {
    this.total_floors[floor].stairs = true;
  }

  isConnected(floor: number): boolean {
    if (floor === 10) {
      return true;
    }
    if (
      floor <= 9 &&
      this.total_floors[floor].stairs &&
      this.total_floors[floor + 1].stairs
    ) {
      return true;
    }
    if (
      floor >= 11 &&
      this.total_floors[floor].stairs &&
      this.total_floors[floor - 1].stairs
    ) {
      return true;
    }
    return false;
  }
}
