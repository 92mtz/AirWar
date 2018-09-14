/**
 * 程序入口
 */
class Game {
    private hero: Role;
    constructor() {
        //初始化引擎，设置游戏宽高
        Laya.init(400, 852);
        //创建循环滚动的背景
        var bg: BackGround = new BackGround();
        //把背景添加到舞台上显示出来
        Laya.stage.addChild(bg);
        Laya.loader.load("res/atlas/war.atlas", Laya.Handler.create(this, this.onLoaded), null, Laya.Loader.ATLAS);
    }
    onLoaded(): void {
        //创建一个主角
        this.hero = new Role();
        //初始化主角
        this.hero.init("hero", 0, 1, 0, 30);
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
    }
    onLoop(): void {
        // 遍历舞台上所有的飞机 更改飞机状态
        for (var i: number = Laya.stage.numChildren - 1; i > 0; i--) {
            var role: Role = Laya.stage.getChildAt(i) as Role;
            if (role && role.speed) {
                // 根据飞机速度改变位置
                role.y += role.speed;
                // 如果敌机移动到显示区域外则移除
                if (role.y > 1000) {
                    console.log(Laya.Pool)
                    // 舞台移除自己
                    role.removeSelf();
                    // 回收到对象池
                    Laya.Pool.recover("role", role);
                }
            }
        }
        // 每隔30帧创建新敌机
        if (Laya.timer.currFrame % 60 === 0) {
            this.createEnemy(2);
        }
    }
    onMouseMove(): void {
        //始终保持主角与鼠标位置一直
        this.hero.pos(Laya.stage.mouseX, Laya.stage.mouseY)
    }
    //敌机血量
    private hps: Array<any> = [1, 2, 10]
    //敌机速度
    private speeds: Array<any> = [3, 2, 1]
    //敌机被击半径
    private radiuss: Array<any> = [15, 30, 70]
    createEnemy(num: number): void {
        for (let i: number = 0; i < num; i++) {
            // 生成随机数
            let r: number = Math.random();
            // 根据随机数设置敌机类型
            let _type: number = r < 0.75 ? 0 : r < 0.9 ? 1 : 2;
            // 新建敌机
            let enemy: Role = Laya.Pool.getItemByClass('role', Role);
            // 初始化敌机对象
            enemy.init("enemy" + (_type + 1), 1, this.hps[_type], this.speeds[_type], this.radiuss[_type]);
            // 随机放置敌机位置
            enemy.pos(Math.random() * 400 + 40, Math.random() * 200);
            // 添加到舞台上
            Laya.stage.addChild(enemy)
        }
    }
}
//启动游戏
new Game();