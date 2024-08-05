use omg;

--좌석생성트리거 <있어야 seat 테이블 삽입

DELIMITER //

CREATE TRIGGER after_insert_source
AFTER INSERT ON screen
FOR EACH ROW
BEGIN
    DECLARE i INT DEFAULT 1;

    WHILE i <= 30 DO
        INSERT INTO seat (seat_screen_no,seat_cinema_no, seat_name) VALUES (NEW.screen_no, new.sc_cinema_no,i);
        SET i = i + 1;
    END WHILE;

END; //

DELIMITER ;

show triggers;

drop table user;
create table user (
    user_no int not null auto_increment primary key,
    user_age date,
    user_id varchar(50),
    user_pwd varchar(50),
    user_name varchar(30),
    user_gender char(1),
    user_phone varchar(30),
    user_auth boolean default 1,
    user_grade int default 1,
    user_point int default 500,
    user_del boolean default 1,
    user_social int default 0
);

insert into user values(1, '2000-05-26','admin', '1234', '민승호', 'M','010-0000-0000',0,0,9999999,1,0);
insert into user values(2, '2010-05-26','aaaa', '1111', '김십오세', 'F','010-1111-1111',1,1,500,1,0);
insert into user values(3, '2015-05-26','bbbb', '2222', '김십세', 'M','010-2222-2222',1,2,1000,1,0);
insert into user values(4, '1990-05-26','cccc', '3333', '김삼십오세', 'F','010-3333-3333',1,3,3000,1,0);

select * from user;


drop table movie;
create table movie(
	movie_no int auto_increment not null primary key,
	movie_startdate date,
	movie_enddate date,
	movie_tag varchar(30),
	movie_comment varchar(1000),
	movie_title varchar(100),
	movie_price int default 15000,
	movie_cnt int default 1,
	movie_director varchar(100),
    movie_actor varchar(1000),
	movie_img0 varchar(500) not null,
	movie_img1 varchar(500),
	movie_img2 varchar(500),
	movie_img3 varchar(500),
	movie_img4 varchar(500),
	movie_img5 varchar(500),
	movie_age int
);

