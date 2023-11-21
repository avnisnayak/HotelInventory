import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  Optional,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { LoggerService } from './logger.service';
import { LocalStorageToken } from './localstorage.token';
import { InitService } from './init.service';
import { ConfigService } from './services/config.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'hinv-root',
  templateUrl: './app.component.html',
  // template: `<h2>Hello world - inline template</h2>
  // <p>Angular</p>
  // `,
  styleUrls: ['./app.component.scss'],
  // styles: [`h1 {color:red}`]
})
export class AppComponent implements OnInit {
  title = 'hotelinventoryapp';
  // role = 'Admin';

  @ViewChild('name', { static: true }) name!: ElementRef;
  // @ViewChild('user', { read: ViewContainerRef }) vcr!: ViewContainerRef;

  constructor(
    @Optional() private loggerService: LoggerService,
    @Inject(LocalStorageToken) private localStorage: Storage,
    private initService: InitService,
    private configService: ConfigService,
    private router: Router
  ) {
    console.log(initService.config);
  }

  ngOnInit(): void {
    this.loggerService?.Log('AppComponent.ngOnInit()');
    // this.name.nativeElement.innerText = 'Hilton Hotels';
    this.localStorage.setItem('name', 'Hilton Hotel');
    // this.router.events.subscribe((event) => {
    //   console.log(event);
    // });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe(() => {
        console.log('Navigation started');
      });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        console.log('Navigation completed');
      });
  }

  // ngAfterViewInit(): void {
  //   const componentRef = this.vcr.createComponent(RoomsComponent);
  //   componentRef.instance.numberOfRooms = 50;
  // }
}
