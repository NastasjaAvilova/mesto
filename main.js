(()=>{"use strict";function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var t=function(){function t(e,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this._form=n,this._config=e,this._inputList=Array.from(this._form.querySelectorAll(this._config.inputElement)),this._button=this._form.querySelector(this._config.submitButtonSelector)}var n,r;return n=t,(r=[{key:"enableValidation",value:function(){this._form.addEventListener("submit",(function(e){return e.preventDefault()})),this._setEventListeners()}},{key:"_setEventListeners",value:function(){var e=this;this._toggleButtonState(),this._inputList.forEach((function(t){t.addEventListener("input",(function(){e._checkInputValidity(t),e._toggleButtonState()}))})),this._form.addEventListener("reset",(function(){e._button.classList.add(e._config.inactiveButtonClass),e._button.disabled=!0}))}},{key:"resetValidation",value:function(){var e=this;this._toggleButtonState(),this._inputList.forEach((function(t){e._hideInputError(t)}))}},{key:"_showInputError",value:function(e){var t=this._form.querySelector("#".concat(e.name,"-error"));e.classList.add(this._config.inputErrorClass),t.textContent=e.validationMessage,t.classList.add(this._config.errorClass)}},{key:"_hideInputError",value:function(e){var t=this._form.querySelector("#".concat(e.name,"-error"));e.classList.remove(this._config.inputErrorClass),t.classList.remove(this._config.errorClass),t.textContent=""}},{key:"_checkInputValidity",value:function(e){e.validity.valid?this._hideInputError(e):this._showInputError(e)}},{key:"_hasInvalidInput",value:function(){return this._inputList.some((function(e){return!e.validity.valid}))}},{key:"_toggleButtonState",value:function(){this._hasInvalidInput()?(this._button.classList.add(this._config.inactiveButtonClass),this._button.disabled=!0):(this._button.classList.remove(this._config.inactiveButtonClass),this._button.disabled=!1)}}])&&e(n.prototype,r),t}();function n(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var r=function(){function e(t,n,r,o,i){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._id=t._id,this._card=document.querySelector(n).content.querySelector(".elements__card").cloneNode(!0),this._image=this._card.querySelector(".elements__image"),this._likeButton=this._card.querySelector(".elements__like"),this._likes=t.likes,this._likeCounter=this._card.querySelector(".elements__like-counter"),this._cardClickHandler=r,this._trashButton=this._card.querySelector(".elements__trash"),this._deleteHandler=o,this._likeCallback=i,this._ownerId=t.owner._id,this._fillCard(t),this._setEventListeners()}var t,r;return t=e,r=[{key:"_fillCard",value:function(e){var t=e.name,n=e.link;this._card.querySelector(".elements__title").textContent=t,this._image.setAttribute("src",n),this._image.setAttribute("alt",t),this._updateLikeCounter()}},{key:"_updateLikeCounter",value:function(){this._likeCounter.textContent=this._likes.length}},{key:"_setEventListeners",value:function(){var e=this;this._image.addEventListener("click",(function(){return e._cardClickHandler({link:e._image.src,name:e._image.alt})})),this._likeButton.addEventListener("click",(function(){e._likeCallback(e._getCardInfo())}))}},{key:"setLikeState",value:function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];e?this._likeButton.classList.add("elements__like_active"):this._likeButton.classList.remove("elements__like_active")}},{key:"getLikers",value:function(){return this._likes.map((function(e){return e._id}))}},{key:"setLikers",value:function(e){this._likes=e,this._updateLikeCounter()}},{key:"createCard",value:function(){return this._card}},{key:"_getCardInfo",value:function(){return{id:this._id,cardElement:this._card}}},{key:"isOwnedBy",value:function(e){return e===this._ownerId}},{key:"enableDeletion",value:function(){var e=this;this._trashButton.addEventListener("click",(function(){e._deleteHandler(e._getCardInfo())})),this._trashButton.classList.add("elements__trash_visible")}}],r&&n(t.prototype,r),e}();function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var i=function(){function e(t,n){var r=t.items,o=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._section=document.querySelector(n),this._renderer=o,this._items=r||[],this.renderElements()}var t,n;return t=e,(n=[{key:"renderElements",value:function(){var e=this;this._items.forEach((function(t){e.add(t,!0)}))}},{key:"add",value:function(e,t){var n=this._renderer(e);t?this._section.prepend(n):this._section.append(n)}}])&&o(t.prototype,n),e}(),a=document.querySelector(".profile__edit-button"),c=document.querySelector(".profile__add-button"),s={profileEditForm:document.querySelector('[name="profile-edit-form"]'),cardAddForm:document.querySelector('[name="card-add-form"]'),avatarEditForm:document.querySelector('[name="avatar-form"]')},u="popup_opened",l={formElement:".form",inputElement:".form__text-field",submitButtonSelector:".form__save-button",inactiveButtonClass:"form__save-button_disabled",inputErrorClass:"form__text-field_error",errorClass:"form__input-error_visible"};function f(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var p=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._popup=document.querySelector(t),this._escapeAction=this._closeOnEsc.bind(this)}var t,n;return t=e,(n=[{key:"open",value:function(){this._popup.classList.add(u),document.addEventListener("keydown",this._escapeAction),console.log("popup opened")}},{key:"close",value:function(){this._popup.classList.remove(u),document.removeEventListener("keydown",this._escapeAction),console.log("popup closed")}},{key:"_closeOnEsc",value:function(e){"Escape"===e.key&&this.close()}},{key:"setEventListeners",value:function(){var e=this;this._popup.querySelector(".popup__close-button").addEventListener("click",this.close.bind(this)),this._popup.addEventListener("click",(function(t){t.target===t.currentTarget&&e.close()}))}}])&&f(t.prototype,n),e}();function d(e){return d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},d(e)}function h(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function _(e,t,n){return _="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=m(e)););return e}(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(n):o.value}},_(e,t,n||e)}function v(e,t){return v=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},v(e,t)}function y(e,t){if(t&&("object"===d(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function m(e){return m=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},m(e)}var b=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&v(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=m(r);if(o){var n=m(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return y(this,e)});function a(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(t=i.call(this,e))._image=t._popup.querySelector(".popup__image"),t._title=t._popup.querySelector(".popup__view-title"),t}return t=a,(n=[{key:"open",value:function(e,t){this._image.src=e,this._image.alt=t,this._title.textContent=t,_(m(a.prototype),"open",this).call(this)}}])&&h(t.prototype,n),a}(p);function g(e){return g="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},g(e)}function k(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function E(e,t,n){return E="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=O(e)););return e}(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(n):o.value}},E(e,t,n||e)}function w(e,t){return w=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},w(e,t)}function S(e,t){if(t&&("object"===g(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return L(e)}function L(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function O(e){return O=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},O(e)}var C=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&w(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=O(r);if(o){var n=O(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return S(this,e)});function a(e,t){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(n=i.call(this,e))._form=n._popup.querySelector(".form"),n._saveButton=n._popup.querySelector(".form__save-button"),n._defaultButtonValue=n._saveButton.textContent,n._submitCallback=t.bind(L(n)),n._inputList=Array.from(n._form.querySelectorAll("input")),n}return t=a,(n=[{key:"close",value:function(){E(O(a.prototype),"close",this).call(this),this._form.reset()}},{key:"_getInputValues",value:function(){var e={};return this._inputList.forEach((function(t){e[t.name]=t.value})),e}},{key:"setEventListeners",value:function(){var e=this;E(O(a.prototype),"setEventListeners",this).call(this),this._form.addEventListener("submit",(function(){e.renderLoading(!0),e._submitCallback(e._getInputValues()),e.renderLoading(!1),e.close()}))}},{key:"renderLoading",value:function(e){this._saveButton.textContent=e?"Сохранение...":this._defaultButtonValue,console.log(this._saveButton.textContent)}},{key:"setButtonText",value:function(e){this._saveButton.textContent=e}}])&&k(t.prototype,n),a}(p);function j(e){return j="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},j(e)}function P(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function R(e,t,n){return R="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=q(e)););return e}(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(n):o.value}},R(e,t,n||e)}function B(e,t){return B=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},B(e,t)}function I(e,t){if(t&&("object"===j(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function q(e){return q=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},q(e)}var T=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&B(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=q(r);if(o){var n=q(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return I(this,e)});function a(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(t=i.call(this,e))._button=t._popup.querySelector(".popup__confirmation-button"),t}return t=a,(n=[{key:"open",value:function(e){this._callback=e,R(q(a.prototype),"open",this).call(this)}},{key:"setEventListeners",value:function(){var e=this;R(q(a.prototype),"setEventListeners",this).call(this),this._button.addEventListener("click",(function(){return e._callback()}))}}])&&P(t.prototype,n),a}(p);function x(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var U=function(){function e(t,n){var r=t.nameSelector,o=t.descriptionSelector,i=t.avatarSelector,a=t.avatarEditSelector;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._name=document.querySelector(r),this._description=document.querySelector(o),this._avatar=document.querySelector(i),this._avatarEditElement=this._avatar.querySelector(a),this._avatarEditAction=n}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){return{name:this._name.textContent,description:this._description.textContent,id:this._id}}},{key:"setUserInfo",value:function(e){var t=e.name,n=e.description,r=e.id;this._name.textContent=t,this._description.textContent=n,this._id=r}},{key:"setAvatar",value:function(e){this._avatar.style.backgroundImage="url('".concat(e,"')"),console.log(this._avatar.style.backgroundImage)}},{key:"setEventListeners",value:function(){this._avatarEditElement.addEventListener("click",this._avatarEditAction)}}])&&x(t.prototype,n),e}();function A(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var V=new(function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._baseUrl=t.baseUrl,this._headers=t.headers,this._config=t,console.log("i am api. my config is",this._config)}var t,n,r;return t=e,n=[{key:"getUserInfo",value:function(){return fetch(this._baseUrl+"users/me",this._config).then(e.checkResponse)}},{key:"getInitialCards",value:function(){return fetch(this._baseUrl+"cards",this._config).then(e.checkResponse)}},{key:"setUserInfo",value:function(t){var n=t.name,r=t.about;return fetch(this._baseUrl+"users/me/",Object.assign(this._config,{method:"PATCH",body:JSON.stringify({name:n,about:r})})).then(e.checkResponse)}},{key:"addCard",value:function(t){var n=t.name,r=t.link;return fetch(this._baseUrl+"cards",Object.assign(this._config,{method:"POST",body:JSON.stringify({name:n,link:r})})).then(e.checkResponse)}},{key:"deleteCard",value:function(t){return fetch(this._baseUrl+"cards/"+t,Object.assign(this._config,{method:"DELETE"})).then(e.checkResponse)}},{key:"likeCard",value:function(t){var n=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];return fetch(this._baseUrl+"cards/likes/"+t,Object.assign(this._config,{method:n?"PUT":"DELETE"})).then(e.checkResponse)}},{key:"setAvatar",value:function(t){return fetch(this._baseUrl+"users/me/avatar/",Object.assign(this._config,{method:"PATCH",body:JSON.stringify({avatar:t})})).then(e.checkResponse)}}],r=[{key:"checkResponse",value:function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}}],n&&A(t.prototype,n),r&&A(t,r),e}())({baseUrl:"https://mesto.nomoreparties.co/v1/cohort-28/",headers:{authorization:"62dd7ad4-aa06-4a8e-9e43-b5c530cafbb4","Content-Type":"application/json"}}),D=new C("#popup_avatar",(function(e){var t=e.avatar_link;V.setAvatar(t).then((function(e){return F.setAvatar(e.avatar)})).catch(J)}));D.setEventListeners();var F=new U({nameSelector:".profile__name",descriptionSelector:".profile__description",avatarSelector:".profile__avatar",avatarEditSelector:".profile__avatar-edit"},D.open.bind(D));function H(e){var t=e.name,n=e.about,r=e._id,o=e.avatar;F.setUserInfo({name:t,description:n,id:r}),F.setAvatar(o)}F.setEventListeners();var N=new i({renderer:function(e){var t=new r(e,"#card",Q,$,Z);return Y(t)&&t.setLikeState(!0),t.isOwnedBy(F.getUserInfo().id)&&(console.log("this is our card"),t.enableDeletion()),t.createCard()}},".elements");function J(e){console.log(e)}V.getUserInfo().then(H),V.getInitialCards().then((function(e){e.forEach((function(e){N.add(e)}))}));var z=new C("#popup_edit",(function(e){var t=e.input_name,n=e.input_description;V.setUserInfo({name:t,about:n}).then(H).catch(J),console.log("profile saved")}));z.setEventListeners();var M=new C("#popup_add",(function(e){var t=e.place_name,n=e.place_link;V.addCard({name:t,link:n}).then((function(e){N.add(e,!0)})).catch(J)}));M.setEventListeners();var G=new b("#popup_view");G.setEventListeners();var K=new T("#popup_confirmation");function Q(e){var t=e.link,n=e.name;G.open(t,n),console.log("card expanded")}K.setEventListeners();var W=new t(l,s.cardAddForm);W.enableValidation();var X=new t(l,s.profileEditForm);function Y(e){return e.getLikers().includes(F.getUserInfo().id)}function Z(e){var t=this,n=e.id,r=!Y(this);V.likeCard(n,r).then((function(e){t.setLikeState(r),t.setLikers(e.likes)}))}function $(e){var t=e.id,n=e.cardElement;K.open((function(){var e=this;V.deleteCard(t).then((function(){return n.remove()})).catch(J).finally((function(){return e.close()}))}))}X.enableValidation(),new t(l,s.avatarEditForm).enableValidation(),c.addEventListener("click",(function(){W.resetValidation(),M.open()})),a.addEventListener("click",(function(){var e=F.getUserInfo(),t=e.name,n=e.description;s.profileEditForm.elements.input_name.value=t,s.profileEditForm.elements.input_description.value=n,X.resetValidation(),z.open()})),c.addEventListener("click",(function(){W.resetValidation(),M.open()}))})();