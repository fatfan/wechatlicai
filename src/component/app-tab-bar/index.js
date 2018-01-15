import React from 'react'
import { TabBar, Tab } from 'src/component/tab-bar'

import styles from './index.less'

export default function AppTabBar() {
    const activeClassName = styles.active
    return (
        <TabBar styleName="tab-bar">
            <Tab to="/" styleName="tab" activeClassName={activeClassName} exact header="首页" />
            <Tab to="/invest" styleName="tab" activeClassName={activeClassName} header="投资" />
            <Tab to="/mine" styleName="tab" activeClassName={activeClassName} header="我的" />
            <Tab to="/more" styleName="tab" activeClassName={activeClassName} header="更多" />
        </TabBar>
    )
}
