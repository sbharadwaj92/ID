var photo = new Image();
photo.addEventListener('load', eventPhotoLoaded , false);
var imageId;



var windowWidth;
var windowHeight;

var windowX = 0;
var windowY = 0;
var currentScale;
var photoHeight, photoWidth;
var scaleIncrement = .01;
var diff=1;
var critical;
var index=0;
var canvas, context;
var minScale, maxScale, diffScale;	
var draggableArea=new Array();
var flag=false;
var preX, preY, currX, currY;
draggableArea=[45,windowHeight-33,windowWidth-75,windowHeight-33];
var barWidth, barLeft;
var slideMax,	slideMin;
var sliderFlag=1, zoomFlag=false;
var mousePress;	
var touchMoveFlag=true;
			
var previousSlider,currentSlider;
 $('#Magnify').click(function () {
 		sliderExceedFlag  =false;
		sliderFlag=1;
		windowX = 0;
		windowY = 0;
 		$(this).attr("style", "visibility: hidden");
		$('#NavigateDown').css("visibility", "visible");
		$('#NavigateDown').css({"left": (parseInt($("#iconsDiv").width())-45) +"px", "top": (parseInt($("#iconsDiv").height()))-80+45+"px"});
		$('#NavigateLeft').css("visibility", "visible");
		$('#NavigateLeft').css({"left": (parseInt($("#iconsDiv").width())-55) +"px", "top": (parseInt($("#iconsDiv").height()))-80+25+"px"});
		$('#NavigateUp').css("visibility", "visible");
		$('#NavigateUp').css({"left": (parseInt($("#iconsDiv").width())-45) +"px", "top": (parseInt($("#iconsDiv").height()))-80+15+"px"});
		$('#NavigateRight').css("visibility", "visible");
		$('#NavigateRight').css({"left": (parseInt($("#iconsDiv").width())-25) +"px", "top": (parseInt($("#iconsDiv").height()))-80+25+"px"});
		$('#RemoveMagnify').css("visibility", "visible");
		$('#RemoveMagnify').css({"left": 10 +"px", "top": (parseInt($("#iconsDiv").height())-parseInt($("#RemoveMagnify").height())-30)+"px", "position":"absolute"});
		var removeMagRight=(parseInt($("#RemoveMagnify").position().left)+parseInt($("#RemoveMagnify").width()));
		$('#bar').css("visibility", "visible").width(parseInt($("#NavigateLeft").position().left)-20).height(10);
		$('#bar').css({"left": $("#RemoveMagnify").position().left, "top": (parseInt($("#RemoveMagnify").position().top)+10)+"px"});
		var barRight=(parseInt($("#bar").position().left)+parseInt($("#bar").width()));
		slideMin=removeMagRight+5;
		slideMax=barRight-parseInt($("#slider").width());
		//console.log("slideMin,slideMax ",slideMin,slideMax );
		
		$("#sliderParent").css({"left":removeMagRight+"px","top":parseInt($("#RemoveMagnify").position().top)+"px"}).width(barRight-removeMagRight).height($("#slider").height());
		$('#slider').css({"left": 5 +"px", "position":"relative"});
		$('#slider').css("visibility", "visible");
		previoueSlider =(parseInt($('#slider').position().left)); 
		zoomFlag=true;
		sliderMaxRight=parseInt($("#bar").width())+10;
		console.log("sliderMaxRight ",sliderMaxRight);
		//$("#sliderParent").css("z-index",99);
		//console.log("slide parent z_i",$("#sliderParent").css("z-index"));
		//$("#slider").css("z-index",parseInt($("#sliderParent").css("z-index"))+1);
		//console.log("slide  z_i",$("#slider").css("z-index"));
		
 });
 
 $('#RemoveMagnify').click(function () {
		$(this).attr("style", "visibility: hidden");
		$('#bar').css("visibility", "hidden");
		$('#NavigateDown').css("visibility", "hidden");
		$('#NavigateLeft').css("visibility", "hidden");
		$('#NavigateUp').css("visibility", "hidden");
		$('#NavigateRight').css("visibility", "hidden");
		$('#slider').css("visibility", "hidden");
		$("#slideParent").css("display","none");
		$('#Magnify').css("visibility", "visible");
		$('#Magnify').css({"left": 10 +"px", "top": (parseInt($("#iconsDiv").height())-parseInt($("#Magnify").height())-30)+"px", "position":"absolute"});
		currentScale=minScale;
		diff=1;
		zoomFlag=false;
		drawScreen();
		
 });
 
