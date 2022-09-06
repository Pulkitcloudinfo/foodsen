-- MySQL dump 10.13  Distrib 8.0.27, for macos11 (x86_64)
--
-- Host: mymotorman.ch1wotth681d.ap-south-1.rds.amazonaws.com    Database: foodsenso
-- ------------------------------------------------------
-- Server version	8.0.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--



--
-- Table structure for table `Cleaning`
--

DROP TABLE IF EXISTS `Cleaning`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `Cleaning` (
  `id` int NOT NULL AUTO_INCREMENT,
  `takeaway_id` int DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `col75` varchar(20) DEFAULT NULL,
  `col76` varchar(20) DEFAULT NULL,
  `col77` varchar(20) DEFAULT NULL,
  `col78` varchar(20) DEFAULT NULL,
  `col79` varchar(20) DEFAULT NULL,
  `col80` varchar(20) DEFAULT NULL,
  `col81` varchar(20) DEFAULT NULL,
  `col82` varchar(20) DEFAULT NULL,
  `col83` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Cleaning`
--

LOCK TABLES `Cleaning` WRITE;
/*!40000 ALTER TABLE `Cleaning` DISABLE KEYS */;
/*!40000 ALTER TABLE `Cleaning` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Cooking_Temp_Record`
--

DROP TABLE IF EXISTS `Cooking_Temp_Record`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `Cooking_Temp_Record` (
  `id` int NOT NULL AUTO_INCREMENT,
  `takeaway_id` int DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `col50` varchar(20) DEFAULT NULL,
  `col62` varchar(20) DEFAULT NULL,
  `col49` varchar(20) DEFAULT NULL,
  `col59` varchar(20) DEFAULT NULL,
  `col51` varchar(20) DEFAULT NULL,
  `col56` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Cooking_Temp_Record`
--

LOCK TABLES `Cooking_Temp_Record` WRITE;
/*!40000 ALTER TABLE `Cooking_Temp_Record` DISABLE KEYS */;
INSERT INTO `Cooking_Temp_Record` VALUES (1,42,'2022-06-09 15:37:41','2022-06-09 15:37:41','Chicken ','30°','4:10',NULL,'Dharam','Sam'),(2,42,'2022-06-09 15:37:42','2022-06-09 15:38:32','Mutton','50°','5:10',NULL,'Dharam','Sam'),(3,30,'2022-06-13 07:11:49','2022-06-13 07:11:49','test','test','test',NULL,'test','test');
/*!40000 ALTER TABLE `Cooking_Temp_Record` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `HACCP_Revision`
--

DROP TABLE IF EXISTS `HACCP_Revision`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `HACCP_Revision` (
  `id` int NOT NULL AUTO_INCREMENT,
  `takeaway_id` int DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `col70` varchar(20) DEFAULT NULL,
  `col92` varchar(20) DEFAULT NULL,
  `col93` varchar(20) DEFAULT NULL,
  `col94` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `HACCP_Revision`
--

LOCK TABLES `HACCP_Revision` WRITE;
/*!40000 ALTER TABLE `HACCP_Revision` DISABLE KEYS */;
/*!40000 ALTER TABLE `HACCP_Revision` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Hot_Holding`
--

DROP TABLE IF EXISTS `Hot_Holding`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `Hot_Holding` (
  `id` int NOT NULL AUTO_INCREMENT,
  `takeaway_id` int DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `col84` varchar(20) DEFAULT NULL,
  `col66` varchar(20) DEFAULT NULL,
  `col85` varchar(20) DEFAULT NULL,
  `col86` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Hot_Holding`
--

LOCK TABLES `Hot_Holding` WRITE;
/*!40000 ALTER TABLE `Hot_Holding` DISABLE KEYS */;
/*!40000 ALTER TABLE `Hot_Holding` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Probe_Calibration`
--

DROP TABLE IF EXISTS `Probe_Calibration`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `Probe_Calibration` (
  `id` int NOT NULL AUTO_INCREMENT,
  `takeaway_id` int DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `col70` varchar(20) DEFAULT NULL,
  `col87` varchar(20) DEFAULT NULL,
  `col88` varchar(20) DEFAULT NULL,
  `col89` varchar(20) DEFAULT NULL,
  `col90` varchar(20) DEFAULT NULL,
  `col91` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Probe_Calibration`
--

LOCK TABLES `Probe_Calibration` WRITE;
/*!40000 ALTER TABLE `Probe_Calibration` DISABLE KEYS */;
/*!40000 ALTER TABLE `Probe_Calibration` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Product_Supplier_Detail`
--

DROP TABLE IF EXISTS `Product_Supplier_Detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `Product_Supplier_Detail` (
  `id` int NOT NULL AUTO_INCREMENT,
  `takeaway_id` int DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `col64` varchar(20) DEFAULT NULL,
  `col56` varchar(20) DEFAULT NULL,
  `col62` varchar(20) DEFAULT NULL,
  `col69` varchar(20) DEFAULT NULL,
  `col68` varchar(20) DEFAULT NULL,
  `col67` varchar(20) DEFAULT NULL,
  `col66` varchar(20) DEFAULT NULL,
  `col65` varchar(20) DEFAULT NULL,
  `col51` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Product_Supplier_Detail`
--

LOCK TABLES `Product_Supplier_Detail` WRITE;
/*!40000 ALTER TABLE `Product_Supplier_Detail` DISABLE KEYS */;
/*!40000 ALTER TABLE `Product_Supplier_Detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Refrigeration_Check`
--

DROP TABLE IF EXISTS `Refrigeration_Check`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `Refrigeration_Check` (
  `id` int NOT NULL AUTO_INCREMENT,
  `takeaway_id` int DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `col84` varchar(20) DEFAULT NULL,
  `col95` varchar(20) DEFAULT NULL,
  `col96` varchar(20) DEFAULT NULL,
  `col97` varchar(20) DEFAULT NULL,
  `col98` varchar(20) DEFAULT NULL,
  `col99` varchar(20) DEFAULT NULL,
  `col101` varchar(50) DEFAULT NULL,
  `col103` varchar(50) DEFAULT NULL,
  `col102` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Refrigeration_Check`
--

LOCK TABLES `Refrigeration_Check` WRITE;
/*!40000 ALTER TABLE `Refrigeration_Check` DISABLE KEYS */;
INSERT INTO `Refrigeration_Check` VALUES (1,0,'2022-06-15 12:19:31','2022-06-15 12:19:31','2022-06-15T18:48','outdoor','indoor','outdoor','outdoor','harshit','harshit',NULL,NULL);
/*!40000 ALTER TABLE `Refrigeration_Check` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'FoodSenso','admin@admin.com','123456','2022-04-19 11:32:45','2022-05-20 08:20:45');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `appliances_types`
--

DROP TABLE IF EXISTS `appliances_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `appliances_types` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `status` int DEFAULT '1',
  `modified_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appliances_types`
--

LOCK TABLES `appliances_types` WRITE;
/*!40000 ALTER TABLE `appliances_types` DISABLE KEYS */;
INSERT INTO `appliances_types` VALUES (1,'Heating','2022-05-09 11:58:21',1,'2022-05-09 11:58:21'),(2,'Cooling','2022-05-09 11:58:21',1,'2022-05-09 11:58:21');
/*!40000 ALTER TABLE `appliances_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `entities`
--

DROP TABLE IF EXISTS `entities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `entities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `type` int NOT NULL DEFAULT '2' COMMENT '1=>DateTime,2=>String,3=>Dropdown',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` int DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=105 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entities`
--

LOCK TABLES `entities` WRITE;
/*!40000 ALTER TABLE `entities` DISABLE KEYS */;
INSERT INTO `entities` VALUES (47,'Pickup Date','pickup',2,'2022-05-11 13:15:35','2022-05-12 13:16:59',1),(48,'Time cooling started','Time cooling started',1,'2022-05-12 17:52:43','2022-05-18 06:03:28',1),(49,'Time cooking finished ','Time cooking finished ',2,'2022-05-12 17:53:31','2022-05-12 17:53:31',1),(50,'Product Name','Product Name',2,'2022-05-12 18:02:40','2022-05-12 18:02:40',1),(51,'Sign By','Sign',2,'2022-05-12 18:03:11','2022-06-09 10:34:25',1),(56,'surveyor name',NULL,2,'2022-05-18 13:17:21','2022-05-18 13:17:21',1),(62,'Temperature less than <40 Deg','Temperature less than <40 Deg',2,'2022-06-03 17:13:29','2022-06-03 17:13:29',1),(64,'Intake  Date ','Intake  Date ',1,'2022-06-09 10:31:18','2022-06-09 10:31:18',1),(65,'Invoice /  Docket No.','Invoice /  Docket No.',2,'2022-06-09 10:31:47','2022-06-09 10:31:47',1),(66,'Product  Name ','Product  Name ',2,'2022-06-09 10:31:57','2022-06-09 10:31:57',1),(67,'Temperature   0-5 /≤-18̊C ','Temperature   0-5 /≤-18̊C ',2,'2022-06-09 10:32:56','2022-06-09 10:32:56',1),(68,'Condition  of Goods ','Condition  of Goods  ',2,'2022-06-09 10:33:09','2022-06-09 10:33:09',1),(69,'Condition of driver/ vehicle','Condition of driver/ vehicle',2,'2022-06-09 10:33:59','2022-06-09 10:33:59',1),(70,'Date ','Date ',1,'2022-06-09 10:42:22','2022-06-09 10:42:22',1),(71,'Product Use by date ','Product Use by date ',1,'2022-06-09 10:44:18','2022-06-09 10:44:18',1),(72,'Cooking  Temperature ≥75°C','Cooking  Temperature ≥75°C',2,'2022-06-09 10:44:38','2022-06-09 10:44:38',1),(73,'Reheating Temperature  ≥70̊C ','Reheating Temperature  ≥70̊C ',2,'2022-06-09 10:45:00','2022-06-09 10:45:00',1),(74,'Checked  By: ','Checked  By: ',2,'2022-06-09 10:45:26','2022-06-09 10:45:26',1),(75,'Item/Area ','Item/Area ',2,'2022-06-09 10:55:10','2022-06-09 10:55:10',1),(76,'Chemical ','Chemical ',2,'2022-06-09 10:55:23','2022-06-09 10:55:23',1),(77,'Mon ','Mon ',2,'2022-06-09 10:55:52','2022-06-09 10:55:52',1),(78,'Tue ','Tue ',2,'2022-06-09 10:56:47','2022-06-09 10:56:47',1),(79,'Wed ','Wed ',2,'2022-06-09 10:57:00','2022-06-09 10:57:00',1),(80,'Thurs','Thurs',2,'2022-06-09 10:57:11','2022-06-09 10:57:11',1),(81,'Fri ','Fri ',2,'2022-06-09 10:57:25','2022-06-09 10:57:25',1),(82,'Sat ','Sat ',2,'2022-06-09 10:57:36','2022-06-09 10:57:36',1),(83,'Sun ','Sun ',2,'2022-06-09 10:57:46','2022-06-09 10:57:46',1),(84,'Time','Time',1,'2022-06-09 11:03:40','2022-06-09 11:03:40',1),(85,'Temp  ≥63°C','Temp  ≥63°C',2,'2022-06-09 11:04:10','2022-06-09 11:04:10',1),(86,'Staff  Signature ','Staff  Signature ',2,'2022-06-09 11:04:28','2022-06-09 11:04:28',1),(87,'Probe Unit Name/  Number  ','Probe Unit Name/  Number  ',2,'2022-06-09 11:26:36','2022-06-09 11:26:36',1),(88,'Boiling-point  Water test result  100.00°C ','Boiling-point  Water test result  100.00°C ',2,'2022-06-09 11:26:47','2022-06-09 11:26:47',1),(89,'Ice-point test result  0.00°C ','Ice-point test result  0.00°C ',2,'2022-06-09 11:27:00','2022-06-09 11:27:00',1),(90,'Corrective Action','Corrective Action',2,'2022-06-09 11:27:11','2022-06-09 11:27:11',1),(91,'Completed  by ','Completed  by ',2,'2022-06-09 11:27:25','2022-06-09 11:27:25',1),(92,'SECTION ','SECTION ',2,'2022-06-09 11:33:13','2022-06-09 11:33:13',1),(93,'AMMENDMENTS','AMMENDMENTS',2,'2022-06-09 11:33:26','2022-06-09 11:33:26',1),(94,'	 REVISED BY','	 REVISED BY',2,'2022-06-09 11:33:37','2022-06-09 11:33:37',1),(95,'FRIDGE 1 ','FRIDGE 1 ',2,'2022-06-09 11:35:39','2022-06-09 11:35:39',1),(96,'FRIDGE 2 ','FRIDGE 2 ',2,'2022-06-09 11:35:52','2022-06-09 11:35:52',1),(97,'FREEZER 1 ','FREEZER 1 ',2,'2022-06-09 11:36:04','2022-06-09 11:36:04',1),(98,'FREEZER 2','FREEZER 2',2,'2022-06-09 11:36:16','2022-06-09 11:36:16',1),(99,'SIGNED BY','SIGNED BY',2,'2022-06-09 11:36:31','2022-06-15 10:30:20',1),(100,'Use By  date ','Use By  date ',1,'2022-06-09 12:25:00','2022-06-09 12:25:00',1),(101,'Signature','Signature',2,'2022-06-15 12:17:23','2022-06-15 12:17:23',1),(102,'Temperature','Temperature',2,'2022-06-15 12:21:20','2022-06-15 12:21:20',1),(103,'Temperature2','Temperature1',2,'2022-06-15 12:21:35','2022-07-04 06:07:17',1);
/*!40000 ALTER TABLE `entities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kitchen_appliances`
--

DROP TABLE IF EXISTS `kitchen_appliances`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `kitchen_appliances` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `category` int DEFAULT NULL,
  `scale` varchar(45) DEFAULT NULL,
  `min` varchar(45) DEFAULT NULL,
  `max` varchar(45) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  `status` int DEFAULT '1',
  `modified_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kitchen_appliances`
--

LOCK TABLES `kitchen_appliances` WRITE;
/*!40000 ALTER TABLE `kitchen_appliances` DISABLE KEYS */;
INSERT INTO `kitchen_appliances` VALUES (2,'microwave','2022-04-25 10:45:28',1,NULL,NULL,NULL,NULL,1,'2022-05-09 12:03:12'),(3,'teapot','2022-04-25 10:45:28',1,NULL,NULL,NULL,NULL,0,'2022-05-12 07:11:26'),(10,'erwer','2022-05-13 10:42:27',2,'2','rwe','rwr','rewr',0,'2022-05-13 10:42:36'),(13,'fridge','2022-05-31 07:42:31',2,'','','','fridge',1,'2022-06-09 12:06:23'),(14,'Dishwasher','2022-06-09 11:48:39',2,'2','35 KG','39 KG','clean and sanitize',1,'2022-06-09 11:48:39'),(15,'Hand blender','2022-06-09 11:53:04',1,'1','100W','1000W',' A handheld electric appliance for blending. ',1,'2022-06-09 11:53:04'),(16,'Pressure cooker','2022-06-09 11:56:31',1,'1','100 C','130 C','Pressure cooker',1,'2022-06-09 11:56:31'),(17,'Pressure cooker','2022-06-09 11:56:46',1,'1','100 C','130 C','Pressure cooker',1,'2022-06-09 11:56:46'),(18,'Mixer Grinder','2022-06-09 11:57:41',1,'1','100 C','180 C','Mixer Grinder',1,'2022-06-09 11:57:41'),(19,'Electric Kettle','2022-06-09 11:58:19',1,'1','100 C','180 C','Electric Kettle',1,'2022-06-09 11:58:19'),(20,'Rice cooker','2022-06-09 12:04:22',1,'1','100 C','180 C','Rice cooker',1,'2022-06-09 12:04:22');
/*!40000 ALTER TABLE `kitchen_appliances` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kitchen_appliances_mapping`
--

DROP TABLE IF EXISTS `kitchen_appliances_mapping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `kitchen_appliances_mapping` (
  `id` int NOT NULL AUTO_INCREMENT,
  `kitchen_appliance_id` int NOT NULL,
  `takeaway_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `takeaway_id_idx` (`takeaway_id`),
  CONSTRAINT `kitAppTakeawayFk` FOREIGN KEY (`takeaway_id`) REFERENCES `takeaway` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=118 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kitchen_appliances_mapping`
--

LOCK TABLES `kitchen_appliances_mapping` WRITE;
/*!40000 ALTER TABLE `kitchen_appliances_mapping` DISABLE KEYS */;
INSERT INTO `kitchen_appliances_mapping` VALUES (12,1,15),(13,2,15),(14,3,15),(27,1,37),(28,2,37),(29,3,37),(30,10,37),(31,4,37),(32,11,37),(33,5,37),(34,12,37),(35,2,39),(36,3,39),(95,2,42),(96,13,42),(97,15,42),(98,16,42),(99,19,42),(100,20,42),(101,2,30),(102,3,30),(103,10,30),(104,18,30),(105,13,30),(106,19,30),(107,14,30),(108,20,30),(109,15,30),(110,16,30);
/*!40000 ALTER TABLE `kitchen_appliances_mapping` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu_items`
--

DROP TABLE IF EXISTS `menu_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `menu_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `takeawayType` int DEFAULT NULL COMMENT 'ID of takeawayType',
  `status` int DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu_items`
--

LOCK TABLES `menu_items` WRITE;
/*!40000 ALTER TABLE `menu_items` DISABLE KEYS */;
INSERT INTO `menu_items` VALUES (7,'rotiiii',1,1,'2022-04-25 07:12:30','2022-06-09 11:17:46'),(8,'curry',1,1,'2022-04-25 07:12:30','2022-04-29 12:10:08'),(9,'dosa',1,1,'2022-04-25 07:12:30','2022-05-06 09:30:53'),(10,'noodles',1,1,'2022-04-25 07:14:21','2022-04-29 12:10:08'),(11,'aalo sabji',1,1,'2022-04-25 10:30:49','2022-05-06 09:30:54'),(14,'pasta',2,1,'2022-05-10 12:08:30','2022-05-10 12:08:30'),(23,'gobhi ki sabzi',1,0,'2022-05-11 13:12:32','2022-05-13 07:21:31'),(34,'Prantha',1,1,'2022-06-09 10:44:18','2022-06-09 10:44:18'),(35,'Ice cream cake',1,1,'2022-06-09 11:07:57','2022-06-09 11:07:57'),(36,'Panner Kathi Roll',1,1,'2022-06-09 11:10:59','2022-06-09 11:10:59'),(37,'Cheesy Maggi Bread Roll',2,1,'2022-06-09 11:13:58','2022-06-09 11:13:58'),(38,'Mini Cheese Uttapa',1,1,'2022-06-09 11:15:09','2022-06-09 11:23:36'),(39,'Mac And Cheese',1,1,'2022-06-09 11:17:29','2022-06-09 11:17:29'),(40,'Rasgulla',1,1,'2022-06-09 11:19:02','2022-06-09 11:19:02'),(41,'Chhena jalebi',1,1,'2022-06-09 11:19:52','2022-06-09 11:19:52'),(42,'Gulab jamun',1,1,'2022-06-09 11:21:26','2022-06-09 11:21:26'),(43,'Paneer Manchurian',2,1,'2022-06-09 11:24:34','2022-06-09 11:24:34'),(44,'Momos Chutney',2,1,'2022-06-09 11:24:58','2022-06-09 11:24:58'),(45,'Veg Spring Rolls',2,1,'2022-06-09 11:25:16','2022-06-09 11:25:16');
/*!40000 ALTER TABLE `menu_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu_items_mapping`
--

DROP TABLE IF EXISTS `menu_items_mapping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `menu_items_mapping` (
  `id` int NOT NULL AUTO_INCREMENT,
  `menu_item_id` int NOT NULL,
  `takeaway_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `takeawayId_idx` (`takeaway_id`),
  KEY `menuTakeawayId_idx` (`takeaway_id`),
  CONSTRAINT `menuTakeawayFk` FOREIGN KEY (`takeaway_id`) REFERENCES `takeaway` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=131 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu_items_mapping`
--

LOCK TABLES `menu_items_mapping` WRITE;
/*!40000 ALTER TABLE `menu_items_mapping` DISABLE KEYS */;
INSERT INTO `menu_items_mapping` VALUES (20,9,15),(21,5,15),(22,6,15),(23,7,15),(24,11,15),(25,8,15),(26,4,19),(27,5,19),(28,6,19),(29,7,19),(30,8,19),(31,9,19),(32,10,19),(33,11,19),(48,7,39),(49,8,39),(50,32,39),(51,33,39),(52,9,39),(53,10,39),(113,8,42),(114,10,42),(115,11,42),(116,14,42),(117,23,42),(118,34,42),(119,36,42),(120,37,42),(121,38,42),(122,40,42),(123,42,42),(124,43,42),(125,45,42);
/*!40000 ALTER TABLE `menu_items_mapping` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `record_type`
--

DROP TABLE IF EXISTS `record_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `record_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  `tablename` varchar(50) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` int DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=125 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `record_type`
--

LOCK TABLES `record_type` WRITE;
/*!40000 ALTER TABLE `record_type` DISABLE KEYS */;
INSERT INTO `record_type` VALUES (116,'Cooking Temp Record','Cooking_Temp_Record','2022-06-03 17:14:22','2022-06-03 17:14:22',1),(117,'Product Supplier Det','Product_Supplier_Detail','2022-06-09 10:35:54','2022-06-09 10:35:54',1),(119,'Cooking & Reheat','Cooking_&_Reheat','2022-06-09 10:53:49','2022-06-09 10:53:49',1),(120,'Cleaning ','Cleaning','2022-06-09 10:58:50','2022-06-09 10:58:50',1),(121,'Hot Holding','Hot_Holding','2022-06-09 11:05:38','2022-06-09 11:05:38',1),(122,'Probe Calibration','Probe_Calibration','2022-06-09 11:28:47','2022-06-09 11:28:47',1),(123,'HACCP Revision ','HACCP_Revision','2022-06-09 11:34:04','2022-06-09 15:17:25',1),(124,'Refrigeration Check','Refrigeration_Check','2022-06-09 11:37:33','2022-06-09 11:37:33',1);
/*!40000 ALTER TABLE `record_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `record_type_entity_mapping`
--

DROP TABLE IF EXISTS `record_type_entity_mapping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `record_type_entity_mapping` (
  `id` int NOT NULL AUTO_INCREMENT,
  `entity_id` int NOT NULL,
  `record_type_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `recordTypeIdFk_idx` (`record_type_id`),
  KEY `entityIdFk_idx` (`entity_id`),
  CONSTRAINT `entityIdFk` FOREIGN KEY (`entity_id`) REFERENCES `entities` (`id`),
  CONSTRAINT `recordTypeIdFk` FOREIGN KEY (`record_type_id`) REFERENCES `record_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=511 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `record_type_entity_mapping`
--

LOCK TABLES `record_type_entity_mapping` WRITE;
/*!40000 ALTER TABLE `record_type_entity_mapping` DISABLE KEYS */;
INSERT INTO `record_type_entity_mapping` VALUES (452,50,116),(453,62,116),(454,49,116),(456,51,116),(457,56,116),(458,64,117),(459,56,117),(460,62,117),(461,69,117),(462,68,117),(463,67,117),(464,66,117),(465,65,117),(466,51,117),(473,70,119),(474,66,119),(475,71,119),(476,72,119),(477,73,119),(478,74,119),(479,75,120),(480,76,120),(481,77,120),(482,78,120),(483,79,120),(484,80,120),(485,81,120),(486,82,120),(487,83,120),(488,84,121),(489,66,121),(490,85,121),(491,86,121),(492,70,122),(493,87,122),(494,88,122),(495,89,122),(496,90,122),(497,91,122),(498,70,123),(499,92,123),(500,93,123),(501,94,123),(502,84,124),(503,95,124),(504,96,124),(505,97,124),(506,98,124),(507,99,124),(508,101,124),(509,103,124),(510,102,124);
/*!40000 ALTER TABLE `record_type_entity_mapping` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `record_type_takeaway_mapping`
--

DROP TABLE IF EXISTS `record_type_takeaway_mapping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `record_type_takeaway_mapping` (
  `id` int NOT NULL AUTO_INCREMENT,
  `record_type_id` int NOT NULL,
  `takeaway_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `recordTypeTakeawayFk_idx` (`takeaway_id`),
  KEY `recordTypeTakeawayFk2_idx` (`record_type_id`),
  CONSTRAINT `recordTypeTakeawayFk` FOREIGN KEY (`takeaway_id`) REFERENCES `takeaway` (`id`),
  CONSTRAINT `recordTypeTakeawayFk2` FOREIGN KEY (`record_type_id`) REFERENCES `record_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `record_type_takeaway_mapping`
--

LOCK TABLES `record_type_takeaway_mapping` WRITE;
/*!40000 ALTER TABLE `record_type_takeaway_mapping` DISABLE KEYS */;
INSERT INTO `record_type_takeaway_mapping` VALUES (61,116,42),(62,117,42),(63,121,42),(64,123,42),(69,116,30),(70,117,30);
/*!40000 ALTER TABLE `record_type_takeaway_mapping` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status_types`
--

DROP TABLE IF EXISTS `status_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `status_types` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` int NOT NULL,
  `type` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status_types`
--

LOCK TABLES `status_types` WRITE;
/*!40000 ALTER TABLE `status_types` DISABLE KEYS */;
INSERT INTO `status_types` VALUES (1,0,'Inactive'),(2,1,'Active'),(3,2,'Delete');
/*!40000 ALTER TABLE `status_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `surveyor`
--

DROP TABLE IF EXISTS `surveyor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `surveyor` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` int DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `surveyor`
--

LOCK TABLES `surveyor` WRITE;
/*!40000 ALTER TABLE `surveyor` DISABLE KEYS */;
INSERT INTO `surveyor` VALUES (10,'scv','vsdvsdv','vsdvsdv','2022-05-03 14:26:31','2022-05-10 05:50:26',1),(12,'fsdfdcas','sfddfd','fsdfds','2022-05-03 14:27:51','2022-05-06 07:15:08',1),(13,'check','check','check','2022-05-03 15:55:40','2022-05-06 07:15:08',1),(15,'gagan','gagan','gagan','2022-05-06 06:29:28','2022-05-06 07:15:08',1),(27,'gagan2','gagan123@test.com','1234567894','2022-05-11 12:19:14','2022-06-16 11:23:12',1),(28,'gaganpreet ','gaganpreet@gmail.com','123456789','2022-05-11 12:20:22','2022-05-11 12:20:44',0),(31,'gagan','gagan@gmail.com','123456789','2022-05-31 07:46:43','2022-05-31 07:46:43',1);
/*!40000 ALTER TABLE `surveyor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `takeaway`
--

DROP TABLE IF EXISTS `takeaway`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `takeaway` (
  `id` int NOT NULL AUTO_INCREMENT,
  `takeaway_name` varchar(45) DEFAULT NULL,
  `mobile` varchar(45) DEFAULT NULL,
  `owner` varchar(45) DEFAULT NULL,
  `staff` int DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_by` tinyint DEFAULT '1' COMMENT 'created_by 0=>admin\\ncreated_by 1=>user register',
  `status` tinyint DEFAULT '1',
  `profile_setup` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `takeaway`
--

LOCK TABLES `takeaway` WRITE;
/*!40000 ALTER TABLE `takeaway` DISABLE KEYS */;
INSERT INTO `takeaway` VALUES (15,'Gagan Takeaway','12345678',NULL,NULL,'gagan@takeaway.com','123456','2022-04-28 05:27:18','2022-05-13 12:50:27',1,1,0),(19,'Harpartap Takeaway','123456789',NULL,NULL,'harpartap@takeaway.com','123456','2022-05-05 07:10:08','2022-05-13 12:50:27',1,0,0),(30,'Aman takeaway','7894585898',NULL,NULL,'test@testing.com','123456789','2022-05-20 10:02:44','2022-06-13 06:36:07',1,1,1),(31,'sdf','ksahvdf',NULL,NULL,'fsdsd2Fsd@fhbdf','fsdf','2022-05-20 10:09:33','2022-05-20 10:09:33',1,1,0),(32,'xyz','45647987946',NULL,NULL,'aman@gmail12.com','123456789','2022-05-20 10:12:53','2022-05-20 10:12:53',1,1,0),(33,'Abc','789456123365',NULL,NULL,'abc@gmail.com','123456','2022-05-20 10:23:31','2022-05-20 10:23:31',1,1,0),(34,'re','wew',NULL,NULL,'sd@mailinator.com','wer','2022-05-24 13:59:43','2022-05-24 13:59:43',1,1,0),(35,'dfdfdf','4534534',NULL,NULL,'gdfg@mailinator.com','1234','2022-05-24 14:02:09','2022-05-24 14:02:09',1,1,0),(36,'DS Takeway','9041410305',NULL,NULL,'dharam@cloudinfosystem.com','123456','2022-05-30 14:18:35','2022-05-30 14:18:35',1,1,0),(37,'Gagan Takeaway1','123456789',NULL,NULL,'Gagan1@takeaway.com','123456','2022-05-31 07:34:46','2022-05-31 07:34:46',1,1,0),(38,'new Takeaway','',NULL,NULL,'new@gmail.com','','2022-05-31 07:49:24','2022-05-31 07:49:24',0,1,0),(39,'Shubham','452121232323',NULL,NULL,'shubham.kumar@cloudinfosystem.com','123456','2022-05-31 08:07:14','2022-05-31 08:07:14',1,1,0),(41,'Sligo Apache','8888888888',NULL,NULL,'satnam@gmail.com','123456','2022-06-03 17:16:50','2022-06-03 17:16:50',1,1,0),(42,'DD takeway','9041410305',NULL,NULL,'Dharam@gmail.com','123456','2022-06-09 15:32:50','2022-06-09 15:32:50',1,1,0),(52,'Harshit','6395603160',NULL,NULL,'harshit.rajput@cloudiinfosystem.com','Harshit@','2022-07-04 06:01:46','2022-07-04 06:01:46',0,1,0);
/*!40000 ALTER TABLE `takeaway` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `takeaway_persons`
--

DROP TABLE IF EXISTS `takeaway_persons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `takeaway_persons` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  `mobile` varchar(20) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `id_proof` varchar(45) DEFAULT NULL,
  `role` varchar(45) NOT NULL,
  `status` tinyint DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `takeaway_id` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `takeaway_persons`
--

LOCK TABLES `takeaway_persons` WRITE;
/*!40000 ALTER TABLE `takeaway_persons` DISABLE KEYS */;
INSERT INTO `takeaway_persons` VALUES (1,'',NULL,NULL,NULL,NULL,'Owner',NULL,'2022-06-15 12:23:47','2022-06-15 12:23:47','43'),(2,'Harshit','gfvd','6395603160','rajputharshit814@gmail.com',NULL,'owner',NULL,'2022-06-15 12:36:47','2022-06-15 12:36:47','43'),(3,'',NULL,NULL,NULL,NULL,'Owner',NULL,'2022-06-15 12:57:02','2022-06-15 12:57:02','44'),(4,'',NULL,NULL,NULL,NULL,'Owner',NULL,'2022-06-15 12:57:20','2022-06-15 12:57:20','45'),(5,'',NULL,NULL,NULL,NULL,'Owner',NULL,'2022-06-15 13:19:33','2022-06-15 13:19:33','46'),(6,'',NULL,NULL,NULL,NULL,'Owner',NULL,'2022-06-15 13:20:18','2022-06-15 13:20:18','47'),(7,'',NULL,NULL,NULL,NULL,'Owner',NULL,'2022-06-16 10:48:48','2022-06-16 10:48:48','48'),(8,'',NULL,NULL,NULL,NULL,'Owner',NULL,'2022-07-01 13:32:14','2022-07-01 13:32:14','49'),(9,'',NULL,NULL,NULL,NULL,'Owner',NULL,'2022-07-01 13:37:01','2022-07-01 13:37:01','50'),(10,'',NULL,NULL,NULL,NULL,'Owner',NULL,'2022-07-01 16:42:46','2022-07-01 16:42:46','51'),(11,'',NULL,NULL,NULL,NULL,'Owner',NULL,'2022-07-04 06:01:46','2022-07-04 06:01:46','52');
/*!40000 ALTER TABLE `takeaway_persons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `takeaway_type_mapping`
--

DROP TABLE IF EXISTS `takeaway_type_mapping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `takeaway_type_mapping` (
  `id` int NOT NULL AUTO_INCREMENT,
  `takeaway_id` int NOT NULL,
  `takeaway_type` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `takeaway_id_idx` (`takeaway_id`),
  CONSTRAINT `takeawayTypeFk` FOREIGN KEY (`takeaway_id`) REFERENCES `takeaway` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `takeaway_type_mapping`
--

LOCK TABLES `takeaway_type_mapping` WRITE;
/*!40000 ALTER TABLE `takeaway_type_mapping` DISABLE KEYS */;
INSERT INTO `takeaway_type_mapping` VALUES (10,15,1),(12,15,2),(15,19,1),(16,19,2),(24,30,1),(25,30,2),(26,31,1),(27,31,2),(28,32,1),(29,32,2),(30,33,1),(31,33,2),(32,34,2),(33,35,1),(34,36,1),(35,37,1),(36,37,2),(37,38,2),(38,39,1),(40,41,1),(41,42,1),(42,42,2),(52,52,2);
/*!40000 ALTER TABLE `takeaway_type_mapping` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `takeaway_types`
--

DROP TABLE IF EXISTS `takeaway_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `takeaway_types` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `takeaway_types`
--

LOCK TABLES `takeaway_types` WRITE;
/*!40000 ALTER TABLE `takeaway_types` DISABLE KEYS */;
INSERT INTO `takeaway_types` VALUES (1,'Indian'),(2,'Chinese');
/*!40000 ALTER TABLE `takeaway_types` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-07-04 15:55:49
