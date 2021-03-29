package donation.pet.service;

import donation.pet.domain.adopt.Adopt;
import donation.pet.domain.adopt.AdoptRepository;
import donation.pet.domain.member.MemberRepository;
import donation.pet.domain.member.MemberRole;
import donation.pet.domain.member.consumer.Consumer;
import donation.pet.domain.member.consumer.ConsumerRepository;
import donation.pet.domain.member.shelter.Shelter;
import donation.pet.domain.member.shelter.ShelterRepository;
import donation.pet.domain.pet.Pet;
import donation.pet.domain.pet.PetRepository;
import donation.pet.dto.adopt.*;
import donation.pet.dto.consumer.ConsumerResponseDto;
import donation.pet.dto.consumer.ConsumerSignupRequestDto;
import donation.pet.dto.consumer.ConsumerUpdateRequestDto;
import donation.pet.dto.member.DuplRequestDto;
import donation.pet.exception.BaseException;
import donation.pet.exception.ErrorCode;
import donation.pet.util.MailUtil;
import lombok.RequiredArgsConstructor;
import org.bouncycastle.jcajce.provider.asymmetric.ec.KeyFactorySpi;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.parameters.P;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ConsumerService {

    private final ConsumerRepository consumerRepository;
    private final MemberRepository memberRepository;
    private final AdoptRepository adoptRepository;
    private final PetRepository petRepository;
    private final ShelterRepository shelterRepository;
    private final ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;
    private final MailUtil mailUtil;

    @Transactional
    public void signup(ConsumerSignupRequestDto dto) {
        if (memberRepository.findByEmail(dto.getEmail()).isPresent()) {
            throw new BaseException(ErrorCode.EMAIL_DUPLICATION);
        }

        String encodePassword = passwordEncoder.encode(dto.getPassword());
        String key = mailUtil.sendMail(dto.getEmail());

        Consumer consumer = dto.toEntity(encodePassword, Set.of(MemberRole.USER), key);
        consumerRepository.save(consumer);
    }

    public void checkDuplicatedNickname(DuplRequestDto dto) {
        if (memberRepository.findByName(dto.getName()).isPresent()) {
            throw new BaseException(ErrorCode.NAME_DUPLICATION);
        }
    }

    public ConsumerResponseDto getConsumer(Long consumerId) {
        Consumer consumer = consumerRepository.findById(consumerId)
                .orElseThrow(() -> new BaseException(ErrorCode.CONSUMER_NOT_EXIST));
        return modelMapper.map(consumer, ConsumerResponseDto.class);
    }

    @Transactional
    public ConsumerResponseDto updateConsumer(Long consumerId, ConsumerUpdateRequestDto dto) {
        Consumer consumer = consumerRepository.findById(consumerId)
                .orElseThrow(() -> new BaseException(ErrorCode.CONSUMER_NOT_EXIST));
        consumer.updateConsumer(dto.getName(), dto.getPassword(), dto.getPhoneNumber());
        return modelMapper.map(consumer, ConsumerResponseDto.class);
    }

    @Transactional
    public void saveProfileImage(Long consumerId, MultipartFile file) {
        Consumer consumer = consumerRepository.findById(consumerId)
                .orElseThrow(() -> new BaseException(ErrorCode.CONSUMER_NOT_EXIST));

        // file 등록 예정
    }

    public AdoptListResponseDto getAdoptsByConsumer(Long consumerId) {
        List<AdoptSimpleDto> result = adoptRepository.findByConsumer(consumerId).stream()
                .map(adopt -> modelMapper.map(adopt, AdoptSimpleDto.class))
                .collect(Collectors.toList());
        return new AdoptListResponseDto(result);
    }

    public AdoptResponseDto getAdoptDetailByConsumer(Long consumerId, Long adoptId) {
        Adopt adopt = adoptRepository.findById(adoptId)
                .orElseThrow(() -> new BaseException(ErrorCode.ADOPT_NOT_EXIST));
        if (!adopt.getShelter().getId().equals(consumerId)) {
            throw new BaseException(ErrorCode.CONSUMER_NOT_MATCH);
        }
        return adopt.toAdoptDto();
    }

    @Transactional
    public void insertAdoptByConsumer(Long consumerId, AdoptRequestDto dto) {
        Consumer consumer = consumerRepository.findById(consumerId)
                .orElseThrow(() -> new BaseException(ErrorCode.CONSUMER_NOT_EXIST));
        Pet pet = petRepository.findById(dto.getPetId())
                .orElseThrow(() -> new BaseException(ErrorCode.PET_NOT_EXIST));
        if (pet.getShelter() == null) {
            throw new BaseException(ErrorCode.SHELTER_NOT_EXIST);
        }
        Shelter shelter = pet.getShelter();
        Adopt adopt = Adopt.createAdopt(consumer, shelter, pet);
        adopt.addForm(dto);

        adoptRepository.save(adopt);
    }
}
