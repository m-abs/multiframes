import { Component, Input, ViewChild, ElementRef } from "@angular/core";
import { Router, RouterEvent, NavigationEnd } from "@angular/router";
import * as trace from "tns-core-modules/trace";
import { routerTraceCategory } from "nativescript-angular/trace";
import { Frame } from "tns-core-modules/ui/frame/frame";
import { NSLocationStrategy } from "nativescript-angular/router/ns-location-strategy";
import * as nsApp from 'tns-core-modules/application';
import { AndroidActivityBackPressedEventData } from "tns-core-modules/application";
import { exit } from 'nativescript-exit';

trace.addCategories(routerTraceCategory);
trace.enable();

@Component({
  selector: "ns-app",
  templateUrl: "app.component.html",
  styles: [
    `
      .offscreen {
        transform: translateX(-10000);
      }

      .active {
        background-color: blue;
      }
    `
  ]
})
export class AppComponent {
  private _selectedIndex = 0;
  @Input()
  public set selectedIndex(selectedIndex: number) {
    this._selectedIndex = selectedIndex;

    const currentFrame = this.currentFrame;
    if (!currentFrame) {
      return;
    }

    const [name, frame] = currentFrame;

    const entry = (frame as any)._currentEntry;
    if (!entry) {
      return;
    }

    (frame as any).setCurrent(entry, false);
    (this.locationStrategy as any).currentOutlet = name;
  }

  public get selectedIndex() {
    return this._selectedIndex;
  }

  @ViewChild("tab1")
  public tab1: ElementRef;

  @ViewChild("tab2")
  public tab2: ElementRef;

  @ViewChild("tab3")
  public tab3: ElementRef;

  private get currentFrame(): [string, Frame] {
    let name: string;
    let tab: ElementRef<Frame>;
    switch (this.selectedIndex) {
      case 0: {
        tab = this.tab1;
        name = "tab1";
        break;
      }
      case 1: {
        tab = this.tab2;
        name = "tab2";
        break;
      }
      case 2: {
        tab = this.tab3;
        name = "tab3";
        break;
      }
      default: {
        return;
      }
    }

    console.log(tab.nativeElement.page)
    return [name, tab.nativeElement];
  }

  constructor(
    private readonly router: Router,
    private readonly locationStrategy: NSLocationStrategy
  ) {
    this.router.events.subscribe((evt: RouterEvent) => {
      if (evt instanceof NavigationEnd) {
        console.log("======================================");
        console.log(`ROUTER PATH: ${evt.urlAfterRedirects}`);
      }
    });

    if (nsApp.android) {
      nsApp.android.on(nsApp.AndroidApplication.activityBackPressedEvent, (evt: AndroidActivityBackPressedEventData) => {
        if (!locationStrategy.canGoBack()) {
          evt.cancel = true;
          exit();
          return;
        }
      });
    }
  }
}
