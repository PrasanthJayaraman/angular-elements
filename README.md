# angular-elements

An AngularJS wrapper to make your AngularJS rendering and validation very simple and easy.. Developed from scratch myself.

_version 0.0.2_

Check this [live demo](http://angularelements.herokuapp.com/#/home)


This library is capable of creating form elements like text, number, url, email, password, tel, date, radio, checkbox, submit, button and select.

Text, number, url, email, password, tel, date validation will be automatically done to each field if you specify the necessary attribute.

Angular elements requires bootstrap to render a decent design.

___

# How to Implement

## How to Include

First create your angularJs project in your own way. Then include ```angular-elements.css ``` after bootstarp css files and include ``` angular-elements.js ``` after angularjs file in your index.html.

Then include our module in your main module.

```javascript
  var app = angular.module('yourApp', ['angularElements']);
```

That's all you are good to go with implementation of angular widget.


## Rendering and Validations

#### Create a form

```html
  <form form-for="" model="user" name="myForm"></form>
 ```

Here ``` form-for ``` is the angular widget attribute that you must specify, ``` model ``` is the $scope object you are parsing with the whole form. ``` name ``` is the form name you are using and this is also must attribute.

Then create all field within the form.

#### Input fields

We create an input field using ```<widget></widget>``` tag. ```as="text" ``` which works as `type="text"`, ```name="phone" ``` this name attribute works as ``` ng-model & name ``` of the element, ``` label="Phone Number" ``` helps to render a label text to the field.

```html
  <widget as="number" name="phone" label="Phone Number" ></widget>
```

This creates an input field with type as number. like this you can create following input fields.

1. text
2. number
3. email
4. tel
5. button
6. submit
7. textarea
8. date

Example:

```html
  <form form-for="" model="user" name="myForm">
    <widget as="text" name="name" label="Name" required="true" min-len="03"></widget>
    <widget as="number" name="phone" label="Phone Number" required="true" max-len="10" ></widget>
    <widget as="submit" value="Save" ></widget>
  </form>
```

### select (Dropdown)

To create a dropdown/select element.

```html
  <widget-drop title="Select your favourite color" model="color" items="colorsList"></widget-drop>
```

Pass a `$scope` object to the items attribute to render the options in select element.

```javascript
$scope.colorsList = [
                    {
                      "name" : "All Colors",
                      "value" : "all"
                    }
                  ]
```

### Checkbox

To create one or more checkbox use this.

```html
  <widget-check title="Countries you travelled" model="countries" items="countryList"></widget-check>
```

Send the `$scope` object to items to render the number of checkboxes.

```javascript
$scope.countryList = [
                    {
                      "name" : "India",
                      "value" : "india"
                    }
                  ]
```

### Radio Button

To create one or more radio button use this.

```html
  <widget-radio title="Gender"  name="gender" model="gender" items="genderList"></widget-radio>
```

Send the `$scope` object to items to render the number of radio buttons.

```javascript
$scope.genderList = [
                    {
                      "name" : "Male",
                      "value" : "male"
                    }
                  ]
```

___

## Validation
We will discuss how to do validation using angular elements in a simple way than any other validation library.

#### required

This attribute will help to tell the angular widget that this field is mandatory and cannot avoided.

```html
  <widget as="number" name="phone" label="Phone Number" required="true"></widget>
```

#### min-len

This will help you to set minimum length that need to be passed to the text field. It shows error message dynamically using the label name to the user.

```html
  <widget as="number" name="phone" label="Phone Number" required="true" min-len="4"></widget>
```

#### max-len

This will help you to set maximum length that need to passed on the input field.

```html
  <widget as="number" name="phone" label="Phone Number" required="true" max-len="10"></widget>
```

#### min-value

This attribute help us to set minimum value that needs to be passed to an input field. It shows error if it exceeds minimum value.

```html
  <widget as="number" name="age" label="Age" required="true" min-value="4" ></widget>
```

#### max-value

This help us to set maximum value that needs to be passed to an input field. So it shows error if it exceeds maximum value.

```html
  <widget as="number" name="age" label="Age" required="true" max-value="80" ></widget>
```


#### match

This helps to match two fields and shows error if it deosn't. This can be used in any fields.

```html
  <widget as="password" name="password" label="Password" required="true" ></widget>
  <widget as="password" name="cpassword" label="Confirm Password" required="true" match="password"></widget>
```

These validations are common for all the input fields.

___
