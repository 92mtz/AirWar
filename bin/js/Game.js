/**
 * 程序入口
 */
var Game = /** @class */ (function () {
    function Game() {
        //敌机血量
        this.hps = [1, 2, 10];
        //敌机速度
        this.speeds = [3, 2, 1];
        //敌机被击半径
        this.radiuss = [15, 30, 70];
        //初始化引擎，设置游戏宽高
        Laya.init(400, 852);
        //创建循环滚动的背景
        var bg = new BackGround();
        //把背景添加到舞台上显示出来
        Laya.stage.addChild(bg);
        Laya.loader.load("res/atlas/war.atlas", Laya.Handler.create(this, this.onLoaded), null, Laya.Loader.ATLAS);
    }
    Game.prototype.onLoaded = function () {
        //创建一个主角
        this.hero = new Role();
        //初始化主角
        this.hero.init("hero", 0, 1, 0, 30);
        // 设置射击类型
        this.hero.shootType = 1;
        //设置角色位置
        this.hero.pos(200, 500);
        //把角色添加到舞台上
        Laya.stage.addChild(this.hero);
        // 监听舞台的鼠标移动事件
        Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);
        //创建敌机
        // this.createEnemy(10);
        // 创建一个主循环
        Laya.timer.frameLoop(1, this, this.onLoop);
    };
    Game.prototype.onLoop = function () {
        // 遍历舞台上所有的飞机 更改飞机状态
        for (var i = Laya.stage.numChildren - 1; i > 0; i--) {
            var role = Laya.stage.getChildAt(i);
            if (role && role.speed) {
                // 根据飞机速度改变位置
                role.y += role.speed;
                // 如果敌机移动到显示区域外则移除
                if (role.y > 1000 || !role.visible || (role.isBullet && role.y < -20)) {
                    // 舞台移除自己
                    role.removeSelf();
                    // 回收前重置状态
                    role.isBullet = false;
                    role.visible = true;
                    // 回收到对象池
                    Laya.Pool.recover("role", role);
                }
            }
            if (role.shootType > 0) {
                // 获取当前时间
                var time = Laya.Browser.now();
                // 如果当前时间大于下次射击时间
                if (time > role.shootTime) {
                    role.shootTime = time + role.shootInterval;
                    // 从对象池中创建一个子弹
                    var bullet = Laya.Pool.getItemByClass("role", Role);
                    // 初始化子弹信息
                    bullet.init("bullet1", role.camp, 1, -5, 1);
                    // 设置角色类型为子弹类型
                    bullet.isBullet = true;
                    // 设置子弹位置
                    bullet.pos(role.x, role.y - role.hitRadius - 10);
                    // 添加到舞台上
                    Laya.stage.addChild(bullet);
                }
            }
        }
        // 检测碰撞
        for (var i = Laya.stage.numChildren - 1; i > 0; i--) {
            // 获取角色对象1
            var role1 = Laya.stage.getChildAt(i);
            if (role1.hp < 1)
                continue;
            for (var j = Laya.stage.numChildren - 1; j > 0; j--) {
                // 如果角色已经死亡，则忽略
                if (!role.visible)
                    continue;
                // 获取角色对象2
                var role2 = Laya.stage.getChildAt(j);
                // 如果角色未死亡，并且阵营不同才能进行碰撞
                if (role2.hp > 0 && role1.camp != role2.camp) {
                    // 计算碰撞区域
                    var hitRadius = role1.hitRadius + role2.hitRadius;
                    // 根据距离判断是否碰撞
                    if (Math.abs(role1.x - role2.x) < hitRadius && Math.abs(role1.y - role2.y) < hitRadius) {
                        //碰撞之后掉血
                        this.lostHp(role1, 1);
                        this.lostHp(role2, 1);
                    }
                }
            }
        }
        // 如果主角死亡，则停止游戏循环
        if (this.hero.hp < 1) {
            Laya.timer.clear(this, this.onLoop);
        }
        // 每隔30帧创建新敌机
        if (Laya.timer.currFrame % 60 === 0) {
            this.createEnemy(2);
        }
    };
    Game.prototype.lostHp = function (role, lostHp) {
        // 减血
        role.hp -= lostHp;
        if (role.hp > 0) {
            // 如果未死亡，播放碰撞的动画
            role.playAction("hit");
        }
        else {
            if (role.isBullet) {
                // 如果是子弹,则直接隐藏
                role.visible = false;
            }
            else {
                // 如果不是子弹,则播放爆炸的动画
                role.playAction("down");
            }
        }
    };
    Game.prototype.onMouseMove = function () {
        //始终保持主角与鼠标位置一直
        this.hero.pos(Laya.stage.mouseX, Laya.stage.mouseY);
    };
    Game.prototype.createEnemy = function (num) {
        for (var i = 0; i < num; i++) {
            // 生成随机数
            var r = Math.random();
            // 根据随机数设置敌机类型
            var _type = r < 0.75 ? 0 : r < 0.9 ? 1 : 2;
            // 新建敌机
            var enemy = Laya.Pool.getItemByClass('role', Role);
            // 初始化敌机对象
            enemy.init("enemy" + (_type + 1), 1, this.hps[_type], this.speeds[_type], this.radiuss[_type]);
            // 随机放置敌机位置
            enemy.pos(Math.random() * 400 + 40, Math.random() * 200);
            // 添加到舞台上
            Laya.stage.addChild(enemy);
        }
    };
    return Game;
}());
//启动游戏
new Game();
//# sourceMappingURL=Game.js.map