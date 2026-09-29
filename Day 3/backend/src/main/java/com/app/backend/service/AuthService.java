package com.app.backend.service;

import com.app.backend.dto.GeneralResponse;
import com.app.backend.dto.auth.LoginRequestDto;
import com.app.backend.dto.auth.OtpVerificationRequestDto;
import com.app.backend.dto.auth.SigninRequestDto;
import com.app.backend.dto.auth.TokenResponseDto;
import com.app.backend.exeptions.InvalidCredentailException;
import com.app.backend.jdbc.model.UserModel;
import com.app.backend.jdbc.repository.AuthRepository;
import com.app.backend.jdbc.repository.UserOtpRepository;
import com.app.backend.utility.JwtUtil;
import com.app.backend.utility.MailUtility;
import com.app.backend.utility.OtpGenerator;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthRepository authRepository;
    private final UserOtpRepository userOtpRepository;
    private final OtpGenerator otpGenerator;
    private final MailUtility mailUtility;

    public AuthService(
            PasswordEncoder passwordEncoder,
            JwtUtil jwtUtil,
            AuthRepository authRepository,
            UserOtpRepository userOtpRepository,
            OtpGenerator otpGenerator,
            MailUtility mailUtility
    ) {
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.authRepository = authRepository;
        this.userOtpRepository = userOtpRepository;
        this.otpGenerator = otpGenerator;
        this.mailUtility = mailUtility;
    }

    /*
     * SIGNUP
     *
     * 1. Check user
     * 2. Hash password
     * 3. Create user
     * 4. Create account with ₹10,000
     * 5. Create wallet with ₹5,000
     * 6. Generate OTP
     * 7. Hash OTP using BCrypt
     * 8. Save hashed OTP
     * 9. Send raw OTP through email
     */
    public GeneralResponse<Void> createAccountService(
            SigninRequestDto userData
    ) {

        GeneralResponse<Void> response =
                new GeneralResponse<>();

        try {
            if (authRepository.userExists(
                    userData.getUserEmail()
            )) {

                response.setStatus(false);
                response.setMessage(
                        "User with this email already exists"
                );

                return response;
            }
            String hashedPassword =
                    passwordEncoder.encode(
                            userData.getUserPassword()
                    );
            Long userId =
                    authRepository.createUser(
                            userData.getUserName(),
                            userData.getUserEmail(),
                            hashedPassword
                    );

            if (userId == null) {

                response.setStatus(false);
                response.setMessage(
                        "User creation failed"
                );

                return response;
            }
            boolean accountCreated =
                    authRepository.createAccount(userId);

            if (!accountCreated) {

                response.setStatus(false);
                response.setMessage(
                        "Account creation failed"
                );

                return response;
            }
            String rawOtp =
                    otpGenerator.generateOtp();
            String hashedOtp =
                    passwordEncoder.encode(rawOtp);
            userOtpRepository.setOtpForUserValidation(
                    userId,
                    hashedOtp
            );
            String otpMessage =
                    "Your OTP for account verification is: "
                            + rawOtp
                            + "\n\n"
                            + "This OTP will expire in 5 minutes."
                            + "\n"
                            + "Please do not share this OTP with anyone.";

            mailUtility.sendMail(
                    userData.getUserEmail(),
                    "Verify your account",
                    otpMessage
            );

            response.setStatus(true);
            response.setMessage(
                    "Account created successfully. OTP sent to your email."
            );

            return response;

        } catch (Exception e) {

            response.setStatus(false);
            response.setMessage(
                    "Error while creating account"
            );

            return response;
        }
    }
    public GeneralResponse<Void> verifyOtpMailService(
            String email,
            String otp
    ) {

        GeneralResponse<Void> response =
                new GeneralResponse<>();

        try {
            UserModel user =
                    authRepository.findUserByEmail(email);

            if (user == null) {

                response.setStatus(false);
                response.setMessage(
                        "User with this email does not exist"
                );

                return response;
            }
            if (Boolean.TRUE.equals(
                    user.getUserVerified()
            )) {

                response.setStatus(false);
                response.setMessage(
                        "User is already verified"
                );

                return response;
            }
            String storedHashedOtp =
                    userOtpRepository.getOtpforUserValidation(
                            user.getUserId()
                    );

            if (storedHashedOtp == null) {

                response.setStatus(false);
                response.setMessage(
                        "OTP not found or expired"
                );

                return response;
            }
            boolean otpMatches =
                    passwordEncoder.matches(
                            otp,
                            storedHashedOtp
                    );

            if (!otpMatches) {

                response.setStatus(false);
                response.setMessage(
                        "Invalid OTP"
                );

                return response;
            }
            boolean verified =
                    authRepository.verifyUser(
                            user.getUserId()
                    );

            if (!verified) {

                response.setStatus(false);
                response.setMessage(
                        "User verification failed"
                );

                return response;
            }
            userOtpRepository.markOtpAsUsed(
                    user.getUserId()
            );

            response.setStatus(true);
            response.setMessage(
                    "User verified successfully"
            );

            return response;

        } catch (Exception e) {

            response.setStatus(false);
            response.setMessage(
                    "Error while verifying OTP"
            );

            return response;
        }
    }
    public GeneralResponse<TokenResponseDto> loginUserService(
            LoginRequestDto userLoginData
    ) {

        GeneralResponse<TokenResponseDto> response =
                new GeneralResponse<>();

        UserModel user =
                authRepository.findUserByEmail(
                        userLoginData.getUserEmail()
                );

        if (user == null) {

            throw new InvalidCredentailException(
                    "Invalid email or password"
            );
        }
        if (!passwordEncoder.matches(
                userLoginData.getUserPassword(),
                user.getUserPassword()
        )) {

            throw new InvalidCredentailException(
                    "Invalid email or password"
            );
        }
        if (!Boolean.TRUE.equals(
                user.getUserVerified()
        )) {
            String rawOtp =
                    otpGenerator.generateOtp();

            String hashedOtp =
                    passwordEncoder.encode(rawOtp);

            boolean otpSaved =
                    userOtpRepository.setOtpForUserValidation(
                            user.getUserId(),
                            hashedOtp
                    );

            if (!otpSaved) {

                response.setStatus(false);
                response.setMessage(
                        "Unable to generate verification OTP"
                );

                return response;
            }

            String otpMessage =
                    "Your OTP for account verification is: "
                            + rawOtp
                            + "\n\n"
                            + "This OTP will expire in 5 minutes."
                            + "\n"
                            + "Please do not share this OTP with anyone.";

            mailUtility.sendMail(
                    user.getUserEmail(),
                    "Verify your account",
                    otpMessage
            );

            response.setStatus(false);
            response.setMessage(
                    "Your account is not verified. "
                            + "A new OTP has been sent to your email."
            );

            return response;
        }
        String token =
                jwtUtil.generateToken(
                        user.getUserEmail()
                );

        TokenResponseDto tokenResponse =
                new TokenResponseDto();

        tokenResponse.setToken(token);

        response.setStatus(true);
        response.setMessage(
                "Successfully logged in"
        );
        response.setData(tokenResponse);

        return response;
    }
}