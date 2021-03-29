package donation.pet.domain.adopt;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
class AdoptTest {

//    @Autowired
//    UserRepository userRepository;
//
//    @Autowired
//    CenterRepository centerRepository;
//
//    @Autowired
//    PetRepository petRepository;
//
//    @BeforeEach
//    public void beforeEach() {
//        for (int i = 1; i <= 5; i++) {
//            User user = User.builder()
//                    .name("user" + i)
//                    .build();
//            userRepository.save(user);
//
//            Center center = Center.builder()
//                    .name("center" + i)
//                    .build();
//            centerRepository.save(center);
//
//            Pet pet = Pet.createPet("pet" + i, center);
//            petRepository.save(pet);
//        }
//
//    }
//
//    @Test
//    public void 유저가_입양신청() throws Exception {
//        // given
//        User user = userRepository.findById(1L).get();
//        Pet pet = petRepository.findById(1L).get();
//        Center center = centerRepository.findById(1L).get();
//
//        // when
//        Adopt adoptForUser = Adopt.createAdoptForMember(user, pet);
//
//        // then
//        assertThat(adoptForUser.getUser()).isEqualTo(user);
//        assertThat(adoptForUser.getPet()).isEqualTo(pet);
//        assertThat(adoptForUser.getPet().getCenter()).isEqualTo(center);
//        assertThat(adoptForUser.getAcceptStatus()).isEqualTo(AcceptStatus.PENDING);
//    }
}