(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Task = function Task(name) {
  _classCallCheck(this, Task);

  this.id = new Date().getTime();
  this.name = name;
  this.isComplete = false;
  return this;
};

exports.default = Task;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _helpers = require("./helpers");

var _Task = _interopRequireDefault(require("./Task"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ToDoList =
/*#__PURE__*/
function () {
  function ToDoList(key) {
    _classCallCheck(this, ToDoList);

    this.key = key;

    if (!_helpers.ls.getItem(key)) {
      _helpers.ls.setItem(key, _helpers.json.stringify([]));
    }

    this.addTask = this.addTask.bind(this);
    this.editTask = this.editTask.bind(this);
    this.removeTask = this.removeTask.bind(this);
  }

  _createClass(ToDoList, [{
    key: "addTask",
    value: function addTask(e) {
      if (!e.target.value) {
        alert("No puedes agregar una tarea vacia");
      }

      if (e.keyCode === _helpers.ENTER_KEY) {
        var newTask = new _Task.default(e.target.value);

        var tasks = _helpers.json.parse(_helpers.ls.getItem(this.key));

        tasks.push(newTask);

        _helpers.ls.setItem(this.key, _helpers.json.stringify(tasks));

        (0, _helpers.c)(this.key, task, newTask, _helpers.ls);
        this.renderTask(newTask);
        e.target.value = null;
      }
    }
  }, {
    key: "removeTask",
    value: function removeTask(e) {
      if (e.target.localName === 'a') {
        //alert('eliminar')
        var tasks = _helpers.json.parse(_helpers.ls.getItem(this.key)),
            toRemove = tasks.findIndex(function (task) {
          return task.id.toString() === e.target.dataset.id;
        }); //c(tasks, toRemove)


        tasks.splice(toRemove, 1);

        _helpers.ls.setItem(this.key, _helpers.json.stringify(tasks));

        e.target.parentElement.remove();
      }
    }
  }, {
    key: "renderTask",
    value: function renderTask(task) {
      var templateTask = "\n        <li class=\"List-item ".concat(task.isComplete ? 'complete' : '', "\">\n          <input id=\"").concat(task.id, "\" type=\"checkbox\" class=\"List-checkbox\" ").concat(task.isComplete ? 'checked' : '', ">\n          <label data-id=\"").concat(task.id, "\" class=\"List-label\" contenteditable  spellcheck>").concat(task.name, "</label>\n          <a href=\"#\" data-id=\"").concat(task.id, "\" class=\"List-removeLink\">&#128465;</a>\n        </li>\n      ");
      list.insertAdjacentHTML('beforeend', templateTask);
    }
  }, {
    key: "editTask",
    value: function editTask(e) {
      var _this = this;

      console.log("EDIT");

      if (e.target.localName === 'label') {
        //alert('funciona')
        var tasks = _helpers.json.parse(_helpers.ls.getItem(this.key)),
            toEdit = tasks.findIndex(function (task) {
          return task.name === e.target.textContent;
        }),
            label = _helpers.doc.querySelector("[data-id=\"".concat(tasks[toEdit].id, "\"]")); //c(tasks, toEdit, tasks[toEdit])


        var saveTask = function saveTask(e) {
          e.target.textContent = e.target.textContent;
          tasks[toEdit].name = e.target.textContent;

          _helpers.ls.setItem(_this.key, _helpers.json.stringify(tasks));

          e.target.blur();
        };

        label.addEventListener('blur', function (e) {
          return saveTask(e);
        });
        label.addEventListener('keyup', function (e) {
          return e.keyCode === _helpers.ENTER_KEY && saveTask(e);
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var tasks = _helpers.json.parse(_helpers.ls.getItem(this.key));

      var listTasks = list.children;
      tasks.forEach(function (task) {
        return _this2.renderTask(task);
      });
      Array.from(listTasks).forEach(function (input) {
        input.querySelector('input[type="checkbox"]').addEventListener('change', function (e) {
          var task = tasks.filter(function (task) {
            return task.id == e.target.id;
          }); //c(task)

          if (e.target.checked) {
            e.target.parentElement.classList.add('complete');
            task[0].isComplete = true;
          } else {
            e.target.parentElement.classList.remove('complete');
            task[0].isComplete = false;
          }

          _helpers.ls.setItem(_this2.key, _helpers.json.stringify(tasks));
        });
      });
      task.addEventListener("keyup", this.addTask);
      list.addEventListener("click", this.editTask);
      list.addEventListener("click", this.removeTask);
    }
  }]);

  return ToDoList;
}();

exports.default = ToDoList;

},{"./Task":1,"./helpers":3}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ls = exports.json = exports.doc = exports.c = exports.ENTER_KEY = void 0;
var ENTER_KEY = 13,
    c = console.log,
    doc = document,
    json = JSON,
    ls = localStorage;
exports.ls = ls;
exports.json = json;
exports.doc = doc;
exports.c = c;
exports.ENTER_KEY = ENTER_KEY;

},{}],4:[function(require,module,exports){
"use strict";

var _helpers = require("./helpers");

var _ToDoList = _interopRequireDefault(require("./ToDoList"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var task = _helpers.doc.querySelector('#task'),
    list = _helpers.doc.querySelector('#list'),
    todo = new _ToDoList.default('edList');

todo.render();

},{"./ToDoList":2,"./helpers":3}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvVGFzay5qcyIsInNyYy9qcy9Ub0RvTGlzdC5qcyIsInNyYy9qcy9oZWxwZXJzLmpzIiwic3JjL2pzL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0lDQXFCLEksR0FDakIsY0FBYSxJQUFiLEVBQW1CO0FBQUE7O0FBQ2pCLE9BQUssRUFBTCxHQUFVLElBQUksSUFBSixHQUFXLE9BQVgsRUFBVjtBQUNBLE9BQUssSUFBTCxHQUFZLElBQVo7QUFDQSxPQUFLLFVBQUwsR0FBa0IsS0FBbEI7QUFDQSxTQUFPLElBQVA7QUFDRCxDOzs7Ozs7Ozs7Ozs7QUNOTDs7QUFDQTs7Ozs7Ozs7OztJQUVxQixROzs7QUFDakIsb0JBQVksR0FBWixFQUFnQjtBQUFBOztBQUNaLFNBQUssR0FBTCxHQUFXLEdBQVg7O0FBRUEsUUFBSSxDQUFDLFlBQUcsT0FBSCxDQUFXLEdBQVgsQ0FBTCxFQUFzQjtBQUNsQixrQkFBRyxPQUFILENBQVcsR0FBWCxFQUFnQixjQUFLLFNBQUwsQ0FBZSxFQUFmLENBQWhCO0FBRUg7O0FBRUQsU0FBSyxPQUFMLEdBQWUsS0FBSyxPQUFMLENBQWEsSUFBYixDQUFrQixJQUFsQixDQUFmO0FBQ0EsU0FBSyxRQUFMLEdBQWdCLEtBQUssUUFBTCxDQUFjLElBQWQsQ0FBbUIsSUFBbkIsQ0FBaEI7QUFDQSxTQUFLLFVBQUwsR0FBa0IsS0FBSyxVQUFMLENBQWdCLElBQWhCLENBQXFCLElBQXJCLENBQWxCO0FBRUg7Ozs7NEJBRU8sQyxFQUFFO0FBQ04sVUFBSyxDQUFDLENBQUMsQ0FBQyxNQUFGLENBQVMsS0FBZixFQUFzQjtBQUNsQixRQUFBLEtBQUssQ0FBQyxtQ0FBRCxDQUFMO0FBQ0g7O0FBRUQsVUFBSSxDQUFDLENBQUMsT0FBRixLQUFjLGtCQUFsQixFQUE2QjtBQUN6QixZQUFJLE9BQU8sR0FBRyxJQUFJLGFBQUosQ0FB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LFdBSEQsTUFHTztBQUNMLFlBQUEsQ0FBQyxDQUFDLE1BQUYsQ0FBUyxhQUFULENBQXVCLFNBQXZCLENBQWlDLE1BQWpDLENBQXdDLFVBQXhDO0FBQ0EsWUFBQSxJQUFJLENBQUMsQ0FBRCxDQUFKLENBQVEsVUFBUixHQUFxQixLQUFyQjtBQUNEOztBQUVELHNCQUFHLE9BQUgsQ0FBWSxNQUFJLENBQUMsR0FBakIsRUFBc0IsY0FBSyxTQUFMLENBQWUsS0FBZixDQUF0QjtBQUNELFNBYkQ7QUFjRCxPQWZIO0FBaUJBLE1BQUEsSUFBSSxDQUFDLGdCQUFMLENBQXNCLE9BQXRCLEVBQStCLEtBQUssT0FBcEM7QUFDQSxNQUFBLElBQUksQ0FBQyxnQkFBTCxDQUFzQixPQUF0QixFQUErQixLQUFLLFFBQXBDO0FBQ0EsTUFBQSxJQUFJLENBQUMsZ0JBQUwsQ0FBc0IsT0FBdEIsRUFBK0IsS0FBSyxVQUFwQztBQUdIOzs7Ozs7Ozs7Ozs7Ozs7QUN2SEwsSUFBTSxTQUFTLEdBQUcsRUFBbEI7QUFBQSxJQUNBLENBQUMsR0FBRyxPQUFPLENBQUMsR0FEWjtBQUFBLElBRUEsR0FBRyxHQUFHLFFBRk47QUFBQSxJQUdBLElBQUksR0FBRyxJQUhQO0FBQUEsSUFJQSxFQUFFLEdBQUcsWUFKTDs7Ozs7Ozs7OztBQ0FBOztBQUNBOzs7O0FBRUEsSUFBTSxJQUFJLEdBQUcsYUFBSSxhQUFKLENBQWtCLE9BQWxCLENBQWI7QUFBQSxJQUNFLElBQUksR0FBRyxhQUFJLGFBQUosQ0FBa0IsT0FBbEIsQ0FEVDtBQUFBLElBRUUsSUFBSSxHQUFHLElBQUksaUJBQUosQ0FBYSxRQUFiLENBRlQ7O0FBSUEsSUFBSSxDQUFDLE1BQUwiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBUYXNrIHtcbiAgICBjb25zdHJ1Y3RvciAobmFtZSkge1xuICAgICAgdGhpcy5pZCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpXG4gICAgICB0aGlzLm5hbWUgPSBuYW1lXG4gICAgICB0aGlzLmlzQ29tcGxldGUgPSBmYWxzZVxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG4gIH0iLCJpbXBvcnQgeyBFTlRFUl9LRVksIGMsIGRvYywganNvbiwgbHMgfSBmcm9tICcuL2hlbHBlcnMnO1xuaW1wb3J0IFRhc2sgZnJvbSAnLi9UYXNrJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9Eb0xpc3Qge1xuICAgIGNvbnN0cnVjdG9yKGtleSl7XG4gICAgICAgIHRoaXMua2V5ID0ga2V5O1xuXG4gICAgICAgIGlmICghbHMuZ2V0SXRlbShrZXkpKSB7XG4gICAgICAgICAgICBscy5zZXRJdGVtKGtleSwganNvbi5zdHJpbmdpZnkoW10pKVxuXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmFkZFRhc2sgPSB0aGlzLmFkZFRhc2suYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5lZGl0VGFzayA9IHRoaXMuZWRpdFRhc2suYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5yZW1vdmVUYXNrID0gdGhpcy5yZW1vdmVUYXNrLmJpbmQodGhpcyk7XG5cbiAgICB9XG5cbiAgICBhZGRUYXNrKGUpe1xuICAgICAgICBpZiAoICFlLnRhcmdldC52YWx1ZSApe1xuICAgICAgICAgICAgYWxlcnQoXCJObyBwdWVkZXMgYWdyZWdhciB1bmEgdGFyZWEgdmFjaWFcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiggZS5rZXlDb2RlID09PSBFTlRFUl9LRVkgKXtcbiAgICAgICAgICAgIGxldCBuZXdUYXNrID0gbmV3IFRhc2soIGUudGFyZ2V0LnZhbHVlICk7XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgbGV0IHRhc2tzID0ganNvbi5wYXJzZSggbHMuZ2V0SXRlbSh0aGlzLmtleSkgKTtcbiAgICAgICAgICAgIHRhc2tzLnB1c2goIG5ld1Rhc2sgKTtcbiAgICAgICAgICAgIGxzLnNldEl0ZW0oIHRoaXMua2V5LCBqc29uLnN0cmluZ2lmeSh0YXNrcykgKTtcblxuICAgICAgICAgICAgYyh0aGlzLmtleSwgdGFzaywgbmV3VGFzaywgbHMpO1xuXG5cbiAgICAgICAgICAgIHRoaXMucmVuZGVyVGFzayggbmV3VGFzayApXG4gICAgICAgICAgICBlLnRhcmdldC52YWx1ZSA9IG51bGxcblxuICAgICAgICB9XG5cblxuICAgIH1cblxuICAgIHJlbW92ZVRhc2soZSl7XG5cbiAgICAgICAgaWYgKCBlLnRhcmdldC5sb2NhbE5hbWUgPT09ICdhJyApIHtcbiAgICAgICAgICAgIC8vYWxlcnQoJ2VsaW1pbmFyJylcbiAgICAgICAgICAgIGxldCB0YXNrcyA9IGpzb24ucGFyc2UoIGxzLmdldEl0ZW0odGhpcy5rZXkpICksXG4gICAgICAgICAgICAgIHRvUmVtb3ZlID0gIHRhc2tzLmZpbmRJbmRleCggdGFzayA9PiB0YXNrLmlkLnRvU3RyaW5nKCkgPT09IGUudGFyZ2V0LmRhdGFzZXQuaWQgKVxuICAgICAgICAgICAgLy9jKHRhc2tzLCB0b1JlbW92ZSlcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGFza3Muc3BsaWNlKHRvUmVtb3ZlICwxKVxuICAgICAgICAgICAgbHMuc2V0SXRlbSggdGhpcy5rZXksIGpzb24uc3RyaW5naWZ5KHRhc2tzKSApXG4gICAgICAgICAgICBlLnRhcmdldC5wYXJlbnRFbGVtZW50LnJlbW92ZSgpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJUYXNrKHRhc2spe1xuICAgICAgICBsZXQgdGVtcGxhdGVUYXNrID0gYFxuICAgICAgICA8bGkgY2xhc3M9XCJMaXN0LWl0ZW0gJHt0YXNrLmlzQ29tcGxldGUgPyAnY29tcGxldGUnIDogJyd9XCI+XG4gICAgICAgICAgPGlucHV0IGlkPVwiJHt0YXNrLmlkfVwiIHR5cGU9XCJjaGVja2JveFwiIGNsYXNzPVwiTGlzdC1jaGVja2JveFwiICR7dGFzay5pc0NvbXBsZXRlID8gJ2NoZWNrZWQnIDogJyd9PlxuICAgICAgICAgIDxsYWJlbCBkYXRhLWlkPVwiJHt0YXNrLmlkfVwiIGNsYXNzPVwiTGlzdC1sYWJlbFwiIGNvbnRlbnRlZGl0YWJsZSAgc3BlbGxjaGVjaz4ke3Rhc2submFtZX08L2xhYmVsPlxuICAgICAgICAgIDxhIGhyZWY9XCIjXCIgZGF0YS1pZD1cIiR7dGFzay5pZH1cIiBjbGFzcz1cIkxpc3QtcmVtb3ZlTGlua1wiPiYjMTI4NDY1OzwvYT5cbiAgICAgICAgPC9saT5cbiAgICAgIGBcbiAgICAgIGxpc3QuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCB0ZW1wbGF0ZVRhc2spXG5cbiAgICB9XG5cbiAgICBlZGl0VGFzayhlKXtcblxuICAgICAgICBjb25zb2xlLmxvZyhcIkVESVRcIilcbiAgICAgICAgaWYgKCBlLnRhcmdldC5sb2NhbE5hbWUgPT09ICdsYWJlbCcgKSB7XG4gICAgICAgICAgICAvL2FsZXJ0KCdmdW5jaW9uYScpXG4gICAgICAgICAgICBsZXQgdGFza3MgPSBqc29uLnBhcnNlKCBscy5nZXRJdGVtKHRoaXMua2V5KSApLFxuICAgICAgICAgICAgICB0b0VkaXQgPSAgdGFza3MuZmluZEluZGV4KCB0YXNrID0+IHRhc2submFtZSA9PT0gZS50YXJnZXQudGV4dENvbnRlbnQgKSxcbiAgICAgICAgICAgICAgbGFiZWwgPSBkb2MucXVlcnlTZWxlY3RvcihgW2RhdGEtaWQ9XCIke3Rhc2tzW3RvRWRpdF0uaWR9XCJdYClcbiAgICAgICAgICAgIC8vYyh0YXNrcywgdG9FZGl0LCB0YXNrc1t0b0VkaXRdKVxuICAgICAgXG4gICAgICAgICAgICBjb25zdCBzYXZlVGFzayA9IGUgPT4ge1xuICAgICAgICAgICAgICBlLnRhcmdldC50ZXh0Q29udGVudCA9IGUudGFyZ2V0LnRleHRDb250ZW50XG4gICAgICAgICAgICAgIHRhc2tzW3RvRWRpdF0ubmFtZSA9IGUudGFyZ2V0LnRleHRDb250ZW50XG4gICAgICAgICAgICAgIGxzLnNldEl0ZW0oIHRoaXMua2V5LCBqc29uLnN0cmluZ2lmeSh0YXNrcykgKVxuICAgICAgICAgICAgICBlLnRhcmdldC5ibHVyKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgbGFiZWwuYWRkRXZlbnRMaXN0ZW5lciggJ2JsdXInLCBlID0+IHNhdmVUYXNrKGUpICk7XG4gICAgICAgICAgICBsYWJlbC5hZGRFdmVudExpc3RlbmVyKCAna2V5dXAnLCBlID0+ICggZS5rZXlDb2RlID09PSBFTlRFUl9LRVkgKSAmJiBzYXZlVGFzayhlKSApO1xuICAgICAgICB9XG5cbiAgICB9XG5cblxuICAgIHJlbmRlcigpe1xuXG4gICAgICAgIGxldCB0YXNrcyA9IGpzb24ucGFyc2UoIGxzLmdldEl0ZW0oIHRoaXMua2V5ICkgKTtcbiAgICAgICAgbGV0IGxpc3RUYXNrcyA9IGxpc3QuY2hpbGRyZW5cblxuICAgICAgICB0YXNrcy5mb3JFYWNoKCB0YXNrID0+IHRoaXMucmVuZGVyVGFzayh0YXNrKSApO1xuXG4gICAgICAgIEFycmF5LmZyb20obGlzdFRhc2tzKS5mb3JFYWNoKGlucHV0ID0+IHtcbiAgICAgICAgICAgIGlucHV0LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W3R5cGU9XCJjaGVja2JveFwiXScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGUgPT4ge1xuICAgICAgICAgICAgICBsZXQgdGFzayA9IHRhc2tzLmZpbHRlciggdGFzayA9PiB0YXNrLmlkID09IGUudGFyZ2V0LmlkIClcbiAgICAgICAgICAgICAgLy9jKHRhc2spXG4gICAgICBcbiAgICAgICAgICAgICAgaWYgKCBlLnRhcmdldC5jaGVja2VkICkge1xuICAgICAgICAgICAgICAgIGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnY29tcGxldGUnKVxuICAgICAgICAgICAgICAgIHRhc2tbMF0uaXNDb21wbGV0ZSA9IHRydWVcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2NvbXBsZXRlJylcbiAgICAgICAgICAgICAgICB0YXNrWzBdLmlzQ29tcGxldGUgPSBmYWxzZVxuICAgICAgICAgICAgICB9XG4gICAgICBcbiAgICAgICAgICAgICAgbHMuc2V0SXRlbSggdGhpcy5rZXksIGpzb24uc3RyaW5naWZ5KHRhc2tzKSApXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0pXG5cbiAgICAgICAgdGFzay5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgdGhpcy5hZGRUYXNrKTtcbiAgICAgICAgbGlzdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5lZGl0VGFzayk7XG4gICAgICAgIGxpc3QuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMucmVtb3ZlVGFzayk7XG5cblxuICAgIH1cbn0iLCJcbmNvbnN0IEVOVEVSX0tFWSA9IDEzLFxuYyA9IGNvbnNvbGUubG9nLFxuZG9jID0gZG9jdW1lbnQsXG5qc29uID0gSlNPTixcbmxzID0gbG9jYWxTdG9yYWdlXG5cbmV4cG9ydCB7XG5FTlRFUl9LRVksXG5jLFxuZG9jLFxuanNvbixcbmxzXG59IiwiXG5pbXBvcnQgeyBkb2MgfSBmcm9tICcuL2hlbHBlcnMnXG5pbXBvcnQgVG9Eb0xpc3QgZnJvbSAnLi9Ub0RvTGlzdCdcblxuY29uc3QgdGFzayA9IGRvYy5xdWVyeVNlbGVjdG9yKCcjdGFzaycpLFxuICBsaXN0ID0gZG9jLnF1ZXJ5U2VsZWN0b3IoJyNsaXN0JyksXG4gIHRvZG8gPSBuZXcgVG9Eb0xpc3QoJ2VkTGlzdCcpO1xuXG50b2RvLnJlbmRlcigpOyJdfQ==
