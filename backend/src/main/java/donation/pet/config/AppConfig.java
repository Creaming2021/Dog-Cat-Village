package donation.pet.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import donation.pet.common.AppProperties;
import donation.pet.domain.member.MemberRole;
import donation.pet.domain.member.consumer.Consumer;
import donation.pet.service.InitService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Set;

@Configuration
public class AppConfig {

    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }

    @Bean
    public ObjectMapper objectMapper() { return new ObjectMapper(); }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    public ApplicationRunner applicationRunner() {
        return new ApplicationRunner() {

            @Autowired
            InitService initService;

            @Autowired
            AppProperties appProperties;

            @Override
            public void run(ApplicationArguments args) {
                // 운영자 생성
                Consumer admin = Consumer.builder()
                        .email(appProperties.getAdminEmail())
                        .password(appProperties.getAdminPassword())
                        .name("운영자")
                        .phoneNumber("01000000000")
                        .accept("true")
                        .roles(Set.of(MemberRole.ADMIN, MemberRole.CONSUMER, MemberRole.SHELTER))
                        .build();

                initService.signup(admin);

                // 일반 유저 생성
                Consumer consumer = Consumer.builder()
                        .email("ssafy@ssafy.com")
                        .password(appProperties.getAdminPassword())
                        .name("김싸피")
                        .phoneNumber("01012341234")
                        .accept("true")
                        .roles(Set.of(MemberRole.CONSUMER))
                        .build();

                initService.signup(consumer);
            }
        };
    }
}
