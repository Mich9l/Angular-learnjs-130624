import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ViewChild,
    inject,
} from '@angular/core';
import {MatDrawer} from '@angular/material/sidenav';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent {
    @ViewChild(MatDrawer, {static: true})
    private readonly drawer: MatDrawer | undefined;

    private readonly changeDetectorRef = inject(ChangeDetectorRef);

    contentSelect = 'sidenav-content';

    // @ViewChild('viewport', {read: ViewContainerRef, static: true})
    // private readonly viewport: ViewContainerRef | undefined;

    // @ContentChild('navigationTemplate', {static: true})
    // private readonly navigationTemplate:
    //     | TemplateRef<{name: string; test: string; $implicit: number}>
    //     | undefined;

    // ngOnInit(): void {
    //     if (this.navigationTemplate) {
    //         this.viewport?.createEmbeddedView(this.navigationTemplate, {
    //             name: 'Egor',
    //             test: '123',
    //             $implicit: 123,
    //         });
    //     }
    // }

    toggleSidenavOpened() {
        this.drawer?.toggle();
        this.changeDetectorRef.markForCheck();
    }
}