$("#ex1").mouseup(function(evt)
        {
            flag = false;
			 $("handCursor").css("visibility", "hidden");
        }).mouseout(function(evt)
        {
           evt.preventDefault();
           $("#ex1").trigger("mouseup");
			
        }).mousedown(function(evt)
        {
            flag = true;
			$("handCursor").css("visibility", "visible");
			preX =parseInt(evt.pageX - $(evt.target).offset().left-1);
			preY =parseInt(evt.pageY - $(evt.target).offset().top-1);
        }).mousemove(function(evt)
        {
            if(flag)
            {
				 currX = parseInt(evt.pageX - $(evt.target).offset().left);
                 currY = parseInt(evt.pageY - $(evt.target).offset().top);
				 $("handCursor").css("visibility", "visible");
				 $('#handCursor').css({"left":currX, "top": currY, "position":"absolute"});
             
                if((currY!=preY) || (currX!=preX))
				{	 if ((windowY-(currY-preY)/currentScale)
					 < (photoHeight  - windowHeight/currentScale)
					 && (windowY-(currY-preY)/currentScale>=0) 
					 && (windowX-(currX-preX)/currentScale)
					 < (photoWidth - windowWidth/currentScale) 
					 && (windowX-(currX-preX)/currentScale>=0)){
			     		  
			  		 	windowY =Math.round(windowY-(currY-preY)/currentScale);
						windowX =Math.round(windowX-(currX-preX)/currentScale);
           			 } 
					
				}
				
				drawScreen();
				preX=currX;
				preY=currY;
            }
        });


 
document.getElementById('ex1').addEventListener('touchend', function(evt) 
	{ evt.preventDefault();
            flag = false;
			 
        });
		
document.getElementById('ex1').addEventListener('touchstart', function(evt)
        {
			 evt.preventDefault();
            flag = true;
			
			preX =parseInt(evt.pageX - $(evt.target).offset().left-1);
			preY =parseInt(evt.pageY - $(evt.target).offset().top-1);
        });
		
		
