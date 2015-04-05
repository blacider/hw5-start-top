// Generated by LiveScript 1.3.1
(function(){
  var robot, Bubble, Button, cumulator, bindingResetWhenLeaveApb, reset;
  robot = {
    initial: function(){
      var bindingRobotToApb, this$ = this;
      this.sequence = [0, 1, 2, 3, 4];
      this.count = 0;
      this.buttons = $('#control-ring .button');
      bindingRobotToApb = function(){
        $('#button .apb').click(function(){
          if (Button.allButtonEnabled()) {
            this$.shuffle();
            this$.showSequence();
            this$.buttons[this$.sequence[this$.count++]].click();
          }
        });
      };
      bindingRobotToApb();
    },
    clickNextButton: function(){
      if (this.count !== 0) {
        if (this.count === 5) {
          $('#info-bar').text(cumulator.sum);
          $('#info-bar').css("background-color", "gray");
        } else {
          this.buttons[this.sequence[this.count++]].click();
        }
      }
    },
    shuffle: function(){
      this.sequence.sort(function(){
        return 0.5 - Math.random();
      });
    },
    showSequence: function(){
      var str, i$, ref$, len$, i;
      str = '';
      for (i$ = 0, len$ = (ref$ = this.sequence).length; i$ < len$; ++i$) {
        i = ref$[i$];
        str += String.fromCharCode(i + 65);
      }
      $('#sequence').text(str);
    },
    reset: function(){
      this.count = 0;
      $('#sequence').text('');
    }
  };
  Bubble = (function(){
    Bubble.displayName = 'Bubble';
    var prototype = Bubble.prototype, constructor = Bubble;
    function Bubble(){
      $('#info-bar').click(function(){
        if ($('#info-bar').css("background-color") === "rgb(0, 0, 255)") {
          $('#info-bar').text(cumulator.sum);
          $('#info-bar').css("background-color", "gray");
        }
      });
    }
    Bubble.reset = function(){
      $('#info-bar').text('');
      $('#info-bar').css("background-color", "gray");
    };
    return Bubble;
  }());
  Button = (function(){
    Button.displayName = 'Button';
    var prototype = Button.prototype, constructor = Button;
    Button.buttons = [];
    prototype.disable = function(){
      this.state = 'disabled';
      $(this.dom).css("background-color", "gray");
    };
    prototype.enable = function(){
      this.state = 'enabled';
      $(this.dom).css("background-color", "blue");
    };
    prototype.waiting = function(){
      this.state = 'waiting';
      $(this.dom).find('.unread').css("opacity", "0.7");
      $(this.dom).find('.unread').text('...');
    };
    Button.disableOthers = function(thisButton){
      var i$, ref$, len$, button;
      for (i$ = 0, len$ = (ref$ = this.buttons).length; i$ < len$; ++i$) {
        button = ref$[i$];
        if (button !== thisButton && button.state !== 'done') {
          button.disable();
        }
      }
    };
    Button.enableOthers = function(thisButton){
      var i$, ref$, len$, button;
      for (i$ = 0, len$ = (ref$ = this.buttons).length; i$ < len$; ++i$) {
        button = ref$[i$];
        if (button !== thisButton && button.state !== 'done') {
          button.enable();
        }
      }
    };
    Button.allButtonEnabled = function(){
      var i$, ref$, len$, button;
      for (i$ = 0, len$ = (ref$ = this.buttons).length; i$ < len$; ++i$) {
        button = ref$[i$];
        if (button.state !== 'enabled') {
          return false;
        }
      }
      return true;
    };
    Button.allButtonDone = function(){
      var i$, ref$, len$, button;
      for (i$ = 0, len$ = (ref$ = this.buttons).length; i$ < len$; ++i$) {
        button = ref$[i$];
        if (button.state !== 'done') {
          return false;
        }
      }
      return true;
    };
    Button.reset = function(){
      var i$, ref$, len$, button;
      for (i$ = 0, len$ = (ref$ = this.buttons).length; i$ < len$; ++i$) {
        button = ref$[i$];
        button.state = 'enabled';
        button.dom.css("background-color", "blue");
        button.dom.find('.unread').text('');
        button.dom.find('.unread').css("opacity", "0");
      }
    };
    prototype.getNumber = function(){
      var this$ = this;
      $.get('/', function(number, result){
        if (this$.state === 'waiting') {
          this$.state = 'done';
          this$.dom.css("background-color", "gray");
          this$.dom.find('.unread').text(number);
          this$.constructor.enableOthers(this$);
          cumulator.add(number);
          if (this$.constructor.allButtonDone()) {
            $('#info-bar').css("background-color", "blue");
          }
          robot.clickNextButton();
        }
      });
    };
    function Button(dom){
      var this$ = this;
      this.dom = dom;
      this.state = 'enabled';
      this.dom.click(function(){
        if (this$.state === 'enabled') {
          this$.constructor.disableOthers(this$);
          this$.waiting();
          this$.getNumber();
        }
      });
      this.constructor.buttons.push(this);
    }
    return Button;
  }());
  cumulator = {
    sum: 0,
    add: function(number){
      return this.sum += parseInt(number);
    },
    reset: function(){
      this.sum = 0;
    }
  };
  bindingResetWhenLeaveApb = function(){
    var leave;
    leave = false;
    $('#button').on('mouseenter', function(){
      leave = true;
    });
    $('#button').on('mouseleave', function(event){
      leave = false;
      reset();
    });
  };
  reset = function(){
    Button.reset();
    cumulator.reset();
    Bubble.reset();
    robot.reset();
  };
  $(function(){
    var i$, ref$, len$, bubble;
    for (i$ = 0, len$ = (ref$ = $('#control-ring .button')).length; i$ < len$; ++i$) {
      (fn$.call(this, i$, ref$[i$]));
    }
    bubble = new Bubble();
    robot.initial();
    bindingResetWhenLeaveApb();
    function fn$(i, dom){
      var button;
      button = new Button($(dom));
    }
  });
}).call(this);
