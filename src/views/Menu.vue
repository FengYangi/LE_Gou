<template>
  <div id="Box">
    <!-- 头部 -->
    <div class="top">
      <img src="../../public/img/logo.png" width="100%" />
    </div>

    <!-- 登陆注册按钮 -->
    <div class="but">
      <van-button plain class="but1" @click="dl">登录</van-button>

      <van-button plain class="but1" @click="zc">注册</van-button>

      <!-- 注册 -->
      <div class="ZC" v-show="isShow">
        <div class="zhuce">
          <!-- 手机号 -->
          <div class="sjh inp">
            <div class="div1">
              <span class="sp1">*</span>手机号码
            </div>
            <input type="text" @blur="blurzzsjh" v-model="sjhvalue" placeholder="注册手机为找回密码的唯一凭证" />
            <p class="psjh ppc" v-show="zzsjh">请输入正确手机号</p>
          </div>

          <!-- 登录名 -->
          <div class="dlm inp">
            <div class="div1">
              <span class="sp1">*</span>登录名
            </div>
            <input
              type="text"
              @blur="blurzzdlm"
              v-model="dengluvalue"
              placeholder="中、英文均可、不超过12个字符"
            />
            <p class="pdlm ppc" v-show="zzdlm">请输入正确登录名</p>
          </div>

          <!-- 密码 -->
          <div class="mm inp">
            <div class="div1">
              <span class="sp1">*</span>密码
            </div>
            <input
              type="password"
              @blur="blurzzmm"
              v-model="mimavalue"
              placeholder="3-18位英文、数字、符号，区分大小写"
            />
            <p class="pmm ppc" v-show="zzmm">请输入正确密码</p>
          </div>

          <!-- 短信验证 -->
          <van-field class="inp" center clearable label="短信验证码" placeholder="请输入短信验证码">
            <template #button>
              <van-button size="small" type="info" @click="yanzm">发送验证码</van-button>
            </template>
          </van-field>

          <div class="tijiao inp">
            <van-button type="info" block @click="zhuche">注册</van-button>
          </div>
        </div>
      </div>

      <!-- 登录 -->
      <div class="DL" v-show="!isShow">
        <div class="denglu">
          <!-- 手机号 -->
          <div class="sjh inp">
            <div class="div1">
              <span class="sp1">*</span>账号
            </div>
            <input type="text" v-model="dlsjhvalue" placeholder="请输入账号" />
          </div>

          <!-- 密码 -->
          <div class="mm inp">
            <div class="div1">
              <span class="sp1">*</span>密码
            </div>
            <input type="password" v-model="mmvalue" placeholder="请输入密码" />
          </div>

          <!-- 记住我 -->
          <div class="fxk">
            <van-checkbox v-model="checked">记住我</van-checkbox>
          </div>

          <div class="tijiao inp">
            <van-button type="info" block @click="denglu">登录</van-button>
          </div>

          <div class="inp">
            <p class="pp1">
              <a href="#">找回密码</a> |
              <span>还没有注册账号?</span> |
              <a href="#" @click="gozc">立即注册</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Notify } from "vant";
import {
  getzhuce_list,
  getyanzhengma_list,
  getyonghu_list,
  postdlxinxi_list,
  postdenglu_list,
} from "../api/api";
export default {
  data() {
    return {
      isShow: false,
      checked: false,
      // 正则手机号
      zzsjh: false,
      // 正则登录名
      zzdlm: false,
      // 正则密码
      zzmm: false,
      //   手机号
      sjhvalue: "",
      //   登录名
      dengluvalue: "",
      //   密码
      mimavalue: "",
      dlsjhvalue: "",
      mmvalue: "",
    };
  },
  methods: {
    dl() {
      this.isShow = false;
    },
    zc() {
      this.isShow = true;
    },
    gozc() {
      this.isShow = true;
    },
    // 正则手机号验证
    blurzzsjh() {
      let a = /^1[3|4|5|7|8][0-9]{9}$/;
      if (a.test(this.sjhvalue)) {
        this.zzsjh = false;
      } else {
        this.zzsjh = true;
      }
    },

    // 正则登录名
    blurzzdlm() {
      let a = /^[\u4e00-\u9fa5]{1,6}|[a-zA-Z]{1,12}$/;
      if (a.test(this.dengluvalue)) {
        this.zzdlm = false;
      } else {
        this.zzdlm = true;
      }
    },

    // 正则密码
    blurzzmm() {
      let a = /^\w{3,18}$/;
      if (a.test(this.mimavalue)) {
        this.zzmm = false;
      } else {
        this.zzmm = true;
      }
    },

    // 发送验证码
    async yanzm() {
      // 注册手机号是否被注册
      await getzhuce_list({
        phone: this.sjhvalue,
      }).then((res) => {
        console.log(res, "手机号是否可用");
      });

      // 短信验证码
      await getyanzhengma_list({
        phone: this.sjhvalue,
        codeType: 0,
      }).then((res) => {
        console.log(res, "短信验证码");
      });
    },
    // 注册
    async zhuche() {
      // 验证用户是否添加成功
      await getyonghu_list({
        LoginName: this.dengluvalue,
      }).then((res) => {
        console.log(res);
      });
      // console.log(this.dengluvalue)
      // 添加用户信息
      await postdlxinxi_list({
        phone: this.sjhvalue,
        LoginName: this.dengluvalue,
        LoginPassword: this.mimavalue,
      }).then((res) => {
        console.log(res);
      });
    },
    denglu() {
      if (this.dlsjhvalue == "" && this.mmvalue == "") {
        // alert("请完整信息");
        Notify({ type: "warning", message: "请完善信息" });
      } else {
        postdenglu_list({
          LoginName: this.dlsjhvalue,
          LoginPassword: this.mmvalue,
          isPassing:"yes"
        }).then((res) => {
          console.log(res);
          if (res.code == 200) {
            this.$store.dispatch("ADDdenglu", res.tnToken.tokenStr);
            Notify({ type: "success", message: "登陆成功" });
            setTimeout(() => {
              this.$router.push({
                path: "/shouye",
              });
            }, 1000);
          } else {
            Notify({ type: "warning", message: res.msg });
          }
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.but {
  width: 100%;
  height: 8vh;
  .but1 {
    width: 50%;
  }
  .but1:hover {
    color: blueviolet;
  }
}
.ZC {
  width: 100%;
}
.DL {
  width: 100%;
}
.zhuce {
  width: 100%;
  align-items: center;
  font-size: 20px;
  .inp {
    width: 80%;
    height: 10vh;
    margin: 70px auto;
    .ppc {
      color: red;
      width: 100%;
      height: 5vh;
      text-align: left;
      font-size: 13px;
      line-height: 5vh;
    }
    .div1 {
      width: 100%;
      height: 6vh;
      line-height: 6vh;
    }
    .sp1 {
      color: red;
    }
    input {
      width: 100%;
      height: 5vh;
    }
  }
}
.denglu {
  width: 100%;
  align-items: center;
  font-size: 20px;
  .inp {
    width: 80%;
    height: 10vh;
    padding: 20px 0px;
    margin: 0 auto;
    .pp1 {
      text-align: center;
    }
    .div1 {
      width: 100%;
      height: 6vh;
      line-height: 6vh;
    }
    .sp1 {
      color: red;
    }
    input {
      width: 100%;
      height: 5vh;
    }
    .di {
      text-align: center;
    }
  }
  .fxk {
    width: 80%;
    height: 5vh;
    line-height: 5vh;
    margin-top: 30px;
    margin-left: 70px;
  }
}
</style>