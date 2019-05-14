import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { NGROK, SOCKET } from '../../../config.js';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from "~/app/auth/auth.service";
import { User } from '~/app/auth/user.model.js';
const SocketIO = require('nativescript-socket.io');


@Component({
  selector: 'ns-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
  moduleId: module.id,
})
export class MessagesComponent implements OnInit, OnDestroy {
  
  public messages: any;
  public chatBox: string;
  public user: any;
  public port: any;
  public buddy: any;
  public status: any;
  private socket: any;

  public constructor(
    private authService: AuthService,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private zone: NgZone,

    
    ) {
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

    await this.http.get(`${NGROK}/messages/all/${this.user.id}/${this.buddy.id}`)
    .subscribe((allMessages)=>{
      this.messages = allMessages
      // if (this.messages.length > 0){
      //   this.messages.map((message)=>{
      //     if (message.senderId === this.user.id){
      //       return {
      //         user: message.text
      //       }
      //     }
      //     else{
      //       return {
      //         buddy: message.text
      //       }
      //     }
      //   })
      // }
      });

      console.log(this.messages)




    this.socket = await SocketIO.connect(NGROK);


    this.socket.on('connect', ()=> {
      console.log('connect');
      this.socket.emit('connectMessage', { userId: this.user.id, buddyId: parseInt(this.buddy.id )})
    });
    this.socket.on('recieve', (event)=>{
      if (event.senderId === this.user.id){
        this.messages.push({user: event.text})
        console.log(this.messages)
      }
      else {
        this.messages.push(JSON.stringify({buddy: event.text}))
      }
    })
  }

  public ngOnDestroy() {
      this.socket.emit('discon', this.user.id)
      this.socket.disconnect();
  }

  public send() {
    if (this.chatBox) {
      console.log('message sent maybe??')
      let options = {
        text: this.chatBox,
        userId: this.user.id,
        buddyId: this.buddy.id
      }
      this.socket.emit('message', options)
      this.chatBox = "";
    }
  }

}
