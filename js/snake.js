// 蛇构造函数Snake
// 对象属性:
// 	1.width(组成蛇的单个方块儿的宽度)
// 	2.height(组成蛇的单个方块儿的高度)
// 	3.移动方向direction
// 	4.蛇的身体
// 4.1 蛇头
// 	4.1.1 偏移x
// 	4.1.2 偏移y
// 	4.1.3 颜色
// 4.2 蛇身
// 	4.2.1 偏移x
// 	4.2.2 偏移y
// 	4.2.3 颜色
// 对象方法:
// 	1.渲染render
// 	2.移动move

var _position = "absolute";

function Snake(options) {
	var options = options || {};
	this.width = options.width || 20;
	this.height = options.height || 20;
	this.direction =options.direction || "bottom";
	this.body = [{
			x: 3,
			y: 2,
			color: "red",
			_div:null
		}, //蛇头
		{
			x: 2,
			y: 2,
			color: "orange",
			_div:null
		}, //蛇身1（方块儿）
		{
			x: 1,
			y: 2,
			color: "orange",
			_div:null
		} //蛇身2（方块儿）
	]
}

Snake.prototype.render = function(stage) {
	this.body.forEach(item => {
		var div = document.createElement("div");
		stage.appendChild(div);
		item._div = div;
		div.style.width = this.width + "px";
		div.style.height = this.height + "px";
		div.style.borderRadius = "50%";
		div.style.backgroundColor = item.color;
		div.style.position = _position;
		div.style.left = item.x * this.width + "px";
		div.style.top = item.y * this.height + "px";
	});
	this.body[0]._div.style.zIndex = 99;
}

// 移动一格函数，包括身体移动以及头移动，且身体移动依赖头部移动，
// 现将所有身体进行移动，然后移动头部
Snake.prototype.move = function() {
// 1.所有身体方格向移动方向前进一格，原先某一个格子后面一个格子移动到这个盒子的位置，
// 		此盒子移动到他前一个盒子的位置
for(var i=this.body.length-1 ; i>0 ; i--) {
	
	this.body[i].x = this.body[i-1].x;
	this.body[i].y = this.body[i-1].y;
}

// 2.头部向指定方向移动一格
	switch (this.direction) {
		case "right":
			this.body[0].x += 1;
			break;
		case "left":
			this.body[0].x -= 1;
			break;
		case "top":
			this.body[0].y -= 1;
			break;
		case "bottom":
			this.body[0].y += 1;
			break;
	}
}


