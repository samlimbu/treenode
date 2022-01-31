import { Component, OnInit, ViewChild } from '@angular/core';
import { sampleData } from './datasource';
import { getValue, isNullOrUndefined } from '@syncfusion/ej2-base';
import { BeforeOpenCloseEventArgs } from '@syncfusion/ej2-inputs';
import { MenuEventArgs } from '@syncfusion/ej2-navigations';
import { TreeGridComponent } from '@syncfusion/ej2-angular-treegrid';

import { BeforeOpenCloseMenuEventArgs, MenuItemModel } from '@syncfusion/ej2-navigations';
import { createCheckBox } from '@syncfusion/ej2-buttons';
import { closest, createElement } from '@syncfusion/ej2-base';
import { HomeService } from '../services/home.service';
import { AppConfigService } from 'src/services/app-config.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isFilter = false;
  isAllowSorting = false;
  frozenColumns = 0;

  public data!: Object[];
  public pager!: Object;
  public editSettings!: Object;
  public contextMenuItems!: Object[];
  public selectOptions!: Object;
  checkMenuItems: Object[] = [
    { id: "filterCol", status: this.isFilter },
    { id: "multiSort", status: this.isAllowSorting },
    { id: "freezeColumn", left: this.frozenColumns }
  ];
  editing: any;
  @ViewChild('treegrid')
  public treeGridObj!: TreeGridComponent;
  public toolbar!: string[];


  public menuItems: MenuItemModel[] = []
  public headermenuItems: MenuItemModel[] = []


  constructor(
    private homeService: HomeService,
    private appConfigService: AppConfigService
  ) { }
  ngOnInit(): void {
    //this.data = this.appConfigService.config;
    this.toolbar = ['ColumnChooser'];
    this.data = sampleData;
    this.editing = { allowDeleting: true, allowEditing: true };
    this.menuItems = [
      { text: 'Collapse the Row', id: 'collapserow' },
      { text: 'Expand the Row', id: 'expandrow' }
    ]
    this.headermenuItems = [
      { text: 'Collapse All', id: 'collapseall', iconCss: 'e-icons e-copy' },
      { text: 'Expand All', id: 'expandall' },
      { text: 'Add Column', id: 'addColumn' },
      { text: 'AddRecord', id: 'addRecord' },
      { text: 'Filter Column', id: 'filterCol' },
      { text: 'Multi Sort', id: 'multiSort' },
      { text: 'Freeze Column', id: 'freezeColumn' }
    ];
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: "Row" };
    this.selectOptions = { type: 'Multiple' };
  }
  //for autofit specific columns
  allowResizing = true;
  onDataBound() {
    this.treeGridObj.autoFitColumns([]);
  }
  contextMenuClick(args: any): void {

    if (args.event.target.closest('#filterCol')) {
      args.cancel = true;
    }
    console.log('2click', args);
    if (args.item.id === 'collapserow') {
      this.treeGridObj.collapseRow(this.treeGridObj.getSelectedRows()[0] as HTMLTableRowElement, this.treeGridObj.getSelectedRecords()[0]);
    } else if (args.item.id === 'expandrow') {
      this.treeGridObj.expandRow(this.treeGridObj.getSelectedRows()[0] as HTMLTableRowElement, this.treeGridObj.getSelectedRecords()[0]);
    } else if (args.item.id === 'collapseall') {
      this.treeGridObj.collapseAll();
    } else if (args.item.id === 'expandall') {
      this.treeGridObj.expandAll();
    } else if (args.item.id === 'addRecord') {
      this.treeGridObj.addRecord();
    } else if (args.item.id === 'filterCol') {
      this.isFilter = !this.isFilter;
    } else if (args.item.id === 'multiSort') {
      this.isAllowSorting = !this.isAllowSorting;
    } else if (args.item.id === 'freezeColumn') {
      this.frozenColumns = args.column.index;
    } else if (args.item.id === 'addColumn') {
      this.homeService.changeMessage('addColumn');
    }
  }

  beforeOpen(e: any) {
    console.log(e)
  }
  select(e: any) {
    console.log(e.item);
    if (e.item.id === 'multiSort') {
      this.isAllowSorting = !this.isAllowSorting;
    } else if (e.item.id === 'filterCol') {
      this.isFilter = !this.isFilter;
    } else if (e.item.id === 'freezeColumn') {

    }
  }


  contextMenuOpen(arg: any): void {
    console.log(arg);
    if ((arg.event.target as Element).closest('#filterCol')) {
      arg.cancel = true;
    }
    let elem: Element = arg.event.target as Element;
    let row: any;
    let uid: any;
    if (elem.closest('.e-row')) {
      row = elem.closest('.e-row');
      uid = row!.getAttribute('data-uid');
    }
    console.log(arg, elem, row);
    console.log(uid);


    if (isNullOrUndefined(getValue('hasChildRecords', this.treeGridObj.grid.getRowObjectFromUID(uid).data))) {
      arg.cancel = true;
    } else {
      let flag: boolean = getValue('expanded', this.treeGridObj.grid.getRowObjectFromUID(uid).data);
      let val: string = flag ? 'none' : 'block';
      document.querySelectorAll('li#expandrow')[0].setAttribute('style', 'display: ' + val + ';');
      val = !flag ? 'none' : 'block';
      document.querySelectorAll('li#collapserow')[0].setAttribute('style', 'display: ' + val + ';');
      document.querySelectorAll('li#collapserow')[0].innerHTML = '';
      //    document.querySelectorAll('li#collapserow')[0].appendChild(this.createCheck('collapserow', true));

      document.querySelectorAll('li#expandrow')[0].innerHTML = '';
      // document.querySelectorAll('li#expandrow')[0].appendChild(this.createCheck('expandrow', true));
    }

  }

  public target: string = '#target';


  public beforeClose(args: BeforeOpenCloseMenuEventArgs) {
    console.log(args.event.target as Element);
    let isCheckList = this.checkMenuItems.map((e: any) => {
      if ((args.event.target as Element).closest(`#${e.id}`))
        return true;
      else
        return false;
    });
    if (isCheckList.includes(true)) {
      args.cancel = true;
      let selectedElem: NodeList = args.element.querySelectorAll('.e-selected');
      for (let i: number = 0; i < selectedElem.length; i++) {
        let ele: Element = selectedElem[i] as Element;
        ele.classList.remove('e-selected');
      }
      let checkbox: HTMLElement = closest(args.event.target as Element, '.e-checkbox-wrapper') as HTMLElement;
      let frame: any = checkbox.querySelector('.e-frame');
      if (checkbox && frame.classList.contains('e-check')) {
        frame.classList.remove('e-check');
      } else if (checkbox) {
        frame.classList.add('e-check');
      }
    }
  }

  public itemRender(args: MenuEventArgs | any) {
    console.log(args);
    if (this.checkMenuItems.map((e: any) => { return e.id }).indexOf(args.item.id) > -1) {

      let check: Element = createCheckBox(createElement, false, {
        label: args.item.text,
        checked: (args.item.text == 'Option 2') ? true : false
      });
      args.element.innerHTML = '';
      args.element.appendChild(check);
    }
  }

  createCheck(labelName: string, isCheck: boolean) {
    let check: Element = createCheckBox(createElement, false, {
      label: labelName,
      checked: isCheck
    });
    console.log(check);
    return check;
  }


}
