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
  blured = false
  focused = false
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
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
    this.modules= {
      mention: {
        allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
        mentionDenotationChars: ["@", "#", "/"],
        source: async function(searchTerm, renderList) {
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
      key: 192
    }, (range, context) => {
      // tslint:disable-next-line:no-console
      console.log('KEYBINDING /', range, context)
      this.Optionflag = true;
      console.log(this.Optionflag);
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

}
async function suggestPeople(searchTerm) {
  const allPeople = [
    {
      id: 1,
      value: "Fredrik Sundqvist"
    },
    {
      id: 2,
      value: "Patrik Sjölin"
    }
  ];
  return allPeople.filter(person => person.value.includes(searchTerm));
}