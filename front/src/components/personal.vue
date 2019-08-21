<template>
    <div>
        <div class="main">
            <div class="item">
                <span class="label" >用户名</span>：
                <span class="value">{{userInfo.userName}}</span> 
            </div>
            <div class="item">
                <span class="label" >姓名</span>：
                <span class="value">{{userInfo.realName}}</span> 
            </div>
            <div class="item">
                <span class="label" >角色</span>：
                <span class="value">{{userInfo.roleName}}</span> 
            </div>
            <div class="item">
                <span class="label" >上次登录时间</span>：
                <span class="value">{{  moment(loginInfo.oTime).format('YYYY-MM-DD HH:mm:ss')}}</span> 
            </div>
            <div class="item">
                <span class="label" >上次登录ip</span>：
                <span class="value">{{loginInfo.ip}}</span> 
            </div>
            <div class="item">
                <span class="label" >我的权限</span>：
                <span class="value"><el-button @click="dialogVisible = true" size="mini" type="primary" round>查看</el-button></span> 
            </div>
        </div> 
        <el-dialog
            title="我的权限"
            :visible.sync="dialogVisible"
            width="500px"
           >
           <div style="max-height:600px;overflow-y: scroll">
                <el-tree
                :data="treeData"
                node-key="id"
                default-expand-all
                :props="defaultProps">
                </el-tree>
           </div> 
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>       
    </div>
</template>

<script>
export default {
  data () {
    return {
      userInfo:{},
      loginInfo:{},
      treeData:[],
      dialogVisible:false,
      defaultProps:{children: 'children',label: 'name'}
    }
  },
  created(){
      this.queryInfo();
  },
  methods:{
      queryInfo(){
          db.personal.info().then(info=>{
              this.userInfo = info.userInfo;
              this.loginInfo = info.loginInfo;
              let treeData = [];
              for(let l of info.powerInfo){
                  if(l.type==1){
                      treeData.push({
                          children:[],
                          ...l
                      })
                  }
                  if(l.type==2){
                      for(let td of treeData){
                          if(td.id == l.superiorId){
                              td.children.push({
                                  children:[],
                                  ...l
                              })
                              break;
                          }
                      }
                  }
                  if(l.type==3){
                      for(let td of treeData){
                          for(let tc of td.children){
                              if(tc.id == l.superiorId){
                                  tc.children.push({
                                    ...l
                                  })
                                  break;
                              }
                          }
                      }
                  }
              }
              this.treeData = treeData;
          })
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .main{
        margin: 50px 0 0 80px;
        width: 320px;
        height: 300px;
        -moz-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
        padding-top: 30px;
    }
    .item {
    height: 32px;
    line-height: 32px;
    margin-bottom: 8px;
    color: #5a5e66;
    }
    .label {
        display: inline-block;
        height: 100%;
        width: 90px;
        text-align: justify;
        vertical-align: top;
        padding-left: 30px;
    }
    .label::after {
            display: inline-block;
            width: 100%;
            content: '';
            height: 0;
        }
    .value {
        padding-left: 15px;
    }

</style>
