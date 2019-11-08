import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from 'src/app/data/data.service';

@Component({
  selector: 'app-proforma-edit',
  templateUrl: './proforma-edit.component.html',
  styleUrls: ['./proforma-edit.component.scss']
})
export class ProformaEditComponent implements OnInit {
  form: FormGroup;

  constructor(
    formbuilder: FormBuilder,
    dataService: DataService
  ) {
  }

  ngOnInit() {
    this.dataActualize();
  }

  dataActualize() {

  }
}
