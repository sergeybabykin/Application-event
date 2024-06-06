--------------------создание таблиц-------------------------------------------------------------------------------------------------------------------------------------------
--1. создание таблицы GROUP_LIST:
CREATE TABLE GROUP_LIST (
		GL_ID serial PRIMARY KEY,
		GL_NAME	CHAR(50) NOT NULL,
		GL_YEAR	TIMESTAMP NOT NULL
);

--2. создание таблицы STUDY_TYPE:
CREATE TABLE STUDY_TYPE (
		ST_ID serial PRIMARY KEY,
		ST_TYPE	CHAR(50) NOT NULL
);

--3. создание таблицы STUDENT:
CREATE TABLE STUDENT (
		S_ID serial PRIMARY KEY,
		S_SURNAME	CHAR(50) NOT NULL,
		S_FIRSTNAME	CHAR(50) NOT NULL,
		S_LASTNAME	CHAR(50) NOT NULL,
		S_GROUP_ID	INT NOT NULL,
		S_STUDY_TYPE_ID	INT NOT NULL
);

--4. создание таблицы INVOLVEMENT:
CREATE TABLE INVOLVEMENT (
		I_ID serial PRIMARY KEY,
		I_EC_ID	INT NOT NULL,
		I_STUDENT_ID	INT NOT NULL
);

--5. создание таблицы CALENDAR:
CREATE TABLE CALENDAR (
		C_ID serial PRIMARY KEY,
		C_START_DATE	TIMESTAMP NOT NULL,
		C_END_DATE	TIMESTAMP NOT NULL
);

--6. создание таблицы STUDENT_BOARD:
CREATE TABLE STUDENT_BOARD (
		SB_BOARD_ID serial PRIMARY KEY,
		SB_CALENDAR_ID	INT NOT NULL,
		SB_STUDENT_ID	INT NOT NULL,
		SB_POSITION_ID INT NOT NULL
);

--7. создание таблицы EVENT_TYPE (агрегирующая таблица с мероприятиями, их названием, типом и видом):
CREATE TABLE EVENT_TYPE (
		ET_ID serial PRIMARY KEY,
		ET_NAME	CHAR(200) NOT NULL,
		ET_LOCATION CHAR(50),
		ET_CALENDAR_ID INT NOT NULL,
		ET_EK_ID INT NOT NULL
);

--8. создание таблицы EVENT_KIND (вид мероприятия)
CREATE TABLE EVENT_KIND (
		EK_ID serial PRIMARY KEY,
		EK_NAME	CHAR(1000) NOT NULL
);

--9. создание таблицы DIVISION_LIST:
CREATE TABLE DIVISION_LIST (
		DL_ID serial PRIMARY KEY,
		DL_NAME	CHAR(50) NOT NULL,
		DL_PARENT_DIVISION_ID INT
);

--10. создание таблицы STAFF_LIST:
CREATE TABLE STAFF_LIST (
		SL_ID serial PRIMARY KEY,
		SL_SURNAME	CHAR(50) NOT NULL,
		SL_FIRSTNAME	CHAR(50) NOT NULL,
		SL_LASTNAME	CHAR(50) NOT NULL,
		SL_DIVISION_ID INT NOT NULL,
		SL_IS_WORKS	BOOLEAN NOT NULL
);



--11. создание таблицы EDUCATIONAL_ACTIVITIES_TYPE (Типы воспитательной деятельности):
CREATE TABLE EDUCATIONAL_ACTIVITIES_TYPE (
	EAT_ID serial PRIMARY KEY,
	EAT_NAME CHAR(1000) NOT NULL
);
--12. создание таблицы EVENT_CARD (Карточка мероприятия):
CREATE TABLE EVENT_CARD (
	EC_ID serial PRIMARY KEY,
	EC_NAME CHAR (1000) NOT NULL,
	EC_IS_PLANNED_WORK BOOLEAN  NOT NULL,
	EC_LOCATION CHAR (1000) NOT NULL,
	EC_IS_PHOTO_EXISTS BOOLEAN NOT NULL,
	EC_INTERNAL_LINK CHAR (1000),
	EC_EXTERNAL_LINK CHAR (1000),
	EC_EAT_ID INT NOT NULL,
	EC_EK_ID INT NOT NULL,
	EC_COMMENTS CHAR (1000),
	EС_STUDENT_ID INT NOT NULL,
	EС_STAFF_ID INT NOT NULL,
	EС_CALENDAR_ID INT NOT NULL
);

