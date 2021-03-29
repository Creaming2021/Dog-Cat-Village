package donation.pet.service;

import donation.pet.domain.member.consumer.Consumer;
import donation.pet.domain.member.consumer.ConsumerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class InitService {

    private final ConsumerRepository consumerRepository;
    private final PasswordEncoder passwordEncoder;

    public void signup(Consumer consumer) {
        if (consumerRepository.findByEmail(consumer.getEmail()).isEmpty()) {
            consumer.updatePassword(passwordEncoder.encode(consumer.getPassword()));
            consumerRepository.save(consumer);
        }
    }
}
