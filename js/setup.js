/**
 * Created by ira on 23/11/17.
 */
'use strict';
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];

var getWizardsRandomValue = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var getName = function () {
  var surname = getWizardsRandomValue(WIZARD_SURNAMES);
  var name = getWizardsRandomValue(WIZARD_NAMES);

  if(Math.random() <= 0.5) {
    return surname + ' ' + name;
  } else {
    return name + ' ' + surname;
  }
};

var createWizard = function () {
  return {
    name: getName(),
    coatColor: getWizardsRandomValue(WIZARD_COAT_COLOR),
    eyesColor: getWizardsRandomValue(WIZARD_EYES_COLOR)
  };
};

var createWizards = function () {
  var wizards = [];
  for (var i = 0; i < 4; i++) {
    wizards.push(createWizard());
  }
  return wizards;
};
var wizards = createWizards();


var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-createWizard-template').content.querySelector('.setup-similar-item');


var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.createWizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.createWizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};



var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);


document.querySelector('.setup-similar').classList.remove('hidden');
