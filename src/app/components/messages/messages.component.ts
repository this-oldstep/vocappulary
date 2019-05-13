import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { NGROK, SOCKET } from '../../../config.js';
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

  public constructor(private zone: NgZone) {
    this.socket = new WebSocket(SOCKET, []);
    this.messages = [];
    this.chatBox = "";
  }

  public ngOnInit() {
    console.log('messaging component initialized')
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
        this.messages.push(message.message);
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
  }

  public ngOnDestroy() {
    this.socket.close();
  }

  public send() {
    if (this.chatBox) {
      console.log('message sent maybe??')
      this.socket.send(this.chatBox);
      this.chatBox = "";
    }
  }

}