--13. создание таблицы AUTH (Авторизация):
CREATE TABLE AUTH IF NOT EXISTS (
	A_ID serial PRIMARY KEY,
	A_STAFF_ID INT NOT NULL,
	A_LOGIN CHAR (50) NOT NULL,
	A_PASSWORD CHAR (87) NOT NULL
);

-------создание индексов------------------------------------------------------------------------------------------------------------------------------------------------------------
--Создание индекса в таблице STUDENT для поля S_ID
CREATE INDEX S_ID_INDEX ON STUDENT (S_ID);

--Создание индекса в таблице STAFF_LIST для поля SL_ID
CREATE INDEX SL_ID_INDEX ON STAFF_LIST (SL_ID);

--Создание индекса в таблице CALENDAR для поля C_ID
CREATE INDEX C_ID_INDEX ON CALENDAR (C_ID);

--Создание индекса в таблице EVENT_CARD для поля EC_ID
CREATE INDEX EC_ID_INDEX ON EVENT_CARD (EC_ID);

-------наполнение таблиц------------------------------------------------------------------------------------------------------------------------------------------------
--1. наполнение GROUP_LIST :
INSERT INTO GROUP_LIST (GL_NAME, GL_YEAR) VALUES
	('ГРУППА_1', '2019-09-01 10:00:00'),
	('ГРУППА_2', '2020-09-01 10:00:00'),
	('ГРУППА_3', '2020-09-01 10:00:00'),
	('ГРУППА_4', '2020-09-01 10:00:00'),
	('ГРУППА_5', '2021-09-01 10:00:00'),
	('ГРУППА_6', '2020-09-01 10:00:00');
'kjsndcksndcsd sdcjs c                                                                    '
--2. наполнение STUDY_TYPE :
INSERT INTO STUDY_TYPE (ST_TYPE) VALUES
	('ОЧНАЯ'),
	('ЗАОЧНАЯ');

--3. наполнение STUDENT :
INSERT INTO STUDENT (S_SURNAME, S_FIRSTNAME, S_LASTNAME, S_GROUP_ID, S_STUDY_TYPE_ID) VALUES
	('ПЕТРОВ', 'ПЕТР', 'ПЕТРОВИЧ', '1', '1'),
	('ИВАНОВ', 'ИВАН', 'ИВАНОВИЧ', '2', '1'),
	('КОСТИН', 'КОНСТАНТИН', 'КОНСТАНТИНОВИЧ', '3', '1'),
	('ГОРДЕЕВ', 'ГОРДЕЙ', 'ГОРДЕЕВИЧ', '3', '1'),
	('АЛЕКСЕЕВ', 'АЛЕКСЕЙ', 'АЛЕКСЕЕВИЧ', '4', '1'),
	('АНДРЕЕВ', 'АНДРЕЙ', 'АНДРЕЕВИЧ', '2', '1'),
	('КОСТИН', 'КОНСТАНТИН', 'КОНСТАНТИНОВИЧ', '1', '1'),
	('МИХАЙЛОВ', 'МИХАИЛ', 'МИХАЙЛОВИЧ', '5', '1'),
	('АЛЕКСАНДРОВА', 'АЛЕКСАНДРА', 'АЛЕКСАНДРОВНА', '2', '1'),
	('СЕРГЕЕВ', 'СЕРГЕЙ', 'СЕРГЕЕВИЧ', '3', '1'),
	('ОЛЕГОВ', 'ОЛЕГ', 'ОЛЕГОВИЧ', '1', '1'),
	('КОСТИН', 'КОНСТАНТИН', 'КОНСТАНТИНОВИЧ', '2', '1'),
	('ЕВГЕНЬЕВ', 'ЕВГЕНИЙ', 'ЕВГЕНЬЕВИЧ', '6', '2'),
	('ВИКТОРИНА', 'ВИКТОРИЯ', 'ВИКТОРОВНА', '6', '2'),
	('ВЛАДИМИРОВ', 'ВЛАДИМИР', 'ВЛАДИМИРОВИЧ', '5', '1'),
	('АРТЕМОВ', 'АРТЕМ', 'АРТЕМОВИЧ', '6', '2'),
	('ВАЛЕРЬЕВ', 'ВАЛЕРИЙ', 'ВАЛЕРЬЕВИЧ', '1', '1'),
	('АНТОНОВ', 'АНТОН', 'АНТОНОВИЧ', '3', '1'),
	('ГРИГОРЬЕВ', 'ГРИГОРИЙ', 'ГРИГОРЬЕВИЧ', '3', '1'),
	('МАКСИМОВ', 'МАКСИМ', 'МАКСИМОВИЧ', '3', '1');

