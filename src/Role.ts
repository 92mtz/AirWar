/**
 * 角色类
 */
class Role extends Laya.Sprite {
    // 定义飞机身体
    private body: Laya.Animation;
    // 定义动画是否已被缓存
    private static cached: boolean = false;
    // 角色类型
    public type: string;
    // 阵营
    public camp: number;
    // 血量
    public hp: number;
    // 敌军速度
    public speed: number;
    // 被击半径
    public hitRadius: number;

    // 射击类型
    public shootType: number = 0;
    // 射击间隔
    public shootInterval: number = 500;
    // 下次射击时间
    public shootTime: number = Laya.Browser.now() + 2000;
    // 当前动作
    public action: string = "";
    // 主角方类型 0、普通；1、子弹；2、炸药；3、补给品
    public heroType: number = 0;


    constructor() {
        super();
        // 初始化
        // this.init();
    }
    public init(_type: string, _camp: number, _hp: number, _speed: number, _hitRadius: number, _heroType: number = 0): void {
        this.type = _type;
        this.camp = _camp;
        this.hp = _hp;
        this.speed = _speed;
        this.hitRadius = _hitRadius;
        this.heroType = _heroType;
        if (!Role.cached) {
            Role.cached = true;
            // 缓存主角飞行动画
            Laya.Animation.createFrames(["war/hero_fly1.png", "war/hero_fly2.png"], "hero_fly");
            // 缓存主角集中后的爆炸效果
            Laya.Animation.createFrames(["war/hero_down1.png", "war/hero_down2.png", "war/hero_down3.png", "war/hero_down4.png"], "hero_down");
            // 缓存敌机1飞行动画
            Laya.Animation.createFrames(["war/enemy1_fly1.png"], "enemy1_fly");
            // 缓存敌机1的爆炸效果
            Laya.Animation.createFrames(["war/enemy1_down1.png", "war/enemy1_down2.png", "war/enemy1_down3.png", "war/enemy1_down4.png"], "enemy1_down");
            // 缓存敌机2飞行动画
            Laya.Animation.createFrames(["war/enemy2_fly1.png"], "enemy2_fly");
            // 缓存敌机2的爆炸效果
            Laya.Animation.createFrames(["war/enemy2_down1.png", "war/enemy2_down2.png", "war/enemy2_down3.png", "war/enemy2_down4.png"], "enemy2_down");
            // 缓存敌机2的碰撞动画
            Laya.Animation.createFrames(["war/enemy2_hit.png"], "enemy2_hit");
            // 缓存敌机3飞行动画
            Laya.Animation.createFrames(["war/enemy3_fly1.png", "war/enemy3_fly2.png"], "enemy3_fly");
            // 缓存敌机3的爆炸效果
            Laya.Animation.createFrames(["war/enemy3_down1.png", "war/enemy3_down2.png", "war/enemy3_down3.png", "war/enemy3_down4.png", "war/enemy3_down5.png", "war/enemy3_down6.png"], "enemy3_down");
            // 缓存敌机3的碰撞动画
            Laya.Animation.createFrames(["war/enemy3_hit.png"], "enemy3_hit");
            // 缓存子弹1动画
            Laya.Animation.createFrames(["war/bullet1.png"], "bullet1_fly");
            // 缓存子弹2动画
            Laya.Animation.createFrames(["war/bullet2.png"], "bullet2_fly");
            // 缓存强化包动画
            Laya.Animation.createFrames(["war/ufo1.png"], "ufo1_fly");
            // 缓存医疗包动画
            Laya.Animation.createFrames(["war/ufo2.png"], "ufo2_fly");
        }
        if (!this.body) {
            // 创建一个动画作为飞机的身体
            this.body = new Laya.Animation();
            // 把机体添加到容器内
            this.addChild(this.body);
            // 添加动画播放完成事件
            this.body.on(Laya.Event.COMPLETE, this, this.onPlayComplete);
        }
        // 根据类型播放动画
        this.playAction("fly");
    }
    onPlayComplete(): void {
        // 如果是击毁动画，则隐藏对象
        if (this.action === 'down') {
            // 停止播放动画
            this.body.stop();
            // 隐藏显示
            this.visible = false;
        } else if (this.action === 'hit') {
            // 如果是被击动画播放完毕，则播放飞行动画
            this.playAction("fly");
        }
    }
    playAction(action: string): void {
        // 记录当前播放动画类型
        this.action = action
        this.body.play(0, true, this.type + '_' + action);
        // 获取动画大小
        var bound: Laya.Rectangle = this.body.getBounds();
        // 设置机身居中
        this.body.pos(-bound.width / 2, -bound.height / 2);
    }
}