var Adapt = require('core/js/adapt');
var pluginConfig = Adapt.course.attributes['_Adapt-accessibilitystatement'];
var configs = pluginConfig._accessibilityStatement


if (configs._statementEnabled) {
  Adapt.on('router:menu', function () {
    var statementTitle = {
      title: i18n('adapt-accessibility-statement-title')
    }
    var statementBody = {
      part1: i18n('adapt-accessibility-statement-body-1'),
      customPart: configs._customSection,
      part2: i18n('adapt-accessibility-statement-body-2'),
      dontShow: i18n('adapt-accessibility-statement-dont-show')
    }
    if (!window.a11yStatementHidden) {
      Adapt.trigger('notify:prompt', {
        title: Handlebars.templates['statementTitle'](statementTitle),
        body: Handlebars.templates['statementBody'](statementBody),
        _prompts: [
          {
            promptText: 'Close',
            _callbackEvent: 'accessibilityStatement:close'
          }
        ]
      });
    }
    Adapt.on('accessibilityStatement:close', function () {
      var dontShow = $('.notify .a11y-dont-show-again #a11y-dont-show')[0].checked;
      window.a11yStatementHidden = dontShow  || false;
    });
  });


  $.i18n().load({
    'en': {
      'adapt-accessibility-statement-title': 'Accessibility Statement',
      'adapt-accessibility-statement-body-1': 'The College@ESDC is committed to digital accessibility for all ESDC employees with consideration for the diverse needs of learners in our e-learning products. We are continually improving the user experience and applying the relevant accessibility standards to the best of our abilities and resources available. The Web Content Accessibility Guidelines (WCAG) define requirements for designers and developers to improve accessibility for people with disabilities.  The College@ESDC is striving to create accessible courses to conform with WCAG 2.1 level AA (and our internal best practices).',
      'adapt-accessibility-statement-body-2': 'Contact instructions if you encounter an issue: {Insert instructions to find course owner.}',
      'adapt-accessibility-statement-dont-show': 'Don\'t show again'
    },
    'fr': {
      'adapt-accessibility-statement-title': 'Déclaration d\'accessibilité'
    }
  });

  function i18n(key) {
    $.i18n().locale = document.documentElement.lang;
    return $.i18n(key);
  }
}


