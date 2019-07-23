-- MySQL Script generated by MySQL Workbench
-- mar 23 jul 2019 11:31:16 -04
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema nestjsPost
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema nestjsPost
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `nestjsPost` DEFAULT CHARACTER SET latin1 ;
USE `nestjsPost` ;

-- -----------------------------------------------------
-- Table `nestjsPost`.`groups`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `nestjsPost`.`groups` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(200) NOT NULL,
  `created` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `nestjsPost`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `nestjsPost`.`users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `surname` VARCHAR(45) NOT NULL,
  `birthdate` DATETIME NOT NULL,
  `created` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `group_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_users_1_idx` (`group_id` ASC),
  CONSTRAINT `fk_users_1`
    FOREIGN KEY (`group_id`)
    REFERENCES `nestjsPost`.`groups` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `nestjsPost`.`posts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `nestjsPost`.`posts` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `texto` VARCHAR(45) NOT NULL,
  `created` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `user_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_posts_1_idx` (`user_id` ASC),
  CONSTRAINT `fk_posts_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `nestjsPost`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `nestjsPost`.`tags`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `nestjsPost`.`tags` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `created` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `nestjsPost`.`post_tag`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `nestjsPost`.`post_tag` (
  `post_id` INT(11) NOT NULL,
  `tag_id` INT(11) NOT NULL,
  PRIMARY KEY (`post_id`, `tag_id`),
  INDEX `IDX_6bdfb990a4b403839ee00c0ad4` (`post_id` ASC),
  INDEX `IDX_8e96c3fcc784f04c4859fa4e93` (`tag_id` ASC),
  CONSTRAINT `fk_post_tag_1`
    FOREIGN KEY (`post_id`)
    REFERENCES `nestjsPost`.`posts` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_post_tag_2`
    FOREIGN KEY (`tag_id`)
    REFERENCES `nestjsPost`.`tags` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

INSERT INTO `groups` VALUES (1,'2019-05-09 02:17:57.528442','2019-05-09 02:17:57.528442','admin','grupo de admins'),(2,'2019-05-09 02:21:34.722994','2019-05-09 02:42:41.000000','usuario','grupo de usuario'),(3,'2019-05-09 02:40:20.963695','2019-05-09 02:43:12.000000','publico','grupo de público general');

INSERT INTO `users` VALUES (1,1,'Rodrigo','Rivero','2019-05-09 03:17:00.284475','2019-05-09 03:17:00.284475','2019-05-09 03:17:00.284475')
,(2,2,'Andrés','Sáez','2019-05-09 03:18:44.557423','2019-05-09 03:18:44.557423','2019-05-09 03:18:44.557423');
