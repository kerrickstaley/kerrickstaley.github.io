define(['exports', 'react', 'react-dom', './Canvas.js', './Widget.js'], function (exports, _react, _reactDom, _Canvas, _Widget) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _reactDom2 = _interopRequireDefault(_reactDom);

  var _Canvas2 = _interopRequireDefault(_Canvas);

  var _Widget2 = _interopRequireDefault(_Widget);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var App = function (_Component) {
    _inherits(App, _Component);

    function App(props) {
      _classCallCheck(this, App);

      var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

      _this.state = {
        widgets: []
      };

      _this.addWidgetOnClick = _this.addWidgetOnClick.bind(_this);
      return _this;
    }

    _createClass(App, [{
      key: 'render',
      value: function render() {
        return _react2.default.createElement(_Canvas2.default, { width: 640, height: 480, widgets: this.state.widgets, onClick: this.addWidgetOnClick });
      }
    }, {
      key: 'addWidgetOnClick',
      value: function addWidgetOnClick(event) {
        event.preventDefault();
        var canvasBounds = _reactDom2.default.findDOMNode(this).getBoundingClientRect();
        var widgetInfo = {
          row: event.clientY - Math.floor(canvasBounds.top),
          col: event.pageX - Math.floor(canvasBounds.left),
          widget: _react2.default.createElement(_Widget2.default, null)
        };
        this.setState({
          widgets: this.state.widgets.concat([widgetInfo])
        });
      }
    }]);

    return App;
  }(_react.Component);

  exports.default = App;
});