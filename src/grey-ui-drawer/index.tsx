import * as React from 'react';
import './index.less';
import { Icon } from 'antd';

export interface DrawerProps {

    /** 点击了关闭 */
    onClose?: () => void;

    /** 标题 */
    title?: string | JSX.Element;

    /** 组件宽度 */
    width?: number | string;

    /** 对话框是否可见 */
    visible: boolean;
}

export class DrawerState {

    /** 对话框是否可见 */
    visible: boolean = false;

    /** 抽屉是否显示 */
    drawerVisible: boolean = false;
}

export default class Drawer extends React.PureComponent<DrawerProps, DrawerState> {

    state = new DrawerState();

    /** 关闭计时器 */
    private closeTimer: any;

    constructor(props: DrawerProps) {
        super(props);
    }

    componentDidMount() {
        this.doVisible();
    }

    componentDidUpdate() {
        this.doVisible();
    }

    render() {
        if (!this.state.visible) {
            return null;
        }

        return (
            <div className="grey-ui-drawer-container" >
                <div className="grey-ui-drawer-mask" onClick={this.props.onClose} />
                <div
                    className="grey-ui-drawer"
                    style={{
                        width: this.props.width,
                        right: this.state.drawerVisible ? 0 : (-this.props.width || undefined),
                    }}
                >
                    <div className="grey-ui-drawer-title">
                        <span>{this.props.title || '标题'}</span>
                        <Icon onClick={this.props.onClose} className="grey-ui-drawer-close-butt" type="cha1" />
                    </div>
                    <div className="grey-ui-drawer-body">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }

    /** 处理显示和关闭 */
    private doVisible = () => {
        if (this.props.visible === this.state.visible) {
            return;
        }

        if (this.props.visible) {
            this.setState({ visible: true }, () => {
                clearTimeout(this.closeTimer);
                this.closeTimer = setTimeout(() => {
                    this.setState({ drawerVisible: true });
                }, 200);
            });
        } else {
            this.setState({ drawerVisible: false }, () => {
                clearTimeout(this.closeTimer);
                this.closeTimer = setTimeout(() => {
                    this.setState({ visible: false });
                }, 200);
            });
        }
    }
}