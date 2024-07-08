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
}
