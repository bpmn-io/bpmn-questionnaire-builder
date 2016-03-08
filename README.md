# bpmn-questionnaire-builder
Build your own questionnaires for [bpmn-questionnaire](https://github.com/bpmn-io/bpmn-questionnaire).

__Note: This application is in a very early stage of development.__

## About

A prototype application for creating questionnaire JSON files that can be used with the [bpmn-questionnaire](https://github.com/bpmn-io/bpmn-questionnaire) library. Let's you create your own types of questions:

```
var single = BpmnQuestionnaireBuilder.createType({

  render: function() {
    // ...
  },

  properties: {
    // ...
  },

  init: function() {
    // ...
  },
  
  exportJSON: function() {
    // ...
  }
  
});

module.exports = single;
```

## Building

Install dependencies

```
npm install
```

Build the application

```
grunt auto-build
```