--4. наполнение таблицы INVOLVEMENT :
INSERT INTO INVOLVEMENT (I_EC_ID, I_STUDENT_ID) VALUES
	(1, 1),
	(1, 2),
	(1, 3),
	(1, 4),
	(1, 5),
	(1, 6),
	(1, 7),
	(1, 8),
	(1, 9),
	(1, 10),
	(1, 11),
	(1, 12),
	(1, 13),
	(1, 14),
	(2, 1),
	(2, 2),
	(2, 3),
	(2, 4),
	(2, 5),
	(2, 6),
	(2, 7),
	(2, 8),
	(2, 9),
	(2, 10),
	(3, 1),
	(3, 2),
	(3, 3),
	(3, 4),
	(3, 5),
	(3, 6),
	(3, 7),
	(3, 8),
	(3, 9),
	(3, 10),
	(3, 11),
	(3, 12),
	(3, 13),
	(3, 14),
	(3, 15),
	(3, 16),
	(4, 1),
	(5, 1),
	(5, 2),
	(5, 3),
	(5, 4),
	(5, 5),
	(5, 6),
	(5, 7),
	(5, 8),
	(5, 9),
	(5, 10),
	(5, 11),
	(5, 12),
	(5, 13),
	(5, 14),
	(5, 15),
	(5, 16),
	(5, 17),
	(5, 18),
	(6, 1),
	(6, 2),
	(6, 3),
	(6, 4),
	(7, 1),
	(7, 2),
	(7, 3),
	(7, 4),
	(7, 5),
	(7, 6),
	(8, 1),
	(8, 2),
	(8, 3),
	(8, 4),
	(8, 5),
	(9, 1),
	(9, 2),
	(9, 3),
	(9, 4),
	(9, 5),
	(9, 6),
	(9, 7),
	(9, 8),
	(9, 9),
	(9, 10),
	(9, 11),
	(9, 12),
	(9, 13),
	(9, 14),
	(9, 15);

--5. наполнение CALENDAR :
INSERT INTO CALENDAR (C_START_DATE, C_END_DATE) VALUES
	('2019-09-10 15:00:00', '2019-09-10 18:00:00'),
	('2019-10-10 15:00:00', '2019-10-10 18:00:00'),
	('2020-11-16 12:00:00', '2020-11-16 14:00:00'),
	('2020-12-29 16:00:00', '2020-12-29 18:00:00'),
	('2021-09-03 17:00:00', '2021-09-03 19:00:00'),
	('2021-10-04 14:00:00', '2021-10-04 16:00:00'),
	('2021-11-11 17:00:00', '2021-11-11 18:00:00'),
	('2021-04-12 16:00:00', '2021-04-12 18:00:00'),
	('2021-05-09 09:00:00', '2021-05-09 11:00:00'),
	('2022-09-04 14:00:00', '2022-09-04 16:00:00'),
	('2022-10-09 17:00:00', '2022-10-09 18:00:00');

