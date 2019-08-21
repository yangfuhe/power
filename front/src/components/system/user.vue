<template>
    <div>       
       <el-button @click="addDialogVisible = true" type="primary" icon="el-icon-plus"  size="small" circle></el-button>
       <el-table align="center" ref="multipleTable" :data="list" tooltip-effect="dark" style="width: 100%">
            <el-table-column prop="userName" label="用户名">
            </el-table-column>
            <el-table-column prop="roleName" label="角色">
            </el-table-column>
            <el-table-column prop="realName" label="真实姓名">
            </el-table-column>
            <el-table-column prop="tel" label="电话">
            </el-table-column>
             <el-table-column prop="email" label="邮箱">
            </el-table-column>
             <el-table-column label="状态">
                <template slot-scope="scope">
                    <span v-if="scope.row.forbidden==1" >正常</span>
                    <span v-else-if="scope.row.forbidden==2">禁用</span>
                </template>
            </el-table-column>
            <el-table-column prop="remark" label="备注">
            </el-table-column>
            <el-table-column label="操作" width="200">
                <template slot-scope="scope">
                    <el-button @click="updateDialogVisible = true;updateUser = {...scope.row}" size="mini" type="primary" plain circle icon="el-icon-edit"></el-button>
                    <el-button @click="updatePwdDialogVisible = true;updatePwd = {...scope.row}"   size="mini" type="primary" plain circle icon="el-icon-key"></el-button>
                    <el-button @click="removeRole(scope.row.id)"   size="mini" type="danger" plain circle icon="el-icon-delete"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
            title="新建用户"
            :visible.sync="addDialogVisible"
            width="450px"
           >
           <el-form :model="addUser" label-width="100px">
                <el-form-item class="m" label="角色选择：">
                        <el-select v-model="addUser.roleId" placeholder="请选择">
                            <el-option
                            v-for="item in roles"
                            :key="item.id"
                            :label="item.roleName"
                            :value="item.id">
                            </el-option>
                        </el-select>
                </el-form-item>
                <el-form-item class="m" label="用户名：">
                        <el-input  v-model="addUser.userName"></el-input>
                </el-form-item>
                <el-form-item class="m" label="密码：">
                        <el-input  v-model="addUser.password"></el-input>
                </el-form-item>
                <el-form-item class="m" label="确认密码：">
                        <el-input  v-model="addUser.password2"></el-input>
                </el-form-item>
                <el-form-item label="真实姓名：">
                        <el-input  v-model="addUser.realName"></el-input>
                </el-form-item>
                <el-form-item label="手机号码：">
                        <el-input  v-model="addUser.tel"></el-input>
                </el-form-item>
                <el-form-item label="邮箱：">
                        <el-input  v-model="addUser.email"></el-input>
                </el-form-item>
                <el-form-item label="备注：">
                        <el-input  v-model="addUser.remark"></el-input>
                </el-form-item>
           </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="doAddUser">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="修改用户"
            :visible.sync="updateDialogVisible"
            width="600px"
           >
           <el-form :model="updateUser" label-width="100px">
                <el-form-item class="m" label="角色选择：">
                        <el-select v-model="updateUser.roleId" placeholder="请选择">
                            <el-option
                            v-for="item in roles"
                            :key="item.id"
                            :label="item.roleName"
                            :value="item.id">
                            </el-option>
                        </el-select>
                </el-form-item>
                <el-form-item  label="状态：">
                    <el-radio-group v-model="updateUser.forbidden">
                        <el-radio :label="1">正常</el-radio>
                        <el-radio :label="2">禁用</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item class="m" label="用户名：">
                        <el-input  v-model="updateUser.userName"></el-input>
                </el-form-item>
                <el-form-item label="真实姓名：">
                        <el-input  v-model="updateUser.realName"></el-input>
                </el-form-item>
                <el-form-item label="手机号码：">
                        <el-input  v-model="updateUser.tel"></el-input>
                </el-form-item>
                <el-form-item label="邮箱：">
                        <el-input  v-model="updateUser.email"></el-input>
                </el-form-item>
                <el-form-item label="备注：">
                        <el-input  v-model="updateUser.remark"></el-input>
                </el-form-item>
           </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="updateDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="doUpdateUser">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            :title="'修改'+updatePwd.userName+'用户密码'"
            :visible.sync="updatePwdDialogVisible"
            width="450px"
           >
           <el-form :model="updatePwd" label-width="100px">
               <el-form-item class="m" label="新密码：">
                        <el-input  v-model="updatePwd.password"></el-input>
                </el-form-item>
                <el-form-item class="m" label="确认密码：">
                        <el-input  v-model="updatePwd.password2"></el-input>
                </el-form-item>
           </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="updatePwdDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="doUpdatePwd">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
  data () {
    return {
        adding:false,
        addUser:{},
        addDialogVisible:false,
        updateUser:{},
        updateDialogVisible:false,
        list:[],
        roles:[],
        updatePwd:{},
        updatePwdDialogVisible:false
    }
  },
  created(){
      this.queryRoles();
      this.queryUsers()
  },
  methods:{
      queryRoles(){
          db.user.roles().then(roles=>this.roles=roles)
      },
      queryUsers(){
          db.user.list().then(list=>this.list = list)
      },
      success(msg){
          this.info("success",msg||"操作成功");
          this.addDialogVisible = false;
          this.updateDialogVisible = false;
          this.updatePwdDialogVisible = false;
          this.addUser = {};
          this.updatePwd = {};
          this.adding = false;
          this.queryUsers();
      },
      doAddUser(){
           if(this.adding) return
          let addUser = {...this.addUser}
          if (this.checkParams(!addUser.roleId,"请选择用户角色")||
            this.checkParams(!addUser.userName,"请输入用户名")||
            this.checkParams(!addUser.password,"请输入密码")||
            this.checkParams(addUser.password!=addUser.password2,"两次密码输入不一致")||
            this.checkParams(addUser.tel&&!this.isPhone(addUser.tel),"手机号码输入有误")||
            this.checkParams(addUser.email&&!this.isEmail(addUser.email),"邮箱输入有误")
          )return;
          delete addUser.password2
          addUser.password = this.md5(addUser.password);
          this.adding = true;
          db.user.create(addUser).then(()=>this.success()).catch(e=>this.adding = false)
      },
      doUpdateUser(){
          if (this.checkParams(!this.updateUser.roleName,"请填写角色名称")||
            this.checkParams(!this.updateUser.userName,"请输入用户名")||
            this.checkParams(this.updateUser.tel&&!this.isPhone(this.updateUser.tel),"手机号码输入有误")||
            this.checkParams(this.updateUser.email&&!this.isEmail(this.updateUser.email),"邮箱输入有误")
          )return;
          db.user.modify({...this.updateUser}).then(()=>this.success())
      },
      doUpdatePwd(){

           if (
            this.checkParams(!this.updatePwd.password,"请输入密码")||
            this.checkParams(this.updatePwd.password!=this.updatePwd.password2,"两次密码输入不一致")
          )return;
           this.updatePwd.password = this.md5(this.updatePwd.password);
           db.user.modifyPwd({id:this.updatePwd.id,password:this.updatePwd.password}).then(()=>this.success())
      },
      removeRole(id){
          this.$confirm('确认删除此用户, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            db.user.remove({id}).then(()=>this.success())
          })
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /* .m::before{
    content: "*" !important;
    color: #f56c6c !important;
    margin-right: 4px !important;
  } */
    h1{
        color: red;
    }
  
.el-form-item__label{
    text-align: left;
}
</style>
