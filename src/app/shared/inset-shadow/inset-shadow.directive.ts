import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
    selector: '[appInsetShadow]',
})
export class InsetShadowDirective {
    @HostBinding('style.boxShadow')
    private boxShadow = '';

    @HostListener('click')
    toggleShadow() {
        this.boxShadow = !this.boxShadow ? 'inset 0 0 10px #000' : '';
    }
}