insert into movie values (1,'2024-07-23','2024-09-01','공포','(대충 진짜 어마무시하게 무섭다는 내용)','짱짱 무서운 영화',15000,1,'김공포','주연배우','pmemGuhr450DK8GiTT44mgwWCP7.jpg','영화 상세 이미지',null,null,null,null,15);
insert into movie values (2,'2024-07-23','2024-09-01','애니메이션','(대충 진짜 어마무시하게 흥미롭다는 내용)','짱짱 꿈과 희망이 넘치는 애니메이션',15000,2,'김애니','박배우','pmemGuhr450DK8GiTT44mgwWCP7.jpg','영화 상세 이미지',null,null,null,null,12);
insert into movie values (3,'2024-07-23','2024-09-01','모험','(대충 진짜 어마무시한 사바나 평원을 누비는 내용)','짱짱 가슴이 웅장해지는 영화',15000,3,'김자연','김배우','pmemGuhr450DK8GiTT44mgwWCP7.jpg','영화 상세 이미지',null,null,null,null,1);
insert into movie values (4,'2024-07-23','2024-09-01','범죄','(대충 여썰고 저썰고 하는 내용)','짱짱 잔인해서 눈도 못뜨는 영화',15000,4,'김신체분해','전문배우','pmemGuhr450DK8GiTT44mgwWCP7.jpg','영화 상세 이미지',null,null,null,null,19);
INSERT INTO movie (movie_startdate,movie_enddate,movie_tag,movie_comment,movie_title,movie_price,movie_cnt,movie_director,movie_actor,movie_img0,movie_age)
VALUES
  ("2024-07-23","2024-09-01","가족","이 영화는 애니메이션영화예요","인사이드 아웃 2",15000,16,"김수현","김수현,박지연,이준호,원빈","pmemGuhr450DK8GiTT44mgwWCP7.jpg","19"),
  ("2024-08-21","2024-09-01","공포","이 영화는 로맨스영화예요","상견니",15000,60,"김수현","김수현,이준호,원빈","pmemGuhr450DK8GiTT44mgwWCP7.jpg","12"),
  ("2024-07-29","2024-09-01","액션","이 영화는 애니메이션영화예요","슈퍼배드 4",15000,110,"이창동","김수현,박주빈,장동건","pmemGuhr450DK8GiTT44mgwWCP7.jpg","19"),
  ("2024-08-18","2024-09-01","미스터리","이 영화는 애니메이션영화예요","시민덕희",15000,89,"봉준호","김수현,장동건,봉준호","pmemGuhr450DK8GiTT44mgwWCP7.jpg","12"),
  ("2024-08-06","2024-09-01","액션","이영화는 재밌어요","범죄도시 3",15000,57,"봉준호","장동건,송혜교,유인석","pmemGuhr450DK8GiTT44mgwWCP7.jpg","19"),
  ("2024-08-07","2024-09-01","로맨스","이 영화는 로맨스영화예요","파일럿",15000,132,"이창동","조정석,이효리,카리나","pmemGuhr450DK8GiTT44mgwWCP7.jpg","19"),
  ("2024-08-27","2024-09-01","액션","이 영화는 로맨스영화예요","핸섬가이즈",15000,90,"박찬욱","아이린,조이,웬디","pmemGuhr450DK8GiTT44mgwWCP7.jpg","15"),
  ("2024-08-07","2024-09-01","액션","이영화는 가족영화예요","패스트 라이브즈",15000,62,"봉준호","윈터,김채원,장원영","pmemGuhr450DK8GiTT44mgwWCP7.jpg","15"),
  ("2024-07-22","2024-09-01","로맨스","이영화는 재밌어요","데드맨",15000,90,"이창동","안유진,강남,레이","pmemGuhr450DK8GiTT44mgwWCP7.jpg","19"),
  ("2024-07-19","2024-09-01","코미디","이 영화는 애니메이션영화예요","듄: 파트2",15000,83,"김수현","조정석,이효리,카리나","pmemGuhr450DK8GiTT44mgwWCP7.jpg","12"),
  ("2024-08-24","2024-09-01","로맨스","이 영화는 로맨스영화예요","데드풀과 울버린",15000,52,"이창동","조정석,이효리,카리나","pmemGuhr450DK8GiTT44mgwWCP7.jpg","12"),
  ("2024-07-30","2024-09-01","범죄","이영화는 가족영화예요","도둑들",15000,146,"이창동","김수현,이준호,원빈","pmemGuhr450DK8GiTT44mgwWCP7.jpg","19"),
  ("2024-07-26","2024-09-01","코미디","이영화는 재밌어요","웡카",15000,177,"민승호","김수현,이준호,원빈","pmemGuhr450DK8GiTT44mgwWCP7.jpg","19"),
  ("2024-08-08","2024-09-01","가족","이영화는 재밌어요","패스트 라이브즈",15000,71,"이창동","아이유,이종석,강동원","pmemGuhr450DK8GiTT44mgwWCP7.jpg","19"),
  ("2024-08-26","2024-09-01","액션","이영화는 가족영화예요","웡카",15000,182,"이창동","아이유,이종석,강동원","pmemGuhr450DK8GiTT44mgwWCP7.jpg","19"),
  ("2024-08-16","2024-09-01","액션","이 영화는 애니메이션영화예요","파묘",15000,28,"봉준호","아이유,이종석,강동원","pmemGuhr450DK8GiTT44mgwWCP7.jpg","15"),
  ("2024-08-17","2024-09-01","가족","이영화는 가족영화예요","도둑들",15000,88,"김수현","성수빈,이원석,신동관","pmemGuhr450DK8GiTT44mgwWCP7.jpg","12"),
  ("2024-08-01","2024-09-01","가족","이 영화는 로맨스영화예요","원더랜드",15000,31,"봉준호","전지현,김수현,홍길동","pmemGuhr450DK8GiTT44mgwWCP7.jpg","15"),
  ("2024-08-28","2024-09-01","범죄","이영화는 가족영화예요","패스트 라이브즈",15000,24,"김수현","전지현,김수현,홍길동","pmemGuhr450DK8GiTT44mgwWCP7.jpg","12"),
  ("2024-07-30","2024-09-01","공포","이 영화는 로맨스영화예요","도그데이즈",15000,182,"이창동","전지현,김수현,홍길동","pmemGuhr450DK8GiTT44mgwWCP7.jpg","19");

