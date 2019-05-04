import { Component, OnInit, ViewContainerRef } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { PageRoute } from 'nativescript-angular/router';
import { ModalDialogService } from 'nativescript-angular/modal-dialog'
import { SelectWordComponent } from '../select-word/select-word.component'
import { UIService } from '~/app/shared/ui.serivce';

@Component({
  selector: 'ns-individual-collection',
  templateUrl: './individual-collection.component.html',
  styleUrls: ['./individual-collection.component.css'],
  moduleId: module.id,
})
export class IndividualCollectionComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, 
              private modalDialog: ModalDialogService,
              private vcRef: ViewContainerRef,
              private uiService: UIService,
              private pageRoute: PageRoute) { }

  ngOnInit() {
    this.pageRoute.activatedRoute.subscribe(ActivatedRoute => {
      ActivatedRoute.paramMap.subscribe(paramMap => {
        console.log(paramMap.get('mode'))
      })
    });
  }

  onSelectObjectWord(){
    this.modalDialog.showModal(SelectWordComponent, 
      {fullscreen: true, 
       viewContainerRef: this.vcRef
       //this.uiService.getRootVCRef() ? this.uiService.getRootVCRef : this.vcRef;
      });
  }

}

//every image block we create can have a nsRouterLink=pathtoItem