// 食物构造函数
// 食物属性包括:
	// 1.width  / height
	// 2. 偏移x / 偏移 y
	// 3. 颜色
// 食物方法包括:
	// 1.渲染render
	// 2.随机坐标random

var _position = "absolute";
var _target = null;

function Food(options) {
	var options = options || {};
	this.color = options.color || "orange";
	this.width = options.width || 20;
	this.height = options.height || 20;
	this.x = options.x || 20;
	this.y = options.y || 20,
	this._div = null
}


// 渲染函数render，stage是渲染盒子位置
Food.prototype.render = function(stage) {

	_target = stage;
	var div = document.createElement("div");
	stage.appendChild(div);
	this._div = div;

	div.style.width = this.width + "px";
	div.style.height = this.width + "px";
	div.style.backgroundColor = this.color;
	div.style.outline = "1px solid yellow";
	div.style.borderRadius = "50%";
	div.style.outlineOffset = "6px";
	div.style.position = _position;
	div.style.top = this.y + "px";
	div.style.left = this.x + "px";
}

Food.prototype.random = function() {
	if (!_target) return;
	var numberx = Math.floor(Math.random() * (_target.offsetWidth / this.width - 1)),
		numbery = Math.floor(Math.random() * (_target.offsetHeight / this.height - 1));
	this.x = numberx * this.width;
	this.y = numbery * this.height;
	this._div.style.left = this.x + "px";
	this._div.style.top = this.y + "px";
}