select * from movie;


drop table  review;
create table review(
  review_no int auto_increment not null primary key,
  review_date date default (current_date),
  review_rate int default 5,
  review_like boolean default 0,
  review_report int default 0,
  review_comment varchar(100),
  re_movie_no int not null,
  re_user_no int not null
);

insert into review (review_comment, re_movie_no,re_user_no) values ('진짜 꿈과 희망이 넘치는 영화인듯ㅋㅋ',2,2);
insert into review (review_comment, re_movie_no,re_user_no) values ('사바나 평원 너무 좋은wwww',3,3);
insert into review (review_comment, re_movie_no,re_user_no) values ('이 영화를 보고 외과의사의 꿈을 가지게 되었습니다 수술이란거 참 쉬워보이더라고요',4,4);
insert into review (review_comment, re_movie_no,re_user_no) values ('일본이 놀라고!!! 중국이 경악한!!! 한국의 공포영화!!!',1,4);

select * from review;

drop table qna;
create table qna(
  qna_no int auto_increment not null primary key,
  qna_title varchar(50),
  qna_user_no int not null,
  qna_comment varchar(1000),
  qna_date datetime default (current_date),
  qna_answer varchar(1000),
  qna_type int,
  qna_answer_date date default (current_date)
);

insert into qna (qna_title,qna_comment,qna_user_no,qna_answer,qna_type) values ('예매가 안돼요 웅앵','예매가 안돼서 영화를 못봐서 너무 슬퍼서 울음이 나와요',3,'금방 해드리겠읍니다~^^',0);
insert into qna (qna_title,qna_comment,qna_user_no,qna_type) values ('이벤트 관련 문의','이벤트 페이지가 너무 사짜같아요',2,1);
insert into qna (qna_title,qna_comment,qna_user_no,qna_type) values ('멤버십 관련 문의','않이;; 멤버십 등급업 너무 빡셈!!!',4,2);

select * from qna;

/*

쓸지 안쓸지 모름

drop table store;
create table store(
  store_no int auto_increment not null primary key,
  store_type int,
  store_price int,
  store_comment varchar(1000),
  store_cnt int default 1,
  store_img1 varchar(100) not null,
  store_img2 varchar(100) not null,
  store_title varchar(50),
  store_user_no int	
);

select * from store;

drop table user_store;
create table user_store(
us_store_no int,
us_user_no int
);

select * from user_store;

*/

drop table wish;
create table wish(
  wish_no int auto_increment not null primary key,
  wish_movie_no int not null,
  wish_user_no int not null
);

insert into wish (wish_movie_no,wish_user_no) values (2,2);
insert into wish (wish_movie_no,wish_user_no) values (3,2);
insert into wish (wish_movie_no,wish_user_no) values (3,3);
insert into wish (wish_movie_no,wish_user_no) values (1,4);
insert into wish (wish_movie_no,wish_user_no) values (4,4);
insert into wish (wish_movie_no,wish_user_no) values (3,4);

select * from wish;

drop table event;
create table event(
  event_no int auto_increment not null primary key,
  event_img1 varchar(100) not null,
  event_img2 varchar(100) not null,
  event_startdate date,
  event_enddate date,
  event_cnt int default 1,
  event_title varchar(100)
);

insert into event (event_title,event_img1,event_img2,event_startdate,event_enddate) values ('이벤트1','이벤트3.jpg','이미지2','2024-07-01','2024-07-31');
insert into event (event_title,event_img1,event_img2,event_startdate,event_enddate) values ('이벤트2','이벤트3.jpg','이미지2','2024-08-01','2024-08-31');
insert into event (event_title,event_img1,event_img2,event_startdate,event_enddate) values ('이벤트3','이벤트3.jpg','이미지3','2024-09-01','2024-09-30');
insert into event (event_title,event_img1,event_img2,event_startdate,event_enddate) values ('이벤트3','이벤트3.jpg','이미지3','2024-09-01','2024-09-30');

select * from event;

