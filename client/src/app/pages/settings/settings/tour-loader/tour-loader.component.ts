import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {TicketsService} from "../../../../services/tickets/tickets.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-tour-loader',
  template: `
    <div class="wrapper">
      <div>
    <form #form="ngForm" (ngSubmit)="createTour2(form)">
      <div>
        <label class="mx-3" for="name">Наименование</label>
        <input type="text"
               class="pi-phone"
               pInputText
               [ngClass]="{'input-error': !name}"
               #name="ngModel"
               ngModel
               name="name"/>
      </div>
      <div>
        <label class="mx-3" for="description">Описание</label>
        <input type="text"
               class="mt-3"
               pInputText
               [ngClass]="{'input-error': !description }"
               #description="ngModel"
               ngModel
               name="description"/>
      </div>
      <div>
        <label class="mx-3" for="operator">Оператор</label>
        <input type="text"
               class="mt-3"
               pInputText
               #operator="ngModel"
               ngModel
               name="operator"/>
      </div>
      <div>
        <label class="mx-3" for="price">Цена</label>
        <input type="number"
               step="500"
               class="mt-3"
               pInputText
               #price="ngModel"
               ngModel
               name="price"/>
      </div>
      <div>
        <label class="mx-3" for="img">Изображение</label>
        <input type="file"
               class="mt-3"
               #inputFileEl
               ngModel
               name="img"
               (change)="selectFile($event)"
        />
      </div>
      <div class="mt-5 d-flex justify-content-center">
        <button class="btn btn-primary"
                [disabled]="!name || !description "
        >
          Создать тур
        </button>
      </div>
    </form>

<!--    <form [formGroup]="tourForm">-->
<!--      <div>-->
<!--        <label class="mx-3" for="name">Наименование</label>-->
<!--        <input type="text"-->
<!--               class="pi-phone"-->
<!--               pInputText-->
<!--               formControlName="name"-->
<!--               id="name"-->
<!--        />-->
<!--      </div>-->
<!--      <div>-->
<!--        <label class="mx-3" for="description">Описание</label>-->
<!--        <input type="text"-->
<!--               class="mt-3"-->
<!--               pInputText-->
<!--               formControlName="description"-->
<!--               id="description"-->
<!--        />-->
<!--      </div>-->
<!--      <div>-->
<!--        <label class="mx-3" for="operator">Оператор</label>-->
<!--        <input type="text"-->
<!--               class="mt-3"-->
<!--               pInputText-->
<!--               formControlName="operator"-->
<!--               id="operator"/>-->
<!--      </div>-->
<!--      <div>-->
<!--        <label class="mx-3" for="price">Цена</label>-->
<!--        <input type="number"-->
<!--               step="500"-->
<!--               class="mt-3"-->
<!--               pInputText-->
<!--               formControlName="price"-->
<!--               id="price"/>-->
<!--      </div>-->
<!--      <div>-->
<!--        <label class="mx-3" for="img">Изображение</label>-->
<!--        <input type="file"-->
<!--               class="mt-3"-->
<!--               #inputFileEl-->
<!--               formControlName="img"-->
<!--               id="img"-->
<!--               (change)="selectFile($event)"-->
<!--        />-->
<!--      </div>-->

<!--      <div class="mt-5 d-flex justify-content-center">-->
<!--        <button class="btn btn-primary"-->
<!--                type="submit"-->
<!--                (click)="createTour()"-->
<!--                [disabled]="!tourForm.valid"-->
<!--        >-->
<!--          Создать тур-->
<!--        </button>-->
<!--      </div>-->
<!--    </form>-->

  </div>
  <div>
    <div class="image_block">
      <img src="tourImg" #imgEl id="outImage" class="image" *ngIf="tourImg">
    </div>
  </div>
</div>

  `,
  styles: [
    `
      .wrapper{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
      }
      .image_block{
        display: inline-block;
        width: 200px;
        height: 200px;


      }
      .image{
        width: 100%;
        height: 100%;
      }

  `
  ]
})
//

export class TourLoaderComponent implements OnInit {
  tourForm: FormGroup;
  tourImg: File;
  tmp: any;
  @ViewChild('imgEl') imgEl: ElementRef;
  @ViewChild('inputFileEl') inputFileEl: ElementRef;

  constructor(
    private readonly messageService: MessageService,
    private readonly ticketsService: TicketsService,
  ) {
  }

  ngOnInit(): void {
    this.tourForm = new FormGroup(
      {
        name: new FormControl('', {validators: Validators.required}),
        description: new FormControl('', [Validators.required, Validators.minLength(10)]),
        operator: new FormControl(),
        price: new FormControl(),
        img: new FormControl(),
      }
    )
  }

  createTour(): void {
    // const formData = form.value;
    // console.log(formData)

    // For reactiveForms
    const tourDataRow = this.tourForm.getRawValue();
    let formParams = new FormData();
    if (typeof tourDataRow === 'object') {
      for (let prop in tourDataRow) {
        formParams.append(prop, tourDataRow[prop]);
      }
    }
    console.log('!!!this.inputFileEl', this.inputFileEl.nativeElement.files[0])
    const file = this.inputFileEl.nativeElement.files[0];
    if (!file) {
      console.log('file is empty');
      return;
    }
    formParams.append('img', this.tourImg);
    //formParams.set('img',this.tourImg);
    // tourDataRow.img = this.tourImg;
    console.log('this.tourImg', this.tourImg)
    console.log('tourDataRow', formParams)
    this.ticketsService.createTour(formParams)
      .subscribe(
        (data) => {
          console.log(data)
        }
      )
  }

  createTour2(form: NgForm) {
    const file = this.inputFileEl.nativeElement.files[0];
    if (!file) {
      alert('file is empty');
      return;
    }
    const formObj = form.value;
    let formData = new FormData();
    if (typeof formObj === 'object') {
      for (let key in formObj) {
        formData.append(key, formObj[key]);
      }
    }
    formData.append('img', file);
    this.ticketsService.createTour(formData)
      .subscribe(
        (data) => {
          console.log(data)
          this.messageService.add({
            severity: 'success',
            summary: `Тур успешно загружен (${data.img})`,
          })
        }
      )

  }


  selectFile(ev: any) {
    if (!(ev.target.files.length > 0)) {
      alert('files is empty')
      return;
    }

    this.tourImg = ev.target.files[0];
    var fr = new FileReader();
    console.log(this.imgEl)
    fr.onload = () => {
      this.imgEl.nativeElement.src = fr.result as string;
    }
    fr.readAsDataURL(this.tourImg);
  }


}
