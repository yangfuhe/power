<template>
    <div>          
       <el-button @click="addDialogVisible = true" type="primary" icon="el-icon-plus"  size="small" circle></el-button>
       <el-table align="center" ref="multipleTable" :data="list" tooltip-effect="dark" style="width: 100%">
            <el-table-column prop="roleName" label="角色名" width="120">
            </el-table-column>
            <el-table-column prop="remark" label="角色描述">
            </el-table-column>
            <el-table-column label="操作" width="200">
                <template slot-scope="scope">
                    <el-button @click="updateDialogVisible = true;updateRole = {...scope.row}" size="mini" type="primary" plain circle icon="el-icon-edit"></el-button>
                    <el-button @click="showResource(scope.row.id)" size="mini" type="warning" plain circle icon="el-icon-key"></el-button>
                    <el-button @click="removeRole(scope.row.id)"   size="mini" type="danger" plain circle icon="el-icon-delete"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
            title="新建角色"
            :visible.sync="addDialogVisible"
            width="600px"
            center
           >
           <el-form :model="addRole" label-width="100px">
                <el-form-item label="角色名称：">
                        <el-input  v-model="addRole.roleName"></el-input>
                </el-form-item>
                <el-form-item label="角色描述：">
                        <el-input  v-model="addRole.remark"></el-input>
                </el-form-item>
           </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="doAddRole">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="修改角色"
            :visible.sync="updateDialogVisible"
            width="600px"
            center
           >
           <el-form :model="updateRole" label-width="100px">
                <el-form-item label="角色名称：">
                        <el-input  v-model="updateRole.roleName"></el-input>
                </el-form-item>
                <el-form-item label="角色描述：">
                        <el-input  v-model="updateRole.remark"></el-input>
                </el-form-item>
           </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="updateDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="doUpdateRole">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="分配资源"
            :visible.sync="resourcesDialogVisible"
            width="500px"
           >
            <el-tree
            :data="treeData"
            show-checkbox
            node-key="id"
            @check="treeCheck"
            :default-checked-keys="treePowers"
            :props="defaultProps">
            </el-tree>
            <span slot="footer" class="dialog-footer">
                <el-button @click="updateDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="resourceAllocation">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
export default {
  data () {
    return {
        adding:false,
        addRole:{},
        addDialogVisible:false,
        updateRole:{},
        updateDialogVisible:false,
        list:[],
        resourcesDialogVisible:false,
        treeData:[],
        defaultProps:{
            children: 'children',
            label: 'name'
            },
        treePowers:[],
        rolePowers:[],
        roleId:""
    }
  },
  created(){
      this.queryRole();
      this.getResources()
  },
  methods:{
      queryRole(){
          db.role.list().then(list=>this.list=list)
      },
      success(msg){
          this.info("success",msg||"操作成功");
          this.queryRole();
          this.addDialogVisible = false;
          this.updateDialogVisible = false;
          this.resourcesDialogVisible = false;
          this.addRole = {};
          this.adding = false;
      },
      doAddRole(){
           if(this.adding) return
          if (this.checkParams(!this.addRole.roleName,"请填写角色名称"))return;
          this.adding = true;
          db.role.create({...this.addRole}).then(res=>this.success()).catch(e=>{this.adding = false})
      },
      doUpdateRole(){
          if (this.checkParams(!this.updateRole.roleName,"请填写角色名称"))return;
          db.role.modify({...this.updateRole}).then(res=>this.success())
      },
      removeRole(id){
          this.$confirm('确认删除此角色, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            db.role.remove({id}).then(res=>this.success())
          })
      },
      showResource(id){
        this.roleId = id;
        db.role.powers({id}).then(list=>{
            let rolePowers = [];
            let treePowers = [];
            for(let l of list){
                rolePowers.push(l.id);
                treePowers.push(l.id);
                let index = treePowers.indexOf(l.superiorId);
                if(index>=0){
                    treePowers.splice(index,1)
                }
            }
            this.rolePowers = rolePowers;
            this.treePowers = treePowers;
            this.resourcesDialogVisible = true;
        })
      },
      treeCheck(a,b){
          this.rolePowers = [...b.checkedKeys,...b.halfCheckedKeys]
      },
      resourceAllocation(){
          db.role.modifyPowers({roleId:this.roleId,powerIds:this.rolePowers}).then(()=>this.success("操作成功，重新登录后生效"))
      },
      getResources(){
          db.resources.list().then(list=>{
              let treeData = [];
              for(let l of list){
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
  
</style>
