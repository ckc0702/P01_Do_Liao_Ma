package com.todo.rest.webservices.restfulwebservices.user;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
	
	@Query("SELECT u FROM User u WHERE u.isDemo = true")
	List<User> getDemoCredentials();
	
	User findByUsername(String username);
}
