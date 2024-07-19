import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TypeComponent} from './type.component';

@NgModule({
    declarations: [TypeComponent],
    exports: [TypeComponent],
    imports: [RouterModule],
})
export class TypeModule {}
