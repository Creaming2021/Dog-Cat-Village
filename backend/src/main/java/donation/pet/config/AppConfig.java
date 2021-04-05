package donation.pet.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import donation.pet.common.AppProperties;
import donation.pet.domain.member.MemberRole;
import donation.pet.domain.member.consumer.Consumer;
import donation.pet.domain.member.shelter.Shelter;
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
                        .contractAddress("0xA9e4f0d5332b26C9B323cC299604D001dA25db1B")
                        .privateKey("cf61f430c051df6dc8d650d7a65c95a15b6a1a1df685785e3d75096964836585")
                        .accept("true")
                        .roles(Set.of(MemberRole.ADMIN, MemberRole.CONSUMER, MemberRole.SHELTER))
                        .build();

                initService.signup(admin);

                // 일반 유저 생성
                Consumer consumer = Consumer.builder()
                        .email("ssafy@ssafy.com")
                        .password(appProperties.getAdminPassword())
                        .name("김싸피")
                        .contractAddress("0x97E3EfFFE90BF2A980e360DEe8dd36383349c65d")
                        .privateKey("de93f7f0d43ee186492a1390f0869a1b8615b3c6418a2b90241a10afc29d00b8")
                        .phoneNumber("01012341234")
                        .accept("true")
                        .roles(Set.of(MemberRole.CONSUMER))
                        .build();

                initService.signup(consumer);

                // 봇호소 유저 생성
                Shelter shelter = Shelter.builder()
                        .email("shelter@ssafy.com")
                        .password(appProperties.getAdminPassword())
                        .name("보호소")
                        .contractAddress("0x55FcF877e560cB3361AEC9E1FC14D09121cB3027")
                        .privateKey("4a2c5dec589ee002ea2a4a5fdb9b5fa1f493ae322fdbdb4ae00aade099a24e84")
                        .phoneNumber("01098765432")
                        .accept("true")
                        .roles(Set.of(MemberRole.SHELTER))
                        .build();

                initService.signup(shelter);
            }
        };
    }
}
