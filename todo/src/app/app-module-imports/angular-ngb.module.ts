import { NgbRatingModule} from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';

const ngbModules = [
    NgbRatingModule 
];
@NgModule({
imports: [
    ngbModules
],
exports: [
    ngbModules
],
})
export class AngularNgbModule { }
