import { Component, OnInit, ViewChild } from '@angular/core';
import { BeforeOpenCloseEventArgs } from '@syncfusion/ej2-angular-inputs';
import { MenuEventArgs } from '@syncfusion/ej2-angular-navigations';
import { EditSettingsModel, TreeGridComponent } from '@syncfusion/ej2-angular-treegrid';
import { sampleData } from './datasource';
import { createCheckBox } from '@syncfusion/ej2-angular-buttons';
import { createElement } from '@syncfusion/ej2-base';
import { TestService } from '../services/test.service';
import { DialogEditEventArgs, RowSelectEventArgs, SaveEventArgs, SelectionSettingsModel, ToolbarItems } from '@syncfusion/ej2-angular-grids';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataUtil } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  isFilter = false;
  isAllowSorting = false;
  frozenColumns = 0;
  columns = [
  
    { field: 'taskID', headerText: 'Task ID', width: 90, textAlign: 'Right' },
    { field: 'taskName', headerText: 'Task Name', width: 150 },
    { field: 'startDate', headerText: 'startDate', width: 140, format:'yyyy-MM-dd' },
    { field: 'duration', headerText: 'Duration', width: 80, textAlign: 'Right' },
    { field: 'progress', headerText: 'progress', width: 80, textAlign: 'Right' }
  ]
   
  isSelectOption = true;

  public data: Object[] = [];
  @ViewChild('treegrid')
  public treegrid!: TreeGridComponent;
  public contextMenuItems!: Object;

  //editing , newRowPosition: 'Bottom' 
 // selectOptions = { type: 'Multiple', mode: 'Cell', cellSelectionMode: 'Box' };
  selectOptions: SelectionSettingsModel = { type: 'Multiple', mode:'Row',cellSelectionMode:'Flow' };
  editSettings: EditSettingsModel = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog', allowEditOnDblClick: false, showConfirmDialog: true, showDeleteConfirmDialog: true };
  toolbar = [
    'ColumnChooser',
    'Add', 'Edit', 'Delete', 'Update', 'Cancel'
  ];

  constructor(
    private testService: TestService
  ) { }

  ngOnInit(): void {
    this.data = sampleData;
    this.contextMenuItems = [

      { text: 'Filter Column', target: '.e-headercontent', id: 'filterCol' },
      { text: 'Multi Sort', target: '.e-headercontent', id: 'multiSort' },
      { text: 'Freeze Column', target: '.e-headercontent', id: 'freezeColumn' },
      { text: 'Add Column', target: '.e-headercontent', id: 'addColumn' },

      { text: 'Collapse All', target: '.e-headercontent', id: 'collapseall' },
      { text: 'Expand All', target: '.e-headercontent', id: 'expandall' },


      //  { text: 'Add Record', target: '.e-content', id: 'addRecord' },
      { text: 'Add Next', target: '.e-content', id: 'addNextRecord' },
      { text: 'Add Child', target: '.e-content', id: 'addChildRecord' },
      { text: 'Delete Record', target: '.e-content', id: 'deleteRecord' },
      { text: 'Edit Record', target: '.e-content', id: 'editRecord' },
      { text: 'Multi Select', target: '.e-content', id: 'multiSelect' },

      { text: 'Copy Row', target: '.e-content', id: 'copyRow' },
      { text: 'Cut Row', target: '.e-content', id: 'cutRow' },
      { text: 'Paste Row', target: '.e-content', id: 'pasteRow' }

    ];
    this.progressDistinctData = DataUtil.distinct(sampleData, 'progress', true);
    this.priorityDistinctData = DataUtil.distinct(sampleData, 'priority', true);

  }
  ngAfterViewInit() {
    // this.treegrid.setProperties({columns:this.columns});
  }
  rowSelected(args: RowSelectEventArgs) {
    let selectedrowindex: number[] = this.treegrid.getSelectedRowIndexes();  // get the selected row indexes.

    let selectedrecords: Object[] = this.treegrid.getSelectedRecords();  // get the selected records.
    console.log(this.treegrid.getSelectedRowIndexes());
    console.log(this.treegrid.getSelectedRecords());
  }
  contextMenuOpen(arg: BeforeOpenCloseEventArgs): void {
    console.log('contextMenuOpen', arg);
    let elem: Element = arg.event.target as Element;
    let row: any = elem.closest('.e-row');
    let uid: string = row && row.getAttribute('data-uid');
    console.log(uid);
    // let items: Array<HTMLElement> = [].slice.call(document.querySelectorAll('.e-menu-item'));
    // for (let i: number = 0; i < items.length; i++) {
    //   items[i].setAttribute('style','display: none;');
    // }

    // if (elem.closest('.e-row')) {
    //   if (isNullOrUndefined(uid) ||
    //     isNullOrUndefined(getValue('hasChildRecords', this.treegrid.grid.getRowObjectFromUID(uid).data))) {
    //     //arg.cancel = true; //prevents context menu on row
    //   } else {
    //     let flag: boolean = getValue('expanded', this.treegrid.grid.getRowObjectFromUID(uid).data);
    //     let val: string = flag ? 'none' : 'block';
    //     document.querySelectorAll('li#expandrow')[0].setAttribute('style', 'display: ' + val + ';');
    //     val = !flag ? 'none' : 'block';
    //     document.querySelectorAll('li#collapserow')[0].setAttribute('style', 'display: ' + val + ';');
    //   }
    // } else {
    //   let len = this.treegrid.element.querySelectorAll('.e-treegridexpand').length;
    //   if (len !== 0) {
    //     document.querySelectorAll('li#collapseall')[0].setAttribute('style', 'display: block;');
    //   } else {
    //     document.querySelectorAll('li#expandall')[0].setAttribute('style', 'display: block;');
    //   }
    // }
    document.querySelectorAll('li#filterCol')[0].innerHTML = '';
    document.querySelectorAll('li#filterCol')[0].appendChild(this.createCheck('filterCol', this.isFilter));

    document.querySelectorAll('li#multiSort')[0].innerHTML = '';
    document.querySelectorAll('li#multiSort')[0].appendChild(this.createCheck('multiSort', this.isAllowSorting));

    document.querySelectorAll('li#multiSelect')[0].innerHTML = '';
    document.querySelectorAll('li#multiSelect')[0].appendChild(this.createCheck('multiSelect', this.isSelectOption));
  }
  contextMenuClick(args: MenuEventArgs | any): void {
    console.log('contextMenuClick', args);
    if (args.item.id === 'collapserow') {
      this.treegrid.collapseRow(this.treegrid.getSelectedRows()[0] as HTMLTableRowElement, this.treegrid.getSelectedRecords()[0]);
    } else if (args.item.id === 'expandrow') {
      this.treegrid.expandRow(this.treegrid.getSelectedRows()[0] as HTMLTableRowElement, this.treegrid.getSelectedRecords()[0]);
    } else if (args.item.id === 'collapseall') {
      this.treegrid.collapseAll();
    } else if (args.item.id === 'expandall') {
      this.treegrid.expandAll();
    } else if (args.item.id === 'filterCol') {
      this.isFilter = !this.isFilter;
    } else if (args.item.id === 'multiSort') {
      this.isAllowSorting = !this.isAllowSorting;
    } else if (args.item.id === 'freezeColumn') {
      this.treegrid.setProperties({ frozenColumns: args.column.index });
      // this.frozenColumns = args.column.index;
    } else if (args.item.id === 'addColumn') {
      this.testService.changeMessage('addColumn');
    } else if (args.item.id === 'deleteRecord') {
      this.treegrid.deleteRecord();
    } else if (args.item.id === 'editRecord') {
      console.log(args);
      this.treegrid.startEdit();
      // }
      // else if (args.item.id === 'addRecord') {
      //   this.treegrid.addRecord();

    } else if (args.item.id === 'addNextRecord') {
      this.treegrid.addRecord();
      this.treegrid.setProperties({ editSettings: { newRowPosition: 'Below' } });

      //this.treegrid.addRecord(undefined, undefined, 'Below');

    } else if (args.item.id === 'addChildRecord') {
      this.treegrid.addRecord();
      this.treegrid.setProperties({ editSettings: { newRowPosition: 'Child' } });

      // this.treegrid.addRecord(undefined, undefined, 'Child');
    } else if (args.item.id === 'multiSelect') {
      console.log(this.selectOptions.type, this.isSelectOption);
      if (this.selectOptions.type == 'Single') {
        this.selectOptions.type = 'Multiple';
        this.isSelectOption = true;
        this.treegrid.setProperties({ selectionSettings: { type: 'Multiple' } });
      } else if (this.selectOptions.type == 'Multiple') {
        this.selectOptions.type = 'Single';
        this.isSelectOption = false;
        this.treegrid.setProperties({ selectionSettings: { type: 'Single' } });
      }
      console.log(this.selectOptions.type, this.isSelectOption);

    } else if (args.item.id === 'copyRow') {
      let copyObj = this.treegrid.copy(false);
      console.log(this.treegrid.clipboardModule['copyContent']);
    } else if (args.item.id === 'cutRow') {

    } else if (args.item.id === 'pasteRow') {
      let copyContent = this.treegrid.clipboardModule['copyContent'];
      console.log(copyContent);
  //    this.treegrid.paste(copyContent,1,1);
      this.treegrid.setProperties({dataSource:sampleData});
    }


  }
  // public itemRender(args: MenuEventArgs | any) {
  //   console.log(args);
  //   if (this.checkMenuItems.map((e: any) => { return e.id }).indexOf(args.item.id) > -1) {

  //     let check: Element = createCheckBox(createElement, false, {
  //       label: args.item.text,
  //       checked: (args.item.text == 'Option 2') ? true : false
  //     });
  //     args.element.innerHTML = '';
  //     args.element.appendChild(check);
  //   }
  // }

  createCheck(labelName: string, isCheck: boolean) {
    let check: Element = createCheckBox(createElement, false, {
      label: labelName,
      checked: isCheck
    });

    return check;
  }

  //form codes
  public toolbarOptions!: ToolbarItems[];
  public taskForm!: FormGroup;
  public progressDistinctData!: Object;
  public priorityDistinctData!: Object;
  public submitClicked: boolean = false;

  createFormGroup(data: any): FormGroup {
    return new FormGroup({
      taskID: new FormControl(data.taskID, Validators.required),
      startDate: new FormControl(data.startDate),
      taskName: new FormControl(data.taskName, Validators.required),
      duration: new FormControl(data.duration),
      progress: new FormControl(data.progress),
      priority: new FormControl(data.priority),
    });
  }
  dateValidator() {
    return (control: FormControl): null | Object => {
      return control.value && control.value.getFullYear &&
        (1900 <= control.value.getFullYear() && control.value.getFullYear() <= 2099) ? null : { OrderDate: { value: control.value } };
    };
  }
  actionBegin(args: SaveEventArgs | any): void {
    console.log('actionBegin', args);
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
    console.log('action complete', args);
    if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {
      // Set initial Focus
      if (args.requestType === 'beginEdit') {
        (args.form.elements.namedItem('taskName') as HTMLInputElement).focus();
      } else if (args.requestType === 'add') {
        (args.form.elements.namedItem('taskID') as HTMLInputElement).focus();
      }
    }
  }
  get taskID(): any { return this.taskForm.get('taskID'); }

  get taskName(): any { return this.taskForm.get('taskName'); }

  get startDate(): any { return this.taskForm.get('startDate'); }
}
export interface ITaskModel {
  taskID?: number;
  taskName?: string;
  startDate?: Date;
  duration?: number;
  progress?: number;
  priority?: string;
}



