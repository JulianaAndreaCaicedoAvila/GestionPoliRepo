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

