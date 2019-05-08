import { Component, OnInit } from '@angular/core';
import { ListPicker } from "tns-core-modules/ui/list-picker";

let pokemonList = ["Bulbasaur", "Parasect", "Venonat", "Venomoth", "Diglett",
    "Dugtrio", "Meowth", "Persian", "Psyduck", "Arcanine", "Poliwrath", "Machoke"];

@Component({
  selector: 'ns-lang-picker',
  templateUrl: './lang-picker.component.html',
  styleUrls: ['./lang-picker.component.css'],
  moduleId: module.id,
})
export class LangPickerComponent implements OnInit {

  public pokemons: Array<string> = [];
  public picked: string;


  constructor() { 
    for (let pokemon of pokemonList) {
      this.pokemons.push(pokemon);
  }
  
  }
  public selectedIndexChanged(args) {
    let picker = <ListPicker>args.object;
    this.picked = this.pokemons[picker.selectedIndex];
}
  ngOnInit() {
  }

}
