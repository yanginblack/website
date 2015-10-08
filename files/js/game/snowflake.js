var flaketype = 1;
//snowflake which follow mouse
var Follow = function () {

	var $ = function (i) {return document.getElementById(i)},
	addEvent = function (o, e, f) {o.addEventListener ? o.addEventListener(e, f, false) : o.attachEvent('on'+e, function(){f.call(o)})},
	removeEvent = function(o, e, f) {o.removeEventListener ? o.removeEventListener(e, f, false) : o.detachEvent('on'+e, function(){f.call(o)})},
	//OBJ = [], 
	sp, rs, N = 0, m, container;
	var keyboard;
	var init = function (id, config) {
		this.config = config || {};
		this.obj = $(id);
		this.container = id;
		sp = this.config.speed || 4;
		rs = this.config.animR || 1;
		m = {x: $(id).offsetWidth * .5, y: $(id).offsetHeight * .5};
		//this.setXY();
		this.start();
		}
	init.prototype = {
			
			fn: function(e) {
			e = e || window.event;
			m.x = e.clientX-jQuery('#screen').offset().left+15;
			m.y = e.clientY-jQuery('#screen').offset().top+document.body.scrollTop+document.documentElement.scrollTop;
			
		},		
		setXY : function () {
		    var _this = this;
			//addEvent(this.obj, 'mousemove', function (e) {
			addEvent(this.obj, 'mousemove', this.fn)
			},
			
			deleteXY: function() {
            removeEvent(this.obj, 'mousemove', this.fn)		    
           // removeEvent(this.obj, 'mousemove', function(e) {alert("removed");});           
			},
			setcenter: function() {
				m = {
					x: $(this.container).offsetWidth * .5, 
					y: $(this.container).offsetHeight * .5
				};

			},
			setobj: function(shape) {
			    //play('turnwhite');
				OBJ=[];
				N=0;
				var k = 180 / Math.PI, OO, o, _this = this, fn = this.config.fn;
				var obj1 = document.getElementById('screen');
				while(obj1.firstChild)
				{
					obj1.removeChild(obj1.firstChild);
				}				
				OBJ[N++] = OO = new CObj(null, 0, 0);
				if (shape==0)
					{   //normal snowflake-shape
          				for (var i=30;i<390;i+=60) {
							var O=OO;
							for (var j=15;j<27;j++) {
								var x = fn(i,j).x, y = fn(i,j).y;
								OBJ[N++] = o = new CObj(O,x,y);
								O = o;
								
								if ((j-10)%8 == 0)
								{
									var pre_i = i, pre_j = j, pre_O = O;

									for (var k=0;k<5;k++)
									{
										i+=10;
										j+=0.5;
										x = fn(i,j).x; 
										y = fn(i,j).y;
										OBJ[N++] = o = new CObj(O,x,y);
										O = o;
									}
									i = pre_i;
									j = pre_j;
									O = pre_O;
									for (var k=0;k<5;k++)
									{
										i-=10;
										j+=0.5;
										x = fn(i,j).x;
										y = fn(i,j).y;
										OBJ[N++] = o = new CObj(O,x,y);
										O = o;
						
									}
									i = pre_i;
									j = pre_j;
									O = pre_O;
								}
							}
						}

					}
					
				else if (shape==3)
				{
					for (var i=0;i<360;i+=60)
					{
					var O=OO;
					for (var j=15;j<27;j++)
						{
							var x = fn(i,j).x, y = fn(i,j).y;
							OBJ[N++] = o = new CObj(O,x,y);
							O = o;

							if ((j-10)%8 == 0)
							{
								var pre_i = i, pre_j = j, pre_O = O;

								for (var k=0;k<8;k++)
									{
										i+=10;
										j+=7;
										x = fn(i,j).x; 
										y = fn(i,j).y;
										OBJ[N++] = o = new CObj(O,x,y);
										O = o;
									}
								i = pre_i;
								j = pre_j;
								O = pre_O;
								for (var k=0;k<8;k++)
									{
									i-=10;
									j+=7;
									x = fn(i,j).x;
									y = fn(i,j).y;
									OBJ[N++] = o = new CObj(O,x,y);
									O = o;
			
									}
								i = pre_i;
								j = pre_j;
								O = pre_O;
							}
						}
					}

				}//else if


				else if (shape==1)
            	{
					//snowflake spin
		       		for(var i=0;i<360;i+=20){
						var O = OO;
						var pre_i = i;
					for(var j=15; j<40; j+=2){
						var x = fn(i, j).x,
						y = fn(i, j).y;
						OBJ[N++] = o = new CObj(O , x, y);
						O = o;
						i-=5;
						}
						i=pre_i;
					}


          		}
          
          
           		else if (shape==2)
               //snowflake six angle
               {
	                for (var i=30;i<390;i+=60)
					{
						var O=OO;
						for (var j=12;j<27;j++)
						{
							var x = fn(i,j).x, y = fn(i,j).y;
							OBJ[N++] = o = new CObj(O,x,y);
							O = o;
						
							if ((j-10)%8 == 0)
							{
								var pre_i = i, pre_j = j, pre_O = O;

								for (var k=0;k<(pre_j/2);k++)
								{   i+=5;
									j-=5;
									x = fn(i,j).x; 
									y = fn(i,j).y;
									OBJ[N++] = o = new CObj(O,x,y);
									O = o;
								}

								i = pre_i;
								j = pre_j;
								O = pre_O;
													
								for (var k=0;k<(pre_j/2);k++)
								{   i-=5;
									j-=5;
									x = fn(i,j).x;
									y = fn(i,j).y;
									OBJ[N++] = o = new CObj(O,x,y);
									O = o;
									
								}
								i = pre_i;
								j = pre_j;
								O = pre_O;
							}
						}
					}
				}		
	
	
	
	
				else if (shape==4)
     			//snowflake like small flower
     			{
					for(var i=0;i<360;i+=60){
						var O = OO;
						pre_i = i;
						pre_O = O;
						for(var j=10; j<34; j+=1){	
							var x = fn(i, j).x,
							y = fn(i, j).y;
							if (j<22)
								{i+=5;}
							else 
								{i-=5;}
							OBJ[N++] = o = new CObj(O , x, y);
							O = o;
						}
						O = pre_O;
						i = pre_i;
						for(var j=10; j<34; j+=1){
							if (j<22)
								{i-=5;}
							else 
								{i+=5;}
							var x = fn(i, j).x,
							y = fn(i, j).y;
							OBJ[N++] = o = new CObj(O , x, y);
							O = o;
						}
					}	
		
         		}
         		// snowflake of spin combine normal
          		else if (shape==5)
          		{
			        for(var i=0;i<360;i+=30){
						var O = OO;
						for(var j=15; j<27; j+=1){
							var x = fn(i, j).x,
							y = fn(i, j).y;
							OBJ[N++] = o = new CObj(O , x, y);
							O = o;
							if ((j%5)==0)
							{   
								pre_i = i;
								pre_O = O;
								for (var k=0; k<(j*2/5); k++)
								{
									i-=5;
									x = fn(i, j).x,
							        y = fn(i, j).y;
							        OBJ[N++] = o = new CObj(O , x, y);
							        O = o;
								}
								i = pre_i;
								O = pre_O;
							}
							
						}
					}
	     		}          							
			},

		start : function () {
		setInterval(function() {
			for (var i = 0; i < N; i++) OBJ[i].run();	
			}, 10);
		} //start function
	
	} //init.propotype
	
	var CObj = function (p, cx, cy) {
		
		if (!p)
		{
			var obj = document.createElement("span");
			obj.setAttribute('style','background-color:white;width:1px;border-radius:100%');
			document.getElementById("screen").appendChild(obj);
			this.css = obj.style;
			this.css.position = "absolute";
			this.css.left = "-1000px";
			this.ddx = 0;
        	this.ddy = 0;
			this.PX = 0;
			this.PY = 0;
			this.x = 0;
			this.y = 0;
			this.x0 = 0;
			this.y0 = 0;
			this.cx = cx;
			this.cy = cy;
			this.parent = p;
			
		}
		else
		{
		
		var obj = document.createElement("span");
		this.css = obj.style;
		this.css.position = "absolute";
		this.css.left = "-1000px";
		//this.css.zIndex = 1000 - N;
		document.getElementById("screen").appendChild(obj);
		this.ddx = 0;
        this.ddy = 0;
		this.PX = 0;
		this.PY = 0;
		this.x = 0;
		this.y = 0;
		this.x0 = 0;
		this.y0 = 0;
		this.cx = cx;
		this.cy = cy;
		this.parent = p;
       }
		}

		CObj.prototype.run = function () {
		if (!this.parent) {
		this.x0 = m.x;
		this.y0 = m.y;
		} else {
				this.x0 = this.parent.x;
				this.y0 = this.parent.y;
				}
		this.x = this.PX += (this.ddx += ((this.x0 - this.PX - this.ddx) + this.cx) / rs) / sp;
		this.y = this.PY += (this.ddy += ((this.y0 - this.PY - this.ddy) + this.cy) / rs) / sp;
		if (!this.parent)
		{
		this.css.left = Math.round(this.x)+'px';
		this.css.top = Math.round(this.y)+'px';
		}
		else
		{
		this.css.left = Math.round(this.x)+'px';
		this.css.top = Math.round(this.y)+'px';
		}
		}
	return init;
}();