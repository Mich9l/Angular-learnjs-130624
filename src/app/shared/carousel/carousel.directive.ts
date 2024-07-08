import {
    Directive,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
    TemplateRef,
    ViewContainerRef,
    inject,
} from '@angular/core';
import {BehaviorSubject, filter, map} from 'rxjs';
import {CarouselContext} from './carousel-context.interface';

@Directive({
    selector: '[appCarousel]',
})
export class CarouselDirective<T> implements OnChanges, OnInit {
    private readonly temlpateRef = inject<TemplateRef<CarouselContext<T>>>(TemplateRef);
    private readonly viewContainerRef = inject(ViewContainerRef);

    private readonly currentIndex$ = new BehaviorSubject<number>(0);

    @Input() appCarouselOf: T[] | null | undefined;

    static ngTemplateContextGuard<T>(
        _directive: CarouselDirective<T>,
        _context: unknown,
    ): _context is CarouselContext<T> {
        return true;
    }

    private get shoulShowView(): boolean {
        return !!this.appCarouselOf?.length;
    }

    ngOnChanges({appCarouselOf}: SimpleChanges): void {
        if (appCarouselOf) {
            this.updateView();
        }
    }

    ngOnInit(): void {
        this.listenCurrentIndex();
    }

    private updateView() {
        if (this.shoulShowView) {
            this.currentIndex$.next(0);

            return;
        }

        this.viewContainerRef.clear();
    }

    private listenCurrentIndex() {
        this.currentIndex$
            .pipe(
                filter(() => this.shoulShowView),
                map(currentIndex => this.getCurrentContext(currentIndex)),
            )
            .subscribe(context => {
                this.viewContainerRef.clear();
                this.viewContainerRef.createEmbeddedView(this.temlpateRef, context);
            });
    }

    private getCurrentContext(currentIndex: number): CarouselContext<T> {
        const appCarouselOf = this.appCarouselOf as T[];

        return {
            $implicit: appCarouselOf[currentIndex],
            appCarouselOf,
            index: currentIndex,
            // next: this.next.bind(this),
            // back: this.back.bind(this),
            next: () => {
                this.next();
            },
            back: () => {
                this.back();
            },
        };
    }

    private next() {
        const nextIndex = this.currentIndex$.value + 1;
        const newIndex = nextIndex < this.appCarouselOf!.length ? nextIndex : 0;

        this.currentIndex$.next(newIndex);
    }

    private back() {
        const previousIndex = this.currentIndex$.value - 1;
        const lastIndex = this.appCarouselOf!.length - 1;
        const newIndex = previousIndex < 0 ? lastIndex : previousIndex;

        this.currentIndex$.next(newIndex);
    }
}