drop table coupon;
create table coupon(
  coupon_no int auto_increment not null primary key,
  coupon_title varchar(100),
  coupon_sale int,
  coupon_img1 varchar(100),
  coupon_img2 varchar(100),
  coupon_startdate date,
  coupon_enddate date,
  coupon_comment varchar(1000)
);

insert into coupon (coupon_title,coupon_comment,coupon_sale,coupon_startdate,coupon_enddate) values ('5월달 생일 쿠폰','생잉축항행',2000,'2024-05-01','2024-05-31');
insert into coupon (coupon_title,coupon_comment,coupon_sale,coupon_startdate,coupon_enddate) values ('6월달 생일 쿠폰','생잉축항행',2000,'2024-06-01','2024-06-30');
insert into coupon (coupon_title,coupon_comment,coupon_sale,coupon_startdate,coupon_enddate) values ('7월달 생일 쿠폰','생잉축항행',2000,'2024-07-01','2024-07-31');

select * from coupon;

drop table seat;
create table seat(
    seat_no int auto_increment not null primary key, 
    seat_screen_no int,
    seat_cinema_no int,
    seat_name varchar(10),
    seat_reserve boolean default 1
);

select * from seat;

insert into seat (seat_cinema_no,seat_name) values(1, 'a1');
insert into seat (seat_cinema_no,seat_name) values(1, 'a2');
insert into seat (seat_cinema_no,seat_name) values(1, 'a3');
insert into seat (seat_cinema_no,seat_name) values(1, 'a4');
insert into seat (seat_cinema_no,seat_name) values(1, 'a5');
insert into seat (seat_cinema_no,seat_name) values(1, 'a6');
insert into seat (seat_cinema_no,seat_name) values(1, 'a7');
insert into seat (seat_cinema_no,seat_name) values(1, 'a8');
insert into seat (seat_cinema_no,seat_name) values(1, 'a9');
insert into seat (seat_cinema_no,seat_name) values(1, 'a10');
insert into seat (seat_cinema_no,seat_name) values(1, 'b1');
insert into seat (seat_cinema_no,seat_name) values(1, 'b2');
insert into seat (seat_cinema_no,seat_name) values(1, 'b3');
insert into seat (seat_cinema_no,seat_name) values(1, 'b4');
insert into seat (seat_cinema_no,seat_name) values(1, 'b5');
insert into seat (seat_cinema_no,seat_name) values(1, 'b6');
insert into seat (seat_cinema_no,seat_name) values(1, 'b7');
insert into seat (seat_cinema_no,seat_name) values(1, 'b8');
insert into seat (seat_cinema_no,seat_name) values(1, 'b9');
insert into seat (seat_cinema_no,seat_name) values(1, 'b10');

insert into seat (seat_cinema_no,seat_name) values(2, 'a1');
insert into seat (seat_cinema_no,seat_name) values(2, 'a2');
insert into seat (seat_cinema_no,seat_name) values(2, 'a3');
insert into seat (seat_cinema_no,seat_name) values(2, 'a4');
insert into seat (seat_cinema_no,seat_name) values(2, 'a5');
insert into seat (seat_cinema_no,seat_name) values(2, 'a6');
insert into seat (seat_cinema_no,seat_name) values(2, 'a7');
insert into seat (seat_cinema_no,seat_name) values(2, 'a8');
insert into seat (seat_cinema_no,seat_name) values(2, 'a9');
insert into seat (seat_cinema_no,seat_name) values(2, 'a10');
insert into seat (seat_cinema_no,seat_name) values(2, 'b1');
insert into seat (seat_cinema_no,seat_name) values(2, 'b2');
insert into seat (seat_cinema_no,seat_name) values(2, 'b3');
insert into seat (seat_cinema_no,seat_name) values(2, 'b4');
insert into seat (seat_cinema_no,seat_name) values(2, 'b5');
insert into seat (seat_cinema_no,seat_name) values(2, 'b6');
insert into seat (seat_cinema_no,seat_name) values(2, 'b7');
insert into seat (seat_cinema_no,seat_name) values(2, 'b8');
insert into seat (seat_cinema_no,seat_name) values(2, 'b9');
insert into seat (seat_cinema_no,seat_name) values(2, 'b10');


