-- Gerado por Oracle SQL Developer Data Modeler 24.3.1.351.0831
--   em:        2026-06-20 18:47:46 BRT
--   site:      Oracle Database 11g
--   tipo:      Oracle Database 11g



-- predefined type, no DDL - MDSYS.SDO_GEOMETRY

-- predefined type, no DDL - XMLTYPE

CREATE TABLE AERONAVE 
    ( 
     Inscricao  VARCHAR (6)  NOT NULL , 
     Modelo     VARCHAR (10)  NOT NULL , 
     N_Assentos INT  NOT NULL 
    ) 
;

ALTER TABLE AERONAVE 
    ADD CONSTRAINT AERONAVE_PK PRIMARY KEY ( Inscricao ) ;

CREATE TABLE AEROPORTO 
    ( 
     Identificador VARCHAR (3)  NOT NULL , 
     Cidade        VARCHAR (30)  NOT NULL , 
     Estado        VARCHAR (2)  NOT NULL 
    ) 
;

ALTER TABLE AEROPORTO 
    ADD CONSTRAINT AEROPORTO_PK PRIMARY KEY ( Identificador ) ;

CREATE TABLE PASSAGEM 
    ( 
     Data                    DATE  NOT NULL , 
     Hora                    DATE  NOT NULL , 
     VOO_ID                  INT   NOT NULL , 
     PESSOA_CPF_COMPRA       VARCHAR (11)  NOT NULL , 
     AEROPORTO_Identificador VARCHAR (3)  NOT NULL , 
     PASSAGEIRO_CPF          VARCHAR (11) , 
     Valor                   INT  NOT NULL , 
     Assento                 VARCHAR (4)  NOT NULL 
    ) 
;

ALTER TABLE PASSAGEM 
    ADD CONSTRAINT PASSAGEM_PK PRIMARY KEY ( Data, Hora, VOO_ID, PESSOA_CPF_COMPRA, AEROPORTO_Identificador ) ;

CREATE TABLE PESSOA 
    ( 
     CPF             VARCHAR (11)  NOT NULL , 
     P_Nome          VARCHAR (15)  NOT NULL , 
     U_Nome          VARCHAR (15)  NOT NULL , 
     Email           VARCHAR (30) , 
     Data_Nascimento DATE , 
     Senha           VARCHAR (15) , 
     Telefone        VARCHAR (14) , 
     Endereco        VARCHAR (50) 
    ) 
;

ALTER TABLE PESSOA 
    ADD CONSTRAINT PESSOA_PK PRIMARY KEY ( CPF ) ;

CREATE TABLE VOO 
    ( 
     ID                   INT NOT NULL , 
     AERONAVE_Inscricao   VARCHAR (6)  NOT NULL , 
     AEROPORTO_ID_CHEGADA VARCHAR (3)  NOT NULL , 
     AEROPORTO_ID_PARTIDA VARCHAR (3)  NOT NULL 
    ) 
;

SELECT A.N_ASSENTOS
FROM AERONAVE A JOIN VOO V
ON A.INSCRICAO = V.AERONAVE_Inscricao
WHERE V.ID = 3;

SELECT A.N_ASSENTOS
FROM AERONAVE A
JOIN VOO V
ON A.INSCRICAO = V.AERONAVE_Inscricao
JOIN PASSAGEM P
ON P.VOO_ID = V.ID
WHERE P.ID = 11;

SELECT * FROM PASSAGEM;

ALTER TABLE VOO 
    ADD CONSTRAINT VOO_PK PRIMARY KEY ( ID ) ;

ALTER TABLE PASSAGEM 
    ADD CONSTRAINT PASSAGEM_AEROPORTO_FK FOREIGN KEY 
    ( 
     AEROPORTO_Identificador
    ) 
    REFERENCES AEROPORTO 
    ( 
     Identificador
    ) 
    ON DELETE CASCADE 
;

ALTER TABLE PASSAGEM 
    ADD CONSTRAINT PASSAGEM_PESSOA_FK FOREIGN KEY 
    ( 
     PESSOA_CPF_COMPRA
    ) 
    REFERENCES PESSOA 
    ( 
     CPF
    ) 
    ON DELETE CASCADE 
;

ALTER TABLE PASSAGEM 
    ADD CONSTRAINT PASSAGEM_PESSOA_FKv2 FOREIGN KEY 
    ( 
     PASSAGEIRO_CPF
    ) 
    REFERENCES PESSOA 
    ( 
     CPF
    ) 
    ON DELETE CASCADE 
;

ALTER TABLE PASSAGEM 
    ADD CONSTRAINT PASSAGEM_VOO_FK FOREIGN KEY 
    ( 
     VOO_ID
    ) 
    REFERENCES VOO 
    ( 
     ID
    ) 
    ON DELETE CASCADE 
;

ALTER TABLE VOO 
    ADD CONSTRAINT VOO_AERONAVE_FK FOREIGN KEY 
    ( 
     AERONAVE_Inscricao
    ) 
    REFERENCES AERONAVE 
    ( 
     Inscricao
    ) 
    ON DELETE CASCADE 
