package donation.pet.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import donation.pet.domain.chat.ChatMessage;
import donation.pet.domain.member.MemberRole;
import donation.pet.domain.member.consumer.Consumer;
import donation.pet.domain.member.consumer.ConsumerRepository;
import donation.pet.domain.member.shelter.Shelter;
import donation.pet.domain.member.shelter.ShelterRepository;
import donation.pet.dto.chat.ChatCheckRequestDto;
import donation.pet.dto.chat.ChatCheckResponseDto;
import donation.pet.dto.chat.ChatMessageDto;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class ChatServiceTest {

    @Autowired
    ChatService chatService;
    @Autowired
    ConsumerRepository consumerRepository;
    @Autowired
    ShelterRepository shelterRepository;

    @Test
    @Rollback(false)
    public void redis에_접근() throws JsonProcessingException {

        Consumer my = Consumer.builder().name("mymy").email("my@gmail.com")
                .phoneNumber("01011111111").profileImage("myImage").roles(Collections.singleton(MemberRole.CONSUMER)).build();
        Shelter opp = Shelter.builder().name("oppopp").email("opp@gmail.com")
                .phoneNumber("01022222222").profileImage("oppImage").roles(Collections.singleton(MemberRole.SHELTER)).build();

        Consumer mymy = consumerRepository.save(my);
        Shelter oppopp = shelterRepository.save(opp);

        ChatCheckRequestDto dto = ChatCheckRequestDto.builder().myId(mymy.getId()).oppId(oppopp.getId()).build();

        ChatCheckResponseDto roomId = chatService.check(dto);

        System.out.println(roomId);

    }

    @Test
    @Rollback(false)
    public void 메시지_받음() throws JsonProcessingException {

        ChatMessageDto chatMessage = ChatMessageDto.builder()
                .myId("4").oppId("5").oppName("mymy").roomId("0bfe4273-5036-44d1-aab4-b6eb2e4f6fd3")
                .msg("반대로 보낸다 >3<").date("2020-03-31").build();

        chatService.receiveMsg(chatMessage);


    }

}