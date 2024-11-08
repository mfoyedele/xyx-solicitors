import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BreakpointObserver } from '@angular/cdk/layout';
import {
  Component,
  ViewChild,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';


import { AccountService } from './_services';
import { User } from './_models';
import { AlertComponent } from './_components/alert.component';

@Component({
    selector: 'app-root', templateUrl: 'app.component.html', styleUrls: ['app.component.scss'],
    standalone: true,
    imports: [NgIf, CommonModule, RouterOutlet, RouterLink, RouterLinkActive, AlertComponent, MatButtonModule, MatIconModule, MatListModule, MatSidenavModule, MatToolbarModule]
})
export class AppComponent {
    title = 'material-responsive-sidenav';
    @ViewChild(MatSidenav)
    sidenav!: MatSidenav;
    isMobile= true;
    isCollapsed = true;

    user?: User | null;

    constructor(private observer: BreakpointObserver, private accountService: AccountService) {
        this.accountService.user.subscribe(x => this.user = x);
    }

    ngOnInit() {
        this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
          if(screenSize.matches){
            this.isMobile = true;
          } else {
            this.isMobile = false;
          }
        });
      }
    
      toggleMenu() {
        if(this.isMobile){
          this.sidenav.toggle();
          this.isCollapsed = false;
        } else {
          this.sidenav.open();
          this.isCollapsed = !this.isCollapsed;
        }
      }

    logout() {
        this.accountService.logout();
    }
}