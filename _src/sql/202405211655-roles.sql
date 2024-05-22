/* 202405211700: Script que alimenta los roles de usuario */

USE songstock_bd;

DELETE FROM authroles;

SELECT * FROM authroles;

INSERT INTO authroles (Id, Name, NormalizedName, ConcurrencyStamp)
VALUES
(1,'Admin','ADMIN','E41666966BBB412D9A8A3B36D4CF0054'),
(2,'Proveedor','PROVEEDOR','1DB43D6697DE4BA297E6E894FDD6E606'),
(3,'Cliente','CLIENTE','0FD4C16D1A024C47B2070549203E38F6');

SELECT * FROM authroles;

SELECT * FROM authusers;

SELECT * FROM authuserroles;

SELECT * FROM users;

SELECT VERSION()


DROP VIEW IF EXISTS usuarios CASCADE;
CREATE VIEW usuarios AS
SELECT
  `ur`.`RoleId` AS `RoleId`,
  `r`.`Name` AS `RoleName`,
  `u`.`Id` AS `Id`,
  CONCAT(`u`.`FirstName`, ' ', `u`.`LastName`) AS `Name`,
  `u`.`FirstName` AS `FirstName`,
  `u`.`LastName` AS `LastName`,
  `u`.`Address` AS `Address`,
  `u`.`IsActive` AS `IsActive`,
  `u`.`Email` AS `Email`,
  `u`.`PhoneNumber` AS `PhoneNumber`,
  `u`.`EmailConfirmed` AS `EmailConfirmed`,
  `u`.`PasswordHash` AS `PasswordHash`,
  `u`.`SecurityStamp` AS `SecurityStamp`,
  `u`.`ConcurrencyStamp` AS `ConcurrencyStamp`
FROM ((`authusers` `u`
  LEFT JOIN `authuserroles` `ur`
    ON ((`ur`.`UserId` = `u`.`Id`)))
  LEFT JOIN `authroles` `r`
    ON ((`ur`.`RoleId` = `r`.`Id`)));
SELECT * FROM usuarios;