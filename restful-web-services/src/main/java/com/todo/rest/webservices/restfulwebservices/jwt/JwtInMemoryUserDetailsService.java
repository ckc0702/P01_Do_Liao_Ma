//package com.todo.rest.webservices.restfulwebservices.jwt;
//
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Optional;
//
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//
//@Service
//public class JwtInMemoryUserDetailsService implements UserDetailsService {
//
//  static List<JwtUserDetails> inMemoryUserList = new ArrayList<>();
//
//  static {
//    inMemoryUserList.add(new JwtUserDetails(1L, "kelvin123",
//        "$2a$10$0kV8Ews6uSQJ53.NmX1nYOM/HQYstVB1jJH0TDzMTfBV9xVPIgewe", "ROLE_USER_2"));
//  }
//
//  @Override
//  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//    Optional<JwtUserDetails> findFirst = inMemoryUserList.stream()
//        .filter(user -> user.getUsername().equals(username)).findFirst();
//    
//    if (!findFirst.isPresent()) {
//      throw new UsernameNotFoundException(String.format("USER_NOT_FOUND '%s'.", username));
//    }
//
//    return findFirst.get();
//  }
//
//}
//
//
