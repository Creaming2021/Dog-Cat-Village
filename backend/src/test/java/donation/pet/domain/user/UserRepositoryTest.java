package donation.pet.domain.user;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class UserRepositoryTest {

    @Autowired UserRepository userRepository;

    @BeforeEach
    public void 가짜유저생성() throws Exception {
        for (int i = 0; i < 10; i++) {
            User user = User.builder()
                    .name("user" + i)
                    .email("melon@test.com")
                    .password("test")
                    .phoneNumber("01012345678")
                    .accept("true")
                    .contractAddress("0x1123455")
                    .build();

            userRepository.save(user);
        }

    }

    @Test
    public void 유저생성_및_조회() throws Exception {
        // given
        User user = User.builder()
                .name("userA")
                .email("melon@test.com")
                .password("test")
                .phoneNumber("01012345678")
                .accept("true")
                .contractAddress("0x1123455")
                .build();

        // when
        User saveUser = userRepository.save(user);
        User findUser = userRepository.findById(saveUser.getId()).get();

        // then
        assertThat(findUser).isEqualTo(saveUser);
        assertThat(findUser.getName()).isEqualTo(user.getName());

        System.out.println("유저 생성 시각: " + findUser.getCreateDateTime());

    }

    @Test
    public void 유저전체조회() throws Exception {
        // given

        // when
        List<User> all = userRepository.findAll();

        // then
        assertThat(all.size()).isEqualTo(10);

        all.forEach(user -> {
            System.out.println(user.getId() + " " + user.getName());
        });
    }
}