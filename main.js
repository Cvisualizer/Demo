var count=0;
var slide=false;
var slideCount=0;
var started=false;
var svg=Snap(1500,900);
var stackCount=0;
var appearCount=0;

var span=10;
var time=30;
var num=time/span;
var rectW=0;
var rectH=0;
var rectColE="#e9546b";
var is_play=false;
var showRise=false;
var riseOp=0;
var objects=svg.group();
var count=0;
var is_pause=false;
var exec_speed=1;
var def_speed=exec_speed;
var wait_count=0;
var dataset;
var shadowRep = Snap.filter.shadow(1,1,1,"black",0.5);
var shadow = svg.filter(shadowRep);
var blurRep = Snap.filter.blur(2,2);
var blur = svg.filter(blurRep);
Math.seedrandom("test");
var is_stop=false;
var animSpan=80;

function update(){
	/*if(appearCount<60){
		if(appearCount>1){
			setOp(appearCount);
			appearCount+=1/60;
		}
		appearCount+=1/120;
	}*/
	if(slide==true){
		if(slideCount>=0){
			document.getElementById('sideBar').style.left=slideCount+"%";
			document.getElementById('editor').style.left=(slideCount+1)+"%";
			document.getElementById('tutorial').style.left=(slideCount+3.9)+"%";
			document.getElementById('exec').style.left=(slideCount+7.3)+"%";
			document.getElementById('execText').style.left=(slideCount+10.7)+"%";
			document.getElementById('title').style.left=(slideCount+2.5)+"%";
			document.getElementById('drawAreaText').style.left=(slideCount+42.5)+"%";
			document.getElementById('drawAreaText2').style.left=(slideCount-56.5)+"%";
		}
		if(started==false&&slideCount<=0){
			generate(900,280,400,600,"#202020",1,"black",0);
			started=true;
		}
		slideCount-=2;
	}

	if(started==true){
		if(count%animSpan==0){
			draw(count/animSpan);
		}
		count++;
	}
}

function draw(phase){
	switch(phase){
		case 0:
			generate(700,300,0,0,"#606060",1,"black",0);	//x描画
			generate(900,280,0,0,"00df60",1,"black",0);	//xメモリ描画
			resize(rects[1],100,50,200);
			resize(rects[2],400,20,200);
			repaint(rects[1],"00df60",1,200);
			label(700,295,"25px","HelveticaNeue","num","#000");
			label(1080,295,"20px","HelveticaNeue","num","#fff");
			break;

		case 1:
			generate(350,300,0,0,"#202020",1,"black",0);	//main描画
			generate(360,330,0,0,"#606060",1,"black",0);	//p描画
			generate(470,330,0,0,"#606060",1,"black",0);	//p2描画
			generate(900,680,0,0,"#202f55",1,"black",0);	//mainメモリ描画
			generate(900,840,0,0,"#fcc800",1,"black",0);	//pメモリ描画
			generate(900,810,0,0,"#3cb37a",1,"black",0);	//p2メモリ描画
			generate(360,440,0,0,"#606060",1,"black",0);	//pp描画
			generate(900,780,0,0,"#e73562",1,"black",0);	//ppメモリ描画
			resize(rects[3],300,400,200);
			resize(rects[4],100,50,200);
			resize(rects[5],100,50,200);
			resize(rects[6],400,200,200);
			resize(rects[7],400,30,200);
			resize(rects[8],400,30,200);
			resize(rects[9],100,50,200);
			resize(rects[10],400,30,200);
			label(350,295,"25px","HelveticaNeue","main","#000");	//mainラベル
			label(360,323,"20px","HelveticaNeue","p","#fff");		//pラベル
			label(470,323,"20px","HelveticaNeue","p2","#fff");		//p2ラベル
			label(360,432,"20px","HelveticaNeue","pp","#fff");		//ppラベル
			label(1080,700,"20px","HelveticaNeue","main","#fff");	//mainメモリラベル
			label(1090,860,"20px","HelveticaNeue","p","#fff");	//pメモリラベル
			label(1090,830,"20px","HelveticaNeue","p2","#fff");	//p2メモリラベル
			label(1090,800,"20px","HelveticaNeue","pp","#fff");	//ppメモリラベル
			break;

		case 2:
			generate(900,640,0,0,"#ea5532",1,"black",0);	//PokemonGOメモリ描画
			resize(rects[11],400,40,200);
			label(1040,665,"20px","HelveticaNeue",'"PokemonGO"',"#fff");	//PokemonGOメモリラベル
			repaint(rects[4],"#ea5532",1,100);
			polyline(900,855,830,855,830,660,900,660,rects[7].attr("fill"),5);
			polylines[0].attr("opacity",0);
			polylines[0].animate( { stroke :polylines[0].attr("stroke"),opacity:1},200 );
			//alert(polylines[0].attr("points"));
			break;

		case 3:
			generate(900,600,0,0,"#008db7",1,"black",0);	//Nianticメモリ描画
			resize(rects[12],400,40,200);
			label(1060,625,"20px","HelveticaNeue",'"Niantic"',"#fff");	//Nianticメモリラベル
			repaint(rects[5],"#008db7",1,100);
			polyline(900,825,800,825,800,620,900,620,rects[8].attr("fill"),5);
			polylines[1].attr("opacity",0);
			polylines[1].animate( { stroke :polylines[1].attr("stroke"),opacity:1},200 );
			break;

		case 4:
			repaint(rects[9],rects[7].attr("fill"),1,100);
			polyline(1300,795,1350,795,1350,855,1300,855,rects[10].attr("fill"),5);
			polylines[2].attr("opacity",0);
			polylines[2].animate( { stroke :polylines[2].attr("stroke"),opacity:1},200 );
			break;

		case 5:
			repaint(rects[9],rects[8].attr("fill"),1,100);
			polylines[2].attr("points",[1300,795,1350,795,1350,825,1300,825])
			break;
	}
}

function setSlide(state){
	slide=state;
	if(slide==true){
		slideCount=38;
	}
}

function play(){
	if(is_play==false){
		//request();
	}
	else{
		reset();
	}
}