document.getElementById('ex1').addEventListener('touchmove', function(evt)
        {
			 evt.preventDefault();
			  if(flag)
            {
			 if(evt.pageX > actualWidth || evt.pageY > actualHeight || evt.pageX< 0 || evt.pageY <0)
			 {
				 flag=false;
				 return;
			}
           
				
				 currX = parseInt(evt.pageX - $(evt.target).offset().left);
                 currY = parseInt(evt.pageY - $(evt.target).offset().top);
				 
             
                if((currY!=preY) || (currX!=preX))
				{	 if ((windowY-(currY-preY)/currentScale)
					 < (photoHeight  - windowHeight/currentScale)
					 && (windowY-(currY-preY)/currentScale>=0) 
					 && (windowX-(currX-preX)/currentScale)
					 < (photoWidth - windowWidth/currentScale) 
					 && (windowX-(currX-preX)/currentScale>=0)){
			     		  
			  		 	windowY =Math.round(windowY-(currY-preY)/currentScale);
						windowX =Math.round(windowX-(currX-preX)/currentScale);
           			 } 
					
				}
				
				drawScreen();
				preX=currX;
				preY=currY;
            }
        });



  $( "#slider" ).draggable({ axis: "x"});
 $( "#slider" ).draggable({ containment: "parent" });
  
 $('#slider')
    .draggable({
        start: function(e, ui) {
			console.log("slider started");
        },
       drag: function(e, ui) 
       {	
sliderDrag(e);
        },
        stop: function(e, ui) {
			console.log("slider stopped");
 sliderFlag=2;
        }
    });
	
	
	function sliderDrag(e){
		if(!zoomFlag || !touchMoveFlag)
			return;
			
	  		if(e.pageX > actualWidth || e.pageY > actualHeight || e.pageX< 0 || e.pageY <0)
	  		{
	  			$("#slider").trigger("mouseup");
				if(e.target.id=='sliderParent')
				{
				$("#sliderParent").trigger("touchcancel");
				$("#sliderParent").trigger("touchend");
				touchMoveFlag=false;
				}
	  			return;
	  		}
		if(e.target.id=='sliderParent')
		{
			var sliderTempLeft=(parseInt(e.pageX - $("#sliderParent").offset().left)-$("#slider").width()/2);
			if(e.pageX>sliderMaxRight )
				{
					sliderTempLeft=sliderMaxRight;
					$("#sliderParent").trigger("touchcancel");
					return;
				}
			$('#slider').css({"left": sliderTempLeft +"px", "position":"absolute"});			
		}
	
       		sliderFlag=2;
			
			if((parseInt($("#slider").offset().left))<=(parseInt($("#RemoveMagnify").offset().left)+parseInt($("#RemoveMagnify").width())) && sliderFlag==2)
			{
				zoomFlag=false;
			//	$(this).attr("style", "visibility: hidden");
				$('#slider').css("visibility", "hidden");
				$('#bar').css("visibility", "hidden");
				$('#NavigateDown').css("visibility", "hidden");
				$('#NavigateLeft').css("visibility", "hidden");
				$('#NavigateUp').css("visibility", "hidden");
				$('#NavigateRight').css("visibility", "hidden");
				$('#RemoveMagnify').css("visibility", "hidden");
				$("#slideParent").css("display","none");
				$('#Magnify').css("visibility", "visible");
				$('#Magnify').css({"left": 10 +"px", "top": (parseInt($("#iconsDiv").height())-parseInt($("#Magnify").height())-30)+"px", "position":"absolute"});
				currentScale=minScale;
				windowX=0;
				windowY=0;
				drawScreen();
			}
			else
			{
			  			
				
				currentSlider = parseInt($("#slider").offset().left);
				var tempSlideMax=slideMax;
				scaleIncrement = ((parseInt(currentSlider)-parseInt(slideMin))/(slideMax-slideMin))*diffScale;
				if(parseInt(currentSlider)!=parseInt(previoueSlider))
				{
					////console.log("currentSlider ",currentSlider, " previoueSlider ",previoueSlider);
					if ((minScale+scaleIncrement)<minScale)
					{
						////console.log("when current scale becomes minscale");
						currentScale = minScale;
					}
					else if ((minScale+scaleIncrement)>=maxScale)
					{
						////console.log("when current scale becomes maxscale");
						currentScale = maxScale;
					}
					else
						if(currentSlider<previoueSlider)
						{
							currentScale=minScale+scaleIncrement;
							croppedWidth = windowWidth/currentScale;
							croppedHeight = windowHeight/currentScale;
							////console.log("otherwise when scale is changing");
						 	if( (windowX + croppedWidth) < photoWidth )
								windowX = windowX;
							else
						 	if( (windowX + croppedWidth) >= photoWidth )
								windowX = photoWidth - (croppedWidth);
							else
								windowX=0;

							if( (windowY+croppedHeight) < photoHeight)
								windowY = windowY;
							else
							if( (windowY+croppedHeight) >= photoHeight )
								windowY = photoHeight - (croppedHeight);
							else
								windowY=0;
						}
						else
							if(currentSlider>=previoueSlider)
							{
								currentScale=minScale+scaleIncrement;
							}
				}
				
			
				previoueSlider = currentSlider;
				drawScreen();
			}	
	}
	
	document.getElementById('sliderParent').addEventListener('touchstart', function(e) {
    e.preventDefault();
	touchMoveFlag=true;
    var touch = e.changedTouches[0];
	console.log("touch start "+touch.pageX + " - " + touch.pageY);
    
	//sliderSnap(touch);
	
}, false);
	document.getElementById('sliderParent').addEventListener('touchmove', function(e) {
    e.preventDefault();
    var touch = e.touches[0];
   // alert(touch.pageX + " - " + touch.pageY);
   sliderDrag(touch);
   console.log("touch move "+touch.pageX + " - " + touch.pageY);
}, false);

