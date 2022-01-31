import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DialogComponent, PositionDataModel } from '@syncfusion/ej2-angular-popups';
import { detach, EmitType, isNullOrUndefined } from '@syncfusion/ej2-base';
import { HomeService } from 'src/app/services/home.service';
import { TestService } from '../services/test.service';

@Component({
  selector: 'app-columnform',
  templateUrl: './columnform.component.html',
  styleUrls: ['./columnform.component.scss']
})
export class ColumnformComponent implements OnInit {
  @ViewChild('template') template!: DialogComponent;
  // Create element reference for dialog  element.
  @ViewChild('container', { read: ElementRef }) container!: ElementRef;
  // The Dialog shows within the target element.
  public position: PositionDataModel = { X: 'center', Y: 'center' };
  public targetElement!: HTMLElement;
  public proxy: any = this;

  constructor(
    private homeService: HomeService,
    private testService: TestService
    ){
    this.homeService.getMessage()
    .subscribe(
      data => {
        if (data == 'addColumn') {
          console.log(data);
          this.template.show();
        }
      }
    )
    this.testService.getMessage()
    .subscribe(
      data => {
        if (data == 'addColumn') {
          console.log(data);
          this.template.show();
        }
      }
    )
  }
  //To get all element of the dialog component after component get initialized.
  ngOnInit() {
    this.initilaizeTarget();
    console.log('col init');
   
  }

  // Initialize the Dialog component target element.
  public initilaizeTarget: EmitType<object> = () => {
    this.targetElement = this.container.nativeElement.parentElement;
  }
  public height: string = '250px';
  public dialogOpen: EmitType<object> = () => {
    (document.getElementById('sendButton') as any).keypress = (e: any) => {
      if (e.keyCode === 13) { this.updateTextValue(); }
    };
    (document.getElementById('inVal') as HTMLElement).onkeydown = (e: any) => {
      if (e.keyCode === 13) { this.updateTextValue(); }
    };
    document.getElementById('sendButton')!.onclick = (): void => {
      this.updateTextValue();
    };
  }

  public updateTextValue: EmitType<object> = () => {
    let enteredVal: HTMLInputElement = document.getElementById('inVal') as HTMLInputElement;
    let dialogTextElement: HTMLElement = document.getElementsByClassName('dialogText')[0] as HTMLElement;
    let dialogTextWrap: HTMLElement = document.getElementsByClassName('dialogContent')[0] as HTMLElement;
    if (!isNullOrUndefined(document.getElementsByClassName('contentText')[0])) {
      detach(document.getElementsByClassName('contentText')[0]);
    }
    if (enteredVal.value !== '') {
      dialogTextElement.innerHTML = enteredVal.value;
    }
    enteredVal.value = '';
  }

  // Sample level code to handle the button click action
  public onOpenDialog(event: any): void {
    // Call the show method to open the Dialog
    this.template.show();
  }
}
