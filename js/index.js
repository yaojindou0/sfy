$(function(){
    // 纸飞机
	    // 起飞
	    $('.send').click(function() {
	        // 步骤一：隐藏面板、显示飞机、完成折叠效果
	        setTimeout(function() {
	            // 隐藏信息面板
	            $('#plane').removeClass('front');
	            // 翻转至正面
	            $('#wind_container').removeClass('beginning');
	            // 折叠效果（左翼、右翼）
	            $('.curvable').addClass('curved');
	            // 颜色变换
//	            $("body").css({"background-color": "#54575A"});
	            // 步骤二：平放飞机
	            setTimeout(function() {
	                $('#wind_container').addClass('hover');
//	                $("body").css({"background-color": "#AD8BD8"});
	                // 步骤三：飞机后退助跑
	                setTimeout(function() {
	                    $('#wind_container').addClass('fly_away_first');
//	                    $("body").css({"background-color": "#6E99C4"});
	                    // 步骤四：飞机向前飞翔至消失
	                    setTimeout(function() {
	                        $('#wind_container').addClass('fly_away');
	                        // 步骤五：
	                        setTimeout(function(){
	                        	 $('#wind').fadeOut(1000);
	                        	 $('.wrap2').fadeIn(3000);

	                        },3000);
	                    }, 600);
	                }, 2000);
	            }, 2800);
	        }, 200);
	    });
	   
	   var canvas = document.getElementById('canvas');

    if (!canvas || !canvas.getContext) {
      return false;
    }

    /********************
      Random Number
    ********************/

    function rand(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    /********************
      Var
    ********************/

    var ctx = canvas.getContext('2d');
    var offscreenCanvas = document.createElement('canvas');
    var offscreenCtx = offscreenCanvas.getContext('2d');
    var X = canvas.width = offscreenCanvas.width = window.innerWidth;
    var Y = canvas.height = offscreenCanvas.height = window.innerHeight;
    var mouseX = X / 2;
    var mouseY = Y / 2;
    var particles = [];
    var ease = 0.3;
    var friction = 0.8;
    // DOM 
   
    // Value
    var textValue = "毕业快乐";
    var compositionValue = "lighter";
    var randomFontColorValue = true;
    var flexibilityValue = true;
    var fontColorValue = "#ffffff";
    var stepValue = 8;
    var fontSizeValue = "201";
    var particleSizeValue = "10";
    var increaseAngleValue = 3;


    /********************
      Responsive
    ********************/

    if (X < 768) {
      textValue = 'Hou are you?';
      fontSizeValue = 50;
      stepValue = 2;
      particleSizeValue = 4;
    }
     
    /********************
      offscreenCanvas
    ********************/
    
    function drawText() {
      offscreenCtx.save();
      offscreenCtx.fillStyle = fontColorValue;
      offscreenCtx.font = fontSizeValue + 'px sans-serif';
      offscreenCtx.textAlign = 'center';
      offscreenCtx.textBaseline = 'middle';
      var t = offscreenCtx.measureText(textValue);
      if (t.width > X) {
        fontSizeValue--;
        drawText();
      }
      offscreenCtx.fillText(textValue, X / 2, Y / 2);
      offscreenCtx.restore();
    }

    /********************
      Particle
    ********************/
    
    function Particle(ctx, x, y, r, cr, cg, cb) {
      this.ctx = ctx;
      this.init(x, y, r, cr, cg, cb);
    }

    Particle.prototype.init = function(x, y, r, cr, cg, cb) {
      this.x = x;
      this.y = y;
      this.xi = rand(0, X);
      this.yi = rand(0, Y);
      this.r = r;
      this.s = 10;
      this.c = {
        r: cr,
        g: cg,
        b: cb,
        a: 1
      };
      this.v = {
        x: rand(-5, 5) * Math.random(),
        y: rand(-5, 5) * Math.random()
      };
      this.a = rand(0, 360);
      this.rad = this.a * Math.PI / 180;
    };

    Particle.prototype.draw = function() {
      var ctx = this.ctx;
      ctx.save();
      ctx.globalCompositeOperation = compositionValue;
      ctx.fillStyle = 'rgb(' + this.c.r + ', ' + this.c.g + ', ' + this.c.b + ')';
      ctx.beginPath();
      ctx.arc(this.xi, this.yi, Math.sin(this.rad) < 0 ? -Math.sin(this.rad) * this.r : Math.sin(this.rad) * this.r, 0, Math.PI * 2, false);
      ctx.fill();
      ctx.restore();
    };

    Particle.prototype.updatePosition = function() {
      this.v.x += (this.xi - this.x) * ease;
      this.v.y += (this.yi - this.y) * ease;
      this.v.x *= friction;
      this.v.y *= friction;
      this.xi -= this.v.x;
      this.yi -= this.v.y;
    };

    Particle.prototype.changeColor = function() {
      this.c = {
        r: rand(0, 255),
        g: rand(0, 255),
        b: rand(0, 255)
      }
    };

    Particle.prototype.updateParams = function() {
      this.a += increaseAngleValue;
      this.rad = this.a * Math.PI / 180;
    };

    Particle.prototype.render = function() {
      if (flexibilityValue) this.updateParams();
      this.updatePosition();
      this.draw();
    };

    /********************
      Animation
    ********************/

    window.requestAnimationFrame =
      window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function(cb) {
        setTimeout(cb, 17);
      };

    /********************
      Render
    ********************/
    
    function initText(cb) {
      var data = offscreenCtx.getImageData(0, 0, X, Y).data;
      var p;
      for (var i = 0; i < Y; i += stepValue) {
        for (var j = 0; j < X; j += stepValue) {
          var oI = (j + i * X) * 4 + 3; // fantastic! I can not think of it.
          if (data[oI] > 0) {
            if (randomFontColorValue) {
              p = new Particle(ctx, j, i, particleSizeValue, rand(0, 255), rand(0, 255), rand(0, 255));
            } else {
              p = new Particle(ctx, j, i, particleSizeValue, data[oI - 3], data[oI -2], data[oI - 1]);
            }
            particles.push(p);
          }
        }
      }
      if (cb) {
        cb();
      } else {
        return;
      }
    }

    drawText();
    initText(render);

    /********************
      Render
    ********************/
    
    function render() {
      ctx.clearRect(0, 0, X, Y);
      for (var i = 0; i < particles.length; i++) {
        particles[i].render();
      }
      requestAnimationFrame(render);
    }

    /********************
      Event
    ********************/
    
    function onResize() {
      X = canvas.width = offscreenCanvas.width = window.innerWidth;
      Y = canvas.height = offscreenCanvas.height = window.innerHeight;
      particles = [];
      if (X < 768) {
        textValue = 'Hou are you?';
        fontSizeValue = 50;
        stepValue = 2;
        particleSizeValue = 4;
      } else {
        textValue = 'Hou are you?';
        fontSizeValue = 200;
        stepValue = 8;
        particleSizeValue = 10;
      }
      offscreenCtx.clearRect(0, 0, X, Y);
      drawText();
      initText();
    }

    window.addEventListener('resize', function(){
      onResize();
    });
	   
	   
	   
	   
	    $("#tnext").click(function(){
	       $('.wrap2').fadeOut(1000);
	       $('.mygrid').fadeIn(3000);
	    });
	    $("#spre").click(function(){

	       $('.mygrid').fadeOut(1000);
	       $('.wrap2').fadeIn(3000);
	    });
	    $("#snext").click(function(){
	        $('.mygrid').fadeOut(1000);
	       $('#pbgb').fadeIn(3000);
	    });
	   $("#sipre").click(function(){

	       $('#pbgb').fadeOut(1000);
	       $('.mygrid').fadeIn(3000);
	    });
	    $("#sinext").click(function(){
	    	
	       $('#pbgb').fadeOut(1000);
	       $('.end').fadeIn()
	       	  drawText();
   			 initText(render);
	       
	    });
	    $("#wpre").click(function(){

	       $('.end').fadeOut(1000);
	       $('#pbgb').fadeIn(3000);
	    });
	   
	 
});