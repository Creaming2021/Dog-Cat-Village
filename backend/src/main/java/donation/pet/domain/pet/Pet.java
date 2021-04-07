package donation.pet.domain.pet;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import donation.pet.domain.adopt.Adopt;
import donation.pet.domain.etc.BaseTimeEntity;
import donation.pet.domain.etc.Sex;
import donation.pet.dto.pet.PetDto;
import donation.pet.dto.pet.PetRequestDto;
import donation.pet.dto.pet.PetUpdateResponseDto;
import lombok.*;
import org.dom4j.rule.Mode;
import org.modelmapper.ModelMapper;
import donation.pet.domain.member.shelter.Shelter;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;


@Entity
@Builder
@Getter
@AllArgsConstructor // @Builder 쓰려면 필요
@NoArgsConstructor // 기본 생성자
@EqualsAndHashCode(of = "id", callSuper = false)
public class Pet extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pet_id")
    private Long id;

    @NotNull
    private String name;

    private String breed;

    private String profileImage;

    private String birthday;

    private Float weight;

    @Column(name = "pet_personality")
    private String personality;

    @Column(name = "pet_condition")
    private String condition;

    @Enumerated(EnumType.STRING)
    private BreedType breedType;

    @Enumerated(EnumType.STRING)
    private Sex sex;

    @Enumerated(EnumType.STRING)
    private Neuter neuter;

    @Enumerated(EnumType.STRING)
    private AdoptStatus adoptStatus;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Shelter shelter;

    @OneToMany(mappedBy = "pet", cascade = CascadeType.ALL, orphanRemoval = true)
    private final List<Adopt> adopts = new ArrayList<>();

    ///////////////////////////////////

    public static Pet createPet(PetRequestDto dto, Shelter shelter) {
        Pet pet = new Pet();
        pet.shelter = shelter;
        pet.adoptStatus = AdoptStatus.UNADOPTED;
        shelter.getPets().add(pet);
        pet.changeForm(dto);
        return pet;
    }

    public void changeForm(PetRequestDto dto) {
        name = dto.getName();
        sex = dto.getSex();
        weight = dto.getWeight();
        breedType = dto.getBreedType();
        breed = dto.getBreed();
        birthday = dto.getBirthday();
        personality = dto.getPersonality();
        neuter = dto.getNeuter();
        condition = dto.getCondition();
    }


    public void changeStatus(AdoptStatus adoptStatus) {
        this.adoptStatus = adoptStatus;
    }

    public PetDto changeToDto() {
        ModelMapper modelMapper = new ModelMapper();
        PetDto dto = modelMapper.map(this, PetDto.class);
        dto.setAge(calculateAge());
        return dto;
    }

    public PetUpdateResponseDto changeToPetUpdateDto() {
        ModelMapper modelMapper = new ModelMapper();
        PetUpdateResponseDto dto = modelMapper.map(this, PetUpdateResponseDto.class);
        dto.setAge(calculateAge());
        return dto;
    }

    public String calculateAge() {
        int birthYear = Integer.parseInt(getBirthday().substring(0, 4));
        int birthMonth = Integer.parseInt(getBirthday().substring(4, 6));
        int birthDayOfMonth = Integer.parseInt(getBirthday().substring(6, 8));
        LocalDate birthday = LocalDate.of(birthYear, birthMonth, birthDayOfMonth);

        long days = ChronoUnit.DAYS.between(birthday, LocalDate.now());

        if (days / 365 > 0) {
            return days / 365 + "살";
        } else if (days / 30 > 0) {
            return days / 30 + "개월";
        } else {
            return days + "일";
        }
    }

    public void updateProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }
}
