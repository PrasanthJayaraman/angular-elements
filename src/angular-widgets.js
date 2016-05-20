

  // Create all modules and define dependencies to make sure they exist
  // and are loaded in the correct order to satisfy dependency injection
  // before all nested files are concatenated by Gulp
  angular.module('angularWidgets', ['formDirective', 'matchDirective', 'minMaxDirective', 'checkboxDirective']);

  angular.module('formDirective', [])
  .directive('formFor', ['$templateCache','$http', function ($templateCache, $http) {
    return {
        restrict : 'EA',
        replace: false,
        template : function(el, attr){

            var formNameCounter = 1;

            randomFormName = function() {
                return "myForm" + (formNameCounter++);
            }

          var isDirectChild = function(form, el) {
                var testel;
                testel = el;
                while (testel) {
                    if (testel.attributes.getNamedItem('form-for')) {
                        if (testel.isSameNode(form)) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                    testel = testel.parentNode;
                }
                return false;
            };

            __hasProp = {}.hasOwnProperty;
            var setAttrs = function(el, attrs) {
                var attr, value, _results;
                _results = [];
                for (attr in attrs) {
                    if (!__hasProp.call(attrs, attr)) continue;
                    value = attrs[attr];
                    _results.push(el.attr(attr, value || true));
                }
                return _results;
            };


            var inputControl = '<div class="control-group"><label class="control-label" for="::id">::label <span class="error">::asterisk</span></label><div class="controls" ng-class="{errField: (::formName.::name.$dirty && ::formName.::name.$invalid)}">::content</div><span class="error" ng-class="{show: (::formName.::name.$error.required && ::formName.::name.$dirty && ::formName.::name.$invalid)}" style="display: none">::label is required</span><span class="error" ng-class="{show: ::formName.::name.$error.minlength}" style="display: none">::label should be minimum ::min characters</span><span class="error" ng-class="{show: ::formName.::name.$error.maxlength}" style="display: none">::label should not exceed ::max characters</span><span class="error" ng-class="{show: (!::formName.::name.$error.ngMax && !::formName.::name.$error.ngMin &&::formName.::name.$error.::type)}" style="display: none">::name is invalid</span><span class="error" ng-class="{show: (!::formName.::name.$pristine && ::formName.::name.$error.matchError)}" style="display: none">::label does not match</span><span class="error" ng-class="{show: ::formName.::name.$error.ngMin}" style="display: none">::label should be minimum ::minvalue</span><span class="error" ng-class="{show: ::formName.::name.$error.ngMax}" style="display:none">::label should be maximum ::maxvalue</span></div>';
            var emptyControl = '<div class="control-group">::content</div>';
            var model = el.attr('model');
            var formName, input, inputGenerator, _ref, _i, _len, _ref, tplEle, actualControl;
            formName = attr.name || randomFormName();
            attr.$set('name', formName);
            attr.$set('novalidate');
            inputGenerator = function (el) {
                var attrs, _i, _len, _ref, inputEl, spanEl, spanArray = [], asterisk;
                var input = angular.element(el);
                var name = input.attr('name');
                var modelName = model + '.' + name;
                var type = input.attr('as');
                var label = input.attr('label') || name;
                var min = input.attr('min');
                var max = input.attr('max');
                var minValue = input.attr('min-value');
                var maxValue = input.attr('max-value');
                var required = input.attr('required');
                var value = input.attr('value');
                var disabled = input.attr('disabled');
                var attributes = {}, spanAttributes = {};
                _ref = input.prop("attributes");
                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                    attrs = _ref[_i];
                    attributes[attrs.name] = attrs.value;
                }
                if(typeof min != 'undefined') {
                    attributes['ng-minlength'] = min;
                }
                if(typeof max != 'undefined') {
                    attributes['ng-maxlength'] = max;
                }
                if(typeof required != 'undefined'){
                    attributes['required'] = true;
                    asterisk = "*"
                } else {
                    asterisk = ""
                }
                attributes['ng-model'] = modelName;
                attributes['name'] = name;
                attributes['id'] = name;
                delete attributes['as'];
                delete attributes['min'];
                delete attributes['max'];
                if(type == 'textarea'){
                    attributes['type'] = type;
                    attributes['class'] = 'form-control';
                    attributes['name'] = name;
                    attributes['id'] = name;
                    inputEl = angular.element('<textarea></textarea>');
                    setAttrs(inputEl, attributes);
                    actualControl = inputControl;
                } else if(type == 'submit') {
                    delete attributes['ng-model'];
                    attributes['type'] = type;
                    attributes['value'] = value;
                    attributes['class'] = 'btn btn-primary';
                    attributes['id'] = value;
                    attributes['ng-disabled'] = formName + '.$invalid'
                    inputEl = angular.element('<input />');
                    setAttrs(inputEl, attributes);
                    actualControl = emptyControl;
                }  else if(type == 'button') {
                    delete attributes['ng-model'];
                    attributes['type'] = type;
                    attributes['value'] = value;
                    attributes['class'] = 'btn btn-primary';
                    attributes['id'] = value;
                    inputEl = angular.element('<input />');
                    setAttrs(inputEl, attributes);
                    actualControl = emptyControl;
                } else if(type == 'hidden') {
                    attributes['type'] = type;
                    attributes['value'] = value;
                    attributes['class'] = 'form-control';
                    attributes['id'] = value;
                    inputEl = angular.element('<input />');
                    setAttrs(inputEl, attributes);
                    actualControl = emptyControl;
                } else {
                    attributes['type'] = type;
                    attributes['name'] = name;
                    attributes['class'] = 'form-control';
                    attributes['id'] = name;
                    inputEl = angular.element('<input />');
                    setAttrs(inputEl, attributes);
                    actualControl = inputControl;
                }
                return actualControl.replace(/::formName/g, formName).replace(/::name/g, name).replace(/::asterisk/g, asterisk).replace(/::minvalue/g, minValue).replace(/::maxvalue/g, maxValue).replace(/::min/g, min).replace(/::max/g, max).replace(/::id/g, name).replace(/::label/g, label).replace(/::type/g, type).replace(/::content/, inputEl[0].outerHTML);
            }
            tplEle = el.clone();
            var root = tplEle[0];
            _ref = tplEle.find("widget");
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                input = _ref[_i];
                if (isDirectChild(root, input)) {
                    angular.element(input).replaceWith(inputGenerator(input));
                }
            }
            template = tplEle.html();
            return template;
        }
    };
  }]);

  angular.module('matchDirective', [])
    .directive('match', [function () {
          return {
              require: 'ngModel',
              link: function (scope, elem, attrs, ctrl) {
                  var firstField = '#' + attrs.match;
                  $(elem).add(firstField).on('keyup', function () {
                      scope.$apply(function () {
                          var v = elem.val()===$(firstField).val();
                          ctrl.$setValidity('matchError', v);
                      });
                  });
              }
          };
    }]);



  angular.module('minMaxDirective', [])
      .directive('minValue', function () {
          return {
              restrict: 'A',
              require: 'ngModel',
              link: function (scope, elem, attr, ctrl) {
                  function isEmpty(value) {
                      return angular.isUndefined(value) || value === '' || value === null || value !== value;
                  }

                  scope.$watch(attr.minValue, function () {
                      ctrl.$setViewValue(ctrl.$viewValue);
                  });
                  var minValidator = function (value) {
                      var min = scope.$eval(attr.minValue) || 0;
                      if (!isEmpty(value) && value < min) {
                          ctrl.$setValidity('ngMin', false);
                          return undefined;
                      } else {
                          ctrl.$setValidity('ngMin', true);
                          return value;
                      }
                  };

                  ctrl.$parsers.push(minValidator);
                  ctrl.$formatters.push(minValidator);
              }
          };
  })

      .directive('maxValue', function () {
          return {
              restrict: 'A',
              require: 'ngModel',
              link: function (scope, elem, attr, ctrl) {
                  function isEmpty(value) {
                      return angular.isUndefined(value) || value === '' || value === null || value !== value;
                  }

                  scope.$watch(attr.maxValue, function () {
                      ctrl.$setViewValue(ctrl.$viewValue);
                  });
                  var maxValidator = function (value) {
                      var max = scope.$eval(attr.maxValue) || Infinity;
                      if (!isEmpty(value) && value > max) {
                          ctrl.$setValidity('ngMax', false);
                          return undefined;
                      } else {
                          ctrl.$setValidity('ngMax', true);
                          return value;
                      }
                  };

                  ctrl.$parsers.push(maxValidator);
                  ctrl.$formatters.push(maxValidator);
              }
          };
  });

  angular.module('checkboxDirective', [])
      .directive('widgetDrop', function() {
          return {
              restrict: 'EA',
              scope: {
                  items: '=',
                  model: '=',
                  title: '@',
                  selectedItemsChanged: '&'
              },
              template: '<label>{{title}}</label><select ng-model="model" class="form-control"  ng-change="selectedItemsChanged({selectedItem:model})" ng-options="item.value as item.name for item in items track by item.value"><option value="" selected>--select an option--</option></select>',
              link: function (scope, elem, attr) {
                  var selected = scope.model || '';
                  scope.selectedItemsChanged = function (item) {
                      scope.model = item.selectedItem;
                  }
              }
          }
      })

      .directive('widgetCheck', function() {
          return {
              restrict: 'EA',
              scope: {
                  items: '=',
                  model: '=',
                  title: '@'
              },
              template: '<label>{{title}}</label><div ng-repeat="item in items"><label><input type="checkbox" ng-model="model" value="item.value" ng-change="checkboxChanged({item:item})"  />{{item.name}}</label></div>',
              link: function(scope, element, attrs) {
                  var selected = scope.model || [];
                  scope.checkboxChanged = function(obj) {
                      var idx = selected.indexOf(obj.item);
                      if(idx > -1){
                          selected.splice(idx, 1);
                      } else {
                          selected.push(obj.item);
                      }
                      scope.model = selected;
                  }
              }
          }
      })

      .directive('widgetRadio', function() {
          return {
              restrict: 'EA',
              scope: {
                  items: '=',
                  model: '=',
                  title: '@',
                  name: '@'
              },
              template: '<label>{{title}}</label><div ng-repeat="item in items"><label><input type="radio" ng-model="model" name="name" ng-value="item.value" ng-click="radioChanged({item:item})"  />{{item.name}}</label></div>',
              link: function(scope, element, attrs) {
                  scope.model = scope.model || '';
                  scope.radioChanged = function(obj) {
                      scope.model = '';
                      scope.model = obj.item;
                  }
              }
          };
      });