select count(*) from seat2 where movie_time='13:00:00' and seat_reserve = 1;


drop table ticket;
create table ticket(
  ticket_no int auto_increment not null primary key, 
  ticket_total_price int,
  ticket_date datetime,
  ticket_cnt int,
  ticket_user_no int not null,
  ticket_movie_no int not null,
  ticket_seat varchar(100),
  ti_se_cinema_no int,
  ticket_type boolean default 1
);


insert into ticket (ticket_user_no,ticket_movie_no,ticket_seat,ticket_type,ticket_cnt,ticket_total_price,ticket_date) values (1,1,1,0,1,15000,'2024-07-31 09:00');
insert into ticket (ticket_user_no,ticket_movie_no,ticket_seat,ticket_type,ticket_cnt,ticket_total_price,ticket_date) values (2,1,"a1,a2",1,2,30000,'2024-07-31 09:00');
insert into ticket (ticket_user_no,ticket_movie_no,ticket_seat,ticket_type,ticket_cnt,ticket_total_price,ticket_date) values (3,2,"a1,a2,a3,a4",0,4,60000,'2024-07-31 09:00');
insert into ticket (ticket_user_no,ticket_movie_no,ticket_seat,ticket_type,ticket_cnt,ticket_total_price,ticket_date) values (4,2,"b1,b2",0,2,30000,'2024-07-31 09:00');
insert into ticket (ticket_user_no,ticket_movie_no,ticket_seat,ticket_type,ticket_cnt,ticket_total_price,ticket_date) values (1,1,"b3,b4,b5",0,3,45000,'2024-08-01 09:00');
insert into ticket (ticket_user_no,ticket_movie_no,ticket_seat,ticket_type,ticket_cnt,ticket_total_price,ticket_date) values (2,1,'a2',0,1,15000,'2024-08-01 09:00');
insert into ticket (ticket_user_no,ticket_movie_no,ticket_seat,ticket_type,ticket_cnt,ticket_total_price,ticket_date) values (3,2,"a3,a4,a5,a6",0,4,60000,'2024-08-01 09:00');
insert into ticket (ticket_user_no,ticket_movie_no,ticket_seat,ticket_type,ticket_cnt,ticket_total_price,ticket_date) values (4,2,"a7,a8,a9",0,3,45000,'2024-08-01 09:00');
insert into ticket (ticket_user_no,ticket_movie_no,ticket_seat,ticket_type,ticket_cnt,ticket_total_price,ticket_date) values (1,1,"b1,b2,b3",0,3,45000,'2024-08-01 09:00');
insert into ticket (ticket_user_no,ticket_movie_no,ticket_seat,ticket_type,ticket_cnt,ticket_total_price,ticket_date) values (2,1,"b4,b5",1,2,30000,'2024-08-02 12:00');
insert into ticket (ticket_user_no,ticket_movie_no,ticket_seat,ticket_type,ticket_cnt,ticket_total_price,ticket_date) values (3,1,'a1',1,1,15000,'2024-08-02 12:00');
insert into ticket (ticket_user_no,ticket_movie_no,ticket_seat,ticket_type,ticket_cnt,ticket_total_price,ticket_date) values (4,1,"a2,a3",1,2,30000,'2024-08-02 12:00');
insert into ticket (ticket_user_no,ticket_movie_no,ticket_seat,ticket_type,ticket_cnt,ticket_total_price,ticket_date) values (1,1,"a4,a5,a6,a7",1,4,60000,'2024-08-02 12:00');
insert into ticket (ticket_user_no,ticket_movie_no,ticket_seat,ticket_type,ticket_cnt,ticket_total_price,ticket_date) values (1,1,"b1,b2,b3",1,3,45000,'2024-08-03 09:00');
insert into ticket (ticket_user_no,ticket_movie_no,ticket_seat,ticket_type,ticket_cnt,ticket_total_price,ticket_date) values (2,1,"b4,b5",1,2,30000,'2024-08-03 09:00');
insert into ticket (ticket_user_no,ticket_movie_no,ticket_seat,ticket_type,ticket_cnt,ticket_total_price,ticket_date) values (3,1,"a1,a2,a3",1,3,45000,'2024-08-03 09:00');
insert into ticket (ticket_user_no,ticket_movie_no,ticket_seat,ticket_type,ticket_cnt,ticket_total_price,ticket_date) values (4,1,"a4,a5,a6,a7",1,3,45000,'2024-08-03 09:00');




