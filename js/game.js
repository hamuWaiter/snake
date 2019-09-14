var gameover = document.querySelector(".box .gameover");
var startBox = document.querySelector(".box .container .startgame");
var startBtn = document.querySelector(".box .container .startgame .mui-btn");
var text = document.querySelector(".box .gameover p");
var btn = document.querySelector(".box .gameover .mui-btn");
var leave = document.getElementById("leave");
var target = document.querySelector(".box .container");

// 新建蛇，并在页面加载完成时渲染一次
var snake = null;
// 新建食物
var food = null;
// 设置边界限制
var limTop = null,
	limBottom = null,
	limLeft = null,
	limRight = null;





// 点击开始游戏
startBtn.onclick = function() {
	// 创建食物
	food = new Food();
	food.render(target);
	food.random();
	// 创建蛇
	snake = new Snake();
	snake.render(target);
	// 设置边界限制
	limTop = 0;
	limLeft = 0;
	limBottom = Math.floor(target.offsetHeight / snake.height);
	limRight = Math.floor(target.offsetWidth / snake.width);
	startBox.style.display = "none";
	game();
}



// 游戏逻辑函数
function game(){
	gameStart = setInterval(function() {
		snake.move();
		// 在移动后渲染之前先删除前一次的"蛇",否则会看到蛇一直在变长
		// console.log(snake.body[0].x);
		// console.log(snake.body[0].y);

		// 判断蛇头位置是否与实务位置重合，
		// 重合了的话给蛇增加一个格子，同事实务消失，再生成一个新食物
		if (snake.body[0].x == food.x / food.width && snake.body[0].y == food.y / food.height) {
			console.log("吃吃吃");
			// 1.移除食物
			target.removeChild(food._div);
			// 2.身体变长向snake.body[]中push一个新对象
			var addBody = {
				x: snake.body[snake.body.length - 1].x,
				y: snake.body[snake.body.length - 1].y,
				color: "orange",
				_div: null
			}
			snake.body.push(addBody);
			// 随机生成新食物
			food.render(target);
			food.random();
		}
		// 删除上一次创建蛇对象时所创建的div
		snake.body.forEach(item => {
			if (item._div) {
				target.removeChild(item._div);
			}
		});
		// 渲染移动后的蛇
		snake.render(target);

		///////////////////// 游戏结束部分/////////////////////


		// 1. 判断大河头的位置是否还在盒子内，不在就弹出游戏结束
		if (snake.body[0].x < limLeft || snake.body[0].x >= limRight || snake.body[0].y < limTop || snake.body[0].y >=
			limBottom) {
			clearInterval(gameStart);
			// alert会阻止浏览器渲染，所以当弹出弹窗时浏览器还是上一次蛇的位置还没来得及渲染这一次蛇
			// 的位置。所以当点击弹窗的确认后蛇会“闪”一下从而渲染到游戏结束的位置
			// alert("游戏结束");
			gameover.style.visibility = "visible";
			text.innerHTML = "超出范围，游戏结束";
		}
		// 2. 判断蛇头 是否与身体重合，重合则游戏结束
		for (var i = 1; i < snake.body.length; i++) {
			if (snake.body[i].x == snake.body[0].x && snake.body[i].y == snake.body[0].y) {
				clearInterval(gameStart);
				gameover.style.visibility = "visible";
				text.innerHTML = "咬到自己，游戏结束";
				// alert("游戏结束");

			}
		}
	}, 100);
}


// 控制蛇的方向			上下左右
document.onkeyup = function(e) {
	var code = e.charCode || e.keyCode;
	if (code == 38 && snake.direction != "bottom") {
		snake.direction = "top";
	} else if (code == 40 && snake.direction != "top") {
		snake.direction = "bottom";
		//此处编写用户敲回车后的代码
	} else if (code == 37 && snake.direction != "right") {
		snake.direction = "left";
		//此处编写用户敲回车后的代码
	} else if (code == 39 && snake.direction != "left") {
		snake.direction = "right";
		//此处编写用户敲回车后的代码
	}
}

// 游戏结束点击弹窗“再来一局”自动删除出局的蛇并在最开始的
// 位置新建一条蛇渲染进页面
btn.onclick = function() {
	gameover.style.visibility = "hidden";
	// 清除出局的蛇
	console.log(snake);
	snake.body.forEach(item => {
		if (item._div) {
			target.removeChild(item._div);
		}
	});
	target.removeChild(food._div);
	
	// 创建新食物
	food = new Food();
	food.render(target);
	food.random();
	// 创建新蛇
	snake = new Snake();
	snake.render(target);
	game();
}

// 游戏结束点击弹窗取消页面恢复到最开始的时候
leave.onclick = function() {
	startBox.style.display = "block";
	
	snake.body.forEach(item => {
		if (item._div) {
			target.removeChild(item._div);
		}
	});
	target.removeChild(food._div);
	
	gameover.style.visibility = "hidden";


	// 创建新蛇
}