import { Component } from '@angular/core';
import { BrickModel, WallRow, BrickType, BrickOption } from '../models/brick.model';
import { OnInit } from '@angular/core';
import { BrickTypeService } from '../services/brick-type.service';
import { BrickOptionService } from '../services/brick-option.service';
import { color } from '../constants/color';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private brickTypeService: BrickTypeService, private brickOptionService: BrickOptionService) {}

  wallRows: WallRow[] = [];
  brickTypes: BrickType[] = [];
  selectedBrickTypeId: number;
  brickOption: BrickOption;

  //Вводные параметры в мм
  wallHeightInputMM = 1650; //Высота стены 1,8 метра
  wallWidthInputMM = 2800; //Длина стены 2,8 метра
  brickHeightMM = 0; //Высота кирпича. Получаем с сервера по типу кирпича
  brickWidthMM = 0; //Длина кирпича. Получаем с сервера по типу кирпича
  jointVerticalMM = 10; //Ширина веритикального шва 10 мм
  jointHorizontalMM = 10; //Ширина горизонтального шва 10 мм
  halfBrickWidthMM = Math.floor(this.brickWidthMM / 2) - Math.floor(this.jointVerticalMM / 2); //Половина длинны кирпича
  minBrickWidth = 30; //Минимальная длина обрезка кирпича

  //Результат
  wallWidthFactMM: number;
  wallHeightFactMM: number;
  yellowBricksCount: number;
  redBricksCount: number;
  yellowPalletsCount: number;
  redPalletsCount: number;
  totalWeight: number;
  totalCost: number;

  async ngOnInit() {
    this.brickTypes = await this.brickTypeService.get();
    this.selectedBrickTypeId = this.brickTypes[0].id;
    this.updateBrickParams();
  }

  //Нарисовать стену
  drawBrickWall() {
    this.wallRows.length = 0;
    const wallElement = document.getElementById('wall');

    //Визуальные параметры стены в пикселях
    const screenHeight = wallElement?.offsetHeight;
    const screenWidth = wallElement?.offsetWidth;

    if (screenWidth && screenHeight) {
      //Рассчитываем количество рядов
      let rowsCount = Math.floor(this.wallHeightInputMM / (this.brickHeightMM + this.jointHorizontalMM));

      //Реальная длина стены может быть меньше, чем ввел пользователь. Например, если кирпич 250, шов 10, а пользователь указал длину стены 261
      //В этом случае неполный кирпич должен быть длиной 1мм, что практически невозможно реализовать
      //Поэтому берем минимильную длину обрезка равную 30мм и рассчитываем реальную длину стены
      this.wallWidthFactMM = this.calculateWallWidth();

      //Коээфициент для первода ширины и высоты кирпичей из мм в px
      let sizeFactor = Math.min(screenWidth / this.wallWidthInputMM, screenHeight / this.wallHeightInputMM);

      //Ширина одного кирпича в пикселях
      const brickWidthPX = Math.floor(this.brickWidthMM * sizeFactor);
      //Толщина вертикального шва в пикселях. Может быть 0, если стена слишком широкая
      const jointVerticalPX = Math.floor(this.jointVerticalMM * sizeFactor);

      //Высота одного кирпича в пикселях
      const brickHeightPX = Math.floor(this.brickHeightMM * sizeFactor);
      //Толщина горизотального шва в пикселях
      const jointHorizontalPX = Math.floor(this.jointHorizontalMM * sizeFactor);
      //Высота стены в мм
      this.wallHeightFactMM = rowsCount * this.brickHeightMM + rowsCount * this.jointHorizontalMM;

      //Ширина первого ряда в px и мм. Будем выравнивать четные ряды по этим значеням
      let firstRowWidthPX = 0;
      let firstRowWidthMM = 0;

      //Цикл по количеству рядов стены
      for (let rowNum = 1; rowNum <= rowsCount; rowNum++) {
        let isEvenRow = rowNum % 2 == 0;
        let brickNum = 0;
        let laidOutPX = 0; //Сколько уложено кирпичей и швов в пикселях
        let laidOutMM = 0; //Сколько уложено кирпичей и швов в мм
        let wallRow = new WallRow();

        //ЛЕВАЯ ЧАСТЬ. Для четных рядов первым идет половина кирпича
        if (isEvenRow) {
          let brick = new BrickModel();
          brick.heightPX = brickHeightPX;
          brick.widthPX = Math.floor(this.halfBrickWidthMM * sizeFactor);
          brick.widthMM = this.halfBrickWidthMM;
          brick.marginLeft = 0;
          brick.marginBottom = jointHorizontalPX;
          brick.backgroundColor = color.red;
          wallRow.bricks.push(brick);
          brickNum++;
          laidOutPX += brick.widthPX;
          laidOutMM += this.halfBrickWidthMM;
        }

        //ЦЕНТР. Количество целых кирпичей для одного ряда с учетом швов между кирпичами
        let bricksOnRowCount = isEvenRow
          ? Math.floor((this.wallWidthFactMM - this.halfBrickWidthMM) / (this.brickWidthMM + this.jointVerticalMM))
          : Math.floor((this.wallWidthFactMM + this.jointVerticalMM) / (this.brickWidthMM + this.jointVerticalMM));

        for (let i = 0; i < bricksOnRowCount; i++) {
          let brick = new BrickModel();
          brick.heightPX = brickHeightPX;
          brick.widthPX = brickWidthPX;
          brick.widthMM = this.brickWidthMM;
          brick.marginLeft = wallRow.bricks.length == 0 ? 0 : jointVerticalPX;
          brick.marginBottom = jointHorizontalPX;
          brick.backgroundColor = brickNum % 2 == 0 ? color.red : color.yellow;
          wallRow.bricks.push(brick);
          brickNum++;
          laidOutPX += brick.widthPX + brick.marginLeft;
          laidOutMM += this.brickWidthMM + this.jointVerticalMM;

          //Если это последний блок и не будет неполного кирпича, то подкорректируем ширину
          if (i == bricksOnRowCount - 1 && this.wallWidthFactMM - laidOutMM == 0) {
            brick.widthPX += firstRowWidthPX - laidOutPX;
          }
        }

        //ПРАВАЯ ЧАСТЬ. Добавляем неполный кирпич справа
        if (this.wallWidthFactMM - laidOutMM > 0) {
          let widthPX = 0;
          let widthMM = 0;
          //Последний в первом ряду рассчитываем как Остаток в мм * коэффициент
          if (rowNum == 1) {
            widthMM = this.wallWidthFactMM - laidOutMM - this.jointVerticalMM;
            widthPX = widthMM * sizeFactor;
          }
          //Чтобы округление нас не расстраивало будем исходить из нарисованной длины первого ряда в пикселях (firstRowWidthPX)
          else {
            widthMM = laidOutMM ? firstRowWidthMM - laidOutMM - this.jointVerticalMM : firstRowWidthMM;
            widthPX = laidOutPX ? firstRowWidthPX - laidOutPX - jointVerticalPX : firstRowWidthPX;
          }

          let brick = new BrickModel();
          brick.heightPX = brickHeightPX;
          brick.widthPX = widthPX;
          brick.widthMM = widthMM;
          brick.marginLeft = jointVerticalPX;
          brick.marginBottom = jointHorizontalPX;
          brick.backgroundColor = brickNum % 2 == 0 ? color.red : color.yellow;
          wallRow.bricks.push(brick);
          laidOutPX += brick.widthPX + brick.marginLeft;
          laidOutMM += brick.widthMM + this.jointVerticalMM;
        }

        //Запоминаем ширину первого ряда в пикселях, чтобы последний неполный кирпич в четных рядах корректировать по этой длинне (борьба с округлением)
        if (rowNum == 1) {
          firstRowWidthPX = laidOutPX;
          firstRowWidthMM = laidOutMM;
        }

        this.wallRows.push(wallRow);
      }
    }

    //Пересчитываем результаты
    this.updateTotalResults();
  }

  //Расчет реальной длины стены. Может быть равна или меньше, чем значение, которое указал пользователь
  calculateWallWidth() {
    //Количество целых кирпичей для одного ряда с учетом швов между кирпичами. Считаем по первому ряду, где первым идет полный кирпич
    let bricksOnRowCountODD = Math.floor((this.wallWidthInputMM + this.jointVerticalMM) / (this.brickWidthMM + this.jointVerticalMM));
    //Длина стены в мм. Она либо равна, либо чуть меньше заданной пользователем ширины стены
    let wallWidthODD = (this.brickWidthMM + this.jointVerticalMM) * bricksOnRowCountODD - this.jointVerticalMM;
    //Рассчитаем остаток (неполный кирпич) у проверим: если он меньше допустимой длинны, то уменьшим длину стены
    const partialBrickWidthODD = this.wallWidthInputMM - wallWidthODD - this.jointVerticalMM;
    if (partialBrickWidthODD < this.minBrickWidth || partialBrickWidthODD <= 0) {
      //Остаток меньше нормы. Возвращаем рассчитанное значение длины стены
      return wallWidthODD;
    } else {
      let bricksOnRowCountEVEN = Math.floor((this.wallWidthInputMM - this.halfBrickWidthMM) / (this.brickWidthMM + this.jointVerticalMM));
      let wallWidthEVEN = (this.brickWidthMM + this.jointVerticalMM) * bricksOnRowCountEVEN + this.halfBrickWidthMM;
      const partialBrickWidthEVEN = this.wallWidthInputMM - wallWidthEVEN - this.jointVerticalMM;
      if (partialBrickWidthEVEN < this.minBrickWidth || partialBrickWidthEVEN <= 0) {
        //Остаток меньше нормы. Возвращаем рассчитанное значение длины стены
        return wallWidthEVEN;
      } else {
        //Остаток в норме. Возвращаем исходную длину стены, которую указал пользователь
        return this.wallWidthInputMM;
      }
    }
  }

  //При изменеии типа кирпича получим с сервера данные по выбранному кирпичу
  brickTypeChanged() {
    this.updateBrickParams();
  }

  //Получаем параметры выбранного типа кирпича с сервера
  async updateBrickParams() {
    this.brickOption = await this.brickOptionService.get(this.selectedBrickTypeId);
    this.brickHeightMM = this.brickOption.height;
    this.brickWidthMM = this.brickOption.width;
    this.halfBrickWidthMM = Math.floor(this.brickWidthMM / 2) - Math.floor(this.jointVerticalMM / 2);

    this.drawBrickWall();
  }

  //Обновляем результаты после построения стены
  updateTotalResults() {
    this.yellowBricksCount = 0;
    this.redBricksCount = 0;
    //Массивы для хранения остатов кирпичей
    let partialYellowBricks: number[] = [];
    let partialRedBricks: number[] = [];

    //Подсчет количества кирпичей
    this.wallRows.forEach((wallRow) => {
      wallRow.bricks.forEach((brick) => {
        //Нужен целый кирпич
        if (brick.widthMM == this.brickWidthMM) {
          this.redBricksCount += brick.backgroundColor == color.red ? 1 : 0;
          this.yellowBricksCount += brick.backgroundColor == color.yellow ? 1 : 0;
        }
        //Часть кирпича. Поищем в имеющихся остатках
        else {
          var array = brick.backgroundColor == color.red ? partialRedBricks : partialYellowBricks;
          let partBrickIndex = array.findIndex((x) => x >= brick.widthMM);
          if (partBrickIndex >= 0) {
            //Убираем из остатков, потому что остаток можно использовать только один раз, ибо у него больше нет красивых сторон
            array.splice(partBrickIndex, 1);
          }
          //В остатках нет. Берем целый кирпич, ломаем (ширина шва 0), оставшуюся часть сохраняем в массив
          else {
            this.redBricksCount += brick.backgroundColor == color.red ? 1 : 0;
            this.yellowBricksCount += brick.backgroundColor == color.yellow ? 1 : 0;
            array.push(this.brickWidthMM - brick.widthMM);
          }
        }
      });
    });

    //Кол-во паллет
    this.redPalletsCount = this.redBricksCount == 0 ? 0 : Math.ceil(this.redBricksCount / this.brickOption.countOnPalette);
    this.yellowPalletsCount = this.yellowBricksCount == 0 ? 0 : Math.ceil(this.yellowBricksCount / this.brickOption.countOnPalette);
    //Общий вес
    this.totalWeight = Math.round((this.redBricksCount + this.yellowBricksCount) * this.brickOption.weight * 100) / 100;
    //Итовая цена
    this.totalCost = Math.round((this.redBricksCount + this.yellowBricksCount) * this.brickOption.price * 100) / 100;
  }
}
