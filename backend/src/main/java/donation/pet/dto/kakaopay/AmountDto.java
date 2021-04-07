package donation.pet.dto.kakaopay;

import lombok.Data;

@Data
public class AmountDto {

    private Integer total, tax_free, vat, point, discount;
}
