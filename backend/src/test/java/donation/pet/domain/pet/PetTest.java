package donation.pet.domain.pet;

import donation.pet.domain.etc.Sex;
import donation.pet.domain.member.shelter.Shelter;
import donation.pet.domain.member.shelter.ShelterRepository;
import donation.pet.dto.pet.PetRequestDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class PetTest {

    @Autowired
    ShelterRepository shelterRepository;

    @Autowired
    PetRepository petRepository;

    @Test
    public void 나이_계산() throws Exception {
        // given
        PetRequestDto dto = PetRequestDto.builder()
                .shelterId(3L)
                .name("쿠로")
                .sex(Sex.MALE)
                .weight(13.2f)
                .birthday("20210309")
                .personality("사람을 좋아함")
                .condition("다리가 짧음")
                .neuter(Neuter.YES)
                .breed("웰시 코기")
                .breedType(BreedType.DOG)
                .build();

        Shelter shelter = shelterRepository.findById(3L).get();

        // when
        Pet pet = Pet.createPet(dto, shelter);
        petRepository.save(pet);
        System.out.println(pet.getBirthday());

        System.out.println(pet.calculateAge());

        // then
    }

    @Test
    public void 더미데이터_넣기() throws Exception {
        // given
        String[] names = { "예삐", "삐삐", "뚱이", "순이", "돌이", "사랑이", "꺽정", "길동", "링컨", "뉴턴", "몽룡", "멍선생", "럭키", "카비", "앝티", "꽃순이", "리핌", "나무",
                "준이", "린다", "량하", "공자", "제갈", "바람이", "루터", "샤이니", "루카", "제레미","마느", "포도", "나루", "용용이", "셔니코", "화국", "코알루", "봄이", "또또",
                "레미", "나나", "모모", "샤인이", "짱구", "짱아", "안나", "별이", "분이", "수줍이", "씽씽", "비티", "하님", "림마", "마우티", "우티",
                "샤샤", "메인", "메이", "뽀뽀", "뽀삐", "돌순이", "뻑이", "밤이", "라미", "동이", "둥이", "흰둥이", "릴리", "가미", "둥이", "꽃돌", "돌꽃", "밤달이" };

//        int randomNameIdx = (int) (Math.random() * names.length);
//        String selectedName = names[randomNameIdx];

        String[] personalities = { "활동적인", "적극적인", "활발한", "용감한", "영리한", "용기있는", "공격적인",
            "근면한", "부지런한", "대범한", "온화한", "온순한", "고약한", "경솔한", "보수적인", "잔인한", "교활한", "배려하는" };

//        int randomPersonalityIdx = (int) (Math.random() * personalities.length);
//        String selectedPersonality = personalities[randomPersonalityIdx];

        String[] dogBreeds = { "비숑 프리제", "푸들", "이탈리안 그레이하운드", "프렌치 불독", "말티즈", "말티푸", "시츄",
            "요크셔테리어", "치와와", "포메라니안", "진돗개", "래브라도 리트리버", "웰시 코기", "시바견", "삽살개", "퍼그" };

        String[] catBreeds = { "노르웨이 숲 고양이", "데본렉스", "라가머핀", "라팜", "랙돌", "러시안블루", "맹크스 고양이", "메인쿤", "아메리칸 숏 헤어", "코리안 숏 헤어" };

        // when
//        List<Shelter> shelters = shelterRepository.findAll();
//        shelters.forEach(shelter -> {
//            // 1. 강아지
//            for (int i = 0; i < 10; i++) {
//                String selectedName = getRandomName(names);
//
//                String selectedPersonality = getRandomName(personalities);
//
//
//                PetRequestDto dto = PetRequestDto.builder()
//                        .shelterId(shelter.getId())
//                        .name(selectedName)
//                        .sex(Sex.MALE)
//                        .weight(13.2f)
//                        .birthday("20210309")
//                        .personality(selectedPersonality)
//                        .condition("건강함")
//                        .neuter(Neuter.YES)
//                        .breed("웰시 코기")
//                        .breedType(BreedType.DOG)
//                        .build();
//            }
//        });



        // then
    }

    private String getRandomName(String[] names) {
        int randomNameIdx = (int) (Math.random() * names.length);
        return names[randomNameIdx];
    }
}