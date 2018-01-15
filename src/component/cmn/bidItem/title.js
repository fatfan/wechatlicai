import React from 'react'

import './index.less'

const FLAGS = {
    1: '车抵贷',
    3: '企融贷',
    4: '融租贷',
    5: '分期宝'
}

export default function BidItemTitle({ className, ...content }) {
    return (
        <div className={className} styleName='title-container'>
            {content.name && <div styleName='title'>{content.name}</div>}
            {(content.bidType && content.bidType === 1) && <div styleName='type-title'>{FLAGS[content.flag] || '企融贷'}</div>}
            {content.isCashQuan !== 0 && <div styleName='tag'>抵</div>}
            {content.isAprQuan !== 0 && <div styleName='tag'>息</div>}
            {(content.award === 'bl' || content.award === 'gd') && <div styleName="tag tag-award">奖{content.awardAccount}</div>}
            {content.activeArray && content.activeArray.map((item) => (
                <div key={item.activeUrl} styleName="tag-active" data-href={item.activeUrl} style={{ backgroundImage: `url(${item.activeImg})` }} />
            ))}
            {content.tagsArray && content.tagsArray.map((tag) => (
                <div key={tag.tagType} styleName={`tag-new ${tag.tagType === 1 ? 'tag-new-1' : ''}`}>{tag.tagName}</div>
            ))}
        </div>
    )
}
