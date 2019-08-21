-- MySQL dump 10.13  Distrib 8.0.13, for macos10.14 (x86_64)
--
-- Host: localhost    Database: baibei
-- ------------------------------------------------------
-- Server version	8.0.13

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8mb4 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `logs`
--

DROP TABLE IF EXISTS `logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `logs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ip` varchar(20) NOT NULL DEFAULT '' COMMENT 'ip地址',
  `userId` int(11) NOT NULL DEFAULT '0' COMMENT '用户id',
  `oTime` bigint(13) NOT NULL COMMENT '操作时间',
  `method` varchar(10) NOT NULL DEFAULT '' COMMENT 'GET请求或POST请求',
  `url` varchar(300) NOT NULL DEFAULT '' COMMENT '请求url',
  `des` varchar(50) NOT NULL DEFAULT '' COMMENT '描述',
  `err` varchar(500) NOT NULL DEFAULT '' COMMENT '错误消息',
  `type` int(2) NOT NULL DEFAULT '1' COMMENT '1正常日志，2服务端返回错误信息，3系统异常',
  `status` varchar(10) NOT NULL DEFAULT '' COMMENT '服务端返回的状态码',
  `errDetail` mediumtext COMMENT '详细错误信息',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3067 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logs`
--

LOCK TABLES `logs` WRITE;
/*!40000 ALTER TABLE `logs` DISABLE KEYS */;
/*!40000 ALTER TABLE `logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `powers`
--

DROP TABLE IF EXISTS `powers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `powers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `superiorId` int(11) NOT NULL DEFAULT '0' COMMENT '上级id',
  `name` varchar(20) NOT NULL COMMENT '资源名称',
  `icon` varchar(20) NOT NULL DEFAULT '' COMMENT '一级菜单才有的图标',
  `iconFrom` int(2) NOT NULL DEFAULT '0' COMMENT '一级菜单图标来源 1 elemenntUI图标，2 iconfont图标',
  `type` int(2) NOT NULL COMMENT '1一级菜单，2二级菜单，3请求接口',
  `addr` varchar(50) NOT NULL DEFAULT '' COMMENT '资源地址',
  `sort` int(3) NOT NULL DEFAULT '1' COMMENT '序号',
  `remark` varchar(50) NOT NULL DEFAULT '' COMMENT '备注',
  `isDelete` int(2) NOT NULL DEFAULT '1' COMMENT '1正常，2删除',
  `createTime` bigint(13) NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2521 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `powers`
--

LOCK TABLES `powers` WRITE;
/*!40000 ALTER TABLE `powers` DISABLE KEYS */;
INSERT INTO `powers` VALUES (2498,0,'系统管理','el-icon-setting',1,1,'',1,'',1,1565919668475),(2499,2498,'资源配置','',0,2,'system/resources',1,'',1,1565919806729),(2500,2499,'获取资源列表','',0,3,'resources/list',1,'',1,1565920383241),(2501,2499,'添加资源','',0,3,'resources/create',1,'',1,1565946277581),(2502,2499,'修改资源','',0,3,'resources/modify',1,'',1,1565946972377),(2504,2498,'角色管理','',0,2,'system/role',1,'',1,1566208216684),(2505,2499,'删除资源','',0,3,'resources/remove',1,'',1,1566208328995),(2506,2504,'创建角色','',0,3,'role/create',1,'',1,1566264529914),(2507,2504,'修改角色','',0,3,'role/modify',1,'',1,1566264817682),(2508,2504,'删除角色','',0,3,'role/remove',1,'',1,1566264845142),(2509,2504,'查询角色列表','',0,3,'role/list',1,'',1,1566264881895),(2510,2504,'查询角色权限','',0,3,'role/powers',1,'',1,1566264918104),(2511,2504,'修改角色权限','',0,3,'role/modifyPowers',1,'',1,1566264954048),(2512,2498,'用户管理','',0,2,'system/user',1,'',1,1566264989108),(2513,2512,'创建用户','',0,3,'user/create',1,'',1,1566265017389),(2514,2512,'修改用户','',0,3,'user/modify',1,'',1,1566265037191),(2515,2512,'修改用户密码','',0,3,'user/modifyPwd',1,'',1,1566265072766),(2516,2512,'删除用户','',0,3,'user/remove',1,'',1,1566265093685),(2517,2512,'查询用户列表','',0,3,'user/list',1,'',1,1566265120936),(2518,2512,'查询角色列表','',0,3,'user/roles',1,'供创建用户时选择角色',1,1566265241398),(2519,2498,'系统日志','',0,2,'system/log',1,'',1,1566289004598),(2520,2519,'查询日志列表','',0,3,'log/list',1,'',1,1566289027462);
/*!40000 ALTER TABLE `powers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rolePower`
--

DROP TABLE IF EXISTS `rolePower`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `rolePower` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `roleId` int(11) NOT NULL,
  `powerId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `roleId` (`roleId`),
  KEY `powerId` (`powerId`),
  CONSTRAINT `rolepower_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`),
  CONSTRAINT `rolepower_ibfk_2` FOREIGN KEY (`powerId`) REFERENCES `powers` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2594 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rolePower`
--

LOCK TABLES `rolePower` WRITE;
/*!40000 ALTER TABLE `rolePower` DISABLE KEYS */;
INSERT INTO `rolePower` VALUES (2572,2498,2498),(2573,2498,2499),(2574,2498,2500),(2575,2498,2501),(2576,2498,2502),(2577,2498,2505),(2578,2498,2504),(2579,2498,2506),(2580,2498,2507),(2581,2498,2508),(2582,2498,2509),(2583,2498,2510),(2584,2498,2511),(2585,2498,2512),(2586,2498,2513),(2587,2498,2514),(2588,2498,2515),(2589,2498,2516),(2590,2498,2517),(2591,2498,2518),(2592,2498,2519),(2593,2498,2520);
/*!40000 ALTER TABLE `rolePower` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `roleName` varchar(20) NOT NULL COMMENT '角色名',
  `remark` varchar(50) NOT NULL DEFAULT '' COMMENT '备注',
  `isDelete` int(2) NOT NULL DEFAULT '1' COMMENT '1正常，2删除',
  `createTime` bigint(13) NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2501 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (2498,'超级管理员','',1,1565941954367);
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `roleId` int(11) NOT NULL COMMENT '角色id',
  `userName` varchar(20) NOT NULL COMMENT '登录用户名',
  `password` varchar(50) NOT NULL COMMENT '登录密码',
  `realName` varchar(20) NOT NULL DEFAULT '' COMMENT '真实姓名',
  `tel` varchar(20) NOT NULL DEFAULT '' COMMENT '手机号码',
  `email` varchar(30) NOT NULL DEFAULT '' COMMENT '邮箱',
  `forbidden` int(2) NOT NULL DEFAULT '1' COMMENT '1正常，2禁用',
  `remark` varchar(50) NOT NULL DEFAULT '' COMMENT '备注',
  `isDelete` int(2) NOT NULL DEFAULT '1' COMMENT '1正常，2删除',
  `createTime` bigint(13) NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `roleId` (`roleId`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2503 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2498,2498,'admin','efe6398127928f1b2e9ef3207fb82663','杨夫贺','','',1,'',1,1566034826731);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-08-21 17:12:18