document.getElementById('sliderParent').addEventListener('touchend', function(e) {
    e.preventDefault();
    var touch = e.changedTouches[0];
	console.log("touch end "+touch.pageX + " - " + touch.pageY);
   
	sliderSnap(touch);
	
}, false);

document.getElementById('sliderParent').addEventListener('touchcancel', function(e) {
    e.preventDefault();
    var touch = e.changedTouches[0];
	console.log("touch cancel "+touch.pageX + " - " + touch.pageY);

	//sliderSnap(touch);
	
}, false);
/*$("#sliderParent").mousedown(function (evt){
	console.log("slider Parent mouse down");
	
	
	});*/
 $("#sliderParent").click(function (evt) {
 		sliderSnap(evt);
	 });
	 $("#bar").click(function (evt) 
	 {
	 	sliderSnap(evt);
	 });

	 function sliderSnap(evt)
	 { 
	 if(!zoomFlag || !touchMoveFlag)
	 	return;
	 	 var barWidth, barLeft;
		 
			$('#slider').css({"left": (parseInt(evt.pageX - $("#sliderParent").offset().left)-$("#slider").width()/2) +"px", "position":"absolute"});
			
			currentSlider = parseInt($("#slider").offset().left);
			//console.log("slider left ",parseInt($("#slider").offset().left));
			$("#sliderParent").height($("#slider").height());
			scaleIncrement = ((parseInt(currentSlider)-parseInt(slideMin))/(slideMax-slideMin))*diffScale;

			if(parseInt(currentSlider)!=parseInt(previoueSlider))
			{
				////console.log("before -- currentScale : "+currentScale+" croppedWidth : "+croppedWidth+" croppedHeight : "+croppedHeight+" windowX : "+windowX+" windowY : "+windowY);
				if ((minScale+scaleIncrement)<minScale)
				{
					currentScale = minScale;
				}
				else if ((minScale+scaleIncrement)>=maxScale)
				{
					currentScale = maxScale;
				}
				else
					if(currentSlider<previoueSlider)
					{
						currentScale=minScale+scaleIncrement;
						croppedWidth = windowWidth/currentScale;
						croppedHeight = windowHeight/currentScale;
					 	if( (windowX + croppedWidth) < photoWidth )
							windowX = windowX;
						else
					 	if( (windowX + croppedWidth) >= photoWidth )
							windowX = photoWidth - (croppedWidth);
						else
							windowX=0;

						if( (windowY+croppedHeight) < photoHeight)
							windowY = windowY;
						else
						if( (windowY+croppedHeight) >= photoHeight )
							windowY = photoHeight - (croppedHeight);
						else
							windowY=0;
					}
					else
						if(currentSlider>=previoueSlider)
						{
							currentScale=minScale+scaleIncrement;
						}
				////console.log("after -- currentScale : "+currentScale+" croppedWidth : "+croppedWidth+" croppedHeight : "+croppedHeight+" windowX : "+windowX+" windowY : "+windowY);
			}
			previoueSlider = currentSlider;
			drawScreen();
			////console.log("after drawScreen -- currentScale : "+currentScale+" croppedWidth : "+croppedWidth+" croppedHeight : "+croppedHeight+" windowX : "+windowX+" windowY : "+windowY);
		   }
  $('#NavigateDown').click(function () {
	  windowY+=10;
            if (windowY> (photoHeight  - windowHeight/currentScale)){
				
               
			   windowY =windowY-10;
            } 
			drawScreen();
  });
  
 
 $('#NavigateDown').bind("mousedown",function () {
	  
	   mousePress=setInterval(moveDown,100);
  });
  
   $('#NavigateDown').bind("mouseup",function () {
	  
	  clearInterval(mousePress);
  });
  
  $('#NavigateDown').bind("mouseout",function () {
	  
	  clearInterval(mousePress);
  });
  function moveDown()
  {
	   windowY+=10;
            if (windowY> (photoHeight  - windowHeight/currentScale)){
				
               
			   windowY =windowY-10;
            } 
			drawScreen();
  }
  
   
  $('#NavigateLeft').bind("mousedown",function () {
	  
	   mousePress=setInterval(moveLeft,100);
  });
  
   $('#NavigateLeft').bind("mouseup",function () {
	  
	  clearInterval(mousePress);
  });
   $('#NavigateLeft').bind("mouseout",function () {
	  
	  clearInterval(mousePress);
  });
  function moveLeft()
  {
	   windowX-=10;
            if (windowX<0){
               windowX = 0;
            }
			drawScreen();
  }
  
  
  
  $('#NavigateUp').bind("mousedown",function () {
	  
	   mousePress=setInterval(moveUp,100);
  });
  
   $('#NavigateUp').bind("mouseup",function () {
	  
	  clearInterval(mousePress);
  });
   $('#NavigateUp').bind("mouseout",function () {
	  
	  clearInterval(mousePress);
  });
  function moveUp()
  {
	 windowY-=10;
            if (windowY<0){
               windowY = 0;
            }
			drawScreen();
  }
  

  
   $('#NavigateRight').mousedown(function () {
	  
	   mousePress=setInterval(moveRight,100);
  });
   $('#NavigateRight').mouseout(function () {
	  
	  clearInterval(mousePress);
  });
   $('#NavigateRight').mouseup(function () {
	  
	  clearInterval(mousePress);
  });
  
  function moveRight()
  {
	windowX+=10;
            if (windowX> (photoWidth - windowWidth/currentScale)){
             
			   windowX =windowX-10;
            }
			drawScreen();
  }
  
  
