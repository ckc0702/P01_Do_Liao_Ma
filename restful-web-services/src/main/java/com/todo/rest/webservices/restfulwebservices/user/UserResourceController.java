package com.todo.rest.webservices.restfulwebservices.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins="http://localhost:4200")
@RestController
public class UserResourceController {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private UserService userService;
	
	@GetMapping("/demo/accounts")
	public List<User> getDemoAccounts(){
		return userRepository.getDemoCredentials();
	}
	
	@GetMapping("/users/{username}")
	public User getUser(@PathVariable String username){
		return userRepository.findByUsername(username);
	}
	
	@RequestMapping(value = "${jwt.get.user.exist.uri}", method = RequestMethod.POST)
  	public UserDto createAuthenticationToken(@RequestBody UserDto userDto){

	    return userService.createUser(userDto);
  	}
}