--6. наполнение STUDENT_BOARD :
INSERT INTO STUDENT_BOARD (SB_CALENDAR_ID, SB_STUDENT_ID, SB_POSITION_ID) VALUES
	(1, 1, 1),
	(2, 2, 2),
	(3, 3, 3),
	(4, 4, 4),
	(5, 5, 5),
	(6, 6, 6),
	(7, 7, 7),
	(8, 8, 8),
	(9, 9, 9),
	(10, 10, 10),
	(11, 11, 11),
	(1, 12, 12),
	(2, 13, 13),
	(3, 14, 14),
	(4, 15, 15),
	(5, 16, 16),
	(6, 17, 17),
	(7, 18, 18),
	(8, 19, 19),
	(9, 20, 20);

--7. наполнение EVENT_TYPE :
INSERT INTO EVENT_TYPE (ET_NAME, ET_LOCATION, ET_CALENDAR_ID, ET_EK_ID) VALUES
	('День Знаний (1 сентября)', 'МУИВ', 1, 2),
	('Посвящение в Студенты', 'МУИВ', 2, 10),
	('Кубок ректора по настольному теннису', 'МУИВ', 3, 5),
	('Новый год в МУИВ', 'МУИВ', 4, 2),
	('День влюбленных', 'МУИВ', 5, 2),
	('День защитника отечества', 'МУИВ', 6, 3),
	('Международный женский день', 'МУИВ', 7, 2),
	('Конкурс МИСС и МИСТЕР МУИВ', 'МУИВ', 8, 8),
	('Фестиваль талантов', 'МУИВ', 9, 8),
	('Встреча выпускников', 'МУИВ', 10, 2),
	('Выпускной и вручение дипломов', 'МУИВ', 11, 1
);

--8. наполнение EVENT_KIND (вид мероприятия):
INSERT INTO EVENT_KIND (EK_NAME) VALUES
	('профессионально-трудовое'),
	('культурно-нравственное'),
	('гражданско-патриотическое'),
	('воспитание культуры межличностных и межнациональных отношений'),
	('спортивно-оздоровительное'),
	('экологическое'),
	('информационная культура'),
	('культурно-творческое'),
	('профилактика правонарушений, наркозависимости и проявлений девиантного поведения в студенческой среде'),
	('организация работы студенческих объединений'),
	('координация деятельности волонтерского движения'),
	('научно-образовательное');

--9. наполнение DIVISION_LIST :
INSERT INTO DIVISION_LIST (DL_NAME, DL_PARENT_DIVISION_ID) VALUES
	('Юридический факультет', NULL),
	('Факультет информационных технологий', NULL),
	('Факультет экономики и финансов', NULL),
	('Факультет управления', NULL),
	('Кафедра уголовного права и процесса', 1),
	('Кафедра публичного права', 1),
	('Кафедра гражданского права и процесса', 1),
	('Кафедра математических и естесственно-научных дис', 2),
	('Кафедра информационных систем', 2),
	('Кафедра исследования на базе сервиса Гитфлик', 2),
	('Кафедра финансового учета', 3),
	('Кафедра экономики ГХиСО', 3),
	('Кафедра финансово-экономической экспертизы', 3),
	('Кафедра менеджмента', 4),
	('Кафедра управления бизнесом и консалтинг', 4),
	('Кафедра рекламы и человеческих ресурсов', 4),
	('Кафедра психологии и педагогики', 4),
	('Кафедра социально-гуманитарных дисциплин', 4),
	('Кафедра 31ая школа г.Химки ', 4),
	('Кафедра инноваций в развитии капитала', 4);