function eventPhotoLoaded() {
	//$('body').remove("#animationImage");
	document.body.removeChild(document.getElementById("animationImage"));
 canvas  = document.getElementById("ex1");
    context = canvas.getContext("2d");
  
  var allWidgets = window.parent.document.getElementsByClassName("cp-widget");
  
                var myFrameName = window.name;
				
                var myWidgetiFrame = window.parent.document.getElementById(window.name);
				
                if(myWidgetiFrame){
					var canvasWidth=myWidgetiFrame.parentElement.parentElement.style.width;
					var canvasHeight= myWidgetiFrame.parentElement.parentElement.style.height;
                  canvas.style.height = canvasHeight;
				 
                  canvas.style.width =canvasWidth;
                }

  
  if(photoWidth > photoHeight){
	   index= photoWidth/400;
	   
   }
   else{ 
	   index = photoHeight / 400;
	   
   }
   windowWidth = photoWidth/index;
   windowHeight = photoHeight / index;
  
  var index1; 
   if(photoWidth > photoHeight){
	   index1= photoWidth/parseInt(canvasWidth);
	  
   }
   else{ 
	   index1 = photoHeight / parseInt(canvasHeight);
	   
   }

   
   var divWidth, divHeight;
   if(photoWidth>photoHeight)
   {
	   divWidth=canvasWidth;
	   divHeight=divHeight = photoHeight / index1;
   }
   else{
	   
	   divHeight=canvasHeight;
	   divWidth=photoWidth/index1;
   }
   
  
   if(windowWidth < photoWidth){
currentScale = windowWidth/photoWidth;
   }else {
	   
	 currentScale = photoWidth/windowWidth;
   }
   
minScale = currentScale;   
//maxScale = minScale*3;

if((minScale*3)>1)
{
maxScale = minScale*3;


}
else{
	maxScale=1;
}
diffScale=maxScale-minScale;


//console.log("minScale",minScale," maxScale ", maxScale);
//$("#iconsDiv").css("visibility","visible").width(divWidth).height(divHeight);
$("#iconsDiv").css("visibility","visible");
//$("#ex1").css("visibility","visible").width(divWidth).height(divHeight);


  drawScreen();
  $('#Magnify').css({"left": 10 +"px", "top": (parseInt($("#iconsDiv").height())-parseInt($("#Magnify").height())-30)+"px"});
  $('#Magnify').css("visibility", "visible");
}

