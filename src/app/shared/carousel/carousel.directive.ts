import {
    Directive,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChanges,
    TemplateRef,
    ViewContainerRef,
    inject,
} from '@angular/core';
import {BehaviorSubject, Subject, filter, map, takeUntil} from 'rxjs';
import {CarouselContext} from './carousel-context.interface';

@Directive({
    selector: '[appCarousel]',
})
export class CarouselDirective<T> implements OnChanges, OnInit, OnDestroy {
    private readonly templateRef = inject<TemplateRef<CarouselContext<T>>>(TemplateRef);
    private readonly viewContainerRef = inject(ViewContainerRef);

    private readonly currentIndex$ = new BehaviorSubject<number>(0);
    private readonly destroy$ = new Subject<void>();

    @Input() appCarouselOf: T[] | null | undefined;

    static ngTemplateContextGuard<T>(
        _directive: CarouselDirective<T>,
        _context: unknown,
    ): _context is CarouselContext<T> {
        return true;
    }

    // eslint-disable-next-line @typescript-eslint/naming-convention
    static ngTemplateGuard_appCarouselOf<T>(
        _directive: CarouselDirective<T>,
        _inputValue: unknown,
    ): _inputValue is [T, ...T[]] {
        return true;
    }

    ngOnChanges({appCarouselOf}: SimpleChanges): void {
        if (appCarouselOf) {
            this.updateView();
        }
    }

    ngOnInit(): void {
        this.listenCurrentIndex();
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private updateView() {
        if (this.shouldShowView()) {
            this.currentIndex$.next(0);

            return;
        }

        this.viewContainerRef.clear();
    }

    private listenCurrentIndex() {
        this.currentIndex$
            .pipe(
                map(currentIndex => this.shouldShowView() && this.getCurrentContext(currentIndex)),
                filter(Boolean),
                takeUntil(this.destroy$),
            )
            .subscribe(context => {
                this.viewContainerRef.clear();
                this.viewContainerRef.createEmbeddedView(this.templateRef, context);
            });
    }

    private shouldShowView(
        this: CarouselDirective<T>,
    ): this is CarouselDirective<T> & {appCarouselOf: T[]} {
        return !!this.appCarouselOf?.length;
    }

    private getCurrentContext(
        this: CarouselDirective<T> & {appCarouselOf: T[]},
        currentIndex: number,
    ): CarouselContext<T> {
        return {
            $implicit: this.appCarouselOf[currentIndex],
            appCarouselOf: this.appCarouselOf,
            index: currentIndex,
            next: () => {
                this.next();
            },
            back: () => {
                this.back();
            },
        };
    }

    private next(this: CarouselDirective<T> & {appCarouselOf: T[]}) {
        const nextIndex = this.currentIndex$.value + 1;
        const newIndex = nextIndex < this.appCarouselOf.length ? nextIndex : 0;

        this.currentIndex$.next(newIndex);
    }

    private back(this: CarouselDirective<T> & {appCarouselOf: T[]}) {
        const previousIndex = this.currentIndex$.value - 1;
        const lastIndex = this.appCarouselOf.length - 1;
        const newIndex = previousIndex < 0 ? lastIndex : previousIndex;

        this.currentIndex$.next(newIndex);
    }
}
