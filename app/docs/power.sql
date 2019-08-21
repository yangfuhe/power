DROP TABLE IF EXISTS userRole;

DROP TABLE IF EXISTS users; 
CREATE TABLE users (
    `id` int primary key auto_increment,
    roleId int(11) NOT NULL comment '角色id',
    foreign key(roleId) references roles(id) on delete no action on update no action,
    userName varchar(20) NOT NULL comment '登录用户名',
    password varchar(50) NOT NULL comment '登录密码',
    realName varchar(20) NOT NULL DEFAULT '' comment '真实姓名',
    tel varchar(20) NOT NULL DEFAULT '' comment '手机号码',
    email varchar(30) NOT NULL DEFAULT '' comment '邮箱',
    forbidden int(2) NOT NULL DEFAULT 1 comment '1正常，2禁用',
    remark varchar(50) NOT NULL DEFAULT '' comment '备注',
    isDelete int(2) NOT NULL DEFAULT 1 comment '1正常，2删除',
    createTime bigint(13) NOT NULL comment '创建时间'
) ENGINE=InnoDB AUTO_INCREMENT=2498 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS roles; 
CREATE TABLE roles (
    `id` int primary key auto_increment,
    roleName varchar(20) NOT NULL comment '角色名',
    remark varchar(50) NOT NULL DEFAULT '' comment '备注',
    isDelete int(2) NOT NULL DEFAULT 1 comment '1正常，2删除',
    createTime bigint(13) NOT NULL comment '创建时间'
) ENGINE=InnoDB AUTO_INCREMENT=2498 DEFAULT CHARSET=utf8; 




DROP TABLE IF EXISTS powers; 
CREATE TABLE powers (
    `id` int primary key auto_increment,
    superiorId int(11) NOT NULL DEFAULT '0' comment '上级id',
    name varchar(20) NOT NULL comment '资源名称',
    icon varchar(20) NOT NULL  DEFAULT '' comment '一级菜单才有的图标',
    iconFrom int(2) NOT NULL DEFAULT '0' comment '一级菜单图标来源 1 elemenntUI图标，2 iconfont图标',
    type int(2) NOT NULL comment '1一级菜单，2二级菜单，3请求接口',
    addr varchar(50) NOT NULL DEFAULT '' comment '资源地址',
    sort int(3) NOT NULL DEFAULT '1' comment '序号',
    remark varchar(50) NOT NULL DEFAULT '' comment '备注',
    isDelete int(2) NOT NULL DEFAULT 1 comment '1正常，2删除',
    createTime bigint(13) NOT NULL comment '创建时间'
) ENGINE=InnoDB AUTO_INCREMENT=2498 DEFAULT CHARSET=utf8; 


CREATE TABLE rolePower (
    `id` int primary key auto_increment,     
    roleId int(11) NOT NULL,
    foreign key(roleId) references roles(id) on delete no action on update no action,
    powerId int(11) NOT NULL,
    foreign key(powerId) references powers(id) on delete no action on update no action
) ENGINE=InnoDB AUTO_INCREMENT=2498 DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS logs; 
CREATE TABLE logs (
    `id` int primary key auto_increment,
    ip varchar(20) NOT NULL DEFAULT '' comment 'ip地址',
    userId int(11)  NOT NULL DEFAULT '0' comment '用户id',
    oTime bigint(13) NOT NULL comment '操作时间',
    method varchar(10) NOT NULL DEFAULT '' comment 'GET请求或POST请求',
    url varchar(300) NOT NULL DEFAULT '' comment '请求url',
    des varchar(50) NOT NULL DEFAULT '' comment '描述',
    err varchar(500) NOT NULL DEFAULT '' comment '错误消息',
    type int(2) NOT NULL DEFAULT '1' comment '1正常，2失败，3系统',
    status varchar(10) NOT NULL DEFAULT '' comment '服务端返回的状态码',
    errDetail text(50000)  comment '详细错误信息'
) ENGINE=InnoDB AUTO_INCREMENT=2498 DEFAULT CHARSET=utf8; 







