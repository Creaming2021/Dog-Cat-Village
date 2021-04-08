package donation.pet.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.JsonParser;
import donation.pet.domain.member.Member;
import donation.pet.domain.member.MemberRepository;
import donation.pet.domain.member.consumer.Consumer;
import donation.pet.domain.member.consumer.ConsumerRepository;
import donation.pet.domain.member.shelter.Shelter;
import donation.pet.domain.member.shelter.ShelterRepository;
import donation.pet.dto.blockchain.*;
import donation.pet.exception.BaseException;
import donation.pet.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class BlockchainService {

    private final ShelterRepository shelterRepository;
    private final ConsumerRepository consumerRepository;
    private final MemberRepository memberRepository;

    public BlockchainIdToAddressDto getAddressAndKey(Long consumerId, Long shelterId) {
        Consumer consumer = consumerRepository.findById(consumerId)
                .orElseThrow(() -> new BaseException(ErrorCode.CONSUMER_NOT_EXIST));
        Shelter shelter = shelterRepository.findById(shelterId)
                .orElseThrow(() -> new BaseException(ErrorCode.SHELTER_NOT_EXIST));

        return BlockchainIdToAddressDto.builder()
                .consumerAddress(consumer.getContractAddress())
                .consumerPrivateKey(consumer.getPrivateKey())
                .shelterAddress(shelter.getContractAddress())
                .build();
    }


    public void insertAddress(BlockchainRequestDto dto) {
        Member member = memberRepository.findById(dto.getId())
                .orElseThrow(() -> new BaseException(ErrorCode.MEMBER_NOT_FOUND));
        member.createContractAddress(dto.getContractAddress(), dto.getPrivateKey());
    }


    public BlockchainTransactionListDto getTransactionList(String address) throws JsonProcessingException {

        // RestTemplate 이용
        TransactionDto transactionDto = getTransactionDto(address);

        // 주소 취합 후 쿼리 보내기
        List<Member> findMembers = getMembers(transactionDto);

        // 결과 dto 구하기
        List<BlockchainTransactionDto> transactionDtos = getTransactionDtos(transactionDto, findMembers);

        return new BlockchainTransactionListDto(transactionDtos);
    }

    private TransactionDto getTransactionDto(String address) throws JsonProcessingException {
        RestTemplate restTemplate = new RestTemplate();
        URI uri = UriComponentsBuilder.fromHttpUrl("https://api-ropsten.etherscan.io/api?module=account&action=tokentx&address="
                + address + "&startblock=0&endblock=999999999&sort=asc&apikey=6QMEM9F74YBT8WM8E1I8W5XGE4G7GT824M").build().toUri();

        ResponseEntity<String> responseEntity = restTemplate.getForEntity(uri, String.class);

        ObjectMapper objectMapper = new ObjectMapper();
        TransactionDto transactionDto = objectMapper.readValue(responseEntity.getBody(), TransactionDto.class);
        return transactionDto;
    }

    private List<BlockchainTransactionDto> getTransactionDtos(TransactionDto transactionDto, List<Member> findMembers) {
        return transactionDto.getResult().stream().map(contractDto -> {

            String fromAddress = contractDto.getFrom();
            Long fromId = 0L;
            String fromName = "";
            String fromProfileImage = "";
            Optional<Member> member = getMember(fromAddress, findMembers);
            if (member.isPresent()) {
                fromId = member.get().getId();
                fromName = member.get().getName();
                fromProfileImage = member.get().getProfileImage();
            }

            String toAddress = contractDto.getTo();
            Long toId = 0L;
            String toName = "";
            String toProfileImage = "";
            member = getMember(toAddress, findMembers);
            if (member.isPresent()) {
                toId = member.get().getId();
                toName = member.get().getName();
                toProfileImage = member.get().getProfileImage();
            }

            LocalDateTime time = LocalDateTime
                    .ofInstant(Instant.ofEpochSecond(contractDto.getTimeStamp()), ZoneId.systemDefault());

            return BlockchainTransactionDto.builder()
                    .fromId(fromId)
                    .fromName(fromName)
                    .fromProfileImage(fromProfileImage)
                    .toId(toId)
                    .toName(toName)
                    .toProfileImage(toProfileImage)
                    .contractAddress(contractDto.getContractAddress())
                    .time(time)
                    .value(contractDto.getValue() / 100000)
                    .build();
        }).collect(Collectors.toList());
    }

    private List<Member> getMembers(TransactionDto transactionDto) {
        List<String> addressList = new ArrayList<>();
        transactionDto.getResult().forEach(contractDto -> {
            addressList.add(contractDto.getFrom());
            addressList.add(contractDto.getTo());
        });
        return memberRepository.findByContractAddressIn(addressList);
    }

    private Optional<Member> getMember(String address, List<Member> findMembers) {
        return findMembers.stream()
                .filter(member -> member.getContractAddress().equals(address)).findFirst();
    }

}
