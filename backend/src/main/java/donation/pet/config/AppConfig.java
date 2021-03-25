package donation.pet.config;

import donation.pet.common.AppProperties;
import donation.pet.domain.member.MemberRole;
import donation.pet.domain.member.consumer.Consumer;
import donation.pet.service.ConsumerService;
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
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    public ApplicationRunner applicationRunner() {
        return new ApplicationRunner() {

            @Autowired
            ConsumerService consumerService;

            @Autowired
            AppProperties appProperties;

            @Override
            public void run(ApplicationArguments args) throws Exception {
                Consumer admin = Consumer.builder()
                        .email(appProperties.getAdminEmail())
                        .password(appProperties.getAdminPassword())
                        .name("운영자")
                        .phoneNumber("000000000")
                        .accept("true")
                        .roles(Set.of(MemberRole.ADMIN, MemberRole.USER, MemberRole.SHELTER))
                        .build();

                consumerService.signup(admin);
            }
        };
    }
}
