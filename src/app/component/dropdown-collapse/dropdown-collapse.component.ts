import { Component } from '@angular/core';

@Component({
    selector: 'app-dropdown-basic',
    templateUrl: './dropdown-collapse.component.html',
    standalone: false
})
export class NgbdDropdownBasicComponent {
  // This is for the collapse example
  public isCollapsed = false;

  collapsed = true;
}
