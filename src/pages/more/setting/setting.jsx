import React from 'react'
import { Link } from 'react-router-dom'
// 引入样式
import style from '../../../assets/css/app.less'
import pageStyle from './setting.less'

// 引入组件
import Header from '../../../component/cmn/header/header.jsx'

const Index = ({ match }) => (
  <div className={pageStyle['page']}>
    <Header title="设置" goback="goback" address="/more"/>
    <main className={style['wrap']} style={{ marginTop: '0.88rem' }}>
      <h2>设置</h2>
      <Link className="menu-item" to="/more">返回</Link>
      <div className={style['m-listMenu']}>
        <i className="icon"></i>
        <span className={style['title']}>活动专区</span>
        <i className="icon "></i>
      </div>
      <div className={style['title']}>aaa</div>
    </main>
  </div>

)
export default Index
