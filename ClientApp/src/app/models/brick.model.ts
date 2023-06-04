export class BrickModel {
  public widthPX: number; //Ширина в пикселях
  public widthMM: number; //Ширина в мм
  public heightPX: number; //Высота в пикселях
  public marginLeft: number; //Ширина вертикального шва в пикселях
  public marginBottom: number; //Ширина горизонтального шва в пикселях
  public backgroundColor: string; //Цвет
}

export class BrickType {
  public id: number;
  public name: string;
}

export class BrickOption {
  public id: number;
  public width: number;
  public height: number;
  public weight: number;
  public price: number;
  public countOnPalette: number;
  public brickTypeId: number;
  public brickType: BrickType;
}

export class WallRow {
  public bricks: BrickModel[];

  public constructor() {
    this.bricks = [];
  }
}
