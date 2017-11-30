import React, { Component } from 'react'
import styles from './header.less'
import { Link } from 'react-router-dom'
// const Header = () => (
//     <header>
//         <div className="title">投资</div>
//     </header>

// )
// export default Header

export default class Header extends Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount () {
    // '//offline-news-api.herokuapp.com/stories'

  }
  render () {
    return (
      <header>
        <div>
          {
            this.props.goback
              ? <Link className={styles['J_back']} to={this.props.address}></Link> : ''
          }
          <div className={styles['title']}>
            {this.props.title || '爱贷网'}
          </div>
        </div>
      </header>)
  }
}
