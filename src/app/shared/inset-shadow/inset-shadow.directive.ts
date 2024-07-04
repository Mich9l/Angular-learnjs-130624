import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
    selector: '[appInsetShadow]',
})
export class InsetShadowDirective {
    // private readonly elementRef = inject(ElementRef);

    // constructor(private readonly elementRef: ElementRef) {}

    // @HostListener('touch', ['$event.touches[0].clientX', '$event.touches[0].clientY'])
    // @HostListener('click', ['$event.clientX', '$event.clientY'])
    // onClick(clientX: number, clientY: number) {
    //     console.log('InsetShadowDirective - clicked', clientX, clientY);
    // }

    // [style.boxShadow]="boxShadow"
    @HostBinding('style.boxShadow')
    private boxShadow = '';

    // (click)="toggleShadow()"
    @HostListener('click')
    toggleShadow() {
        this.boxShadow = !this.boxShadow ? 'inset 0 0 10px #000' : '';
    }
}
