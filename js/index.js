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
	       $('.hkfg').fadeIn()
	       	 
	       
	    });
	    $("#wpre").click(function(){

	       $('.hkfg').fadeOut(1000);
	       $('#pbgb').fadeIn(3000);
	    });
	      $("#wnext").click(function(){
	    	
	       $('.hkfg').fadeOut(1000);
	       $('.yanhua').fadeIn(3000)
	       	 
	       
	    });
	    
	     $("#lpre").click(function(){

	       $('.yanhua').fadeOut(1000);
	       $('.hkfg').fadeIn(3000);
	    });
	      $("#lnext").click(function(){
	    	
	       $('.yanhua').fadeOut(1000);
	       $('.end').fadeIn(3000)
	       	 
	       
	    });
	     $("#epre").click(function(){

	       $('.end').fadeOut(1000);
	       $('.yanhua').fadeIn(3000);
	    });
	 
});