package donation.pet.domain.pet;

import donation.pet.domain.adopt.Adopt;
import donation.pet.domain.etc.BaseTimeEntity;
import donation.pet.domain.center.Center;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id", callSuper = false)
public class Pet extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pet_id")
    private Long id;

    private String breed;
    private Integer age;
    private Float weight;

    @Lob
    @Column(name = "pet_personality")
    private String personality;

    @Lob
    @Column(name = "pet_condition")
    private String condition;

    @Enumerated(EnumType.STRING)
    private Sex sex;

    @Enumerated(EnumType.STRING)
    private Neuter neuter;

    @Enumerated(EnumType.STRING)
    private AdoptStatus adoptStatus;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "center_id")
    private Center center;

    @OneToMany(mappedBy = "pet", cascade = CascadeType.ALL, orphanRemoval = true)
    private final List<Adopt> adopts = new ArrayList<>();

}
