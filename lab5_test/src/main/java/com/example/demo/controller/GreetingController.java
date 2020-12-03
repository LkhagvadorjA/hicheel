package com.example.demo.controller;

import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Greeting;
import com.example.demo.Person;
import com.example.demo.PersonRepository;

@RestController
public class GreetingController {
	@Autowired PersonRepository personRepo;
	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping("/hello")
	public Greeting greeting() {
		int x = 10;
		List<Person> person = personRepo.getAllPerson();
		String firstName = person.get(0).getFirstName();
		String lastName = person.get(0).getLastName();
		
		return new Greeting(1, firstName + " " + lastName);
	}
	
	 @GetMapping("/api/employees/{id}/{name}")
	 @ResponseBody
	 public String getEmployeesByIdAndName(@PathVariable String id, @PathVariable String name) {
	     return "ID: " + id + ", name: " + name;
	 }
}
