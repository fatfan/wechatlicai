import React from "react";
import "./bidItem.less";
const BidItem = () => (
    <a className="list-item" href="/webchat/invest/bidDetail.html?bid=383515">
        <div className="title-container">
            <div className="title">企融贷-QRD01171016002</div>
            <div className="new-tag new-tag-type-4">金秋送爽</div>
        </div>

        <div className="properties">
            <div className="property interest">
                <div className="value">8.5<span className="unit">%</span></div>
                <div className="name">预期年化</div>
            </div>

            <div className="property">
                <div className="value">1<span className="unit">个月</span></div>
                <div className="name">项目期限</div>
            </div>

            <div className="property">
                <div className="value">100<span className="unit">元</span></div>
                <div className="name">起投金额</div>
            </div>
        </div>

        <div className="progress">
            <div className="value">96%</div>
            <svg viewBox="0 0 80 80">
                <circle stroke="#dddddd" strokeWidth="3" fill="transparent" r="36" cx="40" cy="40"></circle>
                <circle className="progress-ring" stroke="#FF5A56" strokeWidth="3" fill="transparent" r="36" cx="40" cy="40" style={{ "strokeDasharray": "226.19 226.19", "strokeDashoffset": "7.503763492063495" }}></circle>
            </svg>
        </div>
    </a>

)
export default BidItem