;

ALTER TABLE VOO 
    ADD CONSTRAINT VOO_AEROPORTO_FK FOREIGN KEY 
    ( 
     AEROPORTO_ID_CHEGADA
    ) 
    REFERENCES AEROPORTO 
    ( 
     Identificador
    ) 
    ON DELETE CASCADE 
;

ALTER TABLE VOO 
    ADD CONSTRAINT VOO_AEROPORTO_FKv2 FOREIGN KEY 
    ( 
     AEROPORTO_ID_PARTIDA
    ) 
    REFERENCES AEROPORTO 
    ( 
     Identificador
    ) 
    ON DELETE CASCADE 
;

ALTER TABLE PASSAGEM
    ADD COLUMN id SERIAL;

INSERT INTO AERONAVE VALUES('PP-WCD', 'A320', '10');
INSERT INTO AERONAVE VALUES('PP-DCW', 'A330', '30');
INSERT INTO AERONAVE VALUES('PP-AAA', 'B787', '50');
INSERT INTO AERONAVE VALUES('PP-BBB', 'B707', '10');
INSERT INTO AERONAVE VALUES('PP-CCC', 'A380', '50');

SELECT * FROM AERONAVE;

INSERT INTO AEROPORTO VALUES('CNF', 'Belo Horizonte', 'MG');
INSERT INTO AEROPORTO VALUES('GRU', 'Guarulhos', 'SP');
INSERT INTO AEROPORTO VALUES('GIG', 'Rio de Janeiro', 'RJ');
INSERT INTO AEROPORTO VALUES('FLO', 'Florianopolis', 'SC');

SELECT * FROM AEROPORTO;

INSERT INTO VOO VALUES(1, 'PP-WCD', 'GRU', 'CNF');
INSERT INTO VOO VALUES(2, 'PP-DCW', 'GIG', 'FLO');
INSERT INTO VOO VALUES(3, 'PP-AAA', 'FLO', 'CNF');
INSERT INTO VOO VALUES(4, 'PP-BBB', 'GRU', 'GIG');


INSERT INTO PASSAGEM VALUES('10/06/2026', LOCALTIME(0), 1, '00000000000', 'GRU', NULL, 250.60, NULL);
INSERT INTO PASSAGEM VALUES('10/06/2026', LOCALTIME(0), 1, '00000000000', 'GRU', NULL, 250.60, NULL);
INSERT INTO PASSAGEM VALUES('12/06/2026', '15:00:00', 2, '00000000000', 'GIG', NULL, 250.60, NULL);
INSERT INTO PASSAGEM VALUES('12/06/2026', '15:30:00', 2, '00000000000', 'GIG', NULL, 250.60, NULL);
INSERT INTO PASSAGEM VALUES('16/06/2026', '00:00:00', 3, '00000000000', 'FLO', NULL, 250.60, NULL);
INSERT INTO PASSAGEM VALUES('27/06/2026', '00:00:00', 4, '00000000000', 'CNF', NULL, 250.60, NULL);

SELECT * FROM PASSAGEM;

DELETE FROM VOO;

SELECT * 
FROM PASSAGEM
WHERE PASSAGEIRO_CPF = '11111111111';

ALTER TABLE PASSAGEM
ALTER COLUMN ASSENTO DROP NOT NULL;

-- Relatório do Resumo do Oracle SQL Developer Data Modeler: 
-- 
-- CREATE TABLE                             5
-- CREATE INDEX                             0
-- ALTER TABLE                             12
-- CREATE VIEW                              0
-- ALTER VIEW                               0
-- CREATE PACKAGE                           0
-- CREATE PACKAGE BODY                      0
-- CREATE PROCEDURE                         0
-- CREATE FUNCTION                          0
-- CREATE TRIGGER                           0
-- ALTER TRIGGER                            0
-- CREATE COLLECTION TYPE                   0
-- CREATE STRUCTURED TYPE                   0
-- CREATE STRUCTURED TYPE BODY              0
-- CREATE CLUSTER                           0
-- CREATE CONTEXT                           0
-- CREATE DATABASE                          0
-- CREATE DIMENSION                         0
-- CREATE DIRECTORY                         0
-- CREATE DISK GROUP                        0
-- CREATE ROLE                              0
-- CREATE ROLLBACK SEGMENT                  0
-- CREATE SEQUENCE                          0
-- CREATE MATERIALIZED VIEW                 0
-- CREATE MATERIALIZED VIEW LOG             0
-- CREATE SYNONYM                           0
-- CREATE TABLESPACE                        0
-- CREATE USER                              0
-- 
-- DROP TABLESPACE                          0
-- DROP DATABASE                            0
-- 
-- REDACTION POLICY                         0
-- 
-- ORDS DROP SCHEMA                         0
-- ORDS ENABLE SCHEMA                       0
-- ORDS ENABLE OBJECT                       0
-- 
-- ERRORS                                   0
-- WARNINGS                                 0
