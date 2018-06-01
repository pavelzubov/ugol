import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Result, Response} from '../types.factory';
import {BaseService} from '../base.service';

@Component({
  selector: 'app-calculate',
  templateUrl: './calculate.component.html',
  styleUrls: ['./calculate.component.sass']
})
export class CalculateComponent implements OnInit {
  private data: Response;
  public result: any[] = [];
  public count: number;
  public wrongPrice = false;
  public materials: any[] = [];
  public calculateForm: FormGroup = new FormGroup({
    'count': new FormControl('', Validators.required)
  });

  constructor(public authService: AuthService, public router: Router, public base: BaseService) {
  }

  ngOnInit() {
    this.base.getData().subscribe(res => {
      this.data = res;
      // Смотрим ошибки в ценах
      for (const material of Object.values(res.prices)) {
        for (const firm of Object.values(material)) {
          if (firm != +firm) {
            console.error('Прайс составлен неверно');
            this.wrongPrice = true;
            return;
          }
        }
      }
      this.materials = Object.keys(res.materials);
      console.log(this.data);
    });
  }

  public logOut() {
    this.authService.logOut();
    this.router.navigate(['/']);
  }

  public calculate() {
    // Суть алгоритма
    //
    // Составляем "таблицу" коэффициентов соотношения цены за литр для каждой тары для каждой фирмы.
    // После просто проходим по этим коэффициентам от самого маленького для каждой фирмы.
    // Это позволит учесть случай, когда дешевле купить кучу банок, чем одну бочку (хотя в жизни и наоборот, чаще всего).

    // Количество необходимых литров
    const liters = this.count * this.data.expenditure,
      // Делаем массив материалов
      // Сортируем его по возрастанию и отбрасываем объемы, которые не подойдут к литрам
      // (ну то есть нет смысла покупать цистерну на 80, если тебе нужно 70 литров),
      // чтобы было удобнее работать дальше.
      // (Хотя можно учесть и возможность того, что одна цистерна будет дешевле нескольких бочек
      // даже учитывая переплату за ненужный остаток.
      // Но я не стал учитывать её)) Просто обозначу, что я в курсе о ней)
      materials = Object.keys(this.data.materials)
        .map(item => [item, this.data.materials[item]])
        .filter(item => liters / item[1] > 1)
        .sort((a, b) => a[1] - b[1]),
      firms = {},
      factors = {},
      result = {};
    // Составляем список фирм (возможно фирма продает только бочки, потому надо пройтись по всем тарам)
    for (const price of Object.keys(this.data.prices)) {
      for (const firm of Object.keys(this.data.prices[price])) {
        firms[firm] = null;
      }
    }
    // Составляем результирующий объект для каждой фирмы
    for (const firm of Object.keys(firms)) {
      let calcLiters = liters;
      factors[firm] = [];
      result[firm] = {
        name: firm,
        price: 0
      };

      // Составляем "таблицу" коэффициентов и сортируем её по возрастанию,
      // чтобы начинать с самого маленького коэффициента
      for (const item of materials) {
        if (firm in this.data.prices[item[0]]) {
          factors[firm].push([item[0], this.data.prices[item[0]][firm] / item[1]]);
        }
      }
      factors[firm].sort((a, b) => a[1] > b[1]);

      // Для каждой тары записываем сколько вместится целых штук
      // Тут же отнимаем от количества литров и прибавляем цену к итогу для фирмы
      for (const factor of factors[firm]) {
        const nameMaterial = factor[0];
        // сколько вместится единиц
        result[firm][nameMaterial] = Math.floor(calcLiters / this.data.materials[nameMaterial]);
        // сколько останется литров
        calcLiters -= result[firm][nameMaterial] * this.data.materials[nameMaterial];
        // цена
        result[firm].price += result[firm][nameMaterial] * this.data.prices[nameMaterial][firm];
      }
      // Смотрим остаток
      // Если есть, то забиваем наименьшей тарой (для этого сортировали массив материалов по возрастанию)
      // Так как какую-то тару фирма может не продавать проходимся по массиву
      if (calcLiters > 0) {
        for (const material of materials) {
          // если такой тары нет у фирмы, то пропускаем
          if (!factors[firm].find(item => item[0] === material[0])) {
            continue;
          }
          // сколько вместится
          result[firm][material[0]] += Math.ceil(calcLiters / material[1]);
          // цена
          result[firm].price += Math.ceil(calcLiters / material[1]) * this.data.prices[material[0]][firm];
          // сколько останется литров
          calcLiters -= Math.ceil(calcLiters / material[1]) * this.data.materials[material[0]];
          break;
        }
      }
      // Записываем краску которая останется после покраски
      result[firm].remainder = Math.abs(calcLiters).toFixed(1);
    }
    // В конце сортируем получанные данные по итоговой цене для каждой фирмы
    this.result = Object.values(result).map(item => {
      item['price'] = item['price'].toFixed(2);
      return item;
    }).sort((a, b) => a['price'] - b['price']);
    console.log(this.result);
  }
}
