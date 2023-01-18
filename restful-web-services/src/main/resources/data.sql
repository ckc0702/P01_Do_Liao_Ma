/* INSERT DEMO USER */ 
insert into users(id, username, password, name, is_demo, created_by, created_date, modify_by, modify_date)
values (1, 'user1', '$2a$10$0kV8Ews6uSQJ53.NmX1nYOM/HQYstVB1jJH0TDzMTfBV9xVPIgewe', 'user1', true, 'admin', CURRENT_TIMESTAMP(), 'admin', CURRENT_TIMESTAMP());

insert into users(id, username, password, name, is_demo, created_by, created_date, modify_by, modify_date)
values (2, 'user2', '$2a$10$0kV8Ews6uSQJ53.NmX1nYOM/HQYstVB1jJH0TDzMTfBV9xVPIgewe', 'user2', true, 'admin', CURRENT_TIMESTAMP(), 'admin', CURRENT_TIMESTAMP());

insert into users(id, username, password, name, is_demo, created_by, created_date, modify_by, modify_date)
values (3, 'user3', '$2a$10$0kV8Ews6uSQJ53.NmX1nYOM/HQYstVB1jJH0TDzMTfBV9xVPIgewe', 'user3', true, 'admin', CURRENT_TIMESTAMP(), 'admin', CURRENT_TIMESTAMP());

/* INSERT TODO LIST */
insert into todolist(id, name, start_date, target_date, is_done, done_date, created_by, created_date, modify_by, modify_date, user_id)
values (1, 'Demo Task List', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), false, CURRENT_TIMESTAMP(), 'admin', CURRENT_TIMESTAMP(), 'admin', CURRENT_TIMESTAMP(), 1);

insert into todolist(id, name, start_date, target_date, is_done, done_date, created_by, created_date, modify_by, modify_date, user_id)
values (2, 'Demo Task List', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), false, CURRENT_TIMESTAMP(), 'admin', CURRENT_TIMESTAMP(), 'admin', CURRENT_TIMESTAMP(), 2);

insert into todolist(id, name, start_date, target_date, is_done, done_date, created_by, created_date, modify_by, modify_date, user_id)
values (3, 'Demo Task List', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), false, CURRENT_TIMESTAMP(), 'admin', CURRENT_TIMESTAMP(), 'admin', CURRENT_TIMESTAMP(), 3);

/* INSERT TODO */
insert into todo(id, description, start_date, target_date, is_done, done_date, created_by, created_date, modify_by, modify_date, todolist_id, user_id)
values (1, 'Demo Task', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), false, CURRENT_TIMESTAMP(), 'admin', CURRENT_TIMESTAMP(), 'admin', CURRENT_TIMESTAMP(), 1, 1);

insert into todo(id, description, start_date, target_date, is_done, done_date, created_by, created_date, modify_by, modify_date, todolist_id, user_id)
values (2, 'Demo Task', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), false, CURRENT_TIMESTAMP(), 'admin', CURRENT_TIMESTAMP(), 'admin', CURRENT_TIMESTAMP(), 2, 2);

insert into todo(id, description, start_date, target_date, is_done, done_date, created_by, created_date, modify_by, modify_date, todolist_id, user_id)
values (3, 'Demo Task', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), false, CURRENT_TIMESTAMP(), 'admin', CURRENT_TIMESTAMP(), 'admin', CURRENT_TIMESTAMP(), 3, 3);

insert into todo(id, description, start_date, target_date, is_done, done_date, created_by, created_date, modify_by, modify_date, todolist_id, user_id)
values (4, 'Demo Task', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), false, CURRENT_TIMESTAMP(), 'admin', CURRENT_TIMESTAMP(), 'admin', CURRENT_TIMESTAMP(), null, 1);

insert into todo(id, description, start_date, target_date, is_done, done_date, created_by, created_date, modify_by, modify_date, todolist_id, user_id)
values (5, 'Demo Task', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), false, CURRENT_TIMESTAMP(), 'admin', CURRENT_TIMESTAMP(), 'admin', CURRENT_TIMESTAMP(), null, 1);