var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import * as React from 'react';
import styles from './DragAndDropMenus.module.scss';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import SortableTree, { getNodeAtPath, removeNodeAtPath } from 'react-sortable-tree';
import 'react-sortable-tree/style.css';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
var DragAndDropMenus = /** @class */ (function (_super) {
    __extends(DragAndDropMenus, _super);
    function DragAndDropMenus(props) {
        var _this = _super.call(this, props) || this;
        /* icon render */
        _this._onRenderOption = function (option) {
            return (React.createElement("div", null,
                option.text && (React.createElement(Icon, { style: { marginRight: '8px' }, iconName: option.text, "aria-hidden": "true", title: option.text })),
                React.createElement("span", null, option.text)));
        };
        /* Add new Menu panel */
        _this.showMenuPanel = function () {
            var resetstateCopy = __assign({}, _this.state);
            resetstateCopy.menuName = '';
            resetstateCopy.menuUrl = '#';
            _this.setState(resetstateCopy);
            _this.setState({ menuPanel: true });
        };
        _this.hideMenuPanel = function () {
            var stateCopy = __assign({}, _this.state);
            stateCopy.errorMsg = false;
            stateCopy.menuPanel = false;
            _this.setState(stateCopy);
        };
        /* edit Menu panel */
        _this.showEditMenuPanel = function (_a) {
            var node = _a.node, path = _a.path;
            if (node.children) {
                _this.setState({
                    parentUrl: true
                });
            }
            else {
                _this.setState({
                    parentUrl: false
                });
            }
            _this.setState({
                editMenuPanel: true,
                editMenuIndex: path,
                editMenuName: node.title,
                editMenuUrl: node.url
            });
        };
        _this.hideEditMenuPanel = function () {
            var stateCopy = __assign({}, _this.state);
            stateCopy.errorMsg = false;
            stateCopy.editMenuPanel = false;
            _this.setState(stateCopy);
        };
        /* Add new Menu panel buttons */
        _this.menuPanelButton = function () {
            return (React.createElement("div", { className: styles.panelButtons },
                React.createElement(PrimaryButton, { onClick: _this.saveMenuItem, style: { marginRight: '8px' } }, "Add"),
                React.createElement(DefaultButton, { onClick: _this.hideMenuPanel }, "Cancel")));
        };
        /* edit Menu panel buttons  */
        _this.menuEditPanelButton = function () {
            return (React.createElement("div", { className: styles.panelButtons },
                React.createElement(PrimaryButton, { onClick: _this.editMenuItem.bind(_this), style: { marginRight: '8px' } }, "Preview"),
                React.createElement(DefaultButton, { onClick: _this.hideEditMenuPanel }, "Cancel")));
        };
        /* Menu Add fields */
        _this.updateMenuName = function (newMenuname) {
            var stateCopy = __assign({}, _this.state);
            stateCopy.menuName = newMenuname;
            _this.setState(stateCopy);
        };
        _this.updateMenuUrl = function (newMenuUrl) {
            var stateCopy = __assign({}, _this.state);
            stateCopy.menuUrl = newMenuUrl;
            _this.setState(stateCopy);
        };
        /* Menu edit fields */
        _this.editItemMenuName = function (editMenuname) {
            var stateCopy = __assign({}, _this.state);
            stateCopy.editMenuName = editMenuname;
            _this.setState(stateCopy);
        };
        _this.editItemMenuUrl = function (editMenuUrl) {
            var stateCopy = __assign({}, _this.state);
            stateCopy.editMenuUrl = editMenuUrl;
            _this.setState(stateCopy);
        };
        /* Menu Save Item */
        _this.saveMenuItem = function () {
            if (_this.state.menuName.length > 0 && _this.state.menuUrl.length > 0) {
                //check menuIcon is object
                var newMenu = [{
                        title: _this.state.menuName,
                        url: _this.state.menuUrl,
                        expanded: true,
                    }];
                if (_this.state.menuItems) {
                    var getMenu = _this.state.menuItems;
                    getMenu = getMenu.concat(newMenu);
                    var stateCopy = __assign({}, _this.state);
                    stateCopy.menuItems = getMenu;
                    stateCopy.errorMsg = false;
                    stateCopy.menuPanel = false;
                    _this.setState(stateCopy);
                }
            }
            else {
                var stateCopy = __assign({}, _this.state);
                stateCopy.errorMsg = true;
                _this.setState(stateCopy);
            }
        };
        /* Menu edit Item */
        _this.editMenuItem = function () {
            if (_this.state.editMenuName.length > 0 && _this.state.editMenuUrl.length > 0) {
                var newNode = getNodeAtPath({
                    treeData: _this.state.menuItems,
                    path: _this.state.editMenuIndex,
                    getNodeKey: function (_a) {
                        var TreeNode = _a.node, number = _a.treeIndex;
                        return number;
                    },
                }).node;
                newNode.title = _this.state.editMenuName;
                newNode.url = _this.state.editMenuUrl;
                newNode.expanded = true;
                var stateCopy = __assign({}, _this.state);
                stateCopy.errorMsg = false;
                stateCopy.editMenuPanel = false;
                _this.setState(stateCopy);
            }
            else {
                var stateCopy = __assign({}, _this.state);
                stateCopy.errorMsg = true;
                _this.setState(stateCopy);
            }
        };
        /* Menu Remove Item */
        _this.removeMenuItem = function (menuData) {
            var path = menuData.path;
            _this.setState({ menuItems: removeNodeAtPath({
                    treeData: _this.state.menuItems,
                    path: path,
                    getNodeKey: function (_a) {
                        var TreeNode = _a.node, number = _a.treeIndex;
                        return number;
                    },
                    ignoreCollapsed: true,
                })
            });
        };
        _this.menuConfirmed = function () {
            var menulist = _this.state.menuItems;
            console.log(menulist);
        };
        _this.state = {
            menuPanel: false,
            editMenuPanel: false,
            menuName: '',
            menuUrl: '#',
            editMenuName: '',
            editMenuUrl: '',
            editMenuIndex: '',
            menuItems: [],
            errorMsg: false,
            selectedIconKey: 'bar',
            parentUrl: false,
        };
        return _this;
    }
    DragAndDropMenus.prototype.componentDidMount = function () {
        // this.getMenuListItems();
    };
    DragAndDropMenus.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: styles.dragAndDropMenus },
            React.createElement("div", { className: styles.container },
                React.createElement("div", { className: styles.row },
                    React.createElement("div", { className: styles.column },
                        React.createElement("div", { className: styles.adminContainer },
                            React.createElement("h2", null, "Header Menu"),
                            React.createElement("div", { className: styles.adminSection },
                                React.createElement("div", { className: styles.dragDropMenu },
                                    React.createElement("div", null,
                                        React.createElement("p", { className: styles.addMenuIcon, onClick: this.showMenuPanel },
                                            React.createElement(Icon, { iconName: 'Add' }),
                                            " Create Menu"),
                                        React.createElement(Panel, { isOpen: this.state.menuPanel, type: PanelType.smallFixedFar, onDismiss: this.hideMenuPanel, headerText: "Header Menu", closeButtonAriaLabel: "Close", onRenderFooterContent: this.menuPanelButton },
                                            React.createElement("div", null,
                                                React.createElement("div", { className: styles.errorColor }, this.state.errorMsg ? 'Please Enter all the fields' : ''),
                                                React.createElement("div", null,
                                                    React.createElement(TextField, { required: true, label: "Menu Name", onChanged: this.updateMenuName.bind(this) })),
                                                React.createElement("div", null,
                                                    React.createElement(TextField, { required: true, label: "URL", value: this.state.menuUrl, onChanged: this.updateMenuUrl.bind(this) }))))),
                                    React.createElement("div", null,
                                        React.createElement("div", { className: styles.dragMenuContainer },
                                            React.createElement(SortableTree, { treeData: this.state.menuItems, maxDepth: 2, onChange: function (menuItems) { return _this.setState({ menuItems: menuItems }); }, generateNodeProps: function (menuData) { return ({
                                                    title: (React.createElement("span", { className: styles.iconTitle },
                                                        "\u00A0",
                                                        menuData.node.title)),
                                                    buttons: [
                                                        React.createElement("button", { className: styles.btnEdit, style: {
                                                                verticalAlign: 'middle',
                                                            }, onClick: function () { return _this.showEditMenuPanel(menuData); } },
                                                            React.createElement(Icon, { iconName: 'PageEdit', title: "Edit" })),
                                                        React.createElement("button", { className: styles.btnDelete, onClick: function () { return _this.removeMenuItem(menuData); } },
                                                            React.createElement(Icon, { iconName: 'Delete', title: "Delete" })),
                                                    ],
                                                }); } }),
                                            React.createElement(Panel, { isOpen: this.state.editMenuPanel, type: PanelType.smallFixedFar, onDismiss: this.hideEditMenuPanel, headerText: "Edit Header Menu", closeButtonAriaLabel: "Close", onRenderFooterContent: this.menuEditPanelButton },
                                                React.createElement("div", null,
                                                    React.createElement("div", { className: styles.errorColor }, this.state.errorMsg ? 'Please Enter all the fields' : ''),
                                                    React.createElement("div", null,
                                                        React.createElement(TextField, { required: true, label: "Menu Name", value: this.state.editMenuName, onChanged: this.editItemMenuName.bind(this) })),
                                                    React.createElement("div", null,
                                                        React.createElement(TextField, { required: true, label: "URL", value: this.state.parentUrl ? '#' : this.state.editMenuUrl, disabled: this.state.parentUrl, onChanged: this.editItemMenuUrl.bind(this) }))))),
                                        React.createElement(PrimaryButton, { onClick: this.menuConfirmed }, "Confirm"))))))))));
    };
    return DragAndDropMenus;
}(React.Component));
export default DragAndDropMenus;
//# sourceMappingURL=DragAndDropMenus.js.map