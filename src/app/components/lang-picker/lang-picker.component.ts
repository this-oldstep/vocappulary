import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ListPicker } from "tns-core-modules/ui/list-picker";

let languageList = [
  {"language": "English", "id": 1, "lang_code": "en"},
  {"language": "Spanish", "id": 2, "lang_code": "es"},
  {"language": "Portuguese", "id": 3, "lang_code": "pt"},
  {"language": "Italian", "id": 4, "lang_code": "it"},
  {"language": "French", "id": 5, "lang_code": "fr"},
  {"language": "German", "id": 6, "lang_code": "de"},
  {"language": "Danish", "id": 7, "lang_code": "da"},
  {"language": "Swahili", "id": 8, "lang_code": "sw"},
  {"language": "Tagalog", "id": 9, "lang_code": "tl"},
  {"language": "Vietnamese", "id": 10, "lang_code": "vi"},
  {"language": "Turkish", "id": 11, "lang_code": "tr"},
  {"language": "Basque", "id": 12, "lang_code": "eu"},
  {"language": "Zulu", "id": 13, "lang_code": "zu"},
];

@Component({
  selector: 'ns-lang-picker',
  templateUrl: './lang-picker.component.html',
  styleUrls: ['./lang-picker.component.css'],
  moduleId: module.id,
})
export class LangPickerComponent implements OnInit {
  @Output() onSelection = new EventEmitter<any>();
  public languages: Array<string> = [];
  public picked: string;
  public pickedId: number;

  constructor() { 
    for (let language of languageList) {
      this.languages.push(language.language);
  }
  
  }
  public selectedIndexChanged(args) {
    let picker = <ListPicker>args.object;
    this.picked = this.languages[picker.selectedIndex];
    this.pickedId = picker.selectedIndex + 1;
    this.onSelection.emit([this.picked, this.pickedId]);
}
  ngOnInit() {
  }

}
