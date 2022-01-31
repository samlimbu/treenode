import { Component, OnInit, ViewChild } from '@angular/core';
import { sampleData } from '../test/datasource';
import { EditSettingsModel, ToolbarItems, TreeGridComponent, SelectionSettingsModel } from '@syncfusion/ej2-angular-treegrid';
import { DialogEditEventArgs, SaveEventArgs } from '@syncfusion/ej2-angular-grids';
import { Dialog } from '@syncfusion/ej2-angular-popups';
import { FormGroup, AbstractControl, FormControl, Validators } from '@angular/forms';
import { DataUtil } from '@syncfusion/ej2-data';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Browser } from '@syncfusion/ej2-base';
import { TestService } from '../services/test.service';
import { BeforeOpenCloseEventArgs } from '@syncfusion/ej2-angular-inputs';
import { createCheckBox } from '@syncfusion/ej2-angular-buttons';
import { createElement } from '@syncfusion/ej2-base';

@Component({
  selector: 'app-one',
  templateUrl: './one.component.html',
  styleUrls: ['./one.component.scss']
})
export class OneComponent implements OnInit {
  public data: Object[] = [];


  public taskForm!: FormGroup;
  public progressDistinctData!: Object;
  public priorityDistinctData!: Object;
  public submitClicked: boolean = false;
  

  isFilter = false;
  isAllowSorting = false;
  frozenColumns = 0;

  public toolbarOptions: ToolbarItems[] = ['Add', 'Update', 'Cancel'];
  public selectionOptions: SelectionSettingsModel = { type: 'Multiple', mode: 'Cell', cellSelectionMode: 'Box' };
  editSettings: EditSettingsModel = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Batch', newRowPosition: 'Below', showDeleteConfirmDialog: true };

  @ViewChild('treegrid')
  public treegrid!: TreeGridComponent;
  public contextMenuItems!: Object;

  //editing
 
  toolbar = [
    'ColumnChooser',
    'Add', 'Edit', 'Delete', 'Update', 'Cancel'
  ];


  constructor(private testService: TestService) {

  }






  ngOnInit(): void {
    this.data = sampleData;
   
   
    this.progressDistinctData = DataUtil.distinct(sampleData, 'progress', true);
    this.priorityDistinctData = DataUtil.distinct(sampleData, 'priority', true);



      this.contextMenuItems = [
        { text: 'Filter Column', target: '.e-headercontent', id: 'filterCol' },
        { text: 'Multi Sort', target: '.e-headercontent', id: 'multiSort' },
        { text: 'Freeze Column', target: '.e-headercontent', id: 'freezeColumn' },
        { text: 'Add Column', target: '.e-headercontent', id: 'addColumn' },

        { text: 'Collapse All', target: '.e-headercontent', id: 'collapseall' },
        { text: 'Expand All', target: '.e-headercontent', id: 'expandall' },


        { text: 'Add Record', target: '.e-content', id: 'addRecord' },
        { text: 'Add Next', target: '.e-content', id: 'addNextRecord' },
        { text: 'Add Child', target: '.e-content', id: 'addChildRecord' },
        { text: 'Delete Record', target: '.e-content', id: 'deleteRecord' },
        { text: 'Edit Record', target: '.e-content', id: 'editRecord' },

      ];

  
 

  }


  createCheck(labelName: string, isCheck: boolean) {
    let check: Element = createCheckBox(createElement, false, {
      label: labelName,
      checked: isCheck
    });
    console.log(check);
    return check;
  }



  createFormGroup(data: ITaskModel): FormGroup {
    return new FormGroup({
      taskID: new FormControl(data.taskID, Validators.required),
      startDate: new FormControl(data.startDate, this.dateValidator()),
      taskName: new FormControl(data.taskName, Validators.required),
      duration: new FormControl(data.duration),
      progress: new FormControl(data.progress),
      priority: new FormControl(data.priority),
    });
  }

  dateValidator() {
    return (control: FormControl | any): null | Object => {
      return control.value && control.value.getFullYear &&
        (1900 <= control.value.getFullYear() && control.value.getFullYear() <= 2099) ? null : { OrderDate: { value: control.value } };
    };
  }

  actionBegin(args: SaveEventArgs | any): void {
    if (args.requestType === 'beginEdit' || args.requestType === 'add') {
      this.submitClicked = false;
      this.taskForm = this.createFormGroup(args.rowData);
    }
    if (args.requestType === 'save') {
      this.submitClicked = true;
      if (this.taskForm.valid) {
        args.data = this.taskForm.value;
      } else {
        args.cancel = true;
      }
    }
  }

  actionComplete(args: DialogEditEventArgs | any): void {
    if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {
      // Set initial Focus
      if (args.requestType === 'beginEdit') {
        (args.form.elements.namedItem('taskName') as HTMLInputElement).focus();
      } else if (args.requestType === 'add') {
        (args.form.elements.namedItem('taskID') as HTMLInputElement).focus();
      }
    }
  }

  get taskID(): AbstractControl | any { return this.taskForm.get('taskID'); }

  get taskName(): AbstractControl | any { return this.taskForm.get('taskName'); }

  get startDate(): AbstractControl | any { return this.taskForm.get('startDate'); }
}
export interface ITaskModel {
  taskID?: number;
  taskName?: string;
  startDate?: Date;
  duration?: number;
  progress?: number;
  priority?: string;
}