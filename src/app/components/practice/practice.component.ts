import { AfterContentInit, Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { animate, style, transition, trigger } from "@angular/animations";
import { HttpClient } from "@angular/common/http";
import { NGROK } from '../../../config'
import { TNSPlayer, TNSRecorder } from 'nativescript-audio';
import { knownFolders, Folder, File } from "tns-core-modules/file-system";
import { hasPermission, requestPermission, requestPermissions} from 'nativescript-permissions';
const permissions = require('nativescript-permissions');


declare var android: any;


@Component({
  selector: "ns-practice",
  moduleId: module.id,
  templateUrl: "./practice.component.html",
})
export class PracticeComponent implements OnInit {
  
  public cards: any;
  private _recorder: TNSRecorder;


  constructor(private http: HttpClient) {
  
    this._recorder = new TNSRecorder();
    this._recorder.debug = true;

  }


  ngOnInit(): void {
    
    this.http.get(`${NGROK}/collectionItems/8`)
    .subscribe( items => {
      console.log(items, 'http getting practice collection')
      this.cards = items;
      console.log('items coming into practice component', this.cards);
    })

  }


  onRecord(){
    let self = this;
    /*
    add functionality for is recording.
    */
    permissions.requestPermission(android.Manifest.permission.RECORD_AUDIO, "Say the word!...")
      .then(function (){
          if (TNSRecorder.CAN_RECORD()){
            console.log('I can record!');

            let audioFolder = knownFolders.currentApp().getFolder("audio");
            console.log(audioFolder);

            let recorderOptions = {
              filename: audioFolder.path + '/ragga.mp4',
              format: 2,
              encoder: 3,
              metering: true,
              infoCallback: infoObject => {
                console.log(JSON.stringify(infoObject));
              },
              errorCallback: errorObject => {
                console.log(JSON.stringify(errorObject));
                alert('Error recording.');
              }
            };

            console.log(recorderOptions);

            self._recorder.start(recorderOptions)
              .then((result) => {
                console.log('recording!!!!')
              }).catch((err) => {
                console.log('not recording :(')
              });


          }  else{
            alert('device cannot recourd audio');
          }
      })
      .catch(err => {
        console.log(err, 'no permissions can\'t record');
      })

  }

  stopRecording(){


    if (this._recorder !== undefined){
      this._recorder.stop()
        .then((result) => {
          console.log('stopped recording!', result);

          try {
            let audioFolder = knownFolders.currentApp().getFolder("audio");
            var recordedFile = audioFolder.getFile('ragga.mp4');

            

            const recording: File = File.fromPath(recordedFile.path);
            const binarySource = recording.readSync(err => {
              console.log('couldnt convert', err);
            })

            console.log('binary file', binarySource);

            console.log('here is recorded file', recordedFile);
            console.log(JSON.stringify(recordedFile));
          } catch (ex) {
            console.log(ex);
          }


        }).catch((err) => {
          console.log('oh no can\'t stop recording!');
        });
    }


  }




}
