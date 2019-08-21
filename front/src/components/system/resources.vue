<template>
    <div>                   
       <el-button @click="addResourcesInit('')" style="margin-left:20px" type="primary"  circle plain  size="small">
           <i class="el-icon-plus"></i>
       </el-button>
       <el-tree
        style="margin-top:10px"
        :data="treeData"
        node-key="id"
        default-expand-all       
        >
           <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <span>
            <el-button
                v-if="data.type!=3"
                type="text"
                size="mini"
                @click.stop="addResourcesInit(data)"
                >
               <i class="el-icon-circle-plus"></i>
            </el-button>
            <el-button
                type="text"
                size="mini"                
                @click.stop="updateResourcesInit(node,data)"
                >
                <i class="el-icon-edit"></i>
            </el-button>
            <el-button
                type="text"
                size="mini"
                @click.stop="removeResources(data.id)"
                >
                <i class="el-icon-delete-solid"></i>
            </el-button>
            </span>
        </span>
        </el-tree>
       <el-dialog
            title="添加资源"
            :visible.sync="addDialogVisible"
            width="600px"
            center
           >
           <el-form :model="addResources" label-width="100px">
                <el-form-item v-if="addResources.type != 1" label="父对象：">
                        <el-input disabled  v-model="addResources.superiorName"></el-input>
                </el-form-item>
                <el-form-item label="资源名称：">
                        <el-input  v-model="addResources.name"></el-input>
                </el-form-item>
                
                <el-form-item v-if="addResources.type == 1" label="图标：">
                        <el-input  v-model="addResources.icon"></el-input>
                </el-form-item>
                <el-form-item v-if="addResources.type == 1" label="图标来源：">
                    <el-radio-group v-model="addResources.iconFrom">
                    <el-radio label="1">elementUI</el-radio>
                    <el-radio label="2">iconfont</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item v-if="addResources.type != 1" label="资源地址：">
                        <el-input  v-model="addResources.addr">
                            <template v-if="addResources.type == 2" slot="prepend">/components/</template>
                            <template v-else-if="addResources.type == 3" slot="prepend">/manage/</template>
                        </el-input>
                </el-form-item>
                <el-form-item label="排序：">
                        <el-input-number v-model="addResources.sort" :min="1"></el-input-number>
                </el-form-item>
                <el-form-item label="备注：">
                        <el-input  v-model="addResources.remark"></el-input>
                </el-form-item>
           </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="doAddResources">确 定</el-button>
            </span>
       </el-dialog>
       <el-dialog
            title="添加资源"
            :visible.sync="updateDialogVisible"
            width="600px"
            center
           >
           <el-form :model="updateResources" label-width="100px">
                <el-form-item v-if="updateResources.type != 1" label="父对象：">
                        <el-input disabled  v-model="updateResources.superiorName"></el-input>
                </el-form-item>
                <el-form-item label="资源名称：">
                        <el-input  v-model="updateResources.name"></el-input>
                </el-form-item>
                
                <el-form-item v-if="updateResources.type == 1" label="图标：">
                        <el-input  v-model="updateResources.icon"></el-input>
                </el-form-item>
                <el-form-item v-if="updateResources.type == 1" label="图标来源：">
                    <el-radio-group v-model="updateResources.iconFrom">
                    <el-radio label="1">elementUI</el-radio>
                    <el-radio label="2">iconfont</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item v-if="updateResources.type != 1" label="资源地址：">
                        <el-input  v-model="updateResources.addr">
                            <template v-if="updateResources.type == 2" slot="prepend">/components/</template>
                            <template v-else-if="updateResources.type == 3" slot="prepend">/manage/</template>
                        </el-input>
                </el-form-item>
                <el-form-item label="排序：">
                        <el-input-number v-model="updateResources.sort" :min="1"></el-input-number>
                </el-form-item>
                <el-form-item label="备注：">
                        <el-input  v-model="updateResources.remark"></el-input>
                </el-form-item>
           </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="updateDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="doUpdateResources">确 定</el-button>
            </span>
       </el-dialog>
    </div>
</template>

<script>
import assert from 'assert'
export default {
  data () {
    return {
        addDialogVisible:false,
        addResources:{},
        updateDialogVisible:false,
        updateResources:{},
        adding:false,
        treeData:[]
    }
  },
  created(){
      this.getResources();
  },
  methods:{
      addResourcesInit(data){
          this.addResources = {
            superiorId:0,
            superiorName:"",
            name:'',
            icon:'',
            iconFrom:0,
            type:1,
            addr:'',
            sort:1,
            remark:''
          }
          if(data){ 
              this.addResources.superiorId = data.id;
              this.addResources.superiorName = data.name;
              this.addResources.type = data.type+1;
          }
          this.addDialogVisible = true;
      },
      doAddResources(){
          if(this.adding) return
          let ar = this.addResources;
          if (this.checkParams(!ar.name,"请填写资源名称")||
          this.checkParams(ar.type==1&&!ar.icon,"请填写菜单图标")||
          this.checkParams(ar.type==1&&ar.iconFrom!=1&&ar.iconFrom!=2,"请选择图标来源")||
          this.checkParams(ar.type!=1&&!ar.addr,"请填写资源地址"))return;
          this.adding = true;
          db.resources.create(ar).then(res=>{
                this.info("success","操作成功")   
                this.addDialogVisible = false;
                this.getResources();
                this.adding = false;          
          }).catch(e=>{
               this.adding = false;   
          })
      },
      updateResourcesInit(node,data){
          this.updateResources = {...data}
          this.updateResources.iconFrom +='';  
          if(node.parent&&node.parent.data&&node.parent.data.name){
              this.updateResources.superiorName = node.parent.data.name;
          }
          this.updateDialogVisible = true;
      },
      doUpdateResources(){
          let ar = this.updateResources;
          if (this.checkParams(!ar.name,"请填写资源名称")||
          this.checkParams(ar.type==1&&!ar.icon,"请填写菜单图标")||
          this.checkParams(ar.type==1&&ar.iconFrom!=1&&ar.iconFrom!=2,"请选择图标来源")||
          this.checkParams(ar.type!=1&&!ar.addr,"请填写资源地址"))return;
          db.resources.modify(ar).then(res=>{
                this.info("success","操作成功")   
                this.updateDialogVisible = false;
                this.getResources();          
          }).catch(e=>{
                this.info("error",e)   
          })
      },
      removeResources(id){
          this.$confirm('确认删除此资源, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            db.resources.remove({id}).then(res=>{
                this.info("success","操作成功");
                this.getResources();   
            })
          }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
            });          
          });
      },
      getResources(){
          db.resources.list().then(list=>{
              let treeData = [];
              for(let l of list){
                  if(l.type==1){
                      treeData.push({
                          label:l.name,
                          children:[],
                          ...l
                      })
                  }
                  if(l.type==2){
                      for(let td of treeData){
                          if(td.id == l.superiorId){
                              td.children.push({
                                  label:l.name,
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
                                    label:l.name,
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
   .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>
