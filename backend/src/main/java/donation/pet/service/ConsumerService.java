package donation.pet.service;

import donation.pet.domain.adopt.Adopt;
import donation.pet.domain.adopt.AdoptRepository;
import donation.pet.domain.member.MemberRepository;
import donation.pet.domain.member.consumer.Consumer;
import donation.pet.domain.member.consumer.ConsumerRepository;
import donation.pet.domain.member.shelter.Shelter;
import donation.pet.domain.member.shelter.ShelterRepository;
import donation.pet.domain.pet.Pet;
import donation.pet.domain.pet.PetRepository;
import donation.pet.dto.adopt.AdoptListResponseDto;
import donation.pet.dto.adopt.AdoptRequestDto;
import donation.pet.dto.adopt.AdoptResponseDto;
import donation.pet.dto.adopt.AdoptSimpleDto;
import donation.pet.dto.consumer.ConsumerResponseDto;
import donation.pet.dto.consumer.ConsumerUpdateRequestDto;
import donation.pet.exception.BaseException;
import donation.pet.exception.ErrorCode;
import donation.pet.util.MailUtil;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
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
    private final S3Service s3Service;

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
    public void saveProfileImage(Long consumerId, MultipartFile file) throws IOException {
        Consumer consumer = consumerRepository.findById(consumerId)
                .orElseThrow(() -> new BaseException(ErrorCode.CONSUMER_NOT_EXIST));
        consumer.updateProfileImage(s3Service.uploadFile(file));
        consumerRepository.save(consumer);
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