select * from ticket;
select * from seat;

drop table notice;
create table notice(
  notice_no int auto_increment not null primary key,
  notice_title varchar(100),
  notice_date date default (current_date),
  notice_coment varchar(1000),
  notice_cnt int default 1
);

insert into notice (notice_title,notice_coment) values ('공지1번','1번 공지의 내용');
insert into notice (notice_title,notice_coment) values ('공지2번','2번 공지의 내용');
insert into notice (notice_title,notice_coment) values ('공지3번','3번 공지의 내용');

select * from notice;

drop table faq;
create table faq(
	faq_no int not null auto_increment primary key,
    faq_q varchar(1000),
    faq_a varchar(1000)
);

insert into faq(faq_q,faq_a)values('질문1','답1');
insert into faq(faq_q,faq_a)values('질문2','답2');
insert into faq(faq_q)values('질문3');

select * from faq;

drop table cinema;
create table cinema(
	cinema_no int auto_increment not null primary key,
    cinema_name varchar(10)
);

insert into cinema (cinema_name) values ('1관');
insert into cinema (cinema_name) values ('2관');
insert into cinema (cinema_name) values ('3관');
insert into cinema (cinema_name) values ('4관');
insert into cinema (cinema_name) values ('5관');
insert into cinema (cinema_name) values ('6관');
insert into cinema (cinema_name) values ('7관');

select * from cinema;

drop table screen;
create table screen(
screen_no int auto_increment not null primary key,
screen_starttime time,
screen_endtime time,
screen_date date,
sc_movie_no int,
sc_cinema_no int
);

