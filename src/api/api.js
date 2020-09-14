// import {getshouye_list,getshangping_list,getyiji_list,geterji_list,getxiangq_list,getzhuce_list,getyanzhengma_list,getyonghu_list,postdlxinxi_list,getdenglu_list} from './index'
import api from './index'
// axios
import request from '../utils/reques'

// 获取首页数据
export function getshouye_list(params) {
    return request({
        url: api.shouye_list,
        method: 'get',
        params,
        hideloading: false
    })
}

// 商品信息
export function getshangping_list(params = {}) {
    return request({
        url: api.shangping_list,
        method: 'get',
        params,
        hideloading: false
    })
}

// 一级分类
export function getyiji_list(params = {}) {
    return request({
        url: api.yiji_list,
        method: 'get',
        params,
        hideloading: false
    })
}

// 二级分类
export function geterji_list(params = {}) {
    return request({
        url: api.erji_list,
        method: 'get',
        params,
        hideloading: false
    })
}

// 商品详情
export function getxiangq_list(params = {}) {
    return request({
        url: api.xiangq_list,
        method: 'get',
        params,
        hideloading: false
    })
}

// 注册手机号是否被注册
export function getzhuce_list(params = {}) {
    return request({
        url: api.zhuce_list,
        method: 'get',
        params,
        hideloading: false
    })
}

// 短信验证码
export function getyanzhengma_list(params = {}) {
    return request({
        url: api.yanzhengma_list,
        method: 'get',
        params,
        hideloading: false
    })
}

// 验证用户是否可用
export function getyonghu_list(params = {}) {
    return request({
        url: api.yonghu_list,
        method: 'get',
        params,
        hideloading: false
    })
}

// 添加登录信息
export function postdlxinxi_list(params = {}) {
    return request({
        url: api.dlxinxi_list,
        method: 'post',
        params,
        hideloading: false
    })
}

// 测试登录
export function postdenglu_list(params = {}) {
    return request({
        url: api.denglu_list,
        method: 'post',
        params,
        hideloading: false
    })
}

// 添加购物车
export function postgouwuche_list(params = {}) {
    return request({
        url: api.gouwuche_list,
        method: 'post',
        params,
        hideloading: false
    })
}

// 获取用户购物车信息
export function getTGgouwu_list(params = {}) {
    return request({
        url: api.TGgouwu_list,
        method: 'get',
        params,
        hideloading: false
    })
}

// 修改购物车中商品的数量
export function getXGnum_list(params = {}) {
    return request({
        url: api.XGnum_list,
        method: 'patch',
        params,
        hideloading: false
    })
}

// 删除购物车数据
export function getDELgouwu_list(params = {}) {
    return request({
        url: api.DELgouwu_list,
        method: 'patch',
        params,
        hideloading: false
    })
}

// 展示订单信息，包含商品信息和店铺信息
export function getDINGDXX_list(params = {}) {
    return request({
        url: api.DINGDXX_list,
        method: 'get',
        params,
        hideloading: false
    })
}

// 添加用户的收货地址
export function postShouHuo_DZ(params = {}) {
    return request({
        url: api.ShouHuo_DZ,
        method: 'post',
        params,
        hideloading: false
    })
}

// 获取用户的收货地址
export function getHuoquShouHuo_DZ(params = {}) {
    return request({
        url: api.HuoquShouHuo_DZ,
        method: 'get',
        params,
        hideloading: false
    })
}


// 修改用户地址为删除状态
export function patchXiuGai_DZ(params = {}) {
    return request({
        url: api.XiuGai_DZ,
        method: 'patch',
        params,
        hideloading: false
    })
}


// 修改用户地址为删除状态
export function patchDel_DZ(params = {}) {
    return request({
        url: api.Del_DZ,
        method: 'patch',
        params,
        hideloading: false
    })
}


// 创建订单 点击确定付款 但未完成付款操作
export function postCJ_Dd(params = {}) {
    return request({
        url: api.CJ_Dd,
        method: 'post',
        params,
        hideloading: false
    })
}


// 进行订单的支付 （余额）
export function postyuer_zf(data) {
    return request({
        url: api.yuer_zf,
        method: 'post',
        data,
        hideloading: false
    })
}


// 验证支付密码
export function postYZ_password(data) {
    return request({
        url: api.YZ_password,
        method: 'post',
        data,
        hideloading: false
    })
}


// 支付宝订单支付   手机网页支付
export function postZFB_zf(data) {
    return request({
        url: api.ZFB_zf,
        method: 'post',
        data,
        hideloading: false
    })
}


// 获取商品信息（可分页）搜索
export function getSuosou(params = {}) {
    return request({
        url: api.Suosou,
        method: 'get',
        params,
        hideloading: false
    })
}