--10. наполнение таблицы STAFF_LIST :
INSERT INTO STAFF_LIST (SL_SURNAME, SL_FIRSTNAME, SL_LASTNAME, SL_DIVISION_ID, SL_IS_WORKS) VALUES
	('СИНИЦЫН', 'АЛЕКСАНДР', 'МИХАЙЛОВИЧ', '1', true),
	('АЛЕКСАНДРОВ', 'ЕВГЕНИЙ', 'БОРИСОВИЧ', '2', true),
	('ИВАНОВА', 'МАРИЯ', 'АЛЕКСАНДРОВНА', '3', true),
	('ПЕТРОВА', 'ТАТЬЯНА', 'СЕРГЕЕВНА', '4', true),
	('СИДОРОВ', 'ОЛЕГ', 'ВЯЧЕСЛАВОВИЧ', '5', true),
	('БОРИСОВ', 'ЛЕОНИД', 'ЛЕОНИДОВИЧ', '6', true),
	('ЛЕОНИДОВ', 'СЕРГЕЙ', 'СЕРГЕЕВИЧ', '7', true);


--11. наполнение таблицы EDUCATIONAL_ACTIVITIES_TYPE :
INSERT INTO EDUCATIONAL_ACTIVITIES_TYPE (EAT_NAME) VALUES
	('индивидуальный поход, личностно-ориентированное обучение'),
	('мероприятие');


--12. наполнение таблицы EVENT_CARD :
INSERT 	INTO EVENT_CARD (
		EC_NAME,
		EC_IS_PLANNED_WORK,
		EC_LOCATION,
		EC_IS_PHOTO_EXISTS,
		EC_INTERNAL_LINK,
		EC_EXTERNAL_LINK,
		EC_EAT_ID,
		EC_EK_ID,
		EС_STUDENT_ID,
		EС_STAFF_ID,
		EС_CALENDAR_ID,
		EC_COMMENTS
		) VALUES 
	('День Знаний (1 сентября)', TRUE, 'МУИВ', TRUE, 'https://internal_point_link', 'https://external_point_link', 2, 12, 1, 1, 1, 'comment'),
	('Посвящение в Студенты', TRUE, 'МУИВ', TRUE, 'https://internal_point_link', 'https://external_point_link', 2, 12, 2, 1, 1, 'comment'),
	('Кубок ректора по настольному теннису', TRUE, 'МУИВ', TRUE, 'https://internal_point_link', 'https://external_point_link', 2, 5, 3, 2, 1, 'comment'),
	('Новый год в МУИВ', TRUE, 'МУИВ', TRUE, 'https://internal_point_link', 'https://external_point_link', 2, 2, 4, 3, 2, 'comment'),
	('День влюбленных', TRUE, 'МУИВ', TRUE, 'https://internal_point_link', 'https://external_point_link', 2, 2, 5, 2, 4, 'comment'),
	('Международный женский день', TRUE, 'МУИВ', TRUE, 'https://internal_point_link', 'https://external_point_link', 2, 2, 6, 3, 4, 'comment'),
	('Конкурс МИСС и МИСТЕР МУИВ', TRUE, 'МУИВ', TRUE, 'https://internal_point_link', 'https://external_point_link', 2, 2, 7, 4, 4, 'comment'),
	('Фестиваль талантов', TRUE, 'МУИВ', TRUE, 'https://internal_point_link', 'https://external_point_link', 2, 8, 8, 2, 5, 'comment'),
	('Встреча выпускников', TRUE, 'МУИВ', TRUE, 'https://internal_point_link', 'https://external_point_link', 2, 12, 9, 4, 6, 'comment'),
	('Выпускной и вручение дипломов', TRUE, 'МУИВ', TRUE, 'https://internal_point_link', 'https://external_point_link', 2, 12, 10, 5, 8,  'comment');

--13. наполнение таблицы AUTH:
INSERT INTO AUTH (A_STAFF_ID, A_LOGIN, A_PASSWORD) VALUES
	(1, 'admin', '$pbkdf2-sha256$29000$eQ8h5ByjFAIghPD.v7f2Hg$txKa3tZk1RA7/GUpYTSqDD9SNwm5/JiXnbgNk46Fwc0'),
	(2, 'login_2', 'hashed_password_2'),
	(3, 'login_3', 'hashed_password_3'),
	(4, 'login_4', 'hashed_password_4'),
	(5, 'login_5', 'hashed_password_5'),
	(6, 'login_6', 'hashed_password_6'),
	(7, 'login_7', 'hashed_password_7');

