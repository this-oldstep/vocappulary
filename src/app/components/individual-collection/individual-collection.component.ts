import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { PageRoute } from 'nativescript-angular/router'

@Component({
  selector: 'ns-individual-collection',
  templateUrl: './individual-collection.component.html',
  styleUrls: ['./individual-collection.component.css'],
  moduleId: module.id,
})
export class IndividualCollectionComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private pageRoute: PageRoute) { }

  ngOnInit() {
    this.pageRoute.activatedRoute.subscribe(ActivatedRoute => {
      ActivatedRoute.paramMap.subscribe(paramMap => {
        console.log(paramMap.get('mode'))
      })
    });
  }

}
