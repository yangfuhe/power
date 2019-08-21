<template>
   <el-container style="height: 100%; border: 1px solid #eee">
    <el-aside :style="{ width: isCollapse?'64px':'200px'}">
    <el-menu :default-active="this.$route.path" router class="el-menu-vertical-demo" :collapse="isCollapse">
    <el-menu-item key="/personal" index="/personal">
        <i class="el-icon-user"></i>
        <span slot="title">个人中心</span>
      </el-menu-item>
    <el-submenu v-for="m in menu" :key="m.id"  :index="m.id+''">
        <template slot="title">        
        <i v-if="m.iconFrom==1" :class="m.icon"></i>
        <svg v-else-if="m.iconFrom==2" class="icon" style="padding-right:8px;width:18px;height18px; vertical-align: -8px;" aria-hidden="true">
            <use :xlink:href="'#'+m.icon"></use>
        </svg>
        <span slot="title">{{m.name}}</span>
        </template>
        <el-menu-item v-for="c in m.children" :key="c.id" :index="'/'+c.addr">{{c.name}}</el-menu-item>
    </el-submenu>
    </el-menu>
  </el-aside>
  <el-container>
    <el-header style="font-size: 12px;height:40px">
        <svg @click="isCollapse=!isCollapse"  style="width:20px;height:20px"  class="icon" aria-hidden="true">
            <use xlink:href="#icon-caidan-zhankai"></use>
        </svg>
      <el-dropdown style="cursor: pointer;float: right; ">
        <span>{{user.realName}}</span>
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-user"></use>
        </svg>
        <el-dropdown-menu slot="dropdown">
           <span @click="loginOut"> <el-dropdown-item>退出登录  </el-dropdown-item></span>        
         
        </el-dropdown-menu>
      </el-dropdown>
      
    </el-header>
    
    <el-main >
      <router-view/>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
 export default {
    data() {
      return {
        isCollapse: false,
        user:{},
        menu:[]
      }
    },
    created(){
      this.getSession();
    },
    methods:{
      getSession(){
        db.user.session().then(res=>{
          this.user = res.user;
          let arr = [];
          for(let m of res.menu){
            if(m.type==1){
              arr.push({
                children:[],
                ...m
              })
            }
            if(m.type==2){
              for(let ar of arr){
                if(m.superiorId == ar.id){
                  ar.children.push(m)
                }
              }
            }
          }
          this.menu =  arr;
        })
      },
      loginOut(){
        db.user.loginOut().then(()=>{
          this.info("success","操作成功")
          this.$router.push("/login")
          })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .el-header {
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
  .el-menu{
      height: 100%;
  }

  .icon{
      width: 25px;
      height: 25px;
      vertical-align: -5px;
      
  }
</style>
