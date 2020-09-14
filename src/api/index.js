const api = {
    // 首页接口
    shouye_list: "/api/Home/getHomeREC",
    // 商品信息
    shangping_list: "/api/Home/getHomeShowGoods",
    // 一级分类
    yiji_list: "/api/Goods/getCatsTree",
    // 二级分类
    erji_list: "/api/Goods/getCadGoods",
    // 商品详情
    xiangq_list: "/api/Goods/GetGoodsInfo",
    // 注册手机号是否被注册
    zhuce_list: "/api/Verify/GetPhone",
    // 短信验证码
    yanzhengma_list: "/api/SMSCode/GetCode",
    // 验证用户是否可用
    yonghu_list: "/api/Verify/LoginName",
    // 添加登录信息
    dlxinxi_list: "/api/LoginPage/AddLogin",
    // 测试登录
    denglu_list: "/api/LoginPage/Login",
    // 添加购物车
    gouwuche_list: "/api/Cart/addCart",
    // 获取购物车数据
    TGgouwu_list: "/api/Cart/getCart",
    // 修改购物车中商品的数量
    XGnum_list: "/api/Cart/patchCartNum",
    // 删除购物车数据
    DELgouwu_list: "/api/Cart/DeleteCart",
    // 展示订单信息，包含商品信息和店铺信息
    DINGDXX_list: "/api/Order/getOrderInfo",
    // 添加用户的收货地址
    ShouHuo_DZ: "/api/UserInfo/addArea",
    // 获取用户的收货地址
    HuoquShouHuo_DZ: "/api/UserInfo/getArea",
    // 修改用户地址为删除状态
    XiuGai_DZ: "/api/UserInfo/deleteArea",
    // 修改用户地址为删除状态
    Del_DZ: "/api/UserInfo/deleteArea",
    // 创建订单 点击确定付款 但未完成付款操作
    CJ_Dd:"/api/Order/cretaeOrder",
    // 进行订单的支付 （余额）
    yuer_zf:"/api/Order/payOrder",
    // 验证支付密码
    YZ_password:"/api/Order/verifyPayPWD",
    // 支付宝订单支付   手机网页支付
    ZFB_zf:"/api/Alipay/appWebPay",
    // 获取商品信息（可分页）搜索
    Suosou:"/api/Goods/getGoods",

}

module.exports = api