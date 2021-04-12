$(function() {
  var layer = layui.layer
  var form = layui.form
  var laypage = layui.laypage

  // 定义美化时间的过滤器
  template.defaults.imports.dataFormat = function(date) {
    const dt = new Date(date)

    var y = dt.getFullYear()
    var m = padZero(dt.getMonth() + 1)
    var d = padZero(dt.getDate())

    var hh = padZero(dt.getHours())
    var mm = padZero(dt.getMinutes())
    var ss = padZero(dt.getSeconds())

    return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
  }

  // 定义补零的函数
  function padZero(n) {
    return n > 9 ? n : '0' + n
  }

  // 定义一个查询的参数对象，将来请求数据的时候，
  // 需要将请求参数对象提交到服务器
  var q = {
    pagenum: 1, // 页码值，默认请求第一页的数据
    pagesize: 2, // 每页显示几条数据，默认每页显示2条
    cate_id: '', // 文章分类的 Id
    state: '' // 文章的发布状态
  }

  initTable()
  initCate()

  // 获取文章列表数据的方法
  function initTable() {
    $.ajax({
      method: 'GET',
      url: '/my/article/list',
      data: q,
      success: function(res) {
        if (res.status !== 0) {
          return layer.msg('获取文章列表失败！')
        }
        // 使用模板引擎渲染页面的数据
        var htmlStr = template('tpl-table', res)
        $('tbody').html(htmlStr)
        // 调用渲染分页的方法
        renderPage(res.total);
      }
    })
  }

  // 初始化文章分类的方法
  function initCate() {
    $.ajax({
      method: 'GET',
      url: '/my/article/cates',
      success: function(res) {
        if (res.status !== 0) {
          return layer.msg('获取分类数据失败！')
        }
        // 调用模板引擎渲染分类的可选项
        var htmlStr = template('tpl-cate', res)
        $('[name=cate_id]').html(htmlStr)
        // 通过 layui 重新渲染表单区域的UI结构
        form.render()
      }
    })
  }

  // 为筛选表单绑定 submit 事件
  $('#form-search').on('submit', function(e) {
    e.preventDefault()
    // 获取表单中选中项的值
    var cate_id = $('[name=cate_id]').val()
    var state = $('[name=state]').val()
    // 为查询参数对象 q 中对应的属性赋值
    q.cate_id = cate_id
    q.state = state
    // 根据最新的筛选条件，重新渲染表格的数据
    initTable()
  })
  function renderPage(total){
 
    laypage.render({
    elem: 'pageBox', //注意，这里的 test1 是 ID，不用加 # 号
    count: total, //数据总数，从服务端得到
    limit : q.pagesize, //每页显示几条信息
    curr : q.pagenum, //默认选中第几页数据
    layout : ['count','limit','prev', 'page', 'next','skip'],
    limits : [2,3,5,10],  
    /* 
      分页发生切换，会触发jump回调
      触发jump的方式有两种
      1.点击页码的时候，会触发jump回调
      2.只要调用了lyaer.page()方法就会触发jump回调
    */
    jump : function(obj,first){
      //可以通过first的值，来判断是哪种方试触发的jump回调
      //如果first的值为true 是方式一处罚的否则是方式2
      // console.log(first);
      // console.log(obj.curr);
      console.log(obj.limit);
       //将做新的页码值赋值到q对象中再调用initTable函数渲染页面
      q.pagenum = obj.curr;
      //把最新的条目数赋值到q 这个查询参数对象的pageSize属性中
      q.pagesize = obj.limit;
      // 根据据最新的q{}获取对应的数据列表，渲染数据
      if(!first){
        initTable();
      }
     
    }
    })
  }

})
