import { AfterContentInit, Component, OnInit, ViewContainerRef, ChangeDetectorRef } from "@angular/core";
import { animate, style, transition, trigger } from "@angular/animations";
import { HttpClient } from "@angular/common/http";
import { NGROK } from '../../../config'
import { TNSPlayer, TNSRecorder } from 'nativescript-audio';
import { knownFolders, Folder, File } from "tns-core-modules/file-system";
import { hasPermission, requestPermission, requestPermissions} from 'nativescript-permissions';
import { ModalDialogService, ModalDialogParams } from 'nativescript-angular/modal-dialog'
import { UIService } from '~/app/shared/ui.serivce';
import { ResultsComponent } from '../results/results.component'
import { RouterExtensions } from 'nativescript-angular/router';
import { NgOnChangesFeature } from "@angular/core/src/render3";


const permissions = require('nativescript-permissions');
var bghttp = require("nativescript-background-http");


declare var android: any;


@Component({
  selector: "ns-practice",
  moduleId: module.id,
  templateUrl: "./practice.component.html",
  styleUrls: ['./practice.component.css'],
})
export class PracticeComponent implements OnInit {
  
  public cards: any;
  private _recorder: TNSRecorder;
  public index: number;
  private userId: number;
  public end: boolean;

  constructor(private http: HttpClient,
    private modalDialog: ModalDialogService,
    private vcRef: ViewContainerRef,
    private uiService: UIService,
    private router: RouterExtensions,
    ) {
  
    this._recorder = new TNSRecorder();
    this._recorder.debug = true;
    this.index = 0;
    this.userId = 21;
    this.end =false;

  }

 
  // ngOnChanges (){
  //   if (this.index === this.cards.length - 1){
  //     this.modalDialog.showModal(ResultsComponent, {
  //       viewContainerRef: this.vcRef,
  //     })
  //       .then(action => {
  //         this.router.navigate(['/landing']);
  //       })
  //   }

  // }


  ngOnInit(): void {
    
    this.index = 0;

    this.http.get(`${NGROK}/user/${this.userId}/items`)
    .subscribe( items => {
      this.cards = items;
      console.log('items coming into practice component', this.cards);
    })

    if (this.cards.length > 10){
      this.cards = this.cards.slice(5);
    }

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
              filename: audioFolder.path + '/muffin.aac',
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

    let self = this;
    if (this._recorder !== undefined){
      this._recorder.stop()
        .then((result) => {
          console.log('stopped recording!', result);

          try {
            let audioFolder = knownFolders.currentApp().getFolder("audio");
            var recordedFile = audioFolder.getFile('muffin.aac');

            

            const recording: File = File.fromPath(recordedFile.path);
            const binarySource = recording.readSync(err => {
              console.log('couldnt convert', err);
            })

            console.log('here is recorded file', recordedFile);
            console.log(JSON.stringify(recordedFile));

            //file upload
            var session = bghttp.session("recording-upload");

            ////////////////////////////////////////////
            //change /upload to actual server endpoint
            /////////////////////////////////////////

            var request = {
              url: `${NGROK}/upload`,
              method: "POST",
              headers: {
                "Content-Type": "multipart/form-data"
              },
            };

            //let task = session.uploadFile(recordedFile.path, request);

            let params = [
              {name: "word", value: this.cards[this.index].currentTranslation},
              {name: "userId", value: "21"},
              {name:"fileUploaded", filename: recordedFile.path, mimeType: "audio/mpeg"}
            ]

            var task = session.multipartUpload(params, request);

              this.index += 1;
        
           

            task.on("error", errorHandler);
            task.on("complete", completeHandler);
            task.on("cancelled", cancelledHandler);

          } catch (ex) {
            console.log(ex);
          }
        }).catch((err) => {
          console.log('oh no can\'t stop recording!');
        });
    }


  }




}

function errorHandler(e) {
  console.log("errored " + e.responseCode + " code.");
  var serverResponse = e.response;
}

function completeHandler(e) {
  console.log("received " + e.responseCode + " code");
  var serverResponse = e.response;
}

function cancelledHandler(e) {
  console.log("upload cancelled");
} 