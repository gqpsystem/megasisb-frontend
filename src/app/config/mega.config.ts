import { HOST, MICRO } from './var.constant';
import { Injectable } from '@angular/core';
@Injectable()
export class Configuration {
  
  public api = `${HOST}${MICRO}`;
}