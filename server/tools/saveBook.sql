-- 图书信息写入 Mysql
create table books (
  id int not null auto_increment primary key,
  isbn varchar(20) not null,
  openid varchar(50) not null,
  title varchar(100) not null,
  summary varchar(100) not null,
  image varchar(100) not null,
  alt varchar(100),
  publisher varchar(100),
  price varchar(100),
  rate float,
  tags varchar(100),
  author varchar(100)
);
