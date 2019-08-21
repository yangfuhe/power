<template>
    <div>
        <el-collapse style="border:0px">
            <el-collapse-item title="筛选条件">
                <el-form :inline="true"  :model="params" label-width="90px">
                <el-form-item style="width:310px" label="用户名：">
                        <el-input  v-model="params.userName"></el-input>
                </el-form-item>
                <el-form-item  style="width:310px" label="ip：">
                        <el-input  v-model="params.ip"></el-input>
                </el-form-item>
                 <el-form-item  style="width:310px" label="开始时间：">
                        <el-date-picker
                        v-model="params.beginTime"
                        type="datetime"
                        placeholder="选择日期时间">
                        </el-date-picker>
                </el-form-item>
                 <el-form-item  style="width:310px" label="结束时间：">
                        <el-date-picker
                        v-model="params.beginTime"
                        type="datetime"
                        placeholder="选择日期时间">
                        </el-date-picker>
                </el-form-item>
                <el-form-item  style="width:310px" label="url：">
                        <el-input  v-model="params.url"></el-input>
                </el-form-item>
                <el-form-item  style="width:310px" label="描述：">
                        <el-input  v-model="params.des"></el-input>
                </el-form-item>
                <el-form-item  style="width:310px" label="状态码：">
                        <el-input  v-model="params.status"></el-input>
                </el-form-item>
                <el-form-item  style="width:310px" label="类型：">
                        <el-select v-model="params.type" placeholder="请选择">
                            <el-option label="成功" value="1"> </el-option>
                            <el-option label="失败" value="2"> </el-option>
                            <el-option label="异常" value="3"> </el-option>
                        </el-select>
                </el-form-item>
                <el-button @click="params.pageNo = 1;queryLogs()" type="primary" icon="el-icon-search">搜索</el-button>
           </el-form>
            </el-collapse-item>
        </el-collapse>
        <div style="max-height:900px;overflow-y: scroll">       
       <el-table  align="center" ref="multipleTable" :data="list" tooltip-effect="dark" style="width: 100%">
            <el-table-column label="时间">
                <template slot-scope="scope">
                    <span>{{moment(scope.row.oTime).format("YYYY-MM-DD HH:mm:ss")}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="ip" label="ip">
            </el-table-column>
            <el-table-column  label="用户">
                <template slot-scope="scope">
                    <span>{{scope.row.userName+'/'+scope.row.realName}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="url" label="url"/>
            <el-table-column prop="des" label="描述"/>
            <el-table-column prop="status" label="状态码"/>
            <el-table-column  label="用户">
                <template slot-scope="scope">
                    <span v-if="scope.row.type==1"><el-button type="success" round size="mini">成功</el-button> </span>
                    <span @click="showErr(scope.row.err)" v-else-if="scope.row.type==2"><el-button type="warning" round size="mini">失败</el-button> </span>
                    <span @click="showErrDetail(scope.row.errDetail)" v-else-if="scope.row.type==3"><el-button type="danger" round size="mini">异常</el-button> </span>
                </template>
            </el-table-column>
        </el-table>
        </div>
        <el-pagination
            style="float:right;margin-top:20px"
            @size-change="handlSizeChange"
            @current-change="handleCurrentChange"
            :current-page="params.pageNo"
            :page-sizes="[10, 20, 50, 100,200,500]"
            :page-size="params.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="count">
        </el-pagination>
        <el-dialog
            title="异常信息"
            :visible.sync="dialogVisible"
            width="900px"
           >
            <div style="max-height:600px;overflow-y: scroll" v-html="err"></div>
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
        params:{pageNo:1,pageSize:10},
        list:[],
        count:0,
        err:"",
        dialogVisible:false
    }
  },
  created(){
      this.queryLogs();
  },
  methods:{
      queryLogs(){
          let params = {
              ...this.params
          }
          if(this.params.beginTime){
              params.beginTime = this.moment(this.params.beginTime).valueOf()
          }
          if(this.params.endTime){
              params.endTime = this.moment(this.params.endTime).valueOf()
          }
          db.log.list(params).then(res=>{
              this.count = res.count
              this.list=res.list
              })
      },
      showErr(err){
          this.$alert(err, '错误信息')
      },
      showErrDetail(err){
          err = err.replace(/\\n/g, '<br/>')
          this.err = err;
          this.dialogVisible = true;

      },
      handlSizeChange(val){
          this.params.pageSize = val;
          this.queryLogs()
      },
       handleCurrentChange(val){
          this.params.pageNo = val;
          this.queryLogs()
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .text-wrapper {
  white-space: pre-wrap;
  overflow-y: scroll
}
</style>
