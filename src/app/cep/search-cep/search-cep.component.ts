import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-search-cep',
  templateUrl: './search-cep.component.html',
  styleUrls: ['./search-cep.component.scss']
})
export class SearchCepComponent implements OnInit, OnDestroy {
  @Output() search = new EventEmitter<string>();
  @Input() 
  set hasError(value: boolean) {
    this._hasError = value;
    if (value) {
      const control = this.form.get('cep');
      if (control) {
        control.setErrors({ invalid: true });
        control.markAsTouched();
        this.attempted = true;
      }
    }
  }
  get hasError(): boolean {
    return this._hasError;
  }
  private _hasError = false;
  
  form: FormGroup;
  attempted = false;
  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      cep: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]{8}$/)
      ]]
    });

    const control = this.form.get('cep');
    if (control) {
      control.valueChanges
        .pipe(
          takeUntil(this.destroy$),
          debounceTime(300),
          distinctUntilChanged()
        )
        .subscribe(() => {
          if (this.hasError) {
            this._hasError = false;
            control.setErrors(null);
            this.attempted = false;
          }
        });
    }
  }

  ngOnInit() {
    
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get hasValue(): boolean {
    const control = this.form.get('cep');
    if (!control) return false;
    
    const value = control.value;
    if (!value) return false;

    const numericValue = value.replace(/\D/g, '');
    return numericValue.length > 0;
  }

  get isInvalid(): boolean {
    return this.hasError && this.attempted;
  }

  onSearch(): void {
    const control = this.form.get('cep');
    if (!control) return;

    this.attempted = true;
    
    if (this.form.valid && this.hasValue) {
      const cep = control.value.replace(/\D/g, '');
      this.search.emit(cep);
    } else {
      control.setErrors({ invalid: true });
      control.markAsTouched();
    }
  }

  clearInput(): void {
    const control = this.form.get('cep');
    if (control) {
      control.reset();
      this.attempted = false;
      this._hasError = false;
    }
  }
}
