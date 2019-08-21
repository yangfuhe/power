<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created(){
    this.getSession();
  },
  methods:{
    getSession(){
       db.user.session().then(res=>{
          let children = []
          children.push({
            path: '/personal',
            component: resolve => require(['@/components/personal'], resolve)
          })
          for (let m of res.menu) {
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
          if(this.$router.history&&this.$router.history.current.path=="/"){
            this.$router.push("/personal");
          }
       })   
    }
  }
}

</script>

<style>
</style>
