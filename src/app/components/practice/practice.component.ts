import { AfterContentInit, Component, OnInit, ViewContainerRef, ChangeDetectorRef } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { NGROK } from '../../../config'
import { TNSRecorder } from 'nativescript-audio';
import { knownFolders, Folder, File } from "tns-core-modules/file-system";
import { hasPermission, requestPermission, requestPermissions} from 'nativescript-permissions';
import { ModalDialogService, ModalDialogParams } from 'nativescript-angular/modal-dialog'
import { UIService } from '~/app/shared/ui.serivce';
import { RouterExtensions } from 'nativescript-angular/router';
import { AuthService } from "~/app/auth/auth.service";
import { switchMap, take } from "rxjs/operators";
import { User } from "~/app/auth/user.model"
import { TouchGestureEventData } from "tns-core-modules/ui/gestures/gestures";
const i18n = require("../../i18n/i18n.js")

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
  isRecording = false;
  user;
  private language: any = {
    youHave: 'You have',
    points: 'points'
  }
  public cards: any;
  private _recorder: TNSRecorder;
  public index: number;
  private userId: number;
  public end: boolean;
  public points: number;
  public message: string;
  public pointList: any;

  constructor(private http: HttpClient,
    private modalDialog: ModalDialogService,
    private vcRef: ViewContainerRef,
    private uiService: UIService,
    private router: RouterExtensions,
    private authService: AuthService,
    ) {
  
    this._recorder = new TNSRecorder();
    this._recorder.debug = true;
    this.index = 0;
    this.end = false;
    this.points = 0;
    this.message = `${this.language.youHave} ${this.points} ${this.language.points}!`
    this.pointList = [];
  }

 

  ngOnInit(): void {
    this.authService.user.subscribe(userData => {
      this.user = userData;
      let langCode = userData.nativeLanguageId.toString()
      if (!langCode) {
        langCode = '1'
      }
      this.language = i18n[langCode]
      this.message = `${this.language.youHave} ${this.points} ${this.language.points}!`
    })
    
    this.authService.user.pipe(take(1)).subscribe( currentUser => {
       this.user = currentUser;
    });

    console.log('user is here!!!', this.user);
    this.index = 0;
    this.end = false;
    this.pointList = [];

    this.http.get(`${NGROK}/user/${this.user.id}/items`)
    .subscribe( items => {
      this.cards = shuffleItems(items);
      console.log('items coming into practice component', this.cards);
    })

    if (this.cards.length > 10){
      this.cards = this.cards.slice(5);
    }

  }

  backToCollections(){
    this.router.navigate(['/landing'], { clearHistory: true });
    this.index = 0;
    this.end = false;
  }

  onRecord(args: TouchGestureEventData ){
    let self = this;
    /*
    add functionality for is recording.
    */
   if (args.action === "down") {
    permissions.requestPermission(android.Manifest.permission.RECORD_AUDIO, "Say the word!...")
      .then(function (){
        self.isRecording = true;
          if (TNSRecorder.CAN_RECORD()){
            console.log('I can record!');

            let audioFolder = knownFolders.currentApp().getFolder("audio");
            console.log(audioFolder);

            let recorderOptions = {
              filename: audioFolder.path + '/word.wb',
              format: 4,
              encoder: 2,
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
    } else 
    if (args.action === "up") {
      self.isRecording = false;

  if (this._recorder !== undefined){
    this._recorder.stop()
      .then((result) => {
          
          console.log('stopped recording!');

          try {
            let audioFolder = knownFolders.currentApp().getFolder("audio");
            var recordedFile = audioFolder.getFile('word.wb');

            

            //const recording: File = File.fromPath(recordedFile.path);
            // const binarySource = recording.readSync(err => {
            //   console.log('couldnt convert', err);
            // })
            // console.log('here is recorded file', recordedFile);
            // console.log(JSON.stringify(recordedFile));

            //file upload

            var session = bghttp.session("recording-upload");

            var request = {
              url: `${NGROK}/upload`,
              method: "POST",
              headers: {
                "Content-Type": "multipart/form-data"
              },
            };

            let params = [
              {name: "word", value: this.cards[this.index].currentTranslation},
              {name: "userId", value: this.user.id.toString()},
              {name: "currentLanguageId", value: this.user.currentLanguageId.toString()},
              {name:"fileUploaded", filename: recordedFile.path, mimeType: "audio/mpeg"}
            ]

            var task = session.multipartUpload(params, request);

          
            task.on("error", (err) => {
              console.log(err);
            });
           
            task.on("cancelled", (e) => {
              console.log(e);
            });

            
            task.on("responded", (response) => {
              console.log(response);
              
              if (response.data === 'true'){
                this.points += 1;
                this.pointList.push({value: 1});
              } else{
                this.pointList.push({value: 0});
              }
              
              this.index += 1;
              this.end = true;
            
            });


          } catch (ex) {
            console.log(ex);
          }
      }).catch((err) => {
          console.log('oh no can\'t stop recording!');
      });
    }
  }
  }
}

function shuffleItems(itemList) {
  // Your code here

  let randomIndex;
  let holder;

  for (let i = itemList.length - 1; i >= 0; i--) {
    randomIndex = Math.floor(Math.random() * (i + 1));

    holder = itemList[i];
    itemList[i] = itemList[randomIndex];
    itemList[randomIndex] = holder;

  }

  return itemList;


};