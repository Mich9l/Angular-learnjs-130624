import {ChangeDetectionStrategy, Component} from '@angular/core';
// import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-type',
    templateUrl: './type.component.html',
    styleUrls: ['./type.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypeComponent {
    // constructor() {
    //     console.log(inject(ActivatedRoute).pathFromRoot);
    // }
}