function drawScreen(){
	
	 if(diff==1){
		  context.clearRect(0,0,windowWidth,windowHeight);
context.drawImage(photo, 0, 0, photoWidth, photoHeight,
		  0,0,windowWidth,windowHeight);
	
	 diff++;

	 }
	 else{
		
		  context.clearRect(0,0,windowWidth,windowHeight);
		////console.log("currentScale ",currentScale);
		 context.drawImage(photo, windowX, windowY, Math.floor(windowWidth/currentScale),
		  Math.floor(windowHeight/currentScale),0,0,windowWidth,windowHeight);
	
	
		  
		
	 }
	
}

document.onkeydown = function(e){

   e = e?e:window.event;
   
	  
   switch (e.keyCode){
      case 38:
            //up
            windowY-=10;
            if (windowY<0){
               windowY = 0;
            }
            break;
      case 40:
            //down
            windowY+=10;
            if (windowY> (photoHeight  - windowHeight/currentScale)){
				
               
			   windowY =windowY-10;
            }
            break;
      case 37:
            //left
            windowX-=10;
            if (windowX<0){
               windowX = 0;
            }
            break;
      case 39:
            //right
            windowX+=10;
            if (windowX> (photoWidth - windowWidth/currentScale)){
             
			   windowX =windowX-10;
            }
            break;
     
   }

 
  drawScreen();
 }


function playbarinit() {
	
}

