import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AppComponentStore } from './app-component.store';
import { AsyncPipe, NgIf } from '@angular/common';

interface AppFormGroup {
  name: string;
  sureName: string;
  birthDate: string;
  address: string;
  age: number | null;
  carData: {
    mark: string;
    yearOfProduction: string | null;
    isElectric: boolean;
  };
}

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: 'app.component.html',
  styleUrl: 'app.component.scss',
  providers: [AppComponentStore],
  imports: [ReactiveFormsModule, AsyncPipe, NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  readonly name$ = this.appComponentStore.name$;
  readonly sureName$ = this.appComponentStore.sureName$;
  readonly birthDate$ = this.appComponentStore.birthDate$;
  readonly address$ = this.appComponentStore.address$;
  readonly carData$ = this.appComponentStore.carData$;
  readonly age$ = this.appComponentStore.age$;

  readonly formGroup = this.formBuilder.nonNullable.group({
    name: [''],
    sureName: [''],
    birthDate: [''],
    address: [''],
    age: [null],
    carData: this.formBuilder.nonNullable.group({
      mark: [''],
      yearOfProduction: [null],
      isElectric: [false],
    }),
  });

  constructor(
    private readonly appComponentStore: AppComponentStore,
    private readonly formBuilder: FormBuilder,
  ) {}

  get formState(): AppFormGroup {
    return this.formGroup.getRawValue();
  }

  setName(): void {
    this.appComponentStore.setName(this.formState.name);
  }

  setSureName(): void {
    this.appComponentStore.setSureName(this.formState.sureName);
  }

  setBirthDate(): void {
    this.appComponentStore.setBirthDate(this.formState.birthDate);
  }

  setAddress(): void {
    this.appComponentStore.setAddress(this.formState.address);
  }

  setCarMark(): void {
    this.appComponentStore.setCarMark(this.formState.carData.mark);
  }

  setCarsYearOfProduction(): void {
    this.appComponentStore.setCarsYearOfProduction(
      this.formState.carData.yearOfProduction,
    );
  }

  setIsElectric(): void {
    this.appComponentStore.setIsElectric(this.formState.carData.isElectric);
  }

  setAge(): void {
    this.appComponentStore.setAge(this.formState.age);
  }
}
