

  //Angular Widgets Wrapper
  angular.module('angularElements', ['formDirective', 'matchDirective', 'minMaxDirective', 'widgetDirective']);

  //form directive to create form
  angular.module('formDirective', [])
  .directive('formFor', ['$templateCache','$http', function ($templateCache, $http) {
    return {
        restrict : 'EA',
        replace: false,
        template : function(el, attr){

            var formNameCounter = 1;

            // if no form name assigned then assign a name automatically
            randomFormName = function() {
                return "myForm" + (formNameCounter++);
            }

            // check whether the <widget> tag is a child of form (parent)
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

            // create jqlite elements for each attribute and set the attributes to incoming input element
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

            // Common for input controls like text, date, email, number, password, url
            var inputControl = '<div class="control-group"><label class="control-label" for="::id">::label <span class="error">::asterisk</span></label>\
                                <div class="controls" ng-class="{errField: (::formName.::name.$dirty && ::formName.::name.$invalid && ::formName.::name.$error.required)}">::content</div>\
                                <span class="error" ng-if="::reqSpan" ng-class="{show: (::formName.::name.$error.required && ::formName.::name.$dirty && ::formName.::name.$invalid)}" style="display: none">::label is required</span>\
                                <span class="error" ng-if="::reqSpan" ng-class="{show: (!::formName.::name.$error.ngMax && !::formName.::name.$error.ngMin &&::formName.::name.$error.::type)}" style="display: none">::name is invalid</span>\
                                <span class="error" ng-if="::lessLenSpan" ng-class="{show: ::formName.::name.$error.minlength}" style="display: none">::label should be minimum ::min characters</span>\
                                <span class="error" ng-if="::moreLenSpan" ng-class="{show: ::formName.::name.$error.maxlength}" style="display: none">::label should not exceed ::max characters</span>\
                                <span class="error" ng-if="::matchSpan" ng-class="{show: (!::formName.::name.$pristine && ::formName.::name.$error.matchError)}" style="display: none">::label does not match</span>\
                                <span class="error" ng-if="::miValSpan" ng-class="{show: ::formName.::name.$error.ngMin}" style="display: none">::label should be minimum ::minvalue</span>\
                                <span class="error" ng-if="::maValSpan" ng-class="{show: ::formName.::name.$error.ngMax}" style="display:none">::label should be maximum ::maxvalue</span>\
                                </div>';

            // common for textarea, button, submit
            var emptyControl = '<div class="control-group">::content</div>';
            var model = el.attr('model');
            var formName, input, inputGenerator, _ref, _i, _len, _ref, tplEle, actualControl;
            formName = attr.name || randomFormName();
            attr.$set('name', formName);
            attr.$set('novalidate');
            //get the attributes of the widget tag and generate native angular attributes
            inputGenerator = function (el) {
                var attrs, _i, _len, _ref, inputEl, spanEl, spanArray = [], asterisk, reqSpan = false, lessLenSpan = false, moreLenSpan = false, miValSpan = false, maValSpan = false, matchSpan = false;
                var input = angular.element(el);
                var name = input.attr('name');
                var modelName = model + '.' + name;
                var type = input.attr('as');
                var clas = input.attr('class') + ' ';
                var label = input.attr('label') || name;
                var min = input.attr('min-len');
                var max = input.attr('max-len');
                var minValue = input.attr('min-value');
                var maxValue = input.attr('max-value');
                var required = input.attr('required');
                var value = input.attr('value');
                var disabled = input.attr('disabled');
                var match = input.attr('match');
                var attributes = {}, spanAttributes = {};
                _ref = input.prop("attributes");
                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                    attrs = _ref[_i];
                    attributes[attrs.name] = attrs.value;
                }
                if(typeof min != 'undefined') {
                    attributes['ng-minlength'] = min;
                    lessLenSpan = true;
                }
                if(typeof max != 'undefined') {
                    attributes['ng-maxlength'] = max;
                    moreLenSpan = true
                }
                if(typeof required != 'undefined'){
                    attributes['required'] = true;
                    asterisk = "*"
                    reqSpan = true;
                } else {
                    asterisk = ""
                }
                if(typeof minValue != 'undefined') {
                    miValSpan = true
                }
                if(typeof maxValue != 'undefined') {
                    maValSpan = true
                }
                if(typeof match != 'undefined') {
                    matchSpan = true;
                    var matched = match;
                    attributes['match'] = model + '.' + matched;
                }
                attributes['ng-model'] = modelName;
                attributes['name'] = name;
                attributes['id'] = name;
                delete attributes['as'];
                delete attributes['min'];
                delete attributes['max'];
                if(type == 'textarea'){
                    attributes['type'] = type;
                    attributes['class'] = clas + 'form-control';
                    attributes['name'] = name;
                    attributes['id'] = name;
                    inputEl = angular.element('<textarea></textarea>');
                    setAttrs(inputEl, attributes);
                    actualControl = inputControl;
                } else if(type == 'submit') {
                    delete attributes['ng-model'];
                    attributes['type'] = type;
                    attributes['value'] = value;
                    attributes['class'] = clas + 'btn btn-primary';
                    attributes['id'] = value;
                    attributes['ng-disabled'] = formName + '.$invalid'
                    inputEl = angular.element('<input />');
                    setAttrs(inputEl, attributes);
                    actualControl = emptyControl;
                }  else if(type == 'button') {
                    delete attributes['ng-model'];
                    attributes['type'] = type;
                    attributes['value'] = value;
                    attributes['class'] = clas + 'btn btn-primary';
                    attributes['id'] = value;
                    inputEl = angular.element('<input />');
                    setAttrs(inputEl, attributes);
                    actualControl = emptyControl;
                } else if(type == 'hidden') {
                    attributes['type'] = type;
                    attributes['value'] = value;
                    attributes['class'] = clas + 'form-control';
                    attributes['id'] = value;
                    inputEl = angular.element('<input />');
                    setAttrs(inputEl, attributes);
                    actualControl = emptyControl;
                } else {
                    attributes['type'] = type;
                    attributes['name'] = name;
                    attributes['class'] = clas + 'form-control';
                    attributes['id'] = name;
                    inputEl = angular.element('<input />');
                    setAttrs(inputEl, attributes);
                    actualControl = inputControl;
                }
                return actualControl.replace(/::formName/g, formName).replace(/::name/g, name).replace(/::asterisk/g, asterisk).replace(/::minvalue/g, minValue).replace(/::maxvalue/g, maxValue).replace(/::min/g, min).replace(/::max/g, max).replace(/::id/g, name).replace(/::label/g, label).replace(/::type/g, type).replace(/::reqSpan/g, reqSpan).replace(/::matchSpan/g, matchSpan).replace(/::miValSpan/g, miValSpan).replace(/::maValSpan/g, maValSpan).replace(/::lessLenSpan/g, lessLenSpan).replace(/::moreLenSpan/g, moreLenSpan).replace(/::content/, inputEl[0].outerHTML);
            }
            tplEle = el.clone();
            var root = tplEle[0];
            _ref = tplEle.find("widget");
            // count the number of 'widget elements' inside form and call inputGenerator and replace the element with native element
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                input = _ref[_i];
                if (isDirectChild(root, input)) {
                    angular.element(input).replaceWith(inputGenerator(input));
                }
            }
            //render the overall template
            template = tplEle.html();
            return template;
        }
    };
  }]);

  // match directive to match two fields
  angular.module('matchDirective', [])
    .directive('match', [function () {
          return {
              require: 'ngModel',
              scope: {
                  match: '='
              },
              link: function(scope, element, attrs, ctrl) {
                  scope.$watch(function() {
                      var combined;

                      if (scope.match || ctrl.$viewValue) {
                         combined = scope.match + '_' + ctrl.$viewValue;
                      }
                      return combined;
                  }, function(value) {
                      if (value) {
                          // match the viewValue and matched element value
                          ctrl.$parsers.unshift(function(viewValue) {
                              var origin = scope.match;
                              if (origin !== viewValue) {
                                  ctrl.$setValidity("matchError", false);
                                  return undefined;
                              } else {
                                  ctrl.$setValidity("matchError", true);
                                  return viewValue;
                              }
                          });
                      }
                  });
              }
          };
    }]);


  // to check min max value required
  angular.module('minMaxDirective', [])
      .directive('minValue', function () {
          return {
              restrict: 'A',
              require: 'ngModel',
              link: function (scope, elem, attr, ctrl) {
                  function isEmpty(value) {
                      return angular.isUndefined(value) || value === '' || value === null || value !== value;
                  }
                  //watch the value
                  scope.$watch(attr.minValue, function () {
                      ctrl.$setViewValue(ctrl.$viewValue);
                  });
                  // check the model value with value assigned to min-value attribute
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
                  // check the model value with value assigned to max-value attribute
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

  // to generate custom widgets like select, radio, checkbox
  angular.module('widgetDirective', [])
      .directive('widgetDrop', function() {
          // get the data and render the dropdown using ng-options
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
                  // get the selected value and pass it to the scope variable
                  var selected = scope.model || '';
                  scope.selectedItemsChanged = function (item) {
                      scope.model = item.selectedItem;
                  }
              }
          }
      })

      // this generates checkbox
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
                  // get the selected item and check if already available in array if not push else pull
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

      // to generate radio buttons
      .directive('widgetRadio', function() {
          //generated using ng-repeat
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
                  //pass th value to the model
                  scope.model = scope.model || '';
                  scope.radioChanged = function(obj) {
                      scope.model = '';
                      scope.model = obj.item;
                  }
              }
          };
      });