insert into screen (screen_starttime,screen_endtime,sc_movie_no,sc_cinema_no,screen_date) values ('09:00','11:00',1,1,'2024-07-31');
insert into screen (screen_starttime,screen_endtime,sc_movie_no,sc_cinema_no,screen_date) values ('09:00','11:00',2,2,'2024-07-31');
insert into screen (screen_starttime,screen_endtime,sc_movie_no,sc_cinema_no,screen_date) values ('12:00','14:00',1,1,'2024-07-31');
insert into screen (screen_starttime,screen_endtime,sc_movie_no,sc_cinema_no,screen_date) values ('12:00','14:00',2,2,'2024-07-31');
insert into screen (screen_starttime,screen_endtime,sc_movie_no,sc_cinema_no,screen_date) values ('15:00','17:00',1,1,'2024-07-31');
insert into screen (screen_starttime,screen_endtime,sc_movie_no,sc_cinema_no,screen_date) values ('15:00','17:00',2,2,'2024-07-31');
insert into screen (screen_starttime,screen_endtime,sc_movie_no,sc_cinema_no,screen_date) values ('09:00','11:00',1,1,'2024-08-01');
insert into screen (screen_starttime,screen_endtime,sc_movie_no,sc_cinema_no,screen_date) values ('09:00','11:00',2,2,'2024-08-01');
insert into screen (screen_starttime,screen_endtime,sc_movie_no,sc_cinema_no,screen_date) values ('12:00','14:00',1,1,'2024-08-01');
insert into screen (screen_starttime,screen_endtime,sc_movie_no,sc_cinema_no,screen_date) values ('12:00','14:00',2,2,'2024-08-01');
insert into screen (screen_starttime,screen_endtime,sc_movie_no,sc_cinema_no,screen_date) values ('15:00','17:00',1,1,'2024-08-01');
insert into screen (screen_starttime,screen_endtime,sc_movie_no,sc_cinema_no,screen_date) values ('15:00','17:00',2,2,'2024-08-01');
insert into screen (screen_starttime,screen_endtime,sc_movie_no,sc_cinema_no,screen_date) values ('09:00','11:00',1,1,'2024-08-02');
insert into screen (screen_starttime,screen_endtime,sc_movie_no,sc_cinema_no,screen_date) values ('12:00','14:00',1,1,'2024-08-02');
insert into screen (screen_starttime,screen_endtime,sc_movie_no,sc_cinema_no,screen_date) values ('09:00','11:00',2,2,'2024-08-02');
insert into screen (screen_starttime,screen_endtime,sc_movie_no,sc_cinema_no,screen_date) values ('09:00','11:00',1,1,'2024-08-03');
insert into screen (screen_starttime,screen_endtime,sc_movie_no,sc_cinema_no,screen_date) values ('09:00','11:00',1,1,'2024-08-04');
insert into screen (screen_starttime,screen_endtime,sc_movie_no,sc_cinema_no,screen_date) values ('09:00','11:00',1,1,'2024-08-05');
insert into screen (screen_starttime,screen_endtime,sc_movie_no,sc_cinema_no,screen_date) values ('09:00','11:00',1,1,'2024-08-06');
insert into screen (screen_starttime,screen_endtime,sc_movie_no,sc_cinema_no,screen_date) values ('09:00','11:00',1,1,'2024-08-07');
insert into screen (screen_starttime,screen_endtime,sc_movie_no,sc_cinema_no,screen_date) values ('09:00','11:00',1,1,'2024-08-08');
insert into screen (screen_starttime,screen_endtime,sc_movie_no,sc_cinema_no,screen_date) values ('09:00','11:00',1,1,'2024-08-09');
insert into screen (screen_starttime,screen_endtime,sc_movie_no,sc_cinema_no,screen_date) values ('09:00','11:00',1,1,'2024-08-10');
insert into screen (screen_starttime,screen_endtime,sc_movie_no,sc_cinema_no,screen_date) values ('09:00','11:00',1,1,'2024-08-11');
insert into screen (screen_starttime,screen_endtime,sc_movie_no,sc_cinema_no,screen_date) values ('09:00','11:00',1,1,'2024-08-12');
insert into screen (screen_starttime,screen_endtime,sc_movie_no,sc_cinema_no,screen_date) values ('09:00','11:00',1,1,'2024-08-13');
insert into screen (screen_starttime,screen_endtime,sc_movie_no,sc_cinema_no,screen_date) values ('09:00','11:00',1,1,'2024-08-14');
insert into screen (screen_starttime,screen_endtime,sc_movie_no,sc_cinema_no,screen_date) values ('09:00','11:00',1,1,'2024-08-15');
insert into screen (screen_starttime,screen_endtime,sc_movie_no,sc_cinema_no,screen_date) values ('09:00','11:00',1,1,'2024-08-16');


select * from screen;
select * from seat;

select ticket_no,ticket_date, ticket_movie_no, ti_se_cinema_no from ticket;

drop table user_coupon;
create table user_coupon(
	uc_user_no int,
	uc_coupon_no int
);

insert into user_coupon values (2,1);
insert into user_coupon values (2,2);
insert into user_coupon values (2,3);
insert into user_coupon values (3,1);
insert into user_coupon values (4,1);
insert into user_coupon values (2,2);


select * from user_coupon;

drop table reservation;		
create table reservation(		
res_no int not null auto_increment primary key,		
movie_no int,		
cinema_no int,		
date date,		
time time,		
user_no int		
);		

select * from reservation;

commit;

--상영관 추가될시 좌석 a1~c10 생성 트리거
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

--상영관 삭제시 seat 삭제 트리거

DELIMITER //


CREATE TRIGGER after_delete_screen
AFTER delete ON screen
FOR EACH ROW
BEGIN
        delete  from seat where old.screen_no = seat_screen_no;
END; //

DELIMITER ;

--예매 취소시 좌석 이용가능 트리거
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

use omg;
show triggers;


SHOW VARIABLES LIKE 'event%'; 

SHOW PROCESSLIST;

SELECT * FROM information_schema.events;

SHOW EVENTS FROM omg;

DROP EVENT delete_old_screens;
SET GLOBAL event_scheduler = ON;

-- 스크린 삭제 이벤트
CREATE EVENT delete_old_screens
ON SCHEDULE EVERY 30 MINUTE
STARTS '2024-08-01 00:00:00'
DO
DELETE FROM screen WHERE screen_date < CURDATE();


select * from screen;
select * from seat;

