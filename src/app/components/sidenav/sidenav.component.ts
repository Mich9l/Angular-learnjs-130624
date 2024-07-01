import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    OnInit,
    TemplateRef,
    // EventEmitter,
    // Input,
    // Output,
    ViewChild,
    ViewContainerRef,
    inject,
} from '@angular/core';
import {MatDrawer} from '@angular/material/sidenav';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent implements OnInit {
    // @ViewChild('drawer')
    // private readonly drawer: MatDrawer | undefined;
    @ViewChild(MatDrawer, {static: true})
    private readonly drawer: MatDrawer | undefined;

    // @ViewChild(MatDrawer, {read: ElementRef, static: false})
    // private readonly drawerElement: ElementRef | undefined;

    @ViewChild('viewport', {read: ViewContainerRef, static: true})
    private readonly viewport: ViewContainerRef | undefined;

    @ContentChild('navigationTemplate', {static: true})
    private readonly navigationTemplate:
        | TemplateRef<{name: string; test: string; $implicit: number}>
        | undefined;

    private readonly changeDetectorRef = inject(ChangeDetectorRef);

    ngOnInit(): void {
        if (this.navigationTemplate) {
            this.viewport?.createEmbeddedView(this.navigationTemplate, {
                name: 'Egor',
                test: '123',
                $implicit: 123,
            });
        }
    }

    // @Input() set navigationTemplate(
    //     template: TemplateRef<{name: string; test: string; $implicit: number}>,
    // ) {
    //     this.viewport?.clear();
    //     this.viewport?.createEmbeddedView(template, {name: 'Egor', test: '123', $implicit: 123});
    // }

    // @ViewChild('div')
    // private readonly divElement: ElementRef | undefined;

    // @Input() isSidenavOpened = false;

    // @Output() readonly isSidenavOpenedChange = new EventEmitter<boolean>();

    toggleSidenavOpened() {
        // console.log(this.divElement);
        // console.log(this.drawerElement);
        // this.isSidenavOpenedChange.emit(!this.isSidenavOpened);
        this.drawer?.toggle();
        this.changeDetectorRef.markForCheck();
    }
}