--------------------создание внешних ключей-------------------------------------------------------------------------------------------------------------------------------------------
--Создание внешнего ключа в INVOLVEMENT к STUDENT:
ALTER TABLE INVOLVEMENT ADD CONSTRAINT FK_I_STUDENT_ID FOREIGN KEY (I_STUDENT_ID) REFERENCES STUDENT (S_ID);

--Создание внешнего ключа в STUDENT_BOARD к STUDENT:
ALTER TABLE STUDENT_BOARD ADD CONSTRAINT FK_STUDENT_BOARD FOREIGN KEY (SB_STUDENT_ID) REFERENCES STUDENT (S_ID);

--Создание внешнего ключа в EVENT_TYPE к CALENDAR:
ALTER TABLE EVENT_TYPE ADD CONSTRAINT FK_EVENT_TYPE FOREIGN KEY (ET_CALENDAR_ID) REFERENCES CALENDAR (C_ID);

--Создание внешнего ключа в STUDENT_BOARD к CALENDAR:
ALTER TABLE STUDENT_BOARD ADD CONSTRAINT FK_SB_CALENDAR_ID FOREIGN KEY (SB_CALENDAR_ID) REFERENCES CALENDAR (C_ID);

--Создание внешнего ключа в STUDENT к STUDY_TYPE:
ALTER TABLE STUDENT ADD CONSTRAINT FK_S_STUDY_TYPE_ID FOREIGN KEY (S_STUDY_TYPE_ID) REFERENCES STUDY_TYPE (ST_ID);

--Создание внешнего ключа в STUDENT к GROUP_LIST:
ALTER TABLE STUDENT ADD CONSTRAINT FK_S_GROUP_ID FOREIGN KEY (S_GROUP_ID) REFERENCES GROUP_LIST (GL_ID);

--Создание внешнего ключа в STAFF_LIST к DIVISION_LIST:
ALTER TABLE STAFF_LIST ADD CONSTRAINT FK_SL_DIVISION_ID FOREIGN KEY (SL_DIVISION_ID) REFERENCES DIVISION_LIST (DL_ID);

--Создание внешнего ключа в EVENT_CARD к STUDENT:
ALTER TABLE EVENT_CARD ADD CONSTRAINT FK_EС_STUDENT_ID FOREIGN KEY (EС_STUDENT_ID) REFERENCES STUDENT (S_ID);

--Создание внешнего ключа в EVENT_CARD к STAFF_LIST:
ALTER TABLE EVENT_CARD ADD CONSTRAINT FK_EС_STAFF_ID FOREIGN KEY (EС_STAFF_ID) REFERENCES STAFF_LIST (SL_ID);

--Создание внешнего ключа в EVENT_CARD к EDUCATIONAL_ACTIVITIES_TYPE:
ALTER TABLE EVENT_CARD ADD CONSTRAINT FK_EAT_ID FOREIGN KEY (EC_EAT_ID) REFERENCES EDUCATIONAL_ACTIVITIES_TYPE (EAT_ID);

--Создание внешнего ключа в EVENT_CARD к EVENT_KIND:
ALTER TABLE EVENT_CARD ADD CONSTRAINT FK_EK_ID FOREIGN KEY (EC_EK_ID) REFERENCES EVENT_KIND (EK_ID);

--Создание внешнего ключа в EVENT_CARD к CALENDAR:
ALTER TABLE EVENT_CARD ADD CONSTRAINT FK_EС_CALENDAR_ID FOREIGN KEY (EС_CALENDAR_ID) REFERENCES CALENDAR (C_ID);

--Создание внешнего ключа в AUTH к STAFF_LIST:
ALTER TABLE AUTH ADD CONSTRAINT FK_A_STAFF_ID FOREIGN KEY (A_STAFF_ID) REFERENCES STAFF_LIST (SL_ID);

--Создание внешнего ключа в INVOLVEMENT к EVENT_CARD:
ALTER TABLE INVOLVEMENT ADD CONSTRAINT FK_I_EC_ID FOREIGN KEY (I_EC_ID) REFERENCES EVENT_CARD (EC_ID);