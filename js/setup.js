/**
 * Created by ira on 23/11/17.
 */
'use strict';
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;


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
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');


var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};



var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);


document.querySelector('.setup-similar').classList.remove('hidden');





/**
 *второе домашнее задание
 **/

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var setupUserName =  setup.querySelector('.setup-user-name');


/**
 * Открытие/закрытие окна настройки персонажа:
 * Когда окно настройки персонажа открыто, нажатие на клавишу ESC должно закрывать диалог
 * Если фокус находится на форме ввода имени, то окно закрываться не должно
 * @param evt
 */


var onPopupEscPress = function(evt) {
  if (evt.keyCode === ESC_KEYCODE && document.activeElement !== setupUserName) {
    closePopup();
  }
};

/**
 * Если диалог открыт, нажатие на кнопку «Сохранить» приводит к закрытию диалога
 * Если диалог открыт и фокус находится на кнопке «Сохранить», нажатие на ENTER приводит к закрытию диалога
 */
var setupButtonSubmit = setup.querySelector('.setup-submit');

var onPopupButtonSetupSubmitPress = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
};

setupButtonSubmit.addEventListener('click', function () {
  closePopup();
});


var openPopup = function() {
  setup.classList.remove('hidden');

  document.addEventListener('keydown', onPopupEscPress);

  document.addEventListener('click', onPopupButtonSetupSubmitPress);
};

var closePopup = function() {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};



setupOpen.addEventListener('click', function() {
  openPopup();
});

setupOpen.addEventListener('keydown', function(evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});



setupClose.addEventListener('click', function() {
  closePopup();
});

setupClose.addEventListener('keydown', function(evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
   closePopup();
  }
});

/**
 * Изменение цвета мантии персонажа по нажатию. Цвет должен сменяться произвольным образом
 */

var setupWizard = setup.querySelector('.setup-wizard');

var wizardCoat = setupWizard.querySelector('.wizard-coat');

wizardCoat.addEventListener('click', function () {
  wizardCoat.style.fill = getWizardsRandomValue(WIZARD_COAT_COLOR);
});


/**
 * Изменение цвета глаз персонажа по нажатию
 */


var wizardEyes = setupWizard.querySelector('.wizard-eyes');

wizardEyes.addEventListener('click', function () {
  wizardEyes.style.fill = getWizardsRandomValue(WIZARD_EYES_COLOR);
});

/**
 * Изменение цвета фаерболов по нажатию
 * @type {Element}
 */
var setupFireballWrap = setup.querySelector('.setup-fireball-wrap');

setupFireballWrap.addEventListener('click', function () {
  setupFireballWrap.style.background = getWizardsRandomValue(FIREBALL_COLOR);
});


/*var userNameInput = setup.querySelector('.setup-user-name');

userNameInput.addEventListener('invalid', function () {
  if(userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});*/
