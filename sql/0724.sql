use omg;

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
	user_grade varchar(30),
	user_point int,
    user_del boolean default 1
);

insert into user values(1, '2000-05-26','admin', '1234', '민승호', 'M','010-0000-0000',0,'어드민',9999999,1);
insert into user values(2, '2010-05-26','aaaa', '1111', '김십오세', 'F','010-1111-1111',1,'브론즈',500,1);
insert into user values(3, '2015-05-26','bbbb', '2222', '김십세', 'M','010-2222-2222',1,'실버',1000,1);
insert into user values(4, '1990-05-26','cccc', '3333', '김삼십오세', 'F','010-3333-3333',1,'골드',3000,1);

select * from user;


drop table movie;
create table movie(
	movie_no int auto_increment not null primary key,
	movie_startdate datetime,
	movie_enddate datetime,
	movie_tag varchar(30),
	movie_comment varchar(1000),
	movie_title varchar(100),
	movie_price int,
	movie_cnt int default 1,
	movie_director varchar(30),
	movie_room_no int,
	movie_img0 varchar(500) not null,
	movie_img1 varchar(500) not null,
	movie_img2 varchar(500),
	movie_img3 varchar(500),
	movie_img4 varchar(500),
	movie_img5 varchar(500),
	movie_age int 
);

insert into movie values (1,'2024-07-01 09:00','2024-07-01 12:00','공포','(대충 진짜 어마무시하게 무섭다는 내용)','짱짱 무서운 영화',15000,1,'김공포',1,'영화 포스터','영화 상세 이미지',null,null,null,null,15);
insert into movie values (2,'2024-07-01 13:00','2024-07-01 15:00','애니메이션','(대충 진짜 어마무시하게 흥미롭다는 내용)','짱짱 꿈과 희망이 넘치는 애니메이션',15000,2,'김애니',1,'영화 포스터','영화 상세 이미지',null,null,null,null,12);
insert into movie values (3,'2024-07-01 16:00','2024-07-01 18:00','모험','(대충 진짜 어마무시한 사바나 평원을 누비는 내용)','짱짱 가슴이 웅장해지는 영화',15000,3,'김자연',1,'영화 포스터','영화 상세 이미지',null,null,null,null,1);
insert into movie values (4,'2024-07-01 20:00','2024-07-01 22:00','범죄','(대충 여썰고 저썰고 하는 내용)','짱짱 잔인해서 눈도 못뜨는 영화',15000,4,'김신체분해',1,'영화 포스터','영화 상세 이미지',null,null,null,null,19);

select * from movie;


drop table  review;
create table review(
  review_no int auto_increment not null primary key,
  review_date date default (current_date),
  review_rate int default 5,
  review_like boolean default 0,
  review_report int default 0,
  review_comment varchar(1000),
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
  qnd_date datetime default (current_date),
  qna_answer varchar(1000),
  qna_type int,
  qna_status boolean default 0
);

insert into qna (qna_title,qna_comment,qna_user_no,qna_answer,qna_type,qna_status) values ('예매가 안돼요 웅앵','예매가 안돼서 영화를 못봐서 너무 슬퍼서 울음이 나와요',3,'금방 해드리겠읍니다~^^*',0,1);
insert into qna (qna_title,qna_comment,qna_user_no,qna_type) values ('이벤트 관련 문의','이벤트 페이지가 너무 사짜같아요',2,1);
insert into qna (qna_title,qna_comment,qna_user_no,qna_type) values ('멤버십 관련 문의','않이;; 멤버십 등급업 너무 빡셈!!!',4,2);

select * from qna;

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

insert into event (event_title,event_img1,event_img2,event_startdate,event_enddate) values ('이벤트1','이미지1','이미지2','2024-07-01','2024-07-31');
insert into event (event_title,event_img1,event_img2,event_startdate,event_enddate) values ('이벤트2','이미지2','이미지2','2024-08-01','2024-08-31');
insert into event (event_title,event_img1,event_img2,event_startdate,event_enddate) values ('이벤트3','이미지3','이미지3','2024-09-01','2024-09-30');

select * from event;

drop table coupon;
create table coupon(
  coupon_no int auto_increment not null primary key,
  coupon_user_no int not null,
  coupon_title varchar(100),
  coupon_sale int,
  coupon_startdate date,
  coupon_enddate date,
  coupon_comment varchar(1000)
);

