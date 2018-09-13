import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { Item } from "./item";
import { ItemService } from "./item.service";

@Component({
  selector: "ns-items",
  moduleId: module.id,
  templateUrl: "./items.component.html"
})
export class ItemsComponent implements OnInit {
  items: Item[];

  // This pattern makes use of Angular’s dependency injection implementation to inject an instance of the ItemService service into this class.
  // Angular knows about this service because it is included in your app’s main NgModule, defined in app.module.ts.
  constructor(
    private itemService: ItemService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.items = this.itemService.getItems();
  }

  itemTapped(evt) {
    const index = evt.index as number;
    const item = this.items[index];

    this.router.navigate([{
        outlets: {
            [this.route.outlet]: ["item", item.id]
        }
    }]);
  }
}
