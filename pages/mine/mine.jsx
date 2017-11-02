import React from "react";
//引入组件
import Header from "../../component/cmn/header/header.jsx";
import Tabs from "../../component/cmn/tabs/tabs.jsx";
const Mine = () => (
    <div>
        <Header title="个人中心" />
        <main>
            <h2>个人中心</h2>
        </main>
        <Tabs cur="2" />
    </div>

)
export default Mine