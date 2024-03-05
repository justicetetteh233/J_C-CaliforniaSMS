-- MySQL dump 10.13  Distrib 8.3.0, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: cali_sms
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `api_allowancespaidforobserverstudent`
--

DROP TABLE IF EXISTS `api_allowancespaidforobserverstudent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_allowancespaidforobserverstudent` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `date` date DEFAULT NULL,
  `amount` double DEFAULT NULL,
  `feeType_id` bigint(20) NOT NULL,
  `student_id` bigint(20) NOT NULL,
  `term_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `API_allowancespaidfo_feeType_id_44fe819d_fk_API_fee_i` (`feeType_id`),
  KEY `API_allowancespaidfo_student_id_2ea7614d_fk_API_stude` (`student_id`),
  KEY `API_allowancespaidfo_term_id_2dcda3ed_fk_API_termd` (`term_id`),
  CONSTRAINT `API_allowancespaidfo_feeType_id_44fe819d_fk_API_fee_i` FOREIGN KEY (`feeType_id`) REFERENCES `api_fee` (`id`),
  CONSTRAINT `API_allowancespaidfo_student_id_2ea7614d_fk_API_stude` FOREIGN KEY (`student_id`) REFERENCES `api_student` (`id`),
  CONSTRAINT `API_allowancespaidfo_term_id_2dcda3ed_fk_API_termd` FOREIGN KEY (`term_id`) REFERENCES `api_termdetails` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_allowancespaidforobserverstudent`
--

