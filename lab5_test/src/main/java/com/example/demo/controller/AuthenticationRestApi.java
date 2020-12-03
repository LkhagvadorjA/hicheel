package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.RestEntity;
import com.example.demo.jdbc.UserRepository;
import com.example.demo.transferObject.User;

import usecase.authentication.AuthenticateUser;
import usecase.authentication.AuthenticateUserInput;

@RestController
public class AuthenticationRestApi {
	 @Autowired UserRepository userRepository;
	 @CrossOrigin(origins = "http://localhost:4200")
	 @GetMapping("/authentication/{userName}/{password}")
	 @ResponseBody
	 public RestEntity getAuthenticationUserInfo(@PathVariable String userName, @PathVariable String password)
	 {
		 AuthenticateUserInput authenticateUserInput = new AuthenticateUserInput(userName, password);
		AuthenticateUser authenticateUser = new AuthenticateUser(userRepository);
		List<User> user = authenticateUser.execute(authenticateUserInput);
		if(user.size() > 0)
		{
			return new  RestEntity(user.get(0));
		}
		return new RestEntity(false);
		 
	 }
 
}
