CREATE SCHEMA IF NOT EXISTS `tp1_seminario` DEFAULT CHARACTER SET utf8 ;
USE `tp1_seminario` ;

-- -----------------------------------------------------
-- Table `tp1_seminario`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tp1_seminario`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tp1_seminario`.`group`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tp1_seminario`.`group` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(64) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC),
  UNIQUE INDEX `description_UNIQUE` (`description` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tp1_seminario`.`memberUserGroup`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tp1_seminario`.`memberUserGroup` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `group_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `fk_memberUserGroup_user_idx` (`user_id` ASC),
  INDEX `fk_memberUserGroup_group1_idx` (`group_id` ASC),
  CONSTRAINT `fk_memberUserGroup_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `tp1_seminario`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_memberUserGroup_group1`
    FOREIGN KEY (`group_id`)
    REFERENCES `tp1_seminario`.`group` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tp1_seminario`.`groupAction`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tp1_seminario`.`groupAction` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Action` VARCHAR(10) NOT NULL,
  `memberUserGroup_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `fk_groupAction_memberUserGroup1_idx` (`memberUserGroup_id` ASC),
  CONSTRAINT `fk_groupAction_memberUserGroup1`
    FOREIGN KEY (`memberUserGroup_id`)
    REFERENCES `tp1_seminario`.`memberUserGroup` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;