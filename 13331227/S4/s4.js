// Generated by CoffeeScript 1.9.1
(function() {
  var $, $$, Sum, ajax, arr, autoClickInRandomOrder, disableOtherButtons, enableOtherButtons, getRandomNumber, getRandomNumberFromServer, getRandomNumbers, isInfo_barActive, randomsort, resetCalculator, returnRandomNumber, xmlhttp;

  $ = function(id) {
    return document.getElementById(id);
  };

  $$ = function(classN) {
    return document.getElementsByClassName(classN);
  };

  xmlhttp = new XMLHttpRequest();

  arr = new Array(0, 1, 2, 3, 4);

  window.onload = function() {
    var buttons, info_bar;
    info_bar = $('info-bar');
    buttons = $$('button');
    $('apb').onclick = function() {
      arr.sort(randomsort);
      this.disabled = 1;
      resetCalculator();
      return autoClickInRandomOrder(0);
    };
    return getRandomNumbers(buttons, info_bar);
  };

  randomsort = function(a, b) {
    var ref;
    return (ref = Math.random() > .5) != null ? ref : -{
      1: 1
    };
  };

  autoClickInRandomOrder = function(k) {
    var buttons;
    buttons = $$('button');
    $('text').innerHTML = buttons[arr[0]].value + ' ' + buttons[arr[1]].value + ' ' + buttons[arr[2]].value + ' ' + buttons[arr[3]].value + ' ' + buttons[arr[4]].value;
    if (k >= buttons.length) {
      Sum();
      return;
    }
    buttons[arr[k]].childNodes[1].classList.add('opacity');
    buttons[arr[k]].childNodes[1].innerHTML = "...";
    disableOtherButtons(buttons, buttons[arr[k]].id);
    return ajax(function(rNum) {
      buttons[arr[k]].childNodes[1].innerHTML = rNum;
      buttons[arr[k]].classList.add('grey');
      buttons[arr[k]].disabled = 1;
      enableOtherButtons(buttons, buttons[arr[k]].id);
      return autoClickInRandomOrder(k + 1);
    });
  };

  ajax = function(callback) {
    var xhr;
    xhr = new XMLHttpRequest();
    xhr.open('GET', '../server', true);
    xhr.send();
    return xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        return callback(xhr.responseText);
      }
    };
  };

  getRandomNumbers = function(buttons, info_bar) {
    var button, i, len, results;
    results = [];
    for (i = 0, len = buttons.length; i < len; i++) {
      button = buttons[i];
      results.push(button.onclick = function() {
        return getRandomNumber(this.id);
      });
    }
    return results;
  };

  getRandomNumber = function(id) {
    var button, buttons;
    button = $(id);
    buttons = $$('button');
    button.childNodes[1].classList.add('opacity');
    button.childNodes[1].innerHTML = "...";
    disableOtherButtons(buttons, id);
    return getRandomNumberFromServer(id);
  };

  disableOtherButtons = function(buttons, id) {
    var button, clickedButton, i, len, results;
    clickedButton = $(id);
    results = [];
    for (i = 0, len = buttons.length; i < len; i++) {
      button = buttons[i];
      if (!(button !== clickedButton)) {
        continue;
      }
      button.disabled = 1;
      results.push(button.classList.add('grey'));
    }
    return results;
  };

  getRandomNumberFromServer = function(id) {
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        return returnRandomNumber(xmlhttp.responseText, id);
      }
    };
    xmlhttp.open('GET', '../server', true);
    return xmlhttp.send();
  };

  returnRandomNumber = function(rNum, id) {
    var buttons, clickedButton, info_bar;
    clickedButton = $(id);
    buttons = $$('button');
    info_bar = $('info-bar');
    clickedButton.childNodes[1].innerHTML = rNum;
    clickedButton.classList.add('grey');
    clickedButton.disabled = 1;
    enableOtherButtons(buttons, clickedButton);
    return isInfo_barActive(info_bar, buttons);
  };

  enableOtherButtons = function(buttons, clickedButton) {
    var button, i, len, results;
    results = [];
    for (i = 0, len = buttons.length; i < len; i++) {
      button = buttons[i];
      if (button !== clickedButton && !button.childNodes[1].classList.contains('opacity')) {
        button.disabled = 0;
        results.push(button.classList.remove('grey'));
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  isInfo_barActive = function(info_bar, buttons) {
    var button, flag, i, len;
    flag = true;
    for (i = 0, len = buttons.length; i < len; i++) {
      button = buttons[i];
      if (!button.childNodes[1].classList.contains('opacity')) {
        flag = false;
      }
    }
    if (flag === true) {
      info_bar.disabled = 0;
      info_bar.classList.remove('grey');
      return info_bar.onclick = Sum;
    }
  };

  Sum = function() {
    var button, buttons, i, info_bar, len, sum;
    sum = 0;
    buttons = $$('button');
    info_bar = $('info-bar');
    for (i = 0, len = buttons.length; i < len; i++) {
      button = buttons[i];
      sum += parseInt(button.childNodes[1].innerHTML);
    }
    info_bar.innerHTML = sum;
    info_bar.disable = 1;
    info_bar.classList.add('grey');
    return $('button').onmouseout = resetCalculator;
  };

  resetCalculator = function() {
    var apb, button, buttons, i, info_bar, len, results;
    xmlhttp.abort();
    $('text').innerHTML = '';
    info_bar = $('info-bar');
    info_bar.disabled = 1;
    info_bar.innerHTML = '';
    info_bar.classList.toggle('grey', true);
    apb = $('apb');
    apb.disabled = 0;
    buttons = $$('button');
    results = [];
    for (i = 0, len = buttons.length; i < len; i++) {
      button = buttons[i];
      button.classList.toggle('grey', false);
      button.childNodes[1].classList.toggle('opacity', false);
      results.push(button.disabled = 0);
    }
    return results;
  };

}).call(this);