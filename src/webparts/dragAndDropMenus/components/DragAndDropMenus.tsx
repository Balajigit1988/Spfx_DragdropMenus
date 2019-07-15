import * as React from 'react';
import styles from './DragAndDropMenus.module.scss';
import { IDragAndDropMenusProps, IDragAndDropMenusState } from './IDragAndDropMenusProps';
import { escape } from '@microsoft/sp-lodash-subset';

import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import SortableTree, { getNodeAtPath, removeNodeAtPath} from 'react-sortable-tree';
import 'react-sortable-tree/style.css';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

export default class DragAndDropMenus extends React.Component<IDragAndDropMenusProps, IDragAndDropMenusState, {}> {
  constructor(props){
    super(props);
    this.state = {
      menuPanel: false,
      editMenuPanel: false,
      menuName:'',
      menuUrl: '#',
      editMenuName:'',
      editMenuUrl: '',
      editMenuIndex:'',
      menuItems: [],
      errorMsg: false,
      selectedIconKey: 'bar',
      parentUrl:false,
    };
  }

  public componentDidMount(){
    // this.getMenuListItems();
  }
  public render(): React.ReactElement<IDragAndDropMenusProps> {
    return (
      <div className={ styles.dragAndDropMenus }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
            <div className={styles.adminContainer}>
                <h2>Menu</h2>
                <div className={styles.adminSection}>
                  <div className={styles.dragDropMenu}>
                    <div>
                      <p className={styles.addMenuIcon} onClick={this.showMenuPanel}><Icon iconName={'Add'} /> Create Menu</p>
                      <Panel
                        isOpen={this.state.menuPanel}
                        type={PanelType.smallFixedFar}
                        onDismiss={this.hideMenuPanel}
                        headerText="Add Menu"
                        closeButtonAriaLabel="Close"
                        onRenderFooterContent={this.menuPanelButton}
                      >
                        <div>
                          <div className={styles.errorColor}>{this.state.errorMsg ? 'Please Enter all the fields' : ''}</div>
                          <div><TextField required={true} label="Menu Name" onChanged={this.updateMenuName.bind(this)} /></div>
                          <div><TextField required={true} label="URL" value={this.state.menuUrl}  onChanged={this.updateMenuUrl.bind(this)} /></div>
                        </div>
                      </Panel>
                    </div>

                    <div>
                      <div className={styles.dragMenuContainer}>
                        <SortableTree
                          treeData={this.state.menuItems}
                          maxDepth={2}
                          onChange={(menuItems) =>  this.setState({ menuItems })}
                          generateNodeProps={(menuData) => ({
                            title: (<span className={styles.iconTitle}> {menuData.node.title}</span>), 
                            buttons: [
                              <button
                                className={styles.btnEdit}
                                style={{
                                  verticalAlign: 'middle',
                                }}
                                onClick={() => this.showEditMenuPanel(menuData)}
                              >
                                <Icon iconName={'PageEdit'} title="Edit" />
                              </button>,
                              <button
                                className={styles.btnDelete}
                                onClick={() => this.removeMenuItem(menuData)}
                              >
                              <Icon iconName={'Delete'} title="Delete" />
                            </button>,
                            ],
                          })}
                        />
                        <Panel
                          isOpen={this.state.editMenuPanel}
                          type={PanelType.smallFixedFar}
                          onDismiss={this.hideEditMenuPanel}
                          headerText="Edit Menu"
                          closeButtonAriaLabel="Close"
                          onRenderFooterContent={this.menuEditPanelButton}
                        >
                          <div>
                            <div className={styles.errorColor}>{this.state.errorMsg ? 'Please Enter all the fields' : ''}</div>
                            <div><TextField required={true} label="Menu Name" value={this.state.editMenuName}  onChanged={this.editItemMenuName.bind(this)} /></div>
                            <div><TextField  required={true} label="URL" value={this.state.parentUrl ? '#' : this.state.editMenuUrl} disabled={this.state.parentUrl}  onChanged={this.editItemMenuUrl.bind(this)} /></div>
                          </div>
                        </Panel>
                      </div>

                      <PrimaryButton onClick={this.menuConfirmed} >Confirm</PrimaryButton>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  /* icon render */
private _onRenderOption = (option: IDropdownOption): JSX.Element => {
  return (
    <div>
      {option.text && (
        <Icon style={{ marginRight: '8px' }} iconName={option.text} aria-hidden="true" title={option.text} />
      )}
      <span>{option.text}</span>
    </div>
  );
}
  /* Add new Menu panel */
  private showMenuPanel = () => {
    let resetstateCopy = { ...this.state };
    resetstateCopy.menuName = '';
    resetstateCopy.menuUrl = '#';
    this.setState(resetstateCopy);
    this.setState({ menuPanel: true });
  }

  private hideMenuPanel = () => {
    let stateCopy = { ...this.state };
    stateCopy.errorMsg= false;
    stateCopy.menuPanel= false;
    this.setState(stateCopy);
  }

  /* edit Menu panel */
  private showEditMenuPanel = ({ node, path}) => {
    if(node.children){
      this.setState({
        parentUrl:true
      });
    } else{
      this.setState({
        parentUrl:false
      });
    } 
    this.setState({
      editMenuPanel: true,
      editMenuIndex: path,
      editMenuName: node.title,
      editMenuUrl: node.url
    });
  }

  private hideEditMenuPanel = () => {
    let stateCopy = { ...this.state };
    stateCopy.errorMsg= false;
    stateCopy.editMenuPanel= false;
    this.setState(stateCopy);
  }

  /* Add new Menu panel buttons */
  private menuPanelButton = () => {
    return (
      <div className={styles.panelButtons}>
        <PrimaryButton onClick={this.saveMenuItem} style={{ marginRight: '8px' }}>
          Add
        </PrimaryButton>
        <DefaultButton onClick={this.hideMenuPanel}>Cancel</DefaultButton>
      </div>
    );
  }

  /* edit Menu panel buttons  */
  private menuEditPanelButton = () => {
    return (
      <div className={styles.panelButtons}>
        <PrimaryButton onClick={this.editMenuItem.bind(this)} style={{ marginRight: '8px' }}>
          Preview
        </PrimaryButton>
        <DefaultButton onClick={this.hideEditMenuPanel}>Cancel</DefaultButton>
      </div>
    );
  }

  /* Menu Add fields */
  private updateMenuName = (newMenuname: string): void  => {
    let stateCopy = { ...this.state };
    stateCopy.menuName = newMenuname;
    this.setState(stateCopy);
  }
  private updateMenuUrl = (newMenuUrl: string): void  => {
    let stateCopy = { ...this.state };
    stateCopy.menuUrl = newMenuUrl;
    this.setState(stateCopy);
  }

   /* Menu edit fields */
   private editItemMenuName = (editMenuname: string): void  => {
    let stateCopy = { ...this.state };
    stateCopy.editMenuName = editMenuname;
    this.setState(stateCopy);
  }
  private editItemMenuUrl = (editMenuUrl: string): void  => {
    let stateCopy = { ...this.state };
    stateCopy.editMenuUrl = editMenuUrl;
    this.setState(stateCopy);
  }

  /* Menu Save Item */
  private saveMenuItem = () => {
    if(this.state.menuName.length > 0 && this.state.menuUrl.length > 0){
      //check menuIcon is object
  
      let newMenu = [{
        title: this.state.menuName,
        url: this.state.menuUrl,
        expanded: true,
      }];

      if(this.state.menuItems){
        let getMenu = this.state.menuItems;
        getMenu = [...getMenu, ...newMenu];

        let stateCopy = { ...this.state };
        stateCopy.menuItems = getMenu;
        stateCopy.errorMsg= false;
        stateCopy.menuPanel = false;
        this.setState(stateCopy);
      }
    } else {
      let stateCopy = { ...this.state };
      stateCopy.errorMsg= true;
      this.setState(stateCopy);
    }
  }


  /* Menu edit Item */
  private editMenuItem = () => {
    if(this.state.editMenuName.length > 0 && this.state.editMenuUrl.length > 0){
      let {node: newNode} = getNodeAtPath({
        treeData: this.state.menuItems,
        path: this.state.editMenuIndex,
        getNodeKey:  ({node: TreeNode, treeIndex: number}) => {
          return number;
        },
      });
      newNode.title = this.state.editMenuName;
      newNode.url = this.state.editMenuUrl;
      newNode.expanded = true;
     
      let stateCopy = { ...this.state };
      stateCopy.errorMsg= false;
      stateCopy.editMenuPanel= false;
      this.setState(stateCopy);
    } else{
      let stateCopy = { ...this.state };
      stateCopy.errorMsg= true;
      this.setState(stateCopy);
    }
  }

   /* Menu Remove Item */
   private removeMenuItem = (menuData) => {
    let {path} = menuData;
      this.setState({ menuItems : removeNodeAtPath({
          treeData: this.state.menuItems,
          path: path,
          getNodeKey: ({node: TreeNode, treeIndex: number}) => {
              return number;
          },
          ignoreCollapsed: true,
      })
    });
  }

  private menuConfirmed = () => {
    let menulist = this.state.menuItems;
    console.log(menulist)
  }
}
