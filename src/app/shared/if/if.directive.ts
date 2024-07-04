import {Directive, Input, TemplateRef, ViewContainerRef, inject} from '@angular/core';

interface IfDirectiveContext<T> {
    $implicit: T;
    appIf: T;
}

@Directive({
    selector: '[appIf]',
})
export class IfDirective<T> {
    @Input() set appIf(value: T) {
        const isContainerHasView = this.viewContainerRef.length;

        if (value && !isContainerHasView) {
            // Create view
            this.viewContainerRef.createEmbeddedView(this.temlpateRef, {
                $implicit: value,
                appIf: value,
            });

            return;
        }

        if (!value && isContainerHasView) {
            // Clear view
            this.viewContainerRef.clear();
        }

        // ngFor
        // ['data1', 'data2'].forEach(item => {
        //     this.viewContainerRef.createEmbeddedView(this.temlpateRef, {$implicit: item})
        // })
    }

    private readonly temlpateRef = inject<TemplateRef<IfDirectiveContext<T>>>(TemplateRef);
    private readonly viewContainerRef = inject(ViewContainerRef);
}
