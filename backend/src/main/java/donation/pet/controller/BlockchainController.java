package donation.pet.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import donation.pet.domain.member.Member;
import donation.pet.dto.blockchain.BlockchainIdToAddressDto;
import donation.pet.dto.blockchain.BlockchainRequestDto;
import donation.pet.dto.blockchain.BlockchainTransactionListDto;
import donation.pet.exception.BaseException;
import donation.pet.exception.ErrorCode;
import donation.pet.service.BlockchainService;
import donation.pet.util.CurrentUser;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@RequestMapping("/blockchain")
public class BlockchainController {

    private final BlockchainService blockchainService;

    @GetMapping("/address")
    public ResponseEntity<BlockchainIdToAddressDto> getAddressAndKey(@RequestParam("shelterId") Long shelterId,
                                           @RequestParam("consumerId") Long consumerId,
                                           @CurrentUser Member member) {
        if (member.getId() != consumerId) {
            throw new BaseException(ErrorCode.MEMBER_NOT_ALLOWED);
        }
        BlockchainIdToAddressDto result = blockchainService.getAddressAndKey(consumerId, shelterId);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @PostMapping("/address")
    public ResponseEntity<Void> insertAddress(@RequestBody BlockchainRequestDto dto,
                                        @CurrentUser Member member) {
        blockchainService.insertAddress(member.getId(), dto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/address/{address}")
    public ResponseEntity<BlockchainTransactionListDto> getTransactionList(@PathVariable("address") String address) throws JsonProcessingException {
        BlockchainTransactionListDto result = blockchainService.getTransactionList(address);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
}
