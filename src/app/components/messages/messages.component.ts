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
  public statusMessage: Array<any>;
  public token: any;
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
      this.token = user._token;
    })

    const optionsIO = {
      query: {
        token: this.token,
      },
      android: {
        // http://socketio.github.io/socket.io-client-java/apidocs/io/socket/client/IO.Options.html
      },
  ios: {
        // https://nuclearace.github.io/Socket.IO-Client-Swift/Enums/SocketIOClientOption.html
      }
    };


    this.socketio = await SocketIO.connect(NGROK, optionsIO);


    this.socketio.on('connect', function () {
      console.log('connect');
    });

    this.socketio.on('message', function (event) {
      console.log('messages recieved!!!', JSON.stringify(event));
    });

    this.socketio.on('request', function (info, ack) {
      console.log('request', info);
      if (info === 'datetime') {
        ack(new Date());
      } else if(info === 'random') {
        ack(Math.random());
      } else {
        ack(null);
      }
    });

    this.socketio.emit('hello', {
      username: 'someone',
    });

    this.socketio.emit('hello-ack', {
      username: 'someone',
    }, function ack() {
      console.log('hello-ack', arguments);
    })
    // console.log(this.user, this.buddy)
    // let options = {
    //   userId: this.user,
    //   buddyId: this.buddy,
    //   hello: 'hello steve'
    // }
    // this.http.get(`${NGROK}/newConnection/${this.user.id}/${this.buddy.id}`)
    // .subscribe((port)=>{
    //   console.log(port, 'inner')
    //   this.port = port;
    //   this.socket = new WebSocket(`${SOCKET}`, []);

    //   this.socket.addEventListener('open', event => {
    //     this.zone.run(() => {
    //       console.log('looks like you successfully connected')
    //       this.status = 'open'
    //       // this.messages.push({ content: "Welcome to the chat!" });
    //     });
    //   });
    //   this.socket.addEventListener('message', event => {
    //     this.zone.run(() => {
    //       console.log(event.data.message)
    //       let message = JSON.parse(event.data)
    //       console.log(message)
    //       this.messages.push(message.text);
    //     });
    //   });
    //   this.socket.addEventListener('close', event => {
    //     this.zone.run(() => {
    //       this.status = 'closed'
    //       this.messages.push({ content: "You have been disconnected" });
    //     });
    //   });
    //   this.socket.addEventListener('error', event => {
    //     console.log("The socket had an error", event.error);
    //   });

    // })
  }

  public ngOnDestroy() {
    this.socketio.close();
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
      // this.socketio.emit(JSON.stringify(options));
      this.chatBox = "";
    }
  }

}