playbarUse1 = {
	onLoad: function()
	{
		if ( ! this.captivate )
			return;
		captivateMovie =  this.captivate;
		this.movieProps = this.captivate.CPMovieHandle.getMovieProps();
		if ( ! this.movieProps )
			return;
		this.varHandle = this.movieProps.variablesHandle;
		this.eventDisp = this.movieProps.eventDispatcher;
		varHand = this.movieProps.variablesHandle;
		evtHandle = this.movieProps.eventDispatcher;
		this.xmlStr = this.captivate.CPMovieHandle.widgetParams();
		var size = this.OpenAjax.getSize();
		width = size.width;
		height = size.height;
		this.internalImage = '';
		this.externalImage = '';
		this.instructions = '';
		this.buttonLabel = '';
		this.buttonContent = '';
		this.soundName = '';
		this.title = '';
		this.directions = '';
		this.currentTheme
		this.updateData();
		//eventPhotoLoaded();
		this.doUpdate();
		this.changeDiv();
		this.addAnimation();       
		cpMovie = parent.cp.movie;                     
		
	},

	updateData: function()
	{
	
		var id = 0;
		var initresult = jQuery.parseXML( this.xmlStr );
		
		
		if(initresult.getElementById('internalImageId'))
		{	// Firefox, Opera, Google Chrome and Safari
		
		var x = initresult.getElementById('internalImageId');
		
		imageId= $(x).find('number').text();
		internalImage = this.movieProps.ExternalResourceLoader.getResourcePath(imageId);
		photo.src=internalImage;
		
		photoHeight=parseInt($(initresult.getElementById('l_orgHeight')).find('number').text());
		
		
		photoWidth=parseInt($(initresult.getElementById('l_orgWidth')).find('number').text());
		//$("photo.src");
		
	
	
		 }
		 else{
		
		 //For IE
		var x=initresult.getElementsByTagName("array")[0];
		var y = x.getElementsByTagName("number")[0];
		imageId= y.childNodes[0].data;
		internalImage = this.movieProps.ExternalResourceLoader.getResourcePath(imageId);
		photo.src=internalImage;
		
		
		var imageType=initresult.getElementsByTagName("string")[0].childNodes[0].data;
		var dim=new Array();
		for (var i=0; i<3; i++)
		{
			dim[i]=initresult.getElementsByTagName("number")[i].childNodes[0].data;
			
		};
		var finalDim=new Array();
		var k=0, n=0;
		for(var i=0; i<3; i++)
		{
			if(dim[i]==imageId)
				{n++;}
			else
				{finalDim[k] = parseInt(dim[i]); k++; }
				
			if(dim[i]==imageId && n>1)
			{finalDim[k] = parseInt(dim[i]); k++; }
			
			
			
		}
	
		
		if(imageType=="Landscape")
			{
				(finalDim[0]>finalDim[1])?(photoWidth=finalDim[0], photoHeight=finalDim[1]):(photoWidth=finalDim[1], photoHeight=finalDim[0]);
			}
			
		if(imageType=="Portrait")
			{
				(finalDim[0]>finalDim[1])?(photoWidth=finalDim[1], photoHeight=finalDim[0]):(photoWidth=finalDim[0], photoHeight=finalDim[1]);
			}
		
		}
       
		canvasLeftAndTop = parseInt($(document.body).css("margin"));
		if(isNaN(canvasLeftAndTop))
			canvasLeftAndTop = 8;
		$("#ex1").css({top:-canvasLeftAndTop,left:-canvasLeftAndTop,position:'absolute'});
	
	},
	changeDiv : function()
	{
        var myWidgetiFrame = window.parent.document.getElementById(window.name);
		
        if(myWidgetiFrame){
			var iFrameWidth=parseInt(myWidgetiFrame.parentElement.parentElement.style.width);
			var iFrameHeight=parseInt( myWidgetiFrame.parentElement.parentElement.style.height);
        }
		if(photoWidth > photoHeight)
		{
			$("#iconsDiv").width(iFrameWidth);
			$("#iconsDiv").height(iFrameHeight * photoHeight/photoWidth)
		}
		else
		if(photoWidth < photoHeight)
		{
			$("#iconsDiv").width(iFrameWidth * photoWidth/photoHeight);
			$("#iconsDiv").height(iFrameHeight)
		}
		else
		{
			$("#iconsDiv").width(iFrameWidth);
			$("#iconsDiv").height(iFrameHeight)
		}

		if(photoWidth>photoHeight)
		{
			actualWidth = Math.floor(iFrameWidth);
			actualHeight = Math.floor(iFrameHeight * photoHeight / photoWidth);
		}
		else
		if(photoWidth>photoHeight)
		{
			actualHeight = Math.floor(iFrameHeight);
			actualWidth = Math.floor(iFrameWidth * photoWidth / photoHeight);
		}
		else
		{
			actualWidth = Math.floor(iFrameWidth);
			actualHeight = Math.floor(iFrameHeight);
		}
		//console.log("actualWidth : "+actualWidth+" actualHeight : "+actualHeight);
	},
	addAnimation : function()
	{
		animationImage = $('<img id="animationImage" src="images/loadingGIF.gif" style="position:absolute;top:'+(actualHeight/2-24)+'px;left:'+(actualWidth/2-24)+'px;z-index:100"/>');
		$('body').prepend(animationImage);
	},
	doUpdate: function() 
	{
		//init the default html values
		//var divHtmlHeader = "<div class='header'><a>aaaa this button to see the response in the drop down box.</a></div>";
		//var divHtmlContent = "<div class='content'>aaaa job! That was easy, wasn't it?</div>";
		
	}
};

playbar_use = function ()
{
	return playbarUse1;
}