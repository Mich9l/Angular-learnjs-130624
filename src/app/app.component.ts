import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject} from '@angular/core';
import {applicationConfigMock} from './shared/application-config/application-config.mock';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    private readonly changeDetectorRef = inject(ChangeDetectorRef);

    readonly applicationConfig = applicationConfigMock;

    switchTemplate = false;
    closeTemplate = true;

    constructor() {
        setTimeout(() => {
            this.switchTemplate = !this.switchTemplate;
            // or
            this.closeTemplate = !this.closeTemplate;

            this.changeDetectorRef.markForCheck();
        }, 3000);
        setTimeout(() => {
            this.switchTemplate = !this.switchTemplate;
            // or
            this.closeTemplate = !this.closeTemplate;

            this.changeDetectorRef.markForCheck();
        }, 6000);
        setTimeout(() => {
            this.switchTemplate = !this.switchTemplate;
            // or
            this.closeTemplate = !this.closeTemplate;

            this.changeDetectorRef.markForCheck();
        }, 9000);
    }
}
