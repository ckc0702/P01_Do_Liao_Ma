package com.todo.rest.webservices.restfulwebservices.user;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.todo.rest.webservices.restfulwebservices.BcryptEncoderPrototype;

@Service
public class UserServiceImpl implements UserService{
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@Autowired
	private UserRepository userRepository;
	
	@Override
	public UserDto createUser(UserDto userDto) {
		
		User user = userRepository.findByUsername(userDto.getUsername());
		
		if(user == null) {
			
			String password = userDto.getPassword();
			
			String encodedPassword = bCryptPasswordEncoder.encode(password); 
			
			userDto.setPassword(encodedPassword);
			
			user = convertTodoDtoToEntity(userDto);
			
			user.setCreatedBy(user.getUsername());
			user.setModifyBy(user.getUsername());
			
			userRepository.save(user);
			
			return userDto;
		}
		
		return null;
	}
	
	private UserDto convertTodoToTodoDto(User user) {
		
		modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
		
		UserDto userDto = new UserDto();
		
		userDto = modelMapper.map(user, UserDto.class);
		
		return userDto;
	}
	
	private User convertTodoDtoToEntity(UserDto userDto) {
		
		modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
		
		User user = new User();
		
		user = modelMapper.map(userDto, User.class);
		
		return user;
	}

}
