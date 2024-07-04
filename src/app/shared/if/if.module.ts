import {NgModule} from '@angular/core';
import {IfDirective} from './if.directive';

@NgModule({
    declarations: [IfDirective],
    exports: [IfDirective],
})
export class IfModule {}
