<template>
    <div class="login-page">          
        <div class="main">
           <div class="form">
               <p class="lg-title">百倍计划管理系统</p>
                <el-input @keyup.enter.native="login" style="margin-top:25px" placeholder="请输入用户名" v-model="userName">
                    <i class="el-icon-user" slot="prepend"></i>                    
                </el-input> 
                <el-input @keyup.enter.native="login" style="margin-top:25px" type="password" placeholder="请输入密码" v-model="password">
                    <i class="el-icon-key" slot="prepend"></i>                    
                </el-input>
                <el-button @click="login"  style="width:300px;margin-top:25px" type="primary">登录</el-button>               
           </div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      userName: '',
      password:''
    }
  },
  methods:{
      login(){
          if (this.checkParams(!this.userName,"请输入用户名")||
            this.checkParams(!this.password,"请输入密码")
          )return;
          let password = this.md5(this.password)
          db.user.login({userName:this.userName,password}).then(menu=>{
                let children = []
                children.push({
                    path: '/personal',
                    component: resolve => require(['@/components/personal'], resolve)
                })
                for (let m of menu) {
                    if (m.type == 2) {
                        children.push({
                        path: "/" + m.addr,
                        component: resolve => require(['@/components/'+m.addr], resolve)
                        })
                    }
                }
                let route = {
                    path: '/layout',
                    component: resolve => require(['@/components/layout'], resolve),
                    children
                }
                this.$router.addRoutes([route]);  
                this.$router.push("/personal");
              })
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .login-page{
        background-image: url('../../static/img/loginbg.jpeg');
        background-repeat: no-repeat;
        background-size:100% 100%;
        width: 100%;
        height: 100%;
        min-height: 700px;
        min-width: 1000px;
        position: relative;
    }
    .main{
        padding-top:10px;
    }
    .form{
        margin: 0 auto;
        margin-top:100px;
        height: 300px;
        width: 300px;
        border-radius: 250px;
        background-color: rgba(134,199,238,0.5);
        -moz-box-shadow: 0px 0px 10px #888888; /* 老的 Firefox */
        box-shadow: 0px 0px 10px #888888;
        padding: 100px
    }
    .lg-title{
       text-align: center;
       font-size: 25px;

    }
</style>
