-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
-- USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NULL,
  `last_name` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `password` VARCHAR(256) NULL,
  `type` ENUM('user', 'admin') NULL,
  `date` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`exam`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`exam` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `description` VARCHAR(45) NULL,
  `owner` INT NOT NULL,
  `date` DATETIME NULL,
  `hide` TINYINT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Assesments_users1_idx` (`owner` ASC),
  CONSTRAINT `fk_Assesments_users1`
    FOREIGN KEY (`owner`)
    REFERENCES `mydb`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`question`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`question` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NULL,
  `exam_id` INT NOT NULL,
  `difficulty` ENUM('1', '2', '3', '4', '5') NULL,
  `points` DOUBLE NULL,
  `type` ENUM("radio", "checkbox") NULL,
  `date` DATETIME NULL,
  `hide` TINYINT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Units_Assesments_idx` (`exam_id` ASC),
  CONSTRAINT `fk_Units_Assesments`
    FOREIGN KEY (`exam_id`)
    REFERENCES `mydb`.`exam` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`answers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`answers` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `question_id` INT NOT NULL,
  `correct` TINYINT NOT NULL DEFAULT 0,
  `hide` TINYINT NOT NULL,
  `date` DATETIME NULL,
  `points` DOUBLE NULL,
  `title` VARCHAR(45) NULL,
  INDEX `fk_Answers_Units1_idx` (`question_id` ASC),
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_Answers_Units1`
    FOREIGN KEY (`question_id`)
    REFERENCES `mydb`.`question` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`users_answers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`users_answers` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `users_id` INT NOT NULL,
  `answers_id` INT NOT NULL,
  `point` DOUBLE NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_users_assement_answers_users1_idx` (`users_id` ASC),
  INDEX `fk_users_answers_answers1_idx` (`answers_id` ASC),
  CONSTRAINT `fk_users_assement_answers_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `mydb`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_answers_answers1`
    FOREIGN KEY (`answers_id`)
    REFERENCES `mydb`.`answers` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`attempts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`attempts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `exam_id` INT NOT NULL,
  `users_answers_id` INT NOT NULL,
  `start_time` DATETIME NULL,
  `end_time` DATETIME NULL,
  `date` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_attempts_exam1_idx` (`exam_id` ASC),
  INDEX `fk_attempts_users_answers1_idx` (`users_answers_id` ASC),
  CONSTRAINT `fk_attempts_exam1`
    FOREIGN KEY (`exam_id`)
    REFERENCES `mydb`.`exam` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_attempts_users_answers1`
    FOREIGN KEY (`users_answers_id`)
    REFERENCES `mydb`.`users_answers` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`grades`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`grades` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `users_id` INT NOT NULL,
  `attempts_id` INT NOT NULL,
  `grade` DOUBLE NULL,
  `date` DATETIME NULL,
  PRIMARY KEY (`id`, `users_id`),
  INDEX `fk_Assesments_has_users_users1_idx` (`users_id` ASC),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `fk_grades_attempts1_idx` (`attempts_id` ASC),
  CONSTRAINT `fk_Assesments_has_users_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `mydb`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_grades_attempts1`
    FOREIGN KEY (`attempts_id`)
    REFERENCES `mydb`.`attempts` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`feedback`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`feedback` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `exam_id` INT NOT NULL,
  `vote` ENUM("1", "2", "3", "4", "5") NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_feedback_exam1_idx` (`exam_id` ASC),
  CONSTRAINT `fk_feedback_exam1`
    FOREIGN KEY (`exam_id`)
    REFERENCES `mydb`.`exam` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `type`, `date`) VALUES (NULL, 'Stelisdafos', 'Pafasdpadopoulos', 'stffelios@mail.com', 'asdfasdf', 'user', '2022-04-01 20:07:45');
INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `type`, `date`) VALUES (NULL, 'Stelios', 'Papadopoulos', 'stelios@mail.com', 'asdf1234', 'user', '2022-04-01 20:07:45');


INSERT INTO `exam` (`id`, `name`, `description`, `owner`, `date`, `hide`) VALUES (NULL, 'Maths1', 'fasdfads', '1', '2022-04-01 20:07:45', '0'),
(NULL, 'Poetry', 'my poetry', '1', '2022-04-01 20:07:45', '0'),
(NULL, 'Poetry2', 'my poetry', '1', '2022-04-01 20:07:45', '0');

INSERT INTO `question` (`id`, `title`, `exam_id`, `difficulty`, `points`, `type`, `date`, `hide`) VALUES 
 (NULL, 'How much is 1+1', '1', '1', '1', 'checkbox', '2022-04-01 20:07:45', '0'),
 (NULL, 'How much is 2+2', '1', '1', '1', 'checkbox', '2022-04-01 20:07:45', '0'),
 (NULL, 'How much is 3+2', '1', '1', '1', 'checkbox', '2022-04-01 20:07:45', '0'),
 (NULL, 'How much is 3+2', '1', '1', '1', 'checkbox', '2022-04-01 20:07:45', '0'),
 (NULL, 'How much is asdf2', '1', '1', '1', 'checkbox', '2022-04-01 20:07:45', '0'),
 (NULL, 'How much is 3asdf2', '1', '1', '1', 'checkbox', '2022-04-01 20:07:45', '0'),
 (NULL, 'How much is asdf+2', '1', '1', '1', 'checkbox', '2022-04-01 20:07:45', '0'),
 (NULL, 'How much is asdf+2', '1', '1', '1', 'checkbox', '2022-04-01 20:07:45', '0'),
 (NULL, 'Who is Seferis', '2', '1', '1', 'checkbox', '2022-04-01 20:07:45', '0'),
 (NULL, 'Who is W.B Yeats.', '2', '1', '1', 'checkbox', '2022-04-01 20:07:45', '0'),
 (NULL, 'Who is Shakespeare', '2', '1', '1', 'checkbox', '2022-04-01 20:07:45', '0'),
 (NULL, 'Who is Oscar Wilde', '2', '1', '1', 'checkbox', '2022-04-01 20:07:45', '0'),
 (NULL, 'Who is John Milton', '2', '1', '1', 'checkbox', '2022-04-01 20:07:45', '0');

INSERT INTO `answers` (`id`, `question_id`, `correct`, `hide`, `date`, `points`, `title`) VALUES 
(NULL, '1', '1', '0', '2022-05-26 12:21:16', '1', '2'), 
(NULL, '1', '0', '0', '2022-05-01 13:28:57', '0', '123'),
(NULL, '1', '0', '0', '2022-05-01 13:28:57', '0', '4'),
(NULL, '1', '0', '0', '2022-05-01 13:28:57', '0', '5'),
(NULL, '2', '1', '0', '2022-05-01 13:28:57', '0', 'He is a poet'),
(NULL, '2', '0', '0', '2022-05-01 13:28:57', '0', 'He is a chemist'),
(NULL, '2', '0', '0', '2022-05-01 13:28:57', '0', 'He is a king'),
(NULL, '2', '0', '0', '2022-05-01 13:28:57', '0', 'He is a programmer');

INSERT INTO `users_answers` (`id`, `users_id`, `answers_id`, `point`) VALUES 
(NULL, '1', '2', '1'),
(NULL, '1', '2', '1'),
(NULL, '1', '2', '1');

INSERT INTO `attempts` (`id`, `exam_id`, `users_answers_id`, `start_time`, `end_time`, `date`) VALUES 
(NULL, '1', '1', '2022-05-01 17:16:47', '2022-05-05 17:16:47', '2022-05-12 17:16:47'), 
(NULL, '1', '2', '2022-05-25 17:16:47', '2022-05-10 17:16:47', '2022-05-02 17:16:47'),
(NULL, '1', '1', '2022-05-01 17:16:47', '2022-05-05 17:16:47', '2022-05-12 17:16:47'), 
(NULL, '1', '2', '2022-05-25 17:16:47', '2022-05-10 17:16:47', '2022-05-02 17:16:47');


INSERT INTO `grades` (`id`, `users_id`, `attempts_id`, `grade`, `date`) VALUES 
(NULL, '3', '1', '5', '2022-04-01 20:07:45'), 
(NULL, '3', '1', '5', '2022-04-01 20:07:45'),
(NULL, '3', '1', '5', '2022-04-01 20:07:45'),
(NULL, '3', '1', '5', '2022-04-01 20:07:45'),
(NULL, '2', '2', '10', '2022-05-09 17:18:28');



SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
