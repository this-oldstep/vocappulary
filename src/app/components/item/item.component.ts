import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'ns-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
  moduleId: module.id,
})
export class ItemComponent implements OnInit {

  public item: any;

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe( params => {
      this.item = params;
    })
   }

  ngOnInit() {

    console.log('info coming to item component', this.item)
  }

}
