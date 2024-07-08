import {Directive, Input, TemplateRef, ViewContainerRef, inject} from '@angular/core';

interface IfDirectiveContext<T> {
    $implicit: T;
    appIf: T;
}

@Directive({
    selector: '[appIf]',
})
export class IfDirective<T> {
    @Input() set appIf(value: T | null | undefined) {
        const isContainerHasView = this.viewContainerRef.length;

        if (value && !isContainerHasView) {
            this.viewContainerRef.createEmbeddedView(this.temlpateRef, {
                $implicit: value,
                appIf: value,
            });

            return;
        }

        if (!value && isContainerHasView) {
            this.viewContainerRef.clear();
        }
    }

    private readonly temlpateRef = inject<TemplateRef<IfDirectiveContext<T>>>(TemplateRef);
    private readonly viewContainerRef = inject(ViewContainerRef);

    static ngTemplateContextGuard<T>(
        _directive: IfDirective<T>,
        _context: unknown,
    ): _context is IfDirectiveContext<T> {
        return true;
    }

    // eslint-disable-next-line @typescript-eslint/naming-convention
    static ngTemplateGuard_appIf<T>(
        _directive: IfDirective<T>,
        _inputValue: unknown,
    ): _inputValue is T {
        return true;
    }

    // private test() {
    //     // const directive = new IfDirective<number>();
    //     // const context = {};

    //     // if (IfDirective.ngTemplateContextGuard(directive, context)) {
    //     //     console.log(context);

    //     //     return;
    //     // }

    //     // console.log(context);

    //     const value: number | string | object = 0;

    //     if (isNumber(value)) {
    //         console.log(value);

    //         return;
    //     }

    //     console.log(value);
    // }
}

// function isNumber(value: number | string | object): value is number {
//     return typeof value === 'number';
// }
