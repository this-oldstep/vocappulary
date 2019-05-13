import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { NGROK, SOCKET } from '../../../config.js';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from "~/app/auth/auth.service";
import { User } from '~/app/auth/user.model.js';


require("nativescript-websockets");


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
    console.log(this.user, this.buddy)
    let options = {
      userId: this.user,
      buddyId: this.buddy,
      hello: 'hello steve'
    }
    this.http.get(`${NGROK}/newConnection/${this.user.id}/${this.buddy.id}`)
    .subscribe((port)=>{
      console.log(port, 'inner')
      this.port = port;
      this.socket = new WebSocket(`${SOCKET}`, []);

      this.socket.addEventListener('open', event => {
        this.zone.run(() => {
          console.log('looks like you successfully connected')
          this.messages.push({ content: "Welcome to the chat!" });
        });
      });
      this.socket.addEventListener('message', event => {
        this.zone.run(() => {
          console.log(event.data.message)
          let message = JSON.parse(event.data)
          console.log(message)
          this.messages.push(message.text);
        });
      });
      this.socket.addEventListener('close', event => {
        this.zone.run(() => {
          this.messages.push({ content: "You have been disconnected" });
        });
      });
      this.socket.addEventListener('error', event => {
        console.log("The socket had an error", event.error);
      });

    })
    // this.socket.addEventListener('open', event => {
    //   this.zone.run(() => {
    //     console.log('looks like you successfully connected')
    //     this.messages.push({ content: "Welcome to the chat!" });
    //   });
    // });
    // this.socket.addEventListener('message', event => {
    //   this.zone.run(() => {
    //     console.log(event.data.message)
    //     let message = JSON.parse(event.data)
    //     console.log(message)
    //     this.messages.push(message.message);
    //   });
    // });
    // this.socket.addEventListener('close', event => {
    //   this.zone.run(() => {
    //     this.messages.push({ content: "You have been disconnected" });
    //   });
    // });
    // this.socket.addEventListener('error', event => {
    //   console.log("The socket had an error", event.error);
    // });
  }

  public ngOnDestroy() {
    this.socket.close();
  }

  public send() {
    if (this.chatBox) {
      console.log('message sent maybe??')
      let options = {
        text: this.chatBox,
        userId: this.user.id,
        buddyId: this.buddy.id
      }
      this.socket.send(JSON.stringify(options));
      this.chatBox = "";
    }
  }

}
