import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { NGROK, SOCKET } from '../../../config.js';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from "~/app/auth/auth.service";
import { User } from '~/app/auth/user.model.js';


require("nativescript-websockets");
const SocketIO = require('nativescript-socket.io');


@Component({
  selector: 'ns-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
  moduleId: module.id,
})
export class MessagesComponent implements OnInit, OnDestroy {

  private socket: any;
        
  public messages: Array<any>;
  public chatBox: string;
  public user: any;
  public port: any;
  public buddy: any;
  public status: any;
  private socketio: any;

  public constructor(
    private authService: AuthService,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private zone: NgZone,

    
    ) {
    this.socket;
    this.messages = [];
    this.chatBox = "";
    this.activatedRoute.queryParams.subscribe( params => {
      this.buddy = params;
    })
  }

  public async ngOnInit() {
    await this.authService.user.subscribe(user=>{
      this.user = user;
    })

    this.socketio = await SocketIO.connect(NGROK);


    this.socketio.on('connect', ()=> {
      console.log('connect');
      this.socketio.emit('connectMessage', { userId: this.user.id, buddyId: this.buddy.id })
    });
    this.socketio.on('recieve', (event)=>{
      console.log('this is console loggin even', event.text, event.senderId, this.user.id)
      if (event.senderId === this.user.id){
        this.messages.push(JSON.stringify({user: event.text}))
        console.log(this.messages)
      }
      else{
        this.messages.push(JSON.stringify({buddy: event.text}))
      }
    })
  }

  public ngOnDestroy() {
      this.socketio.emit('discon', this.user.id)
      this.socketio.disconnect();
  }

  public send() {
    if (this.chatBox) {
      console.log('message sent maybe??')
      let options = {
        text: this.chatBox,
        userId: this.user.id,
        buddyId: this.buddy.id
      }
      this.socketio.emit('message', options)
      this.chatBox = "";
    }
  }

}
