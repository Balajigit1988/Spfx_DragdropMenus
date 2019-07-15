/// <reference types="react" />
import * as React from 'react';
import { IDragAndDropMenusProps, IDragAndDropMenusState } from './IDragAndDropMenusProps';
import 'react-sortable-tree/style.css';
export default class DragAndDropMenus extends React.Component<IDragAndDropMenusProps, IDragAndDropMenusState, {}> {
    constructor(props: any);
    componentDidMount(): void;
    render(): React.ReactElement<IDragAndDropMenusProps>;
    private _onRenderOption;
    private showMenuPanel;
    private hideMenuPanel;
    private showEditMenuPanel;
    private hideEditMenuPanel;
    private menuPanelButton;
    private menuEditPanelButton;
    private updateMenuName;
    private updateMenuUrl;
    private editItemMenuName;
    private editItemMenuUrl;
    private saveMenuItem;
    private editMenuItem;
    private removeMenuItem;
    private menuConfirmed;
}
