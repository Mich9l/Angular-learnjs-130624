import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent {
    @Input() isSidenavOpened = false;

    @Output() readonly isSidenavOpenedChange = new EventEmitter<boolean>();

    toggleSidenavOpened() {
        this.isSidenavOpenedChange.emit(!this.isSidenavOpened);
    }
}
