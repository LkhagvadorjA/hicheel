package usecase.authentication;

import java.util.List;

import com.example.demo.jdbc.UserRepository;
import com.example.demo.transferObject.User;

import usecase.AbstractUseCase;

public class AuthenticateUser extends AbstractUseCase<AuthenticateUserInput, List<User>>{
	
	private UserRepository userRepository;
	
	public AuthenticateUser(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	@Override
	public List<User> execute(AuthenticateUserInput input) {
		if (null != input)
		{
			return userRepository.getUserByUserNameAndPassWord(input.getUserName(), input.getPassword());
		}
		return null;
	}
	
}
