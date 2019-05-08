import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TNSPlayer, TNSRecorder } from 'nativescript-audio';
import { knownFolders, Folder, File } from "tns-core-modules/file-system";


@Component({
  selector: 'ns-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
  moduleId: module.id,
})
export class ItemComponent implements OnInit {

  public item: any;
  private _player: TNSPlayer;
  private _recorder: TNSRecorder;

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe( params => {
      this.item = params;
    })
    this._player = new TNSPlayer;
    this._player.debug = true;
    this._recorder = new TNSRecorder;

   }

  ngOnInit() {

    console.log('info coming to item component', this.item)
  }

  playWord(){

    console.log('playing audio file');
    const playerOptions = {
      audioFile: this.item.audio_url,
      loop: false,
      completeCallback: function () {
        console.log('finished playing');
      },
      errorCallback: function (errorObject) {
        console.log(JSON.stringify(errorObject));
      },
      infoCallback: function (args) {
        console.log(JSON.stringify(args));
      }
    };

    this._player.playFromUrl(playerOptions);

  }

  // recordWord(){

  //   this._recorder.

  // }



}
