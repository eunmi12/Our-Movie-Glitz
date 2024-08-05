--스크린 생성시 좌석 a1~c10 생성 트리거
DELIMITER //

CREATE TRIGGER after_insert_screen
AFTER INSERT ON screen
FOR EACH ROW
BEGIN
    DECLARE i INT DEFAULT 1;
    DECLARE row_letter CHAR(1);
    DECLARE seat_no INT;

    WHILE i <= 30 DO
        IF i <= 10 THEN
            SET row_letter = 'A';
            SET seat_no = i;
        ELSEIF i <= 20 THEN
            SET row_letter = 'B';
            SET seat_no = i - 10;
        ELSE
            SET row_letter = 'C';
            SET seat_no = i - 20;
        END IF;

        INSERT INTO seat (seat_screen_no, seat_cinema_no, seat_name) 
        VALUES (NEW.screen_no, NEW.sc_cinema_no, CONCAT(row_letter, seat_no));

        SET i = i + 1;
    END WHILE;

END; //

DELIMITER ;

--스크린 삭제시 생성된 좌석 삭제 트리거
DELIMITER //


CREATE TRIGGER after_delete_screen
AFTER delete ON screen
FOR EACH ROW
BEGIN
        delete  from seat where old.screen_no = seat_screen_no;
END; //

DELIMITER ;

--예매 취소시 좌석 reserv 변경 트리거
delimiter //

CREATE TRIGGER after_ticket_delete
AFTER DELETE ON ticket
FOR EACH ROW
BEGIN
    DECLARE s_seat_name VARCHAR(10);
    DECLARE seat_position INT DEFAULT 1;
    DECLARE comma_position INT DEFAULT 0;

    WHILE seat_position <= CHAR_LENGTH(OLD.ticket_seat) DO
        SET comma_position = LOCATE(',', OLD.ticket_seat, seat_position);
        IF comma_position = 0 THEN
            SET comma_position = CHAR_LENGTH(OLD.ticket_seat) + 1;
        END IF;

        SET s_seat_name = SUBSTRING(OLD.ticket_seat, seat_position, comma_position - seat_position);

        UPDATE seat
        SET seat_reserve = 1
        WHERE seat_name = s_seat_name AND seat_cinema_no = OLD.ti_se_cinema_no;

        SET seat_position = comma_position + 1;
    END WHILE;
END;
//

delimiter ;

show triggers;

-------------------------------------------------------------이벤트
--이벤트 on 용
SET GLOBAL event_scheduler = ON;
SHOW VARIABLES LIKE 'event%';

--잘 돌아가나 확인용
SHOW PROCESSLIST;

SELECT * FROM information_schema.events;

-- 스크린 삭제 이벤트
DROP EVENT delete_old_screens;

CREATE EVENT delete_old_screens
ON SCHEDULE EVERY 30 MINUTE
STARTS '2024-08-01 00:00:00'
DO
DELETE FROM screen WHERE screen_date < CURDATE();


select * from screen;
select * from seat;
