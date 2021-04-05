package donation.pet.service;

import donation.pet.domain.etc.AcceptStatus;
import donation.pet.domain.exchange.Exchange;
import donation.pet.domain.exchange.ExchangeRepository;
import donation.pet.domain.member.shelter.Shelter;
import donation.pet.domain.member.shelter.ShelterRepository;
import donation.pet.dto.exchange.ExchangeAcceptStatusDto;
import donation.pet.dto.exchange.ExchangeDto;
import donation.pet.dto.exchange.ExchangeRequestDto;
import donation.pet.dto.exchange.ExchangeResponseDto;
import donation.pet.exception.BaseException;
import donation.pet.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ExchangeService {

    private final ShelterRepository shelterRepository;
    private final ExchangeRepository exchangeRepository;

    public void requestExchange(Long shelterId, ExchangeRequestDto dto) {
        Shelter shelter = shelterRepository.findById(shelterId)
                .orElseThrow(() -> new BaseException(ErrorCode.SHELTER_NOT_EXIST));

        Exchange exchange = Exchange.createExchage(shelter, dto);
        exchangeRepository.save(exchange);
    }

    public void checkExchange(Long exchangeId, ExchangeAcceptStatusDto dto) {
        Exchange exchange = exchangeRepository.findById(exchangeId)
                .orElseThrow(() -> new BaseException(ErrorCode.EXCHANGE_NOT_EXIST));

        if (dto.getAcceptStatus() == AcceptStatus.ACCEPTED) {
            exchange.successAcceptStatus(dto.getTransactionAddress());
        } else if (dto.getAcceptStatus() == AcceptStatus.REFUSED) {
            exchange.failAccptStatus();
        }
    }

    public ExchangeResponseDto getExchangesAll() {
        List<ExchangeDto> dtos = exchangeRepository.findWithShelter().stream()
                .map(ExchangeDto::createDto).collect(Collectors.toList());

        return new ExchangeResponseDto(dtos);
    }

    public ExchangeResponseDto getExchange(Long shelterId) {
        if (shelterRepository.findById(shelterId).isEmpty()) {
            throw new BaseException(ErrorCode.SHELTER_NOT_EXIST);
        }

        List<ExchangeDto> dtos = exchangeRepository.findByShelterId(shelterId).stream()
                .map(ExchangeDto::createDto).collect(Collectors.toList());
        return new ExchangeResponseDto(dtos);
    }
}
