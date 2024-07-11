CREATE SCHEMA IF NOT EXISTS `tp2_seminario` DEFAULT CHARACTER SET utf8 ;
USE `tp2_seminario` ;

-- -----------------------------------------------------
-- Table `tp2_seminario`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tp2_seminario`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nickname` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `name_UNIQUE` (`nickname` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tp2_seminario`.`user_logged`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tp2_seminario`.`user_logged` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nickname` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `fk_user_logged_user1_idx` (`id` ASC),
  CONSTRAINT `fk_user_logged_user1`
    FOREIGN KEY (`id`)
    REFERENCES `tp2_seminario`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;