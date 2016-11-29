define(['exports', 'react'], function (exports, _react) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

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

  var Canvas = function (_Component) {
    _inherits(Canvas, _Component);

    function Canvas(props) {
      _classCallCheck(this, Canvas);

      var _this = _possibleConstructorReturn(this, (Canvas.__proto__ || Object.getPrototypeOf(Canvas)).call(this, props));

      var pixelToWidgetId = [];
      var width = props.width;
      var height = props.height;
      for (var rotIdx = 0; rotIdx < 4; rotIdx++) {
        pixelToWidgetId[rotIdx] = [];
        for (var r = 0; r < height; r++) {
          pixelToWidgetId[rotIdx][r] = [];
          for (var c = 0; c < width; c++) {
            pixelToWidgetId[rotIdx][r][c] = -1;
          }
        }
        var _ref = [height, width];
        width = _ref[0];
        height = _ref[1];
      }

      _this.state = {
        pixelToWidgetId: pixelToWidgetId,
        widgetPositions: [[], [], [], []]
      };

      _this.propagatePixelToWidgetId = _this.propagatePixelToWidgetId.bind(_this);
      _this.propagateWidgetPositions = _this.propagateWidgetPositions.bind(_this);
      _this.positionWidgets = _this.positionWidgets.bind(_this);
      _this.verifyPixelToWidgetId = _this.verifyPixelToWidgetId.bind(_this);

      // this.positionWidgets(this.props);
      return _this;
    }

    _createClass(Canvas, [{
      key: 'propagatePixelToWidgetId',
      value: function propagatePixelToWidgetId(pixelToWidgetId, rotIdx, row, col) {
        var val = pixelToWidgetId[rotIdx][row][col];
        var width = rotIdx % 2 ? this.props.height : this.props.width;
        var height = rotIdx % 2 ? this.props.width : this.props.height;
        for (var i = (rotIdx + 1) % 4; i != rotIdx; i = (i + 1) % 4) {
          var _ref2 = [width - col - 1, row];
          row = _ref2[0];
          col = _ref2[1];
          var _ref3 = [height, width];
          width = _ref3[0];
          height = _ref3[1];

          pixelToWidgetId[i][row][col] = val;
        }
      }
    }, {
      key: 'propagateWidgetPositions',
      value: function propagateWidgetPositions(widgetPositions, rotIdx, widgetIdx) {
        var row = widgetPositions[rotIdx][widgetIdx].row;
        var col = widgetPositions[rotIdx][widgetIdx].col;
        var width = widgetPositions[rotIdx][widgetIdx].width;
        var height = widgetPositions[rotIdx][widgetIdx].height;

        var canvasWidth = rotIdx % 2 ? this.props.height : this.props.width;
        var canvasHeight = rotIdx % 2 ? this.props.width : this.props.height;
        for (var i = (rotIdx + 1) % 4; i != rotIdx; i = (i + 1) % 4) {
          var _ref4 = [canvasWidth - col - width, row];
          row = _ref4[0];
          col = _ref4[1];
          var _ref5 = [height, width];
          width = _ref5[0];
          height = _ref5[1];
          var _ref6 = [canvasHeight, canvasWidth];
          canvasWidth = _ref6[0];
          canvasHeight = _ref6[1];


          if (widgetPositions[i].length <= widgetIdx) {
            widgetPositions[i][widgetIdx] = {};
          }

          widgetPositions[i][widgetIdx].row = row;
          widgetPositions[i][widgetIdx].col = col;
          widgetPositions[i][widgetIdx].width = width;
          widgetPositions[i][widgetIdx].height = height;
        }
      }
    }, {
      key: 'verifyPixelToWidgetId',
      value: function verifyPixelToWidgetId() {
        for (var rotIdx = 0; rotIdx < 4; rotIdx++) {
          var width = rotIdx % 2 ? this.props.height : this.props.width;
          var height = rotIdx % 2 ? this.props.width : this.props.height;
          var scratch = [];
          for (var r = 0; r < height; r++) {
            scratch[r] = [];
            for (var c = 0; c < width; c++) {
              scratch[r][c] = -1;
            }
          }

          this.state.widgetPositions[rotIdx].forEach(function (widget, widgetIdx) {
            for (var r = widget.row; r < widget.row + widget.height; r++) {
              for (var c = widget.col; c < widget.col + widget.width; c++) {
                if (scratch[r][c] != -1) {
                  console.log('pixelToWidgetId error: rotIdx ' + rotIdx + ' row ' + r + ' col ' + c + ' has two widgets: ' + scratch[r][c] + ' and ' + widgetIdx);
                }
                scratch[r][c] = widgetIdx;
              }
            }
          });

          for (var r = 0; r < height; r++) {
            for (var c = 0; c < width; c++) {
              if (scratch[r][c] != this.state.pixelToWidgetId[rotIdx][r][c]) {
                console.log('pixelToWidgetId error: rotIdx ' + rotIdx + ' row ' + r + ' col ' + c + ' has incorrect value: expected ' + scratch[r][c] + ' actual ' + this.state.pixelToWidgetId[rotIdx][r][c]);
              }
            }
          }
        }
      }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;

        var canvasContent;
        if (this.props.widgets.length > 0) {
          // if widgets, render widgets
          canvasContent = this.props.widgets.map(function (widget, index) {
            var containerStyle = {
              position: 'absolute',
              top: _this2.state.widgetPositions[0][index].row - _this2.props.borderWidth,
              left: _this2.state.widgetPositions[0][index].col - _this2.props.borderWidth,
              width: _this2.state.widgetPositions[0][index].width,
              height: _this2.state.widgetPositions[0][index].height
            };
            return _react2.default.createElement(
              'div',
              { style: containerStyle, key: index },
              widget.widget
            );
          });
        } else {
          // if no widgets, render a prompt that says "click somewhere"
          canvasContent = _react2.default.createElement(
            'div',
            { style: { display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center' } },
            _react2.default.createElement(
              'div',
              { style: { color: '#AAAAAA', fontSize: '36px' } },
              'click somewhere'
            )
          );
        }
        return _react2.default.createElement(
          'div',
          {
            className: 'Canvas',
            style: {
              width: this.props.width + 'px',
              height: this.props.height + 'px',
              backgroundColor: '#FCFBE3',
              position: 'relative',
              border: this.props.borderWidth + 'px solid #CCCCCC',
              boxSizing: 'border-box'
            },
            onClick: this.props.onClick },
          canvasContent
        );
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        this.positionWidgets(nextProps);
      }
    }, {
      key: 'positionWidgets',
      value: function positionWidgets(nextProps) {
        var widgetPositions = JSON.parse(JSON.stringify(this.state.widgetPositions)); // inefficient; TODO: fix
        var pixelToWidgetId = JSON.parse(JSON.stringify(this.state.pixelToWidgetId));
        var propagatePixelToWidgetId = this.propagatePixelToWidgetId;

        function tryExpand(rotIdx, widgetPosition, widgetIdx) {
          // we try to expand downwards
          var canvasHeight = rotIdx % 2 ? nextProps.width : nextProps.height;
          var newR = widgetPosition.row + widgetPosition.height;
          if (newR >= canvasHeight) {
            return false;
          }
          for (var c = widgetPosition.col; c < widgetPosition.col + widgetPosition.width; c++) {
            if (pixelToWidgetId[rotIdx][newR][c] >= 0) {
              return false;
            }
          }

          // we can expand, so do it
          for (var c = widgetPosition.col; c < widgetPosition.col + widgetPosition.width; c++) {
            pixelToWidgetId[rotIdx][newR][c] = widgetIdx;
            propagatePixelToWidgetId(pixelToWidgetId, rotIdx, newR, c);
          }
          widgetPosition.height++;
          return true;
        }

        for (var widgetIdx = widgetPositions[0].length; widgetIdx < nextProps.widgets.length; widgetIdx++) {
          var newWidget = nextProps.widgets[widgetIdx];
          if (pixelToWidgetId[0][newWidget.row][newWidget.col] >= 0) {
            // cannot render widget, give it a width and height of 0
            widgetPositions[0].push({
              row: newWidget.row,
              col: newWidget.col,
              width: 0,
              height: 0
            });
            this.propagateWidgetPositions(widgetPositions, 0, widgetIdx);
            continue;
          }

          widgetPositions[0].push({
            row: newWidget.row,
            col: newWidget.col,
            width: 1,
            height: 1
          });
          this.propagateWidgetPositions(widgetPositions, 0, widgetIdx);
          pixelToWidgetId[0][newWidget.row][newWidget.col] = widgetIdx;
          this.propagatePixelToWidgetId(pixelToWidgetId, 0, newWidget.row, newWidget.col);

          // try expanding in all directions until we expand 100px or we cannot expand any more
          var expandCount = [0, 0, 0, 0];
          while (expandCount.some(function (val) {
            return val <= 100;
          })) {
            for (var i = 0; i < 4; i++) {
              if (expandCount[i] <= 100) {
                if (tryExpand(i, widgetPositions[i][widgetIdx], widgetIdx)) {
                  expandCount[i]++;
                  this.propagateWidgetPositions(widgetPositions, i, widgetIdx);
                } else {
                  expandCount[i] = 101;
                }
              }
            }
          }
        }

        this.setState({
          widgetPositions: widgetPositions,
          pixelToWidgetId: pixelToWidgetId
        });
      }
    }]);

    return Canvas;
  }(_react.Component);

  Canvas.defaultProps = {
    borderWidth: 2
  };

  exports.default = Canvas;
});