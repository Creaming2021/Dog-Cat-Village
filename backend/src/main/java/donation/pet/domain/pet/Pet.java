package donation.pet.domain.pet;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import donation.pet.domain.adopt.Adopt;
import donation.pet.domain.center.Center;
import donation.pet.domain.etc.BaseTimeEntity;
import donation.pet.dto.pet.PetDto;
import lombok.*;
import org.modelmapper.ModelMapper;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;


@Entity
@Builder
@Getter
@Setter // ModelMapper 쓰려면 필요
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

    private String imageUrl;

    private LocalDateTime birthday;
    // 어떻게 들어갈지는 모르겠다 ...

    private Float weight;

    @Lob
    @Column(name = "pet_personality")
    private String personality;

    @Lob
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
    @JoinColumn(name = "center_id")
    private Center center;

    @OneToMany(mappedBy = "pet", cascade = CascadeType.ALL, orphanRemoval = true)
    private final List<Adopt> adopts = new ArrayList<>();


    ///////////////////////////////////

    public void changeStatus(AdoptStatus adoptStatus) {
        this.adoptStatus = adoptStatus;
    }

    public static Pet createPet(String name, Center center) {
        Pet pet = new Pet();
        pet.name = name;
        pet.center = center;
        pet.adoptStatus = AdoptStatus.UNADOPTED;
        center.getPets().add(pet);

        return pet;
    }

    public static Pet createPet2(PetDto petDto, Center center) {
        ModelMapper modelMapper = new ModelMapper();
        Pet pet = modelMapper.map(petDto, Pet.class);

        pet.center = center;
        pet.adoptStatus = AdoptStatus.UNADOPTED;
        center.getPets().add(pet);

        return pet;
    }

    public PetDto changeToDto() {
        ModelMapper modelMapper = new ModelMapper();
        PetDto dto = modelMapper.map(this, PetDto.class);
//        dto.setAge(calculateAge());
        return dto;
    }

    public String calculateAge() {
        LocalDateTime from = getBirthday();
        LocalDateTime to = LocalDateTime.now();

        long years = ChronoUnit.YEARS.between(from, to);
        if (years < 1L) {
            long months = ChronoUnit.MONTHS.between(from, to);
            if (months < 1L) {
                return ChronoUnit.DAYS.between(from, to) + "일";
            }
            return months + "개월";
        }
        return years + "살";
    }

}
