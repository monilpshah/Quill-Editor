import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { EditorChangeContent, EditorChangeSelection, QuillEditorBase, QuillModule } from 'ngx-quill'
import 'quill-emoji/dist/quill-emoji.js'
import "quill-mention";


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent {
  modules = {};
  content: string = '';
  Optionflag: boolean = false;
  matches = [];
  searchTerm: string = '';
  bold: boolean = false;
  italic: boolean = false;
  blured = false;
  focused = false;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();

    // TO ADD FUNCTIONALITY OF EMOJI UNCOMMENT BELOW CODE AND COMMENT / FUNCTIONALITY CODE



    // this.modules = {
    //   'emoji-shortname': true,
    //   'emoji-textarea': true,
    //   'emoji-toolbar': true,
    //   'toolbar': [
    //     ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    //     ['blockquote', 'code-block'],

    //     [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    //     [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    //     [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
    //     [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
    //     [{ 'direction': 'rtl' }],                         // text direction

    //     [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    //     [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    //     [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    //     [{ 'font': [] }],
    //     [{ 'align': [] }],

    //     ['clean'],                                         // remove formatting button

    //     ['link', 'image', 'video'],                         // link and image, video
    //     ['emoji']

    //   ]
    // }


    this.modules = {
      // UNCOMMENT BELOW CODE TO ENABLE AUTO COMPLETE FEATURE

      mention: {
        allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
        mentionDenotationChars: ["@", "#", "/"],
        source: async function (searchTerm, renderList) {
          const matchedPeople = await suggestPeople(searchTerm);
          renderList(matchedPeople);
        }
      }
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  created(event) {
    // tslint:disable-next-line:no-console
    // console.log('editor-created', event)
  }
  changedEditor(event: EditorChangeContent | EditorChangeSelection) {
    // tslint:disable-next-line:no-console
    // console.log('editor-change', event)
  }
  focus($event) {
    // tslint:disable-next-line:no-console
    // console.log('focus', $event)
    this.focused = true
    this.blured = false
  }
  blur($event) {
    // tslint:disable-next-line:no-console
    // console.log('blur', $event)
    this.focused = false
    this.blured = true
  }
  addBindingCreated(quill) {
    quill.keyboard.addBinding({
      key: 192,
    }, (range, context) => {
      // tslint:disable-next-line:no-console
      console.log('KEYBINDING /', range, context)
      this.Optionflag = true;
    })

    quill.keyboard.addBinding({
      key: 192,
      shiftKey: true
    }, (range, context) => {
      // tslint:disable-next-line:no-console
      console.log('KEYBINDING SHIFT + /', range, context)
      this.Optionflag = true;
      console.log(this.Optionflag);
    })
  }

  checkPin($event: KeyboardEvent) {
    // console.log($event);
    // console.log(this.searchTerm);
    if ((this.bold)==false) {
      if (this.searchTerm.includes('<span class="ql-mention-denotation-char">/</span>BOLD')){
        // if(!document.getElementsByClassName('ql-bold ql-active')[0]){
          if (this.searchTerm.includes('<span class="ql-mention-denotation-char">/</span>ITALIC')) {
            let italicElement: HTMLElement = document.getElementsByClassName('ql-italic')[0] as HTMLElement;
            italicElement.click();
            this.italic = true;
          }
        let boldElement: HTMLElement = document.getElementsByClassName('ql-bold')[0] as HTMLElement;
        boldElement.click();
        this.bold = true;
        // this.searchTerm = this.searchTerm.replace('<span class="mention" data-index="0" data-denotation-char="/" data-id="1" data-value="BOLD">﻿<span contenteditable="false"><span class="ql-mention-denotation-char">/</span>BOLD</span>﻿</span>', '');
        // }
      }
    }
    if (!(this.italic)) {
      if (this.searchTerm.includes('<span class="ql-mention-denotation-char">/</span>ITALIC')) {
        if (this.searchTerm.includes('<span class="ql-mention-denotation-char">/</span>BOLD')){
          let boldElement: HTMLElement = document.getElementsByClassName('ql-bold')[0] as HTMLElement;
          boldElement.click();
          this.bold = true;
        }
        let italicElement: HTMLElement = document.getElementsByClassName('ql-italic')[0] as HTMLElement;
        italicElement.click();
        this.italic = true;
      }
    }
  }

}
async function suggestPeople(searchTerm) {
  const allPeople = [
    {
      id: 1,
      value: "BOLD"
    },
    {
      id: 2,
      value: "ITALIC"
    }
  ];
  return allPeople.filter(person => person.value.includes(searchTerm));
}
