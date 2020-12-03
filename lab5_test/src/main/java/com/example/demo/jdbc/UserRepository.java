package com.example.demo.jdbc;

import java.util.List;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.example.demo.transferObject.User;

public interface UserRepository extends CrudRepository<User, Long> {
	@Query("Select * from authentication where user_name = :userName and password = :password")
	List<User> getUserByUserNameAndPassWord(@Param("userName") String userName, @Param("password") String password);
}