LOCK TABLES `api_allowancespaidforobserverstudent` WRITE;
/*!40000 ALTER TABLE `api_allowancespaidforobserverstudent` DISABLE KEYS */;
/*!40000 ALTER TABLE `api_allowancespaidforobserverstudent` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_classlevel`
--

DROP TABLE IF EXISTS `api_classlevel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_classlevel` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `date_created` datetime(6) DEFAULT NULL,
  `name` varchar(200) DEFAULT NULL,
  `department_id` bigint(20) NOT NULL,
  `school_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `API_classlevel_department_id_e0286ed4_fk_API_department_id` (`department_id`),
  KEY `API_classlevel_school_id_750663aa_fk_API_school_id` (`school_id`),
  CONSTRAINT `API_classlevel_department_id_e0286ed4_fk_API_department_id` FOREIGN KEY (`department_id`) REFERENCES `api_department` (`id`),
  CONSTRAINT `API_classlevel_school_id_750663aa_fk_API_school_id` FOREIGN KEY (`school_id`) REFERENCES `api_school` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_classlevel`
--

LOCK TABLES `api_classlevel` WRITE;
/*!40000 ALTER TABLE `api_classlevel` DISABLE KEYS */;
/*!40000 ALTER TABLE `api_classlevel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_classlevel_course`
--

DROP TABLE IF EXISTS `api_classlevel_course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_classlevel_course` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `classlevel_id` bigint(20) NOT NULL,
  `course_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `API_classlevel_course_classlevel_id_course_id_cad38dda_uniq` (`classlevel_id`,`course_id`),
  KEY `API_classlevel_course_course_id_be22c4da_fk_API_course_id` (`course_id`),
  CONSTRAINT `API_classlevel_cours_classlevel_id_49e666e2_fk_API_class` FOREIGN KEY (`classlevel_id`) REFERENCES `api_classlevel` (`id`),
  CONSTRAINT `API_classlevel_course_course_id_be22c4da_fk_API_course_id` FOREIGN KEY (`course_id`) REFERENCES `api_course` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_classlevel_course`
--

LOCK TABLES `api_classlevel_course` WRITE;
/*!40000 ALTER TABLE `api_classlevel_course` DISABLE KEYS */;
/*!40000 ALTER TABLE `api_classlevel_course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_classlevel_fees`
--

DROP TABLE IF EXISTS `api_classlevel_fees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_classlevel_fees` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `classlevel_id` bigint(20) NOT NULL,
  `fee_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `API_classlevel_fees_classlevel_id_fee_id_cb00816d_uniq` (`classlevel_id`,`fee_id`),
  KEY `API_classlevel_fees_fee_id_4adf8795_fk_API_fee_id` (`fee_id`),
  CONSTRAINT `API_classlevel_fees_classlevel_id_5e4b0a2b_fk_API_classlevel_id` FOREIGN KEY (`classlevel_id`) REFERENCES `api_classlevel` (`id`),
  CONSTRAINT `API_classlevel_fees_fee_id_4adf8795_fk_API_fee_id` FOREIGN KEY (`fee_id`) REFERENCES `api_fee` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_classlevel_fees`
--

LOCK TABLES `api_classlevel_fees` WRITE;
/*!40000 ALTER TABLE `api_classlevel_fees` DISABLE KEYS */;
/*!40000 ALTER TABLE `api_classlevel_fees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_classteachermap`
--

DROP TABLE IF EXISTS `api_classteachermap`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_classteachermap` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `date` date DEFAULT NULL,
  `classLevel_id` bigint(20) DEFAULT NULL,
  `staff_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `API_classteachermap_classLevel_id_54e4d72a_fk_API_classlevel_id` (`classLevel_id`),
  KEY `API_classteachermap_staff_id_b218f7b1_fk_API_staff_id` (`staff_id`),
  CONSTRAINT `API_classteachermap_classLevel_id_54e4d72a_fk_API_classlevel_id` FOREIGN KEY (`classLevel_id`) REFERENCES `api_classlevel` (`id`),
  CONSTRAINT `API_classteachermap_staff_id_b218f7b1_fk_API_staff_id` FOREIGN KEY (`staff_id`) REFERENCES `api_staff` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_classteachermap`
--

LOCK TABLES `api_classteachermap` WRITE;
/*!40000 ALTER TABLE `api_classteachermap` DISABLE KEYS */;
/*!40000 ALTER TABLE `api_classteachermap` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_course`
--

DROP TABLE IF EXISTS `api_course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_course` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `subject_name` varchar(200) DEFAULT NULL,
  `Teacher_code` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_course`
--

LOCK TABLES `api_course` WRITE;
/*!40000 ALTER TABLE `api_course` DISABLE KEYS */;
/*!40000 ALTER TABLE `api_course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_coursestudent`
--

DROP TABLE IF EXISTS `api_coursestudent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_coursestudent` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `class_score` double DEFAULT NULL,
  `exams_score` double DEFAULT NULL,
  `course_id` bigint(20) NOT NULL,
  `student_id` bigint(20) NOT NULL,
  `term_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `API_coursestudent_course_id_82187c7f_fk_API_course_id` (`course_id`),
  KEY `API_coursestudent_student_id_95ca51cb_fk_API_student_id` (`student_id`),
  KEY `API_coursestudent_term_id_a7906e78_fk_API_termdetails_id` (`term_id`),
  CONSTRAINT `API_coursestudent_course_id_82187c7f_fk_API_course_id` FOREIGN KEY (`course_id`) REFERENCES `api_course` (`id`),
  CONSTRAINT `API_coursestudent_student_id_95ca51cb_fk_API_student_id` FOREIGN KEY (`student_id`) REFERENCES `api_student` (`id`),
  CONSTRAINT `API_coursestudent_term_id_a7906e78_fk_API_termdetails_id` FOREIGN KEY (`term_id`) REFERENCES `api_termdetails` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_coursestudent`
--

LOCK TABLES `api_coursestudent` WRITE;
/*!40000 ALTER TABLE `api_coursestudent` DISABLE KEYS */;
/*!40000 ALTER TABLE `api_coursestudent` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_customuser`
--

DROP TABLE IF EXISTS `api_customuser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_customuser` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `last_login` datetime(6) DEFAULT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(200) DEFAULT NULL,
  `date_created` datetime(6) DEFAULT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `userType` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_customuser`
--

LOCK TABLES `api_customuser` WRITE;
/*!40000 ALTER TABLE `api_customuser` DISABLE KEYS */;
INSERT INTO `api_customuser` VALUES (2,'2024-03-04 09:12:37.507445','root','pbkdf2_sha256$720000$pTtkxq7zw7Q2DESfgr6ZTZ$QoTJgD9FFVaPhhZqN5pXvsM1YuiF9XyfE2edyrw6Gfo=','2024-03-04 09:11:46.141436',1,0,'admin');
/*!40000 ALTER TABLE `api_customuser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_customuser_groups`
--

DROP TABLE IF EXISTS `api_customuser_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_customuser_groups` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `customuser_id` bigint(20) NOT NULL,
  `group_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `API_customuser_groups_customuser_id_group_id_aabbcdd0_uniq` (`customuser_id`,`group_id`),
  KEY `API_customuser_groups_group_id_338d2feb_fk_auth_group_id` (`group_id`),
  CONSTRAINT `API_customuser_group_customuser_id_86c1b4c6_fk_API_custo` FOREIGN KEY (`customuser_id`) REFERENCES `api_customuser` (`id`),
  CONSTRAINT `API_customuser_groups_group_id_338d2feb_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_customuser_groups`
--

LOCK TABLES `api_customuser_groups` WRITE;
/*!40000 ALTER TABLE `api_customuser_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `api_customuser_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_customuser_user_permissions`
--

DROP TABLE IF EXISTS `api_customuser_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_customuser_user_permissions` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `customuser_id` bigint(20) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `API_customuser_user_perm_customuser_id_permission_c054fff9_uniq` (`customuser_id`,`permission_id`),
  KEY `API_customuser_user__permission_id_4e6eee8c_fk_auth_perm` (`permission_id`),
  CONSTRAINT `API_customuser_user__customuser_id_83c5665c_fk_API_custo` FOREIGN KEY (`customuser_id`) REFERENCES `api_customuser` (`id`),
  CONSTRAINT `API_customuser_user__permission_id_4e6eee8c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_customuser_user_permissions`
--

LOCK TABLES `api_customuser_user_permissions` WRITE;
/*!40000 ALTER TABLE `api_customuser_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `api_customuser_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_department`
--

DROP TABLE IF EXISTS `api_department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_department` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  `date_created` datetime(6) DEFAULT NULL,
  `school_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `API_department_school_id_42ab7b7e_fk_API_school_id` (`school_id`),
  CONSTRAINT `API_department_school_id_42ab7b7e_fk_API_school_id` FOREIGN KEY (`school_id`) REFERENCES `api_school` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_department`
--

LOCK TABLES `api_department` WRITE;
/*!40000 ALTER TABLE `api_department` DISABLE KEYS */;
/*!40000 ALTER TABLE `api_department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_fee`
--

DROP TABLE IF EXISTS `api_fee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_fee` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  `amount` double DEFAULT NULL,
  `date_created` datetime(6) DEFAULT NULL,
  `paymentIntervals` varchar(15) DEFAULT NULL,
  `department_id` bigint(20) DEFAULT NULL,
  `school_id` bigint(20) DEFAULT NULL,
  `SchoolBodies_that_pay_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `API_fee_SchoolBodies_that_pa_3c96d77c_fk_API_schoo` (`SchoolBodies_that_pay_id`),
  KEY `API_fee_department_id_9362cd52_fk_API_department_id` (`department_id`),
  KEY `API_fee_school_id_178b8517_fk_API_school_id` (`school_id`),
  CONSTRAINT `API_fee_SchoolBodies_that_pa_3c96d77c_fk_API_schoo` FOREIGN KEY (`SchoolBodies_that_pay_id`) REFERENCES `api_schoolcommittees` (`id`),
  CONSTRAINT `API_fee_department_id_9362cd52_fk_API_department_id` FOREIGN KEY (`department_id`) REFERENCES `api_department` (`id`),
  CONSTRAINT `API_fee_school_id_178b8517_fk_API_school_id` FOREIGN KEY (`school_id`) REFERENCES `api_school` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_fee`
--

LOCK TABLES `api_fee` WRITE;
/*!40000 ALTER TABLE `api_fee` DISABLE KEYS */;
/*!40000 ALTER TABLE `api_fee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_observerallowances`
--

DROP TABLE IF EXISTS `api_observerallowances`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_observerallowances` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `amount` double DEFAULT NULL,
  `feeType_id` bigint(20) NOT NULL,
  `student_id` bigint(20) NOT NULL,
  `term_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `API_observerallowances_feeType_id_cd766419_fk_API_fee_id` (`feeType_id`),
  KEY `API_observerallowances_student_id_eccfa4b2_fk_API_student_id` (`student_id`),
  KEY `API_observerallowances_term_id_1c104ddf_fk_API_termdetails_id` (`term_id`),
  CONSTRAINT `API_observerallowances_feeType_id_cd766419_fk_API_fee_id` FOREIGN KEY (`feeType_id`) REFERENCES `api_fee` (`id`),
  CONSTRAINT `API_observerallowances_student_id_eccfa4b2_fk_API_student_id` FOREIGN KEY (`student_id`) REFERENCES `api_student` (`id`),
  CONSTRAINT `API_observerallowances_term_id_1c104ddf_fk_API_termdetails_id` FOREIGN KEY (`term_id`) REFERENCES `api_termdetails` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_observerallowances`
--

LOCK TABLES `api_observerallowances` WRITE;
/*!40000 ALTER TABLE `api_observerallowances` DISABLE KEYS */;
/*!40000 ALTER TABLE `api_observerallowances` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_paymentperiod`
--

DROP TABLE IF EXISTS `api_paymentperiod`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_paymentperiod` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `date` datetime(6) DEFAULT NULL,
  `name` varchar(200) DEFAULT NULL,
  `school_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `API_paymentperiod_school_id_b24d6aad_fk_API_school_id` (`school_id`),
  CONSTRAINT `API_paymentperiod_school_id_b24d6aad_fk_API_school_id` FOREIGN KEY (`school_id`) REFERENCES `api_school` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_paymentperiod`
--

LOCK TABLES `api_paymentperiod` WRITE;
/*!40000 ALTER TABLE `api_paymentperiod` DISABLE KEYS */;
/*!40000 ALTER TABLE `api_paymentperiod` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_paymentperiod_wages_to_be_paid`
--

DROP TABLE IF EXISTS `api_paymentperiod_wages_to_be_paid`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_paymentperiod_wages_to_be_paid` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `paymentperiod_id` bigint(20) NOT NULL,
  `wage_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `API_paymentperiod_wages__paymentperiod_id_wage_id_eb9e622c_uniq` (`paymentperiod_id`,`wage_id`),
  KEY `API_paymentperiod_wa_wage_id_ff9f192d_fk_API_wage_` (`wage_id`),
  CONSTRAINT `API_paymentperiod_wa_paymentperiod_id_b98046eb_fk_API_payme` FOREIGN KEY (`paymentperiod_id`) REFERENCES `api_paymentperiod` (`id`),
  CONSTRAINT `API_paymentperiod_wa_wage_id_ff9f192d_fk_API_wage_` FOREIGN KEY (`wage_id`) REFERENCES `api_wage` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_paymentperiod_wages_to_be_paid`
--

LOCK TABLES `api_paymentperiod_wages_to_be_paid` WRITE;
/*!40000 ALTER TABLE `api_paymentperiod_wages_to_be_paid` DISABLE KEYS */;
/*!40000 ALTER TABLE `api_paymentperiod_wages_to_be_paid` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_periodfinanceupdate`
--

DROP TABLE IF EXISTS `api_periodfinanceupdate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_periodfinanceupdate` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `date` datetime(6) DEFAULT NULL,
  `confirm` tinyint(1) NOT NULL,
  `period_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `API_periodfinanceupd_period_id_d100ae84_fk_API_payme` (`period_id`),
  CONSTRAINT `API_periodfinanceupd_period_id_d100ae84_fk_API_payme` FOREIGN KEY (`period_id`) REFERENCES `api_paymentperiod` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_periodfinanceupdate`
--

LOCK TABLES `api_periodfinanceupdate` WRITE;
/*!40000 ALTER TABLE `api_periodfinanceupdate` DISABLE KEYS */;
/*!40000 ALTER TABLE `api_periodfinanceupdate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_proprietor`
--

DROP TABLE IF EXISTS `api_proprietor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_proprietor` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `surname` varchar(200) DEFAULT NULL,
  `otherName` varchar(200) DEFAULT NULL,
  `dateOfBirth` date DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `phone` varchar(200) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `date_created` datetime(6) DEFAULT NULL,
  `residentialAddress` varchar(200) DEFAULT NULL,
  `parentName` varchar(200) DEFAULT NULL,
  `otherInformation` varchar(200) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `API_proprietor_user_id_027ff3d0_fk_API_customuser_id` (`user_id`),
  CONSTRAINT `API_proprietor_user_id_027ff3d0_fk_API_customuser_id` FOREIGN KEY (`user_id`) REFERENCES `api_customuser` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_proprietor`
--

LOCK TABLES `api_proprietor` WRITE;
/*!40000 ALTER TABLE `api_proprietor` DISABLE KEYS */;
/*!40000 ALTER TABLE `api_proprietor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_school`
--

DROP TABLE IF EXISTS `api_school`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_school` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `schoolMotto` varchar(200) DEFAULT NULL,
  `phone` varchar(200) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `residentialAddress` varchar(200) DEFAULT NULL,
  `registrationDateOfTheSchool` varchar(200) DEFAULT NULL,
  `otherInformation` varchar(200) DEFAULT NULL,
  `date_created` datetime(6) DEFAULT NULL,
  `proprietor_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `API_school_proprietor_id_b5be78d8_fk_API_proprietor_id` (`proprietor_id`),
  CONSTRAINT `API_school_proprietor_id_b5be78d8_fk_API_proprietor_id` FOREIGN KEY (`proprietor_id`) REFERENCES `api_proprietor` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_school`
--

LOCK TABLES `api_school` WRITE;
/*!40000 ALTER TABLE `api_school` DISABLE KEYS */;
/*!40000 ALTER TABLE `api_school` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_schoolcommittees`
--

DROP TABLE IF EXISTS `api_schoolcommittees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_schoolcommittees` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  `school_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `API_schoolcommittees_school_id_9c9f09e1_fk_API_school_id` (`school_id`),
  CONSTRAINT `API_schoolcommittees_school_id_9c9f09e1_fk_API_school_id` FOREIGN KEY (`school_id`) REFERENCES `api_school` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_schoolcommittees`
--

LOCK TABLES `api_schoolcommittees` WRITE;
/*!40000 ALTER TABLE `api_schoolcommittees` DISABLE KEYS */;
/*!40000 ALTER TABLE `api_schoolcommittees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_staff`
--

DROP TABLE IF EXISTS `api_staff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_staff` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `date_registered` datetime(6) DEFAULT NULL,
  `surname` varchar(200) DEFAULT NULL,
  `otherName` varchar(200) DEFAULT NULL,
  `dateOfBirth` date DEFAULT NULL,
  `school_committee_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `API_staff_school_committee_id_450a9d22_fk_API_schoo` (`school_committee_id`),
  CONSTRAINT `API_staff_school_committee_id_450a9d22_fk_API_schoo` FOREIGN KEY (`school_committee_id`) REFERENCES `api_schoolcommittees` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_staff`
--

LOCK TABLES `api_staff` WRITE;
/*!40000 ALTER TABLE `api_staff` DISABLE KEYS */;
/*!40000 ALTER TABLE `api_staff` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_staff_school`
--

DROP TABLE IF EXISTS `api_staff_school`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_staff_school` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `staff_id` bigint(20) NOT NULL,
  `school_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `API_staff_school_staff_id_school_id_46cbf979_uniq` (`staff_id`,`school_id`),
  KEY `API_staff_school_school_id_192a23ed_fk_API_school_id` (`school_id`),
  CONSTRAINT `API_staff_school_school_id_192a23ed_fk_API_school_id` FOREIGN KEY (`school_id`) REFERENCES `api_school` (`id`),
  CONSTRAINT `API_staff_school_staff_id_9af9dc13_fk_API_staff_id` FOREIGN KEY (`staff_id`) REFERENCES `api_staff` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_staff_school`
--

LOCK TABLES `api_staff_school` WRITE;
/*!40000 ALTER TABLE `api_staff_school` DISABLE KEYS */;
/*!40000 ALTER TABLE `api_staff_school` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_staffsalariespayable`
--

DROP TABLE IF EXISTS `api_staffsalariespayable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_staffsalariespayable` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `period_id` bigint(20) DEFAULT NULL,
  `debt_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `API_staffsalariespayable_debt_id_dc3bea1e_fk_API_staffwage_id` (`debt_id`),
  KEY `API_staffsalariespay_period_id_ccd28ad3_fk_API_payme` (`period_id`),
  CONSTRAINT `API_staffsalariespay_period_id_ccd28ad3_fk_API_payme` FOREIGN KEY (`period_id`) REFERENCES `api_paymentperiod` (`id`),
  CONSTRAINT `API_staffsalariespayable_debt_id_dc3bea1e_fk_API_staffwage_id` FOREIGN KEY (`debt_id`) REFERENCES `api_staffwage` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_staffsalariespayable`
--

LOCK TABLES `api_staffsalariespayable` WRITE;
/*!40000 ALTER TABLE `api_staffsalariespayable` DISABLE KEYS */;
/*!40000 ALTER TABLE `api_staffsalariespayable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_staffsalary`
--

DROP TABLE IF EXISTS `api_staffsalary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_staffsalary` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  `amount` double DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `API_staffsalary_user_id_1bc1e265_fk_API_customuser_id` FOREIGN KEY (`user_id`) REFERENCES `api_customuser` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_staffsalary`
--

LOCK TABLES `api_staffsalary` WRITE;
/*!40000 ALTER TABLE `api_staffsalary` DISABLE KEYS */;
/*!40000 ALTER TABLE `api_staffsalary` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_staffsalarypaid`
--

DROP TABLE IF EXISTS `api_staffsalarypaid`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_staffsalarypaid` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `amount` double DEFAULT NULL,
  `specific_debt_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `API_staffsalarypaid_specific_debt_id_7a2b31a6_fk_API_staff` (`specific_debt_id`),
  CONSTRAINT `API_staffsalarypaid_specific_debt_id_7a2b31a6_fk_API_staff` FOREIGN KEY (`specific_debt_id`) REFERENCES `api_staffsalariespayable` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_staffsalarypaid`
--

LOCK TABLES `api_staffsalarypaid` WRITE;
/*!40000 ALTER TABLE `api_staffsalarypaid` DISABLE KEYS */;
/*!40000 ALTER TABLE `api_staffsalarypaid` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_staffwage`
--

DROP TABLE IF EXISTS `api_staffwage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_staffwage` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `amount` double DEFAULT NULL,
  `staff_id` bigint(20) DEFAULT NULL,
  `WageType_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `API_staffwage_staff_id_728efff5_fk_API_staff_id` (`staff_id`),
  KEY `API_staffwage_WageType_id_e27fa583_fk_API_wage_id` (`WageType_id`),
  CONSTRAINT `API_staffwage_WageType_id_e27fa583_fk_API_wage_id` FOREIGN KEY (`WageType_id`) REFERENCES `api_wage` (`id`),
  CONSTRAINT `API_staffwage_staff_id_728efff5_fk_API_staff_id` FOREIGN KEY (`staff_id`) REFERENCES `api_staff` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_staffwage`
--

LOCK TABLES `api_staffwage` WRITE;
/*!40000 ALTER TABLE `api_staffwage` DISABLE KEYS */;
/*!40000 ALTER TABLE `api_staffwage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_student`
--

DROP TABLE IF EXISTS `api_student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_student` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `surname` varchar(200) DEFAULT NULL,
  `otherName` varchar(200) DEFAULT NULL,
  `dateOfBirth` date DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `mothersName` varchar(200) DEFAULT NULL,
  `mothersTell` varchar(200) DEFAULT NULL,
  `fathersName` varchar(200) DEFAULT NULL,
  `fathersTell` varchar(200) DEFAULT NULL,
  `guardianName` varchar(200) DEFAULT NULL,
  `guardianTell` varchar(200) DEFAULT NULL,
  `relationshipToChild` varchar(200) DEFAULT NULL,
  `residentialAddress` varchar(200) DEFAULT NULL,
  `date_registered` datetime(6) DEFAULT NULL,
  `previous_school_attended` varchar(200) DEFAULT NULL,
  `admission_payments` double DEFAULT NULL,
  `balance` double DEFAULT NULL,
  `student_status` varchar(100) DEFAULT NULL,
  `is_observer` tinyint(1) NOT NULL,
  `admission_fees_payable_id` bigint(20) DEFAULT NULL,
  `classLevel_id` bigint(20) DEFAULT NULL,
  `school_committee_id` bigint(20) DEFAULT NULL,
  `admission_term_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `API_student_admission_term_id_73fa9008_fk_API_termdetails_id` (`admission_term_id`),
  KEY `API_student_admission_fees_payable_id_7dc29d22_fk_API_fee_id` (`admission_fees_payable_id`),
  KEY `API_student_classLevel_id_4018000c_fk_API_classlevel_id` (`classLevel_id`),
  KEY `API_student_school_committee_id_88c99c64_fk_API_schoo` (`school_committee_id`),
  CONSTRAINT `API_student_admission_fees_payable_id_7dc29d22_fk_API_fee_id` FOREIGN KEY (`admission_fees_payable_id`) REFERENCES `api_fee` (`id`),
  CONSTRAINT `API_student_admission_term_id_73fa9008_fk_API_termdetails_id` FOREIGN KEY (`admission_term_id`) REFERENCES `api_termdetails` (`id`),
  CONSTRAINT `API_student_classLevel_id_4018000c_fk_API_classlevel_id` FOREIGN KEY (`classLevel_id`) REFERENCES `api_classlevel` (`id`),
  CONSTRAINT `API_student_school_committee_id_88c99c64_fk_API_schoo` FOREIGN KEY (`school_committee_id`) REFERENCES `api_schoolcommittees` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_student`
--

LOCK TABLES `api_student` WRITE;
/*!40000 ALTER TABLE `api_student` DISABLE KEYS */;
/*!40000 ALTER TABLE `api_student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_studentfeespaid`
--

DROP TABLE IF EXISTS `api_studentfeespaid`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_studentfeespaid` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `date` date DEFAULT NULL,
  `amount` double DEFAULT NULL,
  `feeType_id` bigint(20) NOT NULL,
  `student_id` bigint(20) NOT NULL,
  `term_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `API_studentfeespaid_feeType_id_3a984661_fk_API_fee_id` (`feeType_id`),
  KEY `API_studentfeespaid_student_id_8a476bea_fk_API_student_id` (`student_id`),
  KEY `API_studentfeespaid_term_id_1cbe7ab0_fk_API_termdetails_id` (`term_id`),
  CONSTRAINT `API_studentfeespaid_feeType_id_3a984661_fk_API_fee_id` FOREIGN KEY (`feeType_id`) REFERENCES `api_fee` (`id`),
  CONSTRAINT `API_studentfeespaid_student_id_8a476bea_fk_API_student_id` FOREIGN KEY (`student_id`) REFERENCES `api_student` (`id`),
  CONSTRAINT `API_studentfeespaid_term_id_1cbe7ab0_fk_API_termdetails_id` FOREIGN KEY (`term_id`) REFERENCES `api_termdetails` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_studentfeespaid`
--

LOCK TABLES `api_studentfeespaid` WRITE;
/*!40000 ALTER TABLE `api_studentfeespaid` DISABLE KEYS */;
/*!40000 ALTER TABLE `api_studentfeespaid` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_studentfeespayable`
--

DROP TABLE IF EXISTS `api_studentfeespayable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_studentfeespayable` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `date` date DEFAULT NULL,
  `fee_id` bigint(20) NOT NULL,
  `student_id` bigint(20) NOT NULL,
  `Term_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `API_studentfeespayable_fee_id_96249452_fk_API_fee_id` (`fee_id`),
  KEY `API_studentfeespayable_student_id_b113b903_fk_API_student_id` (`student_id`),
  KEY `API_studentfeespayable_Term_id_c4ca338b_fk_API_termdetails_id` (`Term_id`),
  CONSTRAINT `API_studentfeespayable_Term_id_c4ca338b_fk_API_termdetails_id` FOREIGN KEY (`Term_id`) REFERENCES `api_termdetails` (`id`),
  CONSTRAINT `API_studentfeespayable_fee_id_96249452_fk_API_fee_id` FOREIGN KEY (`fee_id`) REFERENCES `api_fee` (`id`),
  CONSTRAINT `API_studentfeespayable_student_id_b113b903_fk_API_student_id` FOREIGN KEY (`student_id`) REFERENCES `api_student` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_studentfeespayable`
--

LOCK TABLES `api_studentfeespayable` WRITE;
/*!40000 ALTER TABLE `api_studentfeespayable` DISABLE KEYS */;
/*!40000 ALTER TABLE `api_studentfeespayable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_studentterminalreportdetails`
--

DROP TABLE IF EXISTS `api_studentterminalreportdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_studentterminalreportdetails` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `subject_of_interest` varchar(200) DEFAULT NULL,
  `conduct` varchar(200) DEFAULT NULL,
  `special_skill_observed` varchar(200) DEFAULT NULL,
  `progress_in_reading` varchar(200) DEFAULT NULL,
  `class_teachers_remarks` varchar(200) DEFAULT NULL,
  `term_attendance` int(11) DEFAULT NULL,
  `student_id` bigint(20) DEFAULT NULL,
  `term_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `API_studentterminalr_student_id_12f64d9b_fk_API_stude` (`student_id`),
  KEY `API_studentterminalr_term_id_dcb46ec9_fk_API_termd` (`term_id`),
  CONSTRAINT `API_studentterminalr_student_id_12f64d9b_fk_API_stude` FOREIGN KEY (`student_id`) REFERENCES `api_student` (`id`),
  CONSTRAINT `API_studentterminalr_term_id_dcb46ec9_fk_API_termd` FOREIGN KEY (`term_id`) REFERENCES `api_termdetails` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_studentterminalreportdetails`
--

LOCK TABLES `api_studentterminalreportdetails` WRITE;
/*!40000 ALTER TABLE `api_studentterminalreportdetails` DISABLE KEYS */;
/*!40000 ALTER TABLE `api_studentterminalreportdetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_termdetails`
--

DROP TABLE IF EXISTS `api_termdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_termdetails` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `term_name` varchar(200) DEFAULT NULL,
  `term_opening_date` date DEFAULT NULL,
  `term_vacation_date` date DEFAULT NULL,
  `next_term_reopening_date` date DEFAULT NULL,
  `term_midterm_date` date DEFAULT NULL,
  `next_resume_reopening_date` date DEFAULT NULL,
  `term_number_of_days` int(11) DEFAULT NULL,
  `other_term_details` varchar(200) NOT NULL,
  `school_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `API_termdetails_school_id_6719a2cd_fk_API_school_id` (`school_id`),
  CONSTRAINT `API_termdetails_school_id_6719a2cd_fk_API_school_id` FOREIGN KEY (`school_id`) REFERENCES `api_school` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_termdetails`
--

LOCK TABLES `api_termdetails` WRITE;
/*!40000 ALTER TABLE `api_termdetails` DISABLE KEYS */;
/*!40000 ALTER TABLE `api_termdetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_wage`
--

DROP TABLE IF EXISTS `api_wage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_wage` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `Date` date DEFAULT NULL,
  `title` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_wage`
--

LOCK TABLES `api_wage` WRITE;
/*!40000 ALTER TABLE `api_wage` DISABLE KEYS */;
/*!40000 ALTER TABLE `api_wage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=129 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add content type',4,'add_contenttype'),(14,'Can change content type',4,'change_contenttype'),(15,'Can delete content type',4,'delete_contenttype'),(16,'Can view content type',4,'view_contenttype'),(17,'Can add session',5,'add_session'),(18,'Can change session',5,'change_session'),(19,'Can delete session',5,'delete_session'),(20,'Can view session',5,'view_session'),(21,'Can add Token',6,'add_token'),(22,'Can change Token',6,'change_token'),(23,'Can delete Token',6,'delete_token'),(24,'Can view Token',6,'view_token'),(25,'Can add token',7,'add_tokenproxy'),(26,'Can change token',7,'change_tokenproxy'),(27,'Can delete token',7,'delete_tokenproxy'),(28,'Can view token',7,'view_tokenproxy'),(29,'Can add course',8,'add_course'),(30,'Can change course',8,'change_course'),(31,'Can delete course',8,'delete_course'),(32,'Can view course',8,'view_course'),(33,'Can add department',9,'add_department'),(34,'Can change department',9,'change_department'),(35,'Can delete department',9,'delete_department'),(36,'Can view department',9,'view_department'),(37,'Can add payment period',10,'add_paymentperiod'),(38,'Can change payment period',10,'change_paymentperiod'),(39,'Can delete payment period',10,'delete_paymentperiod'),(40,'Can view payment period',10,'view_paymentperiod'),(41,'Can add proprietor',11,'add_proprietor'),(42,'Can change proprietor',11,'change_proprietor'),(43,'Can delete proprietor',11,'delete_proprietor'),(44,'Can view proprietor',11,'view_proprietor'),(45,'Can add wage',12,'add_wage'),(46,'Can change wage',12,'change_wage'),(47,'Can delete wage',12,'delete_wage'),(48,'Can view wage',12,'view_wage'),(49,'Can add period finance update',13,'add_periodfinanceupdate'),(50,'Can change period finance update',13,'change_periodfinanceupdate'),(51,'Can delete period finance update',13,'delete_periodfinanceupdate'),(52,'Can view period finance update',13,'view_periodfinanceupdate'),(53,'Can add school',14,'add_school'),(54,'Can change school',14,'change_school'),(55,'Can delete school',14,'delete_school'),(56,'Can view school',14,'view_school'),(57,'Can add fee',15,'add_fee'),(58,'Can change fee',15,'change_fee'),(59,'Can delete fee',15,'delete_fee'),(60,'Can view fee',15,'view_fee'),(61,'Can add class level',16,'add_classlevel'),(62,'Can change class level',16,'change_classlevel'),(63,'Can delete class level',16,'delete_classlevel'),(64,'Can view class level',16,'view_classlevel'),(65,'Can add school committees',17,'add_schoolcommittees'),(66,'Can change school committees',17,'change_schoolcommittees'),(67,'Can delete school committees',17,'delete_schoolcommittees'),(68,'Can view school committees',17,'view_schoolcommittees'),(69,'Can add staff',18,'add_staff'),(70,'Can change staff',18,'change_staff'),(71,'Can delete staff',18,'delete_staff'),(72,'Can view staff',18,'view_staff'),(73,'Can add class teacher map',19,'add_classteachermap'),(74,'Can change class teacher map',19,'change_classteachermap'),(75,'Can delete class teacher map',19,'delete_classteachermap'),(76,'Can view class teacher map',19,'view_classteachermap'),(77,'Can add staff salaries payable',20,'add_staffsalariespayable'),(78,'Can change staff salaries payable',20,'change_staffsalariespayable'),(79,'Can delete staff salaries payable',20,'delete_staffsalariespayable'),(80,'Can view staff salaries payable',20,'view_staffsalariespayable'),(81,'Can add staff salary paid',21,'add_staffsalarypaid'),(82,'Can change staff salary paid',21,'change_staffsalarypaid'),(83,'Can delete staff salary paid',21,'delete_staffsalarypaid'),(84,'Can view staff salary paid',21,'view_staffsalarypaid'),(85,'Can add staff wage',22,'add_staffwage'),(86,'Can change staff wage',22,'change_staffwage'),(87,'Can delete staff wage',22,'delete_staffwage'),(88,'Can view staff wage',22,'view_staffwage'),(89,'Can add student',23,'add_student'),(90,'Can change student',23,'change_student'),(91,'Can delete student',23,'delete_student'),(92,'Can view student',23,'view_student'),(93,'Can add term details',24,'add_termdetails'),(94,'Can change term details',24,'change_termdetails'),(95,'Can delete term details',24,'delete_termdetails'),(96,'Can view term details',24,'view_termdetails'),(97,'Can add student terminal report details',25,'add_studentterminalreportdetails'),(98,'Can change student terminal report details',25,'change_studentterminalreportdetails'),(99,'Can delete student terminal report details',25,'delete_studentterminalreportdetails'),(100,'Can view student terminal report details',25,'view_studentterminalreportdetails'),(101,'Can add student fees payable',26,'add_studentfeespayable'),(102,'Can change student fees payable',26,'change_studentfeespayable'),(103,'Can delete student fees payable',26,'delete_studentfeespayable'),(104,'Can view student fees payable',26,'view_studentfeespayable'),(105,'Can add student fees paid',27,'add_studentfeespaid'),(106,'Can change student fees paid',27,'change_studentfeespaid'),(107,'Can delete student fees paid',27,'delete_studentfeespaid'),(108,'Can view student fees paid',27,'view_studentfeespaid'),(109,'Can add observer allowances',28,'add_observerallowances'),(110,'Can change observer allowances',28,'change_observerallowances'),(111,'Can delete observer allowances',28,'delete_observerallowances'),(112,'Can view observer allowances',28,'view_observerallowances'),(113,'Can add course student',29,'add_coursestudent'),(114,'Can change course student',29,'change_coursestudent'),(115,'Can delete course student',29,'delete_coursestudent'),(116,'Can view course student',29,'view_coursestudent'),(117,'Can add allowances paid for observer student',30,'add_allowancespaidforobserverstudent'),(118,'Can change allowances paid for observer student',30,'change_allowancespaidforobserverstudent'),(119,'Can delete allowances paid for observer student',30,'delete_allowancespaidforobserverstudent'),(120,'Can view allowances paid for observer student',30,'view_allowancespaidforobserverstudent'),(121,'Can add custom user',31,'add_customuser'),(122,'Can change custom user',31,'change_customuser'),(123,'Can delete custom user',31,'delete_customuser'),(124,'Can view custom user',31,'view_customuser'),(125,'Can add staff salary',32,'add_staffsalary'),(126,'Can change staff salary',32,'change_staffsalary'),(127,'Can delete staff salary',32,'delete_staffsalary'),(128,'Can view staff salary',32,'view_staffsalary');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `authtoken_token`
--

DROP TABLE IF EXISTS `authtoken_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `authtoken_token` (
  `key` varchar(40) NOT NULL,
  `created` datetime(6) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  PRIMARY KEY (`key`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `authtoken_token_user_id_35299eff_fk_API_customuser_id` FOREIGN KEY (`user_id`) REFERENCES `api_customuser` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authtoken_token`
--

LOCK TABLES `authtoken_token` WRITE;
/*!40000 ALTER TABLE `authtoken_token` DISABLE KEYS */;
INSERT INTO `authtoken_token` VALUES ('06bc9f6662476ebd47eea63f73047efae11b1466','2024-03-04 09:11:46.185943',2);
/*!40000 ALTER TABLE `authtoken_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext DEFAULT NULL,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) unsigned NOT NULL CHECK (`action_flag` >= 0),
  `change_message` longtext NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_API_customuser_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_API_customuser_id` FOREIGN KEY (`user_id`) REFERENCES `api_customuser` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(30,'API','allowancespaidforobserverstudent'),(16,'API','classlevel'),(19,'API','classteachermap'),(8,'API','course'),(29,'API','coursestudent'),(31,'API','customuser'),(9,'API','department'),(15,'API','fee'),(28,'API','observerallowances'),(10,'API','paymentperiod'),(13,'API','periodfinanceupdate'),(11,'API','proprietor'),(14,'API','school'),(17,'API','schoolcommittees'),(18,'API','staff'),(20,'API','staffsalariespayable'),(32,'API','staffsalary'),(21,'API','staffsalarypaid'),(22,'API','staffwage'),(23,'API','student'),(27,'API','studentfeespaid'),(26,'API','studentfeespayable'),(25,'API','studentterminalreportdetails'),(24,'API','termdetails'),(12,'API','wage'),(3,'auth','group'),(2,'auth','permission'),(6,'authtoken','token'),(7,'authtoken','tokenproxy'),(4,'contenttypes','contenttype'),(5,'sessions','session');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2024-03-03 03:15:39.815203'),(2,'contenttypes','0002_remove_content_type_name','2024-03-03 03:15:39.942856'),(3,'auth','0001_initial','2024-03-03 03:15:40.527653'),(4,'auth','0002_alter_permission_name_max_length','2024-03-03 03:15:40.852726'),(5,'auth','0003_alter_user_email_max_length','2024-03-03 03:15:40.861511'),(6,'auth','0004_alter_user_username_opts','2024-03-03 03:15:40.870442'),(7,'auth','0005_alter_user_last_login_null','2024-03-03 03:15:40.883605'),(8,'auth','0006_require_contenttypes_0002','2024-03-03 03:15:40.890137'),(9,'auth','0007_alter_validators_add_error_messages','2024-03-03 03:15:40.902876'),(10,'auth','0008_alter_user_username_max_length','2024-03-03 03:15:40.919043'),(11,'auth','0009_alter_user_last_name_max_length','2024-03-03 03:15:40.952309'),(12,'auth','0010_alter_group_name_max_length','2024-03-03 03:15:40.977902'),(13,'auth','0011_update_proxy_permissions','2024-03-03 03:15:40.988160'),(14,'auth','0012_alter_user_first_name_max_length','2024-03-03 03:15:40.997981'),(15,'API','0001_initial','2024-03-03 03:15:49.411209'),(16,'admin','0001_initial','2024-03-03 03:15:49.689644'),(17,'admin','0002_logentry_remove_auto_add','2024-03-03 03:15:49.700168'),(18,'admin','0003_logentry_add_action_flag_choices','2024-03-03 03:15:49.714813'),(19,'authtoken','0001_initial','2024-03-03 03:15:49.937518'),(20,'authtoken','0002_auto_20160226_1747','2024-03-03 03:15:50.018712'),(21,'authtoken','0003_tokenproxy','2024-03-03 03:15:50.025131'),(22,'sessions','0001_initial','2024-03-03 03:15:50.075788');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('nevax3xfy6tkp2vuz37ca40sl9kjz40w','.eJxVjDsOwjAQBe_iGln-xQRK-pzB2l2vcQDZUpxUiLsTSymgnZn33iLAtuawNV7CHMVVGHH6ZQj05NJFfEC5V0m1rMuMsifysE1ONfLrdrR_Bxla3tfeMCJqZ93ADqOPlEgpq_zZMV201TtIukcJFCMD6XF0YAm0M2pI4vMFCDc49g:1rh4NB:hRxAxssVyUB3xlZhD9zxNERVxo9n-JuhEISJhnJ-xT4','2024-03-18 09:12:37.523614');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-04 15:19:59
