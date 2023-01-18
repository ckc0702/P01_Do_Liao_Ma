package com.todo.rest.webservices.restfulwebservices.jwt;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.todo.rest.webservices.restfulwebservices.user.User;
import com.todo.rest.webservices.restfulwebservices.user.UserRepository;

@Service
public class JwtUserDetailsService implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;
  
  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
	  User user = userRepository.findByUsername(username);
	  
	  if (user == null) {
	      throw new UsernameNotFoundException(String.format("USER_NOT_FOUND '%s'.", username));
	   }
	  
    return new JwtUserDetails(user.getId(), user.getUsername(), user.getPassword(), "ROLE_USER_2");
   
  }

}


