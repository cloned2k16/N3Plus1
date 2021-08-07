/*
    Copyright (c) 2021 , Paolo Lioy

    bla blabla blablabla ..
*/ 
var 	z
	,   gapX    	= 1
	,   gapY    	= 1
	,   zoomX   	= 1
	,   zoomY   	= 1 
	, 	defStrokeC	= '#33333333'
	,	hops    	={}
	;

const   ND      				= 	undefined
    ,   FN                      =   Function.apply
    ,   round2                  =   (n)             =>  { return Math.round(( n + Number.EPSILON) * 100) / 100;                     }
    ,   _log                    =   function ()         { FN.call(console.log  , console, arguments);                               }
    ,   _err                    =   function ()         { FN.call(console.error, console, arguments);                               }
    ,   url     = new URL(window.location)
    ,   query   = window.location.search.substring(1)
    ,   gfx     = document.getElementById('display')
    ,   getEl   = ( id )                            => {
            let     d=document
                ,   e=d.getElementById(id)
                ;
                return {
					el 		: e
				 ,	floatV 	: () => { return parseFloat(el.value.replace(',','.')) }
				 ,	intV   	: () => { return parseInt(el) }
                }
        }
    ,   param   = ( nm )                            => {
        return url.searchParams.get(nm);
    }
    ,   paramF  = ( nm )                            => {
        if (param(nm)==ND) return ND; else return parseFloat(param(nm).replace(',','.'));
    }
    ,   ctx     = gfx.getContext('2d')
    ,   width   = gfx.width
    ,   height  = gfx.height
	,	R       = 1
    ,   cX      = 1
    ,   cY      = height / 2 
    ,   PI      = Math.PI
    ,   PI2     = 2*PI
    ,   line    = (x,y,x1,y1,strokeC)               => {
                    x =cX+(  x)*zoomX
                    y =cY+R*zoomY-y*zoomY
                    x1 =cX+(x1)*zoomX
                    y1 =cY+R*zoomY-y1*zoomY
                    ctx.beginPath();
                    ctx.lineWidth = 1;
                    if ( ND != strokeC ){
                        //defStrokeC      =
                        ctx.strokeStyle = strokeC ;
                    }
                    else {
                        ctx.strokeStyle = defStrokeC ;
                    }
                    ctx.moveTo(x,y);
                    ctx.lineTo(x1,y1);
                    ctx.stroke();
        }
	,   plot	= (n,c,a) => {
		    if (n==ND) return;
			let isO
			,	x,y,nn,xx
			,	lbl='_'+n
			,	n0 =n
			,   step=0
			;
			hops[lbl]=step;
			while (n>=1) {
				    let lblx='_'+n+'_seen'
					let num=lbl.replace('_',''); 
				    if (hops[lblx]==ND) hops[lblx]=''+num; 
					else hops[lblx]+=','+num
					isO = ((n>>0) & 1)==1
					hops[lbl]=++step;
					y  =((n>>1) * gapY)
					x  =  n * gapX
				if (isO){
					y=-y
					nn = n*3+1
				}				
				else {
					nn = n /2
				}
				xx = nn * gapX
				let ss=x>xx?-0:0;
				if (n>4) ss*=1; else ss=0;
				line(x , 0,   x+ss,  y,c)
				line(x+ss, y, xx-ss,  y,c)
				line(xx-ss  , y,xx,  0,c)
				if (n==1) break;
				let trackID='_'+nn; // hit
				n=nn
				//if (a==ND && n<n0){
				if (hops[trackID] != ND){	
				 if (a==1){
				  let lbl0=	'_'+n;
				  hops[lbl+'_'+hops[lbl]+'~'+n]=hops[lbl0];
				  n=0;				  
 				 }
				}
			}
			//_log(lbl,hops[lbl]);
		}			
	;
	
	ctx.font = "24px Georgia";
    ctx.fillStyle = "black";
    ctx.textAlign = "left";
    ctx.fillText('N3+1', 11,100);
	ctx.font = "12px Georgia";
    ctx.textAlign = "left";
    ctx.fillText('yet another proof that mathematicians are idiots ..', 17,121);

	let path0 = 
	
	[ 1,2,3,4,5,7,8,9,10,11,13,14,15,16,17,19,20,22,23,26,27,28,29,31,34,35,37,38,40,41,43,44,46,47,49
	 ,52,53,56,58,61,62,65,67,70,71,74,76,80,82,86,88,91,92,94,98
	 ,101,103,106,107,112,121,122,124,130,137,142,148,152,155,160,161,167,172,175,182,184,196,202,206,214,233,242,244
	 ,251,263,271,274,283,304,310,319,322,325,334,344,350,361,364,377,395,407,412,425,433,445,466,479,481,484,488
	 ,502,526,542,566,577,593,611,638,641,650,668,688,700,719,722,754,790,814,850,866,890,911,917,958,962,976
	 ,1079,1084,1132,1154,1186,1222,1276,1282,1300,1336,1367,1376,1438,1444,1619,1732,1780,1822,1834,1924
	 ,2051,2158,2308,2429,2564,2734,2752,3077,3238,3644
	 ,4102,4616,4858,5128,6154,7288,9232
	 ];
	 
	let path = [1,2,3,4,5,6,7,8,9,10,31,41,71,91]//,41,47,62,71,82,91,94,103,107,121,124,137,142,155,161,167,175,182,206,214,233,242,251,263,274,283,310,319,322,334,350,364,377,395,412,425,445,466,479,484,502,526,566,593,638,668,700,719,754,790,850,890,911,958,1079,1132,1186,1276,1336,1367,1438,1619,1780,1822,2051,2158,2429,2734,3077,3238,3644,4102,4858,6154,7288,9232,9232]; 
	let max=23
	,	rep=2
	;
	for (i =1 ; i<=160; i++){
    //for (i=0; i<path.length;i++){
		//if (!path.includes(n)) plot(n,'#22696504')
		//plot(path[i],'#22696504')	
		plot(i,'#22696504')	
	}
	for (i =1 ; i<=23; i++){
		plot(i,'#22696504',0)	
	}


	//for (i=0; i<path.length;i++){		plot(path[i],'#2666',1);	}
	//

	let allN=Object.entries(hops)
	_log('num paths',hops,allN.length);
	_log('End.');
		