insert into coupon (coupon_user_no,coupon_title,coupon_comment,coupon_sale,coupon_startdate,coupon_enddate) values (2,'5월달 생일 쿠폰','생잉축항행',2000,'2024-05-01','2024-05-31');
insert into coupon (coupon_user_no,coupon_title,coupon_comment,coupon_sale,coupon_startdate,coupon_enddate) values (3,'5월달 생일 쿠폰','생잉축항행',2000,'2024-05-01','2024-05-31');
insert into coupon (coupon_user_no,coupon_title,coupon_comment,coupon_sale,coupon_startdate,coupon_enddate) values (4,'5월달 생일 쿠폰','생잉축항행',2000,'2024-05-01','2024-05-31');

select * from coupon;

drop table seat;
create table seat(
	seat_no int auto_increment not null primary key, 
    movie_time time,
    seat_name varchar(10),
    seat_reserve int default 1
);

select * from seat;

insert into seat (movie_time,seat_name) values('09:00' , 'a1');
insert into seat (movie_time,seat_name) values('09:00' , 'a2');
insert into seat (movie_time,seat_name) values('09:00' , 'a3');
insert into seat (movie_time,seat_name) values('09:00' , 'a4');
insert into seat (movie_time,seat_name) values('09:00' , 'a5');
insert into seat (movie_time,seat_name) values('09:00' , 'a6');
insert into seat (movie_time,seat_name) values('09:00' , 'a7');
insert into seat (movie_time,seat_name) values('09:00' , 'a8');
insert into seat (movie_time,seat_name) values('09:00' , 'a9');
insert into seat (movie_time,seat_name) values('09:00' , 'a10');
insert into seat (movie_time,seat_name) values('09:00' , 'b1');
insert into seat (movie_time,seat_name) values('09:00' , 'b2');
insert into seat (movie_time,seat_name) values('09:00' , 'b3');
insert into seat (movie_time,seat_name) values('09:00' , 'b4');
insert into seat (movie_time,seat_name) values('09:00' , 'b5');
insert into seat (movie_time,seat_name) values('09:00' , 'b6');
insert into seat (movie_time,seat_name) values('09:00' , 'b7');
insert into seat (movie_time,seat_name) values('09:00' , 'b8');
insert into seat (movie_time,seat_name) values('09:00' , 'b9');
insert into seat (movie_time,seat_name) values('09:00' , 'b10');
insert into seat (movie_time,seat_name) values('13:00' , 'a1');
insert into seat (movie_time,seat_name) values('13:00' , 'a2');
insert into seat (movie_time,seat_name) values('13:00' , 'a3');
insert into seat (movie_time,seat_name) values('13:00' , 'a4');
insert into seat (movie_time,seat_name) values('13:00' , 'a5');
insert into seat (movie_time,seat_name) values('13:00' , 'a6');
insert into seat (movie_time,seat_name) values('13:00' , 'a7');
insert into seat (movie_time,seat_name) values('13:00' , 'a8');
insert into seat (movie_time,seat_name) values('13:00' , 'a9');
insert into seat (movie_time,seat_name) values('13:00' , 'a10');
insert into seat (movie_time,seat_name) values('13:00' , 'b1');
insert into seat (movie_time,seat_name) values('13:00' , 'b2');
insert into seat (movie_time,seat_name) values('13:00' , 'b3');
insert into seat (movie_time,seat_name) values('13:00' , 'b4');
insert into seat (movie_time,seat_name) values('13:00' , 'b5');
insert into seat (movie_time,seat_name) values('13:00' , 'b6');
insert into seat (movie_time,seat_name) values('13:00' , 'b7');
insert into seat (movie_time,seat_name) values('13:00' , 'b8');
insert into seat (movie_time,seat_name) values('13:00' , 'b9');
insert into seat (movie_time,seat_name) values('13:00' , 'b10');

select count(*) from seat where movie_time='13:00:00' and seat_reserve = 1;


drop table ticket;
create table ticket(
  ticket_no int auto_increment not null primary key, 
  ticket_total_price int,
  ticket_startdate datetime,
  ticket_cnt int,
  ticket_user_no int not null,
  ticket_movie_no int not null,
  ticket_seat varchar(10),
  ticket_type boolean default 1
);

insert into ticket (ticket_user_no,ticket_movie_no,ticket_seat,ticket_type,ticket_cnt,ticket_total_price,ticket_startdate) values (2,2,'a1,a2',1,2,30000,'2024-07-24 09:00');
insert into ticket (ticket_user_no,ticket_movie_no,ticket_seat,ticket_type,ticket_cnt,ticket_total_price,ticket_startdate) values (3,2,'b1,b2,b3',1,3,45000,'2024-07-24 09:00');
insert into ticket (ticket_user_no,ticket_movie_no,ticket_seat,ticket_type,ticket_cnt,ticket_total_price,ticket_startdate) values (4,4,'b5',1,1,15000,'2024-07-24 13:00');

select * from ticket;

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