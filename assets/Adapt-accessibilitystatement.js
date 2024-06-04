var Adapt = require('core/js/adapt');
var statementPluginConfig = Adapt.course.get('_Adapt-accessibilitystatement');
var statementConfigs = statementPluginConfig._accessibilityStatement;

if (statementConfigs._statementEnabled) {
  var _start = Adapt.course.get('_start');
  var _startPoint = getStartInfo();

  function getStartInfo() {
    if (_start?._isEnabled && _start?._startIds?.length >= 1) {
      return _start._startIds[0]._id;
    }
    return 'course';
  }
  Adapt.on('router:location', function (e) {
    if (_startPoint === e._currentId) {
      var statementTitle = {
        title: i18n('adapt-accessibility-statement-title')
      }
      var statementBody = {
        part1: i18n('adapt-accessibility-statement-body-1'),
        customPart: statementConfigs._customSection,
        part2: i18n('adapt-accessibility-statement-body-2'),
        dontShow: i18n('adapt-accessibility-statement-dont-show')
      }
      if (!window.a11yStatementHidden) {
        Adapt.trigger('notify:prompt', {
          title: Handlebars.templates['statementTitle'](statementTitle),
          body: Handlebars.templates['statementBody'](statementBody),
          _prompts: [
            {
              promptText: i18n('adapt-accessibility-statement-close'),
              _callbackEvent: 'accessibilityStatement:close'
            }
          ]
        });
      }
      Adapt.on('accessibilityStatement:close', function () {
        var dontShow = $('.notify .a11y-dont-show-again #a11y-dont-show')[0].checked;
        window.a11yStatementHidden = dontShow || false;
      });
    }

  });

  $.i18n().load({
    'en': {
      'adapt-accessibility-statement-title': 'Accessibility Statement',
      'adapt-accessibility-statement-body-1': 'The College@ESDC is committed to digital accessibility for all ESDC employees with consideration for the diverse needs of learners in our e-learning products. We are continually improving the user experience and applying the relevant accessibility standards to the best of our abilities and resources available. The Web Content Accessibility Guidelines (WCAG) define requirements for designers and developers to improve accessibility.  The College@ESDC is striving to create accessible courses to conform with WCAG 2.1 level AA (and our internal best practices).',
      'adapt-accessibility-statement-body-2': `If you encounter an issue, please contact us via the email field on our <a href="${statementConfigs._sabaProfile}" target="_blank">Saba Profile Page</a>.`,
      'adapt-accessibility-statement-dont-show': 'Don\'t show again until page refresh',
      'adapt-accessibility-statement-close': 'Close'
    },
    'fr': {
      'adapt-accessibility-statement-title': 'Énoncé d\'accessibilité',
      'adapt-accessibility-statement-body-1': 'Le Collège@EDSC s\'engage à assurer l\'accessibilité numérique pour tous les employés d\'EDSC en tenant compte des divers besoins des apprenants qui utilisent nos produits d\'apprentissage en ligne. Nous améliorons continuellement l\'expérience utilisateur et appliquons les normes d\'accessibilité applicables au meilleur de nos capacités et des ressources disponibles. Les Règles pour l\'accessibilité des contenus Web (WCAG) définissent les exigences pour les concepteurs et les développeurs afin d\'améliorer l\'accessibilité. Le College@EDSC s\'efforce de créer des cours accessibles pour se conformer aux Règles pour l\'accessibilité des contenus Web (WCAG) 2.1 niveau AA (et à nos meilleures pratiques internes).',
      'adapt-accessibility-statement-body-2': `Si vous rencontrez un problème, veuillez nous contacter via le champ courriel sur notre <a href="${statementConfigs._sabaProfile}" target="_blank">Page de Profil Saba</a>.`,
      'adapt-accessibility-statement-dont-show': 'Ne pas afficher de nouveau jusqu\'à la prochaine actualisation de la page',
      'adapt-accessibility-statement-close': 'Fermer'
    }
  });

  function i18n(key) {
    $.i18n().locale = document.documentElement.lang;
    return $.i18n(key);
  }
}


