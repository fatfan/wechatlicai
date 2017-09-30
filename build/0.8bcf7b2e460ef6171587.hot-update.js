webpackHotUpdate(0,{

/***/ 275:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(5);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(24);

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//import "./dlog.css";

var Demo = function (_React$Component) {
    _inherits(Demo, _React$Component);

    _createClass(Demo, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement(Child, { test: this.aaa, message: this.state.message }),
                _react2.default.createElement("input", { type: "text", value: this.state.message, onChange: this.Change }),
                _react2.default.createElement(
                    "button",
                    { onClick: this.showChildMessage },
                    "qqqqq456444\u91CC\u8981\u62FFasdasasdasdasddasd\u4F20\u7684\u6570\u636Ebbb"
                ),
                _react2.default.createElement(
                    "div",
                    null,
                    this.state.message
                )
            );
        }
    }]);

    function Demo() {
        _classCallCheck(this, Demo);

        var _this = _possibleConstructorReturn(this, (Demo.__proto__ || Object.getPrototypeOf(Demo)).call(this));

        _this.aaa = function (event) {
            //console.log(event);
            _this.setState({
                message: event
            });
        };

        _this.showChildMessage = function () {
            alert(_this.state.message);
        };

        _this.Change = function (e) {
            _this.setState({
                message: e.target.value
            });
        };

        _this.state = {
            message: "1"
        };
        return _this;
    }

    return Demo;
}(_react2.default.Component);

exports.default = Demo;

var Child = function (_React$Component2) {
    _inherits(Child, _React$Component2);

    _createClass(Child, [{
        key: "render",
        value: function render() {
            var _this3 = this;

            return _react2.default.createElement(
                "div",
                { className: "child" },
                "\u6211\u662F\u5B50\u96C6",
                _react2.default.createElement(
                    "button",
                    { onClick: function onClick() {
                            _this3.getData();
                        } },
                    "\u4F20\u7ED9\u7236\u6570\u636E"
                ),
                _react2.default.createElement(
                    "div",
                    null,
                    this.props.message
                )
            );
        }
    }]);

    function Child() {
        _classCallCheck(this, Child);

        var _this2 = _possibleConstructorReturn(this, (Child.__proto__ || Object.getPrototypeOf(Child)).call(this));

        _this2.getData = function () {
            _this2.props.test(_this2.state.message);
        };

        _this2.state = {
            message: "子组件的内容"
        };
        return _this2;
    }

    return Child;
}(_react2.default.Component);

/***/ })

})