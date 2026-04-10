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
      var simulation = Adapt.components.models.find(function (component) {
        return component.get('_component') === "simulation"
      })
      var statementTitle = {
        title: $.i18n.translate('adapt-accessibility-statement-title')
      }
      var statementBody = {
        part1: $.i18n.translate('adapt-accessibility-statement-body-1'),
        part2: $.i18n.translate('adapt-accessibility-statement-body-2'),
        customPart: statementConfigs._customSection,
        part3: $.i18n.translate('adapt-accessibility-statement-body-3'),
        dontShow: $.i18n.translate('adapt-accessibility-statement-dont-show'),
        simulation: simulation !== undefined,
        simulationStatement: $.i18n.translate('adapt-accessibility-statement-simulation')
      }
      if (!window.a11yStatementHidden) {
        Adapt.trigger('notify:prompt', {
          title: Handlebars.templates['statementTitle'](statementTitle),
          body: Handlebars.templates['statementBody'](statementBody),
          _prompts: [
            {
              promptText: $.i18n.translate('adapt-accessibility-statement-close'),
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
      'adapt-accessibility-statement-body-1': 'The College@ESDC is committed to providing accessible, barrier-free learning for all employees with consideration for the diverse needs of learners in our e-learning products. We are continuously improving the user experience and applying the relevant accessibility standards to the best of our abilities and resources available.',
      'adapt-accessibility-statement-body-2': 'The CAN/ASC – EN 301 549:2024 standard, which includes Web Content Accessibility Guidelines (WCAG) 2.1 level AA requirements, defines requirements for designers and developers to improve accessibility. We strive to meet these standards across all platforms and content.',
      'adapt-accessibility-statement-body-3': `If you encounter an issue, please contact us via the email field on our <a href="${statementConfigs._sabaProfile}" target="_blank">Saba Profile Page</a>.`,
      'adapt-accessibility-statement-dont-show': 'Don\'t show again until page refresh',
      'adapt-accessibility-statement-close': 'Close',
      'adapt-accessibility-statement-simulation': 'This course includes simulation activities that could have minor accessibility limitations. These simulations focus on key learning points and may not include all features of the original systems. Simulations may reflect certain accessibility barriers present in the original system.'
    },
    'fr': {
      'adapt-accessibility-statement-title': 'Énoncé d\'accessibilité',
      'adapt-accessibility-statement-body-1': 'Le Collège@EDSC s’engage à offrir un apprentissage accessible et sans obstacles à tous les employés, en tenant compte de la diversité des besoins des apprenants dans ses produits d’apprentissage en ligne. Nous travaillons continuellement à améliorer l’expérience utilisateur et à appliquer, dans la mesure de nos capacités et des ressources disponibles, les normes d’accessibilité pertinentes.',
      'adapt-accessibility-statement-body-2': 'La norme CAN/ASC – EN 301 549:2024, qui intègre les exigences de niveau AA des Règles pour l’accessibilité des contenus Web (WCAG) 2.1, établit des exigences à l’intention des concepteurs et des développeurs afin d’améliorer l’accessibilité. Nous nous efforçons de respecter ces exigences sur l’ensemble de nos plateformes et de nos contenus.',
      'adapt-accessibility-statement-body-3': `Si vous rencontrez un problème, veuillez nous contacter via le champ courriel sur notre <a href="${statementConfigs._sabaProfile}" target="_blank">Page de Profil Saba</a>.`,
      'adapt-accessibility-statement-dont-show': 'Ne pas afficher de nouveau jusqu\'à la prochaine actualisation de la page',
      'adapt-accessibility-statement-close': 'Fermer',
      'adapt-accessibility-statement-simulation': 'Ce cours comprend des activités de simulation qui peuvent présenter des limitations mineures en matière d\'accessibilité. Ces simulations ciblent des points clés de l\'apprentissage et peuvent ne pas inclure toutes les caractéristiques des systèmes originaux. Les simulations peuvent refléter certains obstacles à l\'accessibilité présents dans le système d\'origine.'
    }
  });
}


