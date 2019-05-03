import { Component } from "@angular/core"

@Component({
    selector: 'ns-practica',
    templateUrl: './practica.component.html',
    styleUrls: ['./practica.component.css'],
    moduleId: module.id
})

export class PracticaComponent {
    challengeDescription= "";
    currentChallenge = '';
    onSetChallenge(){
        this.currentChallenge = this.challengeDescription;
    